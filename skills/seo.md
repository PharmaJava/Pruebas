# SKILL: SEO — conveniodefarmacia.com

## Objetivo
Mejorar el posicionamiento de conveniodefarmacia.com para superar a farmaceando.com en las keywords del sector farmacéutico laboral.

---

## Checklist antes de publicar cualquier cambio de contenido

### Meta tags (en `<head>`)
```html
<title>Calculadora Sueldo Farmacia 2026 | Neto Real + Finiquito | conveniodefarmacia.com</title>
<meta name="description" content="Calculadora de nómina y finiquito para farmacéuticos, técnicos y auxiliares de farmacia. XXV Convenio + provinciales. Actualizada 2026.">
<link rel="canonical" href="https://conveniodefarmacia.com/">
```

**Reglas:**
- `<title>` entre 50-60 caracteres, keyword principal al inicio
- `<meta description>` entre 140-160 caracteres, con keyword + propuesta de valor + año
- Canonical SIEMPRE presente

### Open Graph (redes sociales y compartibilidad)
```html
<meta property="og:title" content="Calculadora Sueldo Farmacia 2026">
<meta property="og:description" content="Calcula tu neto real según el XXV Convenio + convenios provinciales.">
<meta property="og:url" content="https://conveniodefarmacia.com/">
<meta property="og:type" content="website">
<meta property="og:image" content="https://conveniodefarmacia.com/IMG_9941.png">
<meta name="twitter:card" content="summary_large_image">
```

---

## Schema.org (datos estructurados JSON-LD)

### FAQPage — para el bloque de preguntas frecuentes
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué conceptos incluye el sueldo base en farmacia 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Según el XXV Convenio Colectivo Nacional incluye: salario base por categoría, plus de facultativo (farmacéuticos), trienios, nocturnidad y mejoras voluntarias."
      }
    }
    // ... una entrada por cada FAQ visible en la página
  ]
}
</script>
```

### WebApplication — para la calculadora
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Sueldo Farmacia Pro 2026",
  "url": "https://conveniodefarmacia.com/",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Calculadora de nómina, finiquito y herramientas laborales para el sector farmacéutico."
}
</script>
```

---

## Estructura HTML semántica

### Jerarquía de headings
- `<h1>` — UNO solo por página. Ej: "Sueldo Farmacia Pro — Calculadora Multiconvenio 2026"
- `<h2>` — Secciones principales (Nómina, Finiquito, Herramientas...)
- `<h3>` — Subsecciones dentro de cada calculadora
- Los bloques de FAQ informativos al pie de página deben tener `<h2>` propio

### FAQs semánticas
```html
<section aria-label="Preguntas frecuentes">
  <h2>Preguntas frecuentes sobre el sueldo en farmacia 2026</h2>
  <details>
    <summary>¿Qué conceptos incluye el sueldo base en 2026?</summary>
    <p>Respuesta completa...</p>
  </details>
</section>
```
Usar `<details>/<summary>` por defecto — genera mejor UX y es compatible con FAQPage schema.

---

## Keywords objetivo — densidad y ubicación

### Tier 1 (máxima prioridad — incluir en h1, title, description)
- `calculadora sueldo farmacia`
- `convenio farmacia 2026`
- `nómina farmacéutico`

### Tier 2 (incluir en h2, intro de sección, FAQs)
- `sueldo neto farmacéutico 2026`
- `calculadora finiquito farmacia`
- `auxiliar farmacia sueldo`
- `técnico farmacia nómina`
- `trienios farmacia`
- `horas nocturnas farmacia`
- `XXV convenio farmacia`

### Tier 3 (long tail — incluir en FAQs, texto de cuerpo)
- `convenio farmacia Bizkaia sueldo`
- `calculadora IT farmacia baja enfermedad`
- `finiquito improcedente farmacia`
- `convenio farmacia Asturias 15 pagas`
- `MEI nómina farmacia`
- `sueldo farmacia 2026 bruto neto`

### Reglas de uso
- Evitar keyword stuffing (máximo 2-3 menciones de la keyword principal por bloque de texto)
- Keywords siempre en contexto natural, nunca forzadas
- El año (`2026`) es una keyword importante — incluir en title, h1, h2 y description

---

## Core Web Vitals — objetivos

| Métrica | Objetivo | Cómo conseguirlo |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2,5s | Optimizar IMG_9941.png, lazy load donde posible |
| CLS (Cumulative Layout Shift) | < 0,1 | Reservar espacio para imagen con width/height en HTML |
| FID / INP | < 100ms | Evitar JS bloqueante, diferir scripts no críticos |

### Optimización de imagen
```html
<!-- Siempre incluir width, height y loading -->
<img src="IMG_9941.png" 
     alt="Sueldo Farmacia Pro — Calculadora de nómina farmacia 2026" 
     width="120" height="120" 
     loading="eager">
```

---

## Sitemap y robots

### sitemap.xml mínimo
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://conveniodefarmacia.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://conveniodefarmacia.com/privacidad.html</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

### robots.txt mínimo
```
User-agent: *
Allow: /
Sitemap: https://conveniodefarmacia.com/sitemap.xml
```

---

## Análisis de competencia — farmaceando.com

Cuando se añada contenido nuevo, hacer este análisis previo:
1. Buscar en Google la keyword objetivo
2. Ver qué tiene farmaceando.com que no tenemos
3. Crear contenido más completo, preciso y actualizado que el suyo
4. Añadir datos oficiales (BOE) que ellos no enlazan o no tienen

**Ventajas a explotar frente a farmaceando.com:**
- Datos siempre actualizados con fuente oficial (BOE)
- Más convenios provinciales cubiertos
- Herramientas más completas (IT, maternidad, pensión, atrasos...)
- Creado por un farmacéutico real → autoridad y precisión

---

## Arquitectura multi-página actual

### Páginas existentes (marzo 2026)
| URL | Title | Propósito |
|---|---|---|
| `/` | Convenio de Farmacia 2026 | Hub principal — enlaza a todo |
| `/calculadora-nomina` | Calculadora Nómina Farmacia 2026 | Calculadora principal |
| `/convenio-farmacia-2026` | Convenio Farmacia 2026 — Tablas Salariales | Contenido informativo + tablas |
| `/sobre-nosotros` | Sobre Nosotros | E-E-A-T / Autoría |
| `/contacto` | Contacto | Formulario Formspree |
| `/privacidad` | Aviso Legal y Privacidad | Legal |

### Páginas por crear (placeholder en sitemap)
| URL | Contenido planificado |
|---|---|
| `/finiquito-farmacia` | Calculadora finiquito + contenido SEO |
| `/nocturnidad-farmacia` | Info + calculadora nocturnidad |
| `/vacaciones-farmacia` | Info + calculadora vacaciones |
| `/baja-laboral-farmacia` | Info + calculadora IT |
| `/maternidad-paternidad-farmacia` | Info + calculadora maternidad |
| `/pension-jubilacion-farmacia` | Info + calculadora pensión |
| `/trienios-farmacia` | Info sobre antigüedad |
| `/blog/` | Artículos semanales |

### Componentes compartidos
- **Navegación**: `assets/js/components.js` → renderNav()
- **Footer**: `assets/js/components.js` → renderFooter()
- **Breadcrumbs**: `assets/js/components.js` → renderBreadcrumbs()
- **CTA**: `assets/js/components.js` → renderCTA()
- **CSS base**: `assets/css/shared.css`
- **Analytics**: GTM + Vercel Analytics + Vercel Speed Insights (via components.js)

### Internlinking — reglas
- Cada página DEBE enlazar a al menos 2-3 páginas hermanas con texto ancla descriptivo
- TODAS las páginas deben enlazar a la calculadora principal (`/calculadora-nomina`)
- Los FAQs deben incluir enlaces internos a las páginas relevantes
- Los breadcrumbs (automáticos) proporcionan estructura jerárquica
- El footer contiene enlaces a todas las secciones principales

### Al crear una nueva página
1. Crear el `.html` en la raíz del proyecto
2. Incluir `shared.css` + `components.js`
3. Añadir `<header id="main-nav">` + `<footer id="main-footer">`
4. Canonical URL propio (sin .html gracias a vercel.json cleanUrls)
5. Title único < 60 chars con keyword principal al inicio
6. Meta description única 140-160 chars
7. Schema JSON-LD (Article + FAQPage si hay preguntas)
8. Breadcrumbs con renderBreadcrumbs()
9. Añadir la URL al sitemap.xml
10. Añadir enlace en el footer (components.js → NAV_LINKS si procede)

---

## Lo que NO hay que hacer en SEO

- No duplicar contenido entre páginas
- No usar texto oculto o keyword stuffing
- No comprar backlinks
- No copiar texto de farmaceando.com ni de ninguna otra web
- No cambiar el `<title>` sin revisar el impacto en CTR
- No crear páginas sin contenido sustancial (thin content)
- No olvidar el canonical en cada página nueva
