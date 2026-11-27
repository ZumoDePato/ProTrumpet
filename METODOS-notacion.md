# Brasso · Métodos: cómo se transcribe un ejercicio

Los ejercicios están en `metodos.js` (en el código fuente de Brasso). Cada uno se guarda **por grado de la escala**, no con notas fijas, para poder transportarlo a cualquier tonalidad y escala. Las notas se pasan **una a una desde el PDF de la edición original** (IMSLP); nunca se inventan.

## Campos de cada ejercicio
| Campo | Qué es | Ejemplo |
|---|---|---|
| `t` | Título tal como sale en el libro | `'Estudio 1'` |
| `notas` | Las notas (vacío = «Pendiente») | ver abajo |
| `c` | Compás | `'4/4'`, `'3/4'`, `'6/8'`, `'2/4'` |
| `tono` | Tónica original (escrita, trompeta en Si♭) | `'C'`, `'F'`, `'Bb'`, `'F#'` |
| `modo` | Escala original | `'mayor'`, `'menor'`, `'armonica'`, `'melodica'`, `'dorica'`… |
| `tipo` | `'patron'` (cambia de tonalidad **y** escala) o `'estudio'` (solo de tonalidad) | |

## Notación de `notas`
Tokens separados por espacios:

| Escribe | Significa |
|---|---|
| `1` … `7` | grado de la escala (1 = tónica) |
| `'` / `,` | una octava arriba / abajo (se pueden repetir: `1''`) |
| `#` `b` `##` `bb` | alteración **respecto a la escala** (en Do mayor, `#4` = Fa♯) |
| `/1 /2 /4 /8 /16` | redonda, blanca, negra, corchea, semicorchea |
| `.` | con puntillo (`/4.`) |
| `t` | tresillo (`/8t`) |
| `r/4` | silencio |
| `(` … `)` | ligadura de expresión (va pegada a la primera y a la última nota) |
| `~` | ligadura de prolongación con la nota siguiente |
| `>` `!` `_` | acento, staccato, tenuto (al final de la nota) |
| `{mf}` | matiz para la nota siguiente (`{p}`, `{f}`…) |
| `\|` | barra de compás: la app comprueba que cada compás cuadre |

Ejemplo (Do mayor, 4/4): `(1/16 2/16 3/16 4/16 5/16 4/16 3/16 2/16) | 1/2 r/2`

La app coloca sola cada ejercicio en el registro de la trompeta (escrito, de Fa♯3 a Do6), escribe bien sostenidos, bemoles y armadura, y avisa con «⚠ revisar» si un compás no cuadra.

## Catálogo
Solo obras de dominio público y ediciones originales. **No incluir:** Stamp, Colin, Irons, Vizzutti, Thompson, Getchell. En la app aparece siempre «Basado en [autor], [obra] ([año])».
