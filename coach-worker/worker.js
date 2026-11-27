// Servidor del Coach de Brasso (Cloudflare Worker) — GRATIS con Workers AI.
//
// Proveedor de IA, por orden de preferencia:
//   1. Workers AI de Cloudflare (gratis cada día): añade un binding "Workers AI" con el nombre AI.
//   2. Gemini (capa gratuita de Google): variable secreta GEMINI_API_KEY.
//   3. Anthropic (de pago): variable secreta ANTHROPIC_API_KEY.
//
// Variables opcionales:
//   APP_TOKEN       (secreto) contraseña inventada; la misma que pones en Perfil
//   ALLOWED_ORIGIN  (texto)   https://tu-usuario.github.io  (varias separadas por comas)
//   AI_MODEL        (texto)   modelo de Workers AI; por defecto @cf/google/gemma-4-26b-a4b-it
//   GEMINI_MODEL    (texto)   por defecto gemini-flash-latest
//   MODEL           (texto)   modelo de Anthropic; por defecto claude-haiku-5-5
export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
    const originOk = allowed.length === 0 || allowed.includes(origin);
    const cors = {
      'Access-Control-Allow-Origin': originOk ? (origin || '*') : 'null',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'content-type, x-app-token',
      'Vary': 'Origin'
    };
    const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...cors, 'content-type': 'application/json' } });
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (req.method !== 'POST') return json({ error: 'Usa POST' }, 405);
    if (!originOk) return json({ error: 'Origen no permitido' }, 403);
    if (env.APP_TOKEN && req.headers.get('x-app-token') !== env.APP_TOKEN) return json({ error: 'Clave de la app incorrecta' }, 401);

    let body;
    try { body = await req.json(); } catch { return json({ error: 'JSON no válido' }, 400); }
    const msgs = (Array.isArray(body.messages) ? body.messages.slice(-30) : [])
      .filter(m => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .map(m => ({ role: m.role, content: m.content.slice(0, 60000) }));
    if (!msgs.length || msgs[msgs.length - 1].role !== 'user') return json({ error: 'El último mensaje debe ser del usuario' }, 400);

    try {
      let text = '';
      if (env.AI) {
        const r = await env.AI.run(env.AI_MODEL || '@cf/google/gemma-4-26b-a4b-it', { messages: msgs, max_tokens: 1200 });
        text = typeof r === 'string' ? r : (r.response ?? r.choices?.[0]?.message?.content ?? '');
        if (typeof text !== 'string') text = JSON.stringify(text);
      } else if (env.GEMINI_API_KEY) {
        const model = env.GEMINI_MODEL || 'gemini-flash-latest';
        const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
          body: JSON.stringify({ contents: msgs.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })), generationConfig: { maxOutputTokens: 1200 } })
        });
        const j = await r.json().catch(() => ({}));
        if (!r.ok) return json({ error: j.error?.message || ('Error de Gemini (' + r.status + ')') }, r.status === 429 ? 429 : 502);
        text = (j.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('');
      } else if (env.ANTHROPIC_API_KEY) {
        const r = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
          body: JSON.stringify({ model: env.MODEL || 'claude-haiku-5-5', max_tokens: 1200, messages: msgs })
        });
        const j = await r.json().catch(() => ({}));
        if (!r.ok) return json({ error: j.error?.message || ('Error de Anthropic (' + r.status + ')') }, r.status === 429 ? 429 : 502);
        text = (j.content || []).filter(c => c.type === 'text').map(c => c.text).join('');
      } else {
        return json({ error: 'El servidor no tiene IA configurada: añade el binding "Workers AI" con el nombre AI.' }, 500);
      }
      return json({ text: text.trim() });
    } catch (e) {
      const m = String(e && e.message || e);
      const limit = /limit|quota|neuron|429|exceed/i.test(m);
      return json({ error: limit ? 'Se ha agotado la cuota gratuita de hoy. Vuelve a intentarlo mañana.' : 'Error de la IA: ' + m }, limit ? 429 : 502);
    }
  }
};
