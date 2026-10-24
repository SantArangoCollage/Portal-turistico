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
├── img/                Ilustraciones originales y logo
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

## Cómo verlo en tu computador

Abre `index.html` con doble clic, o en VS Code usa la extensión **Live Server**.

## Cómo publicarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `portal-turistico`).
2. Sube **el contenido** de esta carpeta a la raíz del repositorio (que `index.html` quede en la raíz):
   ```bash
   git init
   git add .
   git commit -m "Portal turístico"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/portal-turistico.git
   git push -u origin main
   ```
3. En GitHub ve a **Settings → Pages**, en *Build and deployment* elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`, y guarda.
4. Espera 1–2 minutos. Tu sitio quedará en `https://TU_USUARIO.github.io/portal-turistico/`.

Alternativa: arrastra la carpeta a [Netlify Drop](https://app.netlify.com/drop).

## Antes de entregar

- Cambia el autor en `<meta name="author">` si quieres poner tu nombre completo (está como "Santiago").
- Valida cada página en <https://validator.w3.org/> (la guía pide cero errores).
- Prueba el sitio publicado en el celular y revisa que carguen imágenes, video y estilos.
- Los precios de la tabla y el correo de contacto son de ejemplo.
