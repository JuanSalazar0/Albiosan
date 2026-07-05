# Albiosan — Landing page

Landing page de una sola página para **Albiosan**, plata coloidal estable de grado alimenticio
(desde 1992) para purificar agua y desinfectar frutas, verduras, carnes y mariscos.

Construida con **HTML + CSS + JavaScript puro**, sin dependencias ni paso de build.

## Estructura

```
index.html            Toda la página (header, hero, cómo funciona, usos, modo de empleo,
                      presentaciones, distribuidores, contacto, footer)
assets/css/style.css  Sistema de diseño: variables de color, tipografía, layout y responsive
assets/js/main.js     Nav sticky, menú móvil, reveals al scroll, contadores, ripple y formulario
assets/img/           favicon.svg (y aquí van tus imágenes reales)
```

## Ver en local

No requiere build. Abre `index.html` directamente, o levanta un servidor:

```bash
python3 -m http.server 8080
# luego abre http://localhost:8080
```

## Personalización rápida

Busca los comentarios `REEMPLAZAR:` en el código. Los principales:

| Qué cambiar | Dónde |
|---|---|
| **Número de WhatsApp** | `52XXXXXXXXXX` en `index.html` (varios enlaces `wa.me`) y la constante `WHATSAPP` en `assets/js/main.js` |
| **Correo de contacto** | `ventas@albiosan.com` en `index.html` (sección Contacto y footer) |
| **Logo** | Bloque `.brand-mark` en el header de `index.html` (hoy es un SVG placeholder) |
| **Fotos del producto** | El frasco es un SVG a medida en el hero; sustitúyelo por foto real si la tienes |
| **Colores de marca** | Un solo bloque de variables en `:root` al inicio de `assets/css/style.css` |
| **Distribuidores reales** | Sección `#distribuidores` en `index.html` |
| **Dosis por uso** | Etiquetas `.uso-dose` en la sección de Usos (son guía; ajusta a tu etiqueta oficial) |
| **Imagen para compartir (OG)** | Meta `og:image` en `<head>` — agrega `assets/img/og-cover.jpg` (1200×630) |

### Colores actuales

```css
--plata: #C4CDD5;   /* plata coloidal / detalles metálicos */
--aqua:  #0E7C9B;   /* color primario (agua purificada) */
--verde: #3FA66A;   /* frescura de frutas y verduras */
--carbon:#16232B;   /* texto */
```

Estos son una aproximación al nicho porque el sitio oficial no fue accesible al construir.
Sustitúyelos por los hex exactos de la marca cuando los tengas.

## El formulario de contacto

No usa backend: al enviar, arma un mensaje de WhatsApp con los datos capturados y abre el chat.
Si prefieres correo o un backend real (Formspree, Netlify Forms, etc.), se ajusta en
`assets/js/main.js`.

## Despliegue

Al ser estático, funciona en cualquier hosting:

- **Vercel / Netlify**: arrastra la carpeta o conecta el repo (sin configuración de build).
- **GitHub Pages**: activa Pages sobre esta rama.

## Accesibilidad y rendimiento

- HTML semántico, contraste AA, navegación por teclado y `skip-link`.
- Respeta `prefers-reduced-motion` (desactiva animaciones).
- Sin JS de terceros; las fuentes se cargan desde Google Fonts (puedes autoalojarlas para uso offline).
