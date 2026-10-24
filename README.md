# Rumbo Colombia — Portal turístico

Trabajo práctico de **Herramientas de Programación III**: portal web temático de 5 páginas con HTML5, CSS3, JavaScript y Bootstrap 5.

## Estructura

```
mi-portal/
├── index.html          Inicio (hero, accesos rápidos, 6 cards)
├── informacion.html    Regiones, rutas, consejos, FAQ
├── galeria.html        8 imágenes (figure/figcaption), video con subtítulos
├── tabla.html          Tabla con thead, tbody, tfoot (6 filas x 5 columnas)
├── contacto.html       Formulario con validación en JavaScript
├── css/style.css       Estilos propios con variables :root
├── js/script.js        Validación del formulario y visor de galería
├── img/                Las fotografías provienen de bancos de imágenes de uso libre y el logo
└── media/              Video, subtítulos (.vtt) y póster
```

## Cumplimiento de la guía

| Requisito | Dónde |
|---|---|
| 5 páginas enlazadas con navbar común | Todas las páginas |
| Etiquetas semánticas (header, nav, main, section, article, aside, footer) | Todas las páginas |
| Metadatos (charset, viewport, description, keywords, author, og:title, og:description) | `<head>` de cada página |
| `alt` en todas las imágenes y `lang="es"` | Todas las páginas |
| style.css con variables `:root` | `css/style.css` |
| Bootstrap 5 (CDN), navbar, cards, grid, accordion, modal | Todas las páginas |
| Flexbox / CSS Grid | Accesos rápidos y pie (Flexbox); galería (Grid) |
| Validación JS: nombre ≥ 3, email válido, mensaje ≥ 20, select y checkbox obligatorios | `contacto.html` + `js/script.js` |
| Mensajes de error/éxito sin `alert()` | Bloques `.invalid-feedback` y `#resultado` |
| 6+ imágenes en la galería | `galeria.html` (8) |
| Video con controles y subtítulos | `galeria.html` (`<video>` + `<track>`) |
| Tabla con thead/tbody/tfoot, 5+ filas, 4+ columnas | `tabla.html` |
| 6+ cards de Bootstrap | `index.html` (6) y `informacion.html` (3) |

