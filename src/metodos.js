/* ===== BRASSO · catálogo de MÉTODOS (solo dominio público, ediciones originales) =====
   Cada ejercicio:
     {id, t:'título', notas:'…' (vacío = Pendiente), c:'4/4', tono:'C', modo:'mayor', tipo:'patron'|'estudio', tip:'…'}
   · tipo 'patron'  → se puede cambiar de tonalidad Y de escala (Clarke, Schlossberg…)
   · tipo 'estudio' → solo se transporta de tonalidad (Etudes, estudios melódicos)
   · tono/modo      → tonalidad original del ejercicio en el libro (escrita para Si♭)
   Notación de `notas` (por GRADO de la escala, no notas fijas). Ver METODOS-notacion.md:
     1..7 grado · ' octava arriba · , octava abajo · # b ## bb alteración respecto a la escala
     /1 /2 /4 /8 /16 duración · . con puntillo · t tresillo (8t, 4t)
     ( empieza ligadura · ) la termina · ~ ligadura de prolongación con la siguiente
     > acento · ! staccato · _ tenuto · {mf} matiz para la nota siguiente
     r/4 silencio · | barra de compás (se comprueba que cada compás cuadre)
   NO se inventan notas: solo se transcribe nota a nota desde el PDF original (IMSLP). */
const METODOS=(()=>{const P=(t,extra)=>Object.assign({t},extra||{});
const nums=(n,f,from=1)=>Array.from({length:n},(_,i)=>P(f(i+from)));
const L=[
 {id:'clarke-elem',autor:'Herbert L. Clarke',obra:'Elementary Studies',anio:1909,tipo:'patron',
  info:'30 lecciones y 116 ejercicios: de valores largos en una octava hasta todas las tonalidades mayores.',
  grupos:[{t:'Lecciones',ej:nums(30,n=>'Lección '+n)}]},
 {id:'clarke-tec',autor:'Herbert L. Clarke',obra:'Technical Studies',anio:1912,tipo:'patron',
  info:'10 estudios y 190 ejercicios. Los estudios 1 a 8 terminan en un Etude; el 10.º acaba con An Irish Ballad y An Old German Folksong.',
  grupos:[
   {t:'Estudios',ej:nums(10,n=>'Estudio '+n)},
   {t:'Etudes',tipo:'estudio',ej:['Etude I (nº 26)','Etude II (nº 45)','Etude III (nº 65)','Etude IV (nº 86)','Etude V (nº 117)','Etude VI (nº 132)','Etude VII (nº 170)','Etude VIII (nº 177)','An Irish Ballad (nº 189)','An Old German Folksong (nº 190)'].map(t=>P(t))}]},
 {id:'clarke-char',autor:'Herbert L. Clarke',obra:'Characteristic Studies',anio:1915,tipo:'estudio',
  info:'24 estudios que alternan mayor y menor, de Do mayor (nº 1) a Sol♯ menor (nº 24).',
  grupos:[{t:'Estudios',ej:nums(24,n=>'Estudio '+n)}]},
 {id:'clarke-drills',autor:'Herbert L. Clarke',obra:'Setting Up Drills',anio:1929,tipo:'patron',
  info:'38 ejercicios en cuatro grupos.',
  grupos:[{t:'Grupos',ej:nums(4,n=>'Grupo '+n)}]},
 {id:'arban',autor:'Jean-Baptiste Arban',obra:'Grande méthode complète',anio:1864,tipo:'patron',
  info:'Edición original de 1864, no la revisión moderna de Carl Fischer.',
  grupos:[
   {t:'Técnica',ej:['Primeros estudios','Ligados','Escalas','Ornamentos','Estudios avanzados','Doble y triple picado','Fanfarria'].map(t=>P(t))},
   {t:'14 Estudios característicos',tipo:'estudio',ej:nums(14,n=>'Estudio característico '+n)}]},
 {id:'schlossberg',autor:'Max Schlossberg',obra:'Daily Drills and Technical Studies',anio:1937,tipo:'patron',
  info:'Publicado en 1937 (J. F. Hill & Co.); Schlossberg murió en 1936. 156 ejercicios en ocho partes, según el índice del libro. Toca solo los que puedas tocar con comodidad: unos pocos de cada grupo al día.',
  grupos:[
   {t:'I · Long Note Drills (1–37)',tipo:'estudio',c:'8/4',ej:Array.from({length:37},(_,i)=>P('Ejercicio '+(i+1)))},
   {t:'II · Intervals (38–48)',ej:Array.from({length:11},(_,i)=>P('Ejercicio '+(i+38)))},
   {t:'III · Octave Drills (49–58)',ej:Array.from({length:10},(_,i)=>P('Ejercicio '+(i+49)))},
   {t:'IV · Lip Drills (59–69)',ej:Array.from({length:11},(_,i)=>P('Ejercicio '+(i+59)))},
   {t:'V · Chord Drills (70–88)',ej:Array.from({length:19},(_,i)=>P('Ejercicio '+(i+70)))},
   {t:'VI · Scale Drills (89–115)',ej:Array.from({length:27},(_,i)=>P('Ejercicio '+(i+89)))},
   {t:'VII · Chromatic Scale Drills (116–128)',tipo:'estudio',ej:Array.from({length:13},(_,i)=>P('Ejercicio '+(i+116)))},
   {t:'VIII · Etudes (129–156)',tipo:'estudio',ej:Array.from({length:28},(_,i)=>P('Ejercicio '+(i+129)))}]},
 {id:'charlier',autor:'Théo Charlier',obra:'36 Études transcendantes',anio:1926,tipo:'estudio',
  info:'Charlier murió en 1944: en España es de dominio público desde 2025.',
  grupos:[{t:'Estudios',ej:nums(36,n=>'Estudio '+n)}]},
 {id:'saint-jacome',autor:'Louis A. Saint-Jacome',obra:'Grand Method',tipo:'patron',
  info:'Método del siglo XIX.',grupos:[{t:'Secciones',ej:['Ejercicios técnicos','Escalas'].map(t=>P(t))},{t:'Estudios',tipo:'estudio',ej:[P('Estudios')]}]},
 {id:'kopprasch',autor:'Georg Kopprasch',obra:'60 Studies',tipo:'estudio',info:'Estudios del siglo XIX.',grupos:[{t:'Estudios',ej:nums(60,n=>'Estudio '+n)}]},
 {id:'bousquet',autor:'Narcisse Bousquet',obra:'36 Celebrated Studies',tipo:'estudio',info:'Estudios del siglo XIX.',grupos:[{t:'Estudios',ej:nums(36,n=>'Estudio '+n)}]},
 {id:'brandt',autor:'Vassily Brandt',obra:'Estudios orquestales',tipo:'estudio',info:'Brandt murió en 1923.',grupos:[{t:'Colecciones',ej:['34 Studies','Last Studies'].map(t=>P(t))}]},
 {id:'concone',autor:'Giuseppe Concone',obra:'Vocalises (Lyrical Studies)',tipo:'estudio',info:'Estudios líricos; Concone murió en 1861.',grupos:[{t:'Estudios',ej:[P('Lyrical Studies')]}]},
 {id:'bordogni',autor:'Marco Bordogni',obra:'Vocalises',tipo:'estudio',info:'Bordogni murió en 1856.',grupos:[{t:'Vocalises',ej:[P('Vocalises')]}]},
 {id:'gatti',autor:'Domenico Gatti',obra:'Grand Method',tipo:'patron',info:'Método del siglo XIX.',grupos:[{t:'Secciones',ej:['Ejercicios','Estudios'].map(t=>P(t))}]}
];
/* ids estables: método:grupo:ejercicio, y herencia de tipo/compás/tonalidad */
L.forEach(m=>m.grupos.forEach((g,gi)=>g.ej.forEach((e,ei)=>{e.id=e.id||(m.id+':'+gi+':'+ei);e.tipo=e.tipo||g.tipo||m.tipo;e.c=e.c||g.c||'4/4';e.tono=e.tono||'C';e.modo=e.modo||'mayor';e.met=m.id})));
/* ---- transcripciones ---- */
const SET=(id,o)=>{for(const m of L)for(const g of m.grupos)for(const e of g.ej)if(e.id===id)Object.assign(e,o)};
// Schlossberg, Daily Drills (J. F. Hill & Co., 1937) · I Long Note Drills · Do mayor escrito, 8/4
SET('schlossberg:0:0',{notas:"{mf}1/2_ 1/2_ 1/1> | 7,/2_ 7,/2_ 7,/1> | b7,/2_ b7,/2_ b7,/1> | 6,/2_ 6,/2_ 6,/1> | b6,/2_ b6,/2_ b6,/1> | 5,/2_ 5,/2_ 5,/1> | b5,/2_ b5,/2_ b5,/1> | 5/2_ 5/2_ 5/1> | b5/2_ b5/2_ b5/1> | 4/2_ 4/2_ 4/1> | 3/2_ 3/2_ 3/1> | b3/2_ b3/2_ b3/1> | 2/2_ 2/2_ 2/1> | b2/2_ b2/2_ b2/1> | 1'/2_ 1'/2_ 1'/1> | 7/2_ 7/2_ 7/1> | b7/2_ b7/2_ b7/1> | 6/2_ 6/2_ 6/1> | b6/2_ b6/2_ b6/1> | 5/2_ 5/2_ 5/1> | b5/2_ b5/2_ b5/1>",tip:'Muy lento. Cromático descendente desde Do4, Sol4 y Do5: dos blancas con tenuto y una redonda acentuada con calderón; respira en cada compás.'});
SET('schlossberg:0:1',{notas:"{p}5/2_ 5/2_ 5/1<> | #4/2_ #4/2_ #4/1<> | 4/2_ 4/2_ 4/1<> | 3/2_ 3/2_ 3/1<> | b3/2_ b3/2_ b3/1<> | 2/2_ 2/2_ 2/1<> | b2/2_ b2/2_ b2/1<> | 1'/2_ 1'/2_ 1'/1<> | 7/2_ 7/2_ 7/1<> | b7/2_ b7/2_ b7/1<> | 6/2_ 6/2_ 6/1<> | b6/2_ b6/2_ b6/1<> | 5/2_ 5/2_ 5/1<> | b5/2_ b5/2_ b5/1<> | 1/2_ 1/2_ 1/1<> | 7,/2_ 7,/2_ 7,/1<> | b7,/2_ b7,/2_ b7,/1<> | 6,/2_ 6,/2_ 6,/1<> | b6,/2_ b6,/2_ b6,/1<> | 5,/2_ 5,/2_ 5,/1<> | b5,/2_ b5,/2_ b5,/1<>",tip:'Muy lento y en p, con regulador en la redonda. Las mismas series que el ejercicio 1, empezando por Sol4.'});
return L})();
if(typeof module!=='undefined'&&typeof window==='undefined')module.exports=METODOS;
