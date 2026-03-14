# SKILL: Schema.org — conveniodefarmacia.com

## Objetivo
Implementar datos estructurados JSON-LD correctos para mejorar la visibilidad en Google (featured snippets, rich results) y superar a farmaceando.com en SERP.

---

## Ubicación en el HTML

Todos los bloques `<script type="application/ld+json">` van dentro del `<head>` del `index.html`, antes del cierre `</head>`.

```html
<head>
  <!-- ... meta tags ... -->
  
  <!-- Schema: WebSite -->
  <script type="application/ld+json">{ ... }</script>
  
  <!-- Schema: WebApplication -->
  <script type="application/ld+json">{ ... }</script>
  
  <!-- Schema: FAQPage -->
  <script type="application/ld+json">{ ... }</script>
  
  <!-- Schema: Organization -->
  <script type="application/ld+json">{ ... }</script>
</head>
```

Usar **un bloque separado por tipo** de schema — más fácil de mantener y validar.

---

## Schemas implementados

### 1. WebSite (para sitelinks y searchbox)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Convenio de Farmacia",
  "url": "https://conveniodefarmacia.com/",
  "description": "Calculadora de nómina, finiquito y herramientas laborales para el sector farmacéutico español. XXV Convenio + convenios provinciales.",
  "inLanguage": "es-ES"
}
```

---

### 2. WebApplication (para la calculadora)
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Sueldo Farmacia Pro 2026",
  "url": "https://conveniodefarmacia.com/",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "browserRequirements": "Requires JavaScript",
  "inLanguage": "es-ES",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Calculadora profesional de sueldo neto, finiquito y herramientas laborales para farmacéuticos, técnicos y auxiliares de farmacia. Actualizada con tablas salariales 2026.",
  "creator": {
    "@type": "Person",
    "name": "Antonio",
    "jobTitle": "Farmacéutico y Programador"
  }
}
```

---

### 3. FAQPage (CRÍTICO para featured snippets)

Este schema debe mantenerse **sincronizado** con los `<details>/<summary>` visibles en la página. Si añades un FAQ al HTML, añádelo también aquí.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué conceptos incluye el sueldo base en farmacia 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Según el XXV Convenio Colectivo Nacional, el sueldo base incluye: salario base por categoría profesional, plus de facultativo (solo farmacéuticos/as), plus de convenio provincial si aplica, complemento de antigüedad (trienios o quinquenios), nocturnidad por horas trabajadas entre las 22:00 y las 06:00, y mejoras voluntarias pactadas con la empresa."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo se calculan las horas nocturnas en farmacia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La nocturnidad se abona por cada hora trabajada entre las 22:00 y las 06:00. El valor por hora en 2026 es: Farmacéutico/a Nacional 2,66 €/hora, Técnico/a Nacional 1,83 €/hora, Auxiliar Nacional 1,80 €/hora. Importante: la nocturnidad no se incluye en las pagas extras y en jornada parcial se paga el precio/hora completo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es el MEI que aparece en mi nómina?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El MEI (Mecanismo de Equidad Intergeneracional) es una cotización adicional a la Seguridad Social introducida en 2023. En 2026 el trabajador aporta el 0,13% y la empresa el 0,52% de la base de cotización."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la diferencia entre 12, 14 y 15 pagas en farmacia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Con 12 pagas las extras se prorratean mensualmente. Con 14 pagas (el más común) se cobran 2 pagas extras en junio y diciembre. Con 15 pagas (Asturias) hay 3 pagas extras al año: marzo, junio y diciembre. El bruto anual es idéntico en todos los casos, solo cambia cómo se distribuye."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué son los trienios en farmacia y cómo se calculan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los trienios son un complemento de antigüedad que se cobra por cada 3 años trabajados en la misma empresa. Es un importe fijo mensual que sí se incluye en las pagas extras. La antigüedad se cuenta desde la fecha de alta en la empresa, no desde que se trabaja en el sector."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto me corresponde de finiquito por despido improcedente en farmacia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En un despido improcedente la indemnización es de 33 días de salario por año trabajado con un máximo de 24 mensualidades. La fórmula es: (salario anual bruto ÷ 365) × 33 × años trabajados. Para contratos anteriores al 12 de febrero de 2012 existe un régimen transitorio con 45 días/año para el tramo previo. La indemnización está exenta de IRPF hasta el límite legal."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué incluye un finiquito completo en farmacia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un finiquito completo incluye: indemnización por despido si procede, vacaciones no disfrutadas (30 días naturales/año en proporción al tiempo trabajado), parte proporcional del mes en curso y prorrata de pagas extras pendientes. La indemnización está exenta de IRPF hasta el límite legal; el resto de conceptos tributan como rendimiento del trabajo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto cobra un farmacéutico en Bizkaia en 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un farmacéutico/a en Bizkaia cobra 2.548,98 € brutos al mes en 2026, uno de los salarios más altos de España para este sector. El convenio de Bizkaia (AUXFARBI) supera al Convenio Nacional, donde el salario base del farmacéutico es de 2.223,37 € más el plus de facultativo de 91,49 €."
      }
    }
  ]
}
```

---

### 4. Organization
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Convenio de Farmacia",
  "url": "https://conveniodefarmacia.com/",
  "logo": "https://conveniodefarmacia.com/IMG_9941.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "availableLanguage": "Spanish"
  }
}
```

---

## Validación

Después de añadir o modificar cualquier schema:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
   - Pegar la URL de producción o el código HTML
   - Verificar que no hay errores en FAQPage ni WebApplication

2. **Schema.org Validator**: https://validator.schema.org/
   - Pegar el JSON directamente para validar la sintaxis

3. **Errores comunes a evitar**:
   - `name` de la FAQ no coincide exactamente con el texto del `<summary>` visible
   - Respuestas de FAQ con HTML dentro del `text` (no se permite — solo texto plano)
   - Olvidar actualizar el JSON-LD cuando se añade un FAQ al HTML visible

---

## Mantenimiento del FAQPage schema

### Cuando se añade una FAQ nueva al HTML:
1. Añadir la entrada correspondiente al array `mainEntity` del FAQPage JSON-LD
2. El campo `name` debe ser exactamente la misma pregunta que en el `<summary>`
3. El campo `text` del `acceptedAnswer` debe ser texto plano (sin HTML)
4. Validar en Rich Results Test

### Cuando se modifica una FAQ existente:
1. Actualizar tanto el HTML visible como el JSON-LD
2. Son dos sitios distintos — es fácil olvidar uno de los dos

### Cuando se elimina una FAQ:
1. Eliminar también la entrada del JSON-LD

---

## Breadcrumbs (si se crean páginas adicionales)

Si en el futuro se crean páginas como `/finiquito-farmacia` o `/convenio-bizkaia`, añadir BreadcrumbList:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://conveniodefarmacia.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Calculadora Finiquito Farmacia",
      "item": "https://conveniodefarmacia.com/finiquito-farmacia"
    }
  ]
}
```
