# CLAUDE.md — conveniodefarmacia.com

## 🎯 Objetivo del proyecto

**conveniodefarmacia.com** es la calculadora de nómina y derecho laboral farmacéutico más completa y precisa de España. Creada por Antonio (farmacéutico y programador).

**Competidor principal a batir:** farmaceando.com — mejor posicionada en SEO actualmente, pero técnica y contenidamente inferior. Toda mejora debe tener en mente superar su posicionamiento.

---

## 🏗️ Arquitectura y stack

### Frontend (conveniodefarmacia.com)
- HTML5 puro + CSS3 + JavaScript vanilla (sin frameworks)
- Un único `index.html` + `style.css` + `app.js` (o `script.js`)
- Despliegue: **Cloudflare** (CDN + proxy) + **Vercel** (hosting)
- Imagen logo: `IMG_9941.png`
- Política de privacidad: `privacidad.html`
- Formulario de contacto: Formspree (`https://formspree.io/f/mlgpgkwv`)

### Backend separado — `nominafarmacia`
- **Node.js** con **Prisma ORM** y **PostgreSQL**
- Proyecto distinto al frontend; no mezclar archivos

---

## 📁 Estructura de archivos frontend

```
/
├── index.html          # App completa (single-page)
├── style.css           # Estilos
├── app.js              # Lógica calculadoras (o script.js)
├── privacidad.html     # Aviso legal y privacidad
└── IMG_9941.png        # Logo "Sueldo Farmacia Pro"
```

---

## 🏥 Dominio — Convenio de Farmacia (conocimiento crítico)

### Convenios disponibles
| Convenio | Observaciones |
|---|---|
| Nacional (XXV Convenio) | Base para toda España |
| Barcelona | Anulado; aplica Nacional desde ene-2025 |
| Girona / Tarragona / Lleida | Convenio provincial conjunto |
| Bizkaia | Uno de los salarios más altos de España |
| Gipuzkoa | Convenio provincial propio |
| Álava | Rige el Nacional (sin convenio propio) |
| Asturias | 15 pagas + quinquenios en vez de trienios |

### Tablas salariales 2026 (BOE-A-2026-4220)
| Categoría | Salario base mensual |
|---|---|
| Farmacéutico/a Nacional | 2.223,37 € + Plus Facultativo 91,49 € |
| Técnico/a Nacional | 1.507,26 € |
| Auxiliar Nacional | 1.370,64 € |
| Farmacéutico/a Bizkaia | 2.548,98 € |

### Cotizaciones SS 2026 (trabajador)
- Contingencias Comunes: **4,70%**
- Desempleo: **1,55%**
- Formación Profesional: **0,10%**
- MEI (Mecanismo Equidad Intergeneracional): **0,13%**
- **Total: 6,48%**

### Jornada
- Máximo convenio: **1.785 h/año**
- Farmacia abierta todos los días: **37,5 h/semana** (equivalente)
- Farmacia que cierra domingos y 12 festivos: **39,5 h/semana** (equivalente)
- ⚠️ Las 1.785 h/año son las mismas en ambos casos; lo que varía son las semanas efectivas

### Nocturnidad
- Horario nocturno: 22:00 a 06:00
- Farmacéutico/a Nacional: 2,66 €/hora
- Técnico/a Nacional: 1,83 €/hora
- Auxiliar Nacional: 1,80 €/hora
- ⚠️ La nocturnidad NO entra en pagas extras
- ⚠️ En jornada parcial, la nocturnidad NO se proratea

### Trienios / Quinquenios
- Trienios: cada 3 años en la misma empresa (convenio nacional)
- Quinquenios (Asturias): cada 5 años = 5% salario base
- ⚠️ Se cuentan desde la fecha de alta en empresa, NO desde que se trabaja en el sector

### Incapacidad Temporal (IT) — Enfermedad común
- Días 1-3: 0%
- Días 4-20: 60% base reguladora
- Día 21+: 75% base reguladora
- Complemento al 100% (art. 47 XXV Convenio): solo con hospitalización o enfermedad grave, máx. 6 meses

### Maternidad / Paternidad
- Duración: 16 semanas
- Prestación: 100% base reguladora
- Lo paga el INSS, no la empresa
- **Exento de IRPF** (STS 2018 + art. 7 LIRPF)

### Despido e indemnizaciones
| Tipo | Indemnización | Tope |
|---|---|---|
| Disciplinario | Sin indemnización | — |
| Objetivo (art. 52 ET) | 20 días/año | 12 mensualidades |
| Improcedente | 33 días/año | 24 mensualidades |
- Contratos anteriores al 12/02/2012: régimen transitorio 45 días/año (tope 42 mens. para el tramo previo)
- Fórmula: `(Bruto anual ÷ 365) × días/año × años trabajados`
- La indemnización está **exenta de IRPF** hasta el límite legal

### Vacaciones
- 30 días naturales/año según convenio
- Valor diario: `salario anual bruto ÷ 365`

---

## ⚠️ Bugs conocidos y lecciones aprendidas (NO REPETIR)

### 1. Bug `initHorasAnuales()` — horas semanales incorrectas
**Problema:** Calculaba 37,41 h/semana en vez de 37,5.  
**Solución:** Hardcodear `37.5` (o `39.5`) según el tipo de apertura; NO calcularlo dinámicamente.  
**Función clave:** `getConfigJornada()` y `actualizarPlaceholderSemana()`.

### 2. Bug `actualizarJornadaHint()` — decimales en horas
**Solución:** Siempre usar `.toFixed(1)` al mostrar horas semanales equivalentes.

### 3. Monkey-patch roto en `calcularSalario()`
**Problema:** Existía un patrón monkey-patch que rompía el strict mode.  
**Solución:** Fusionar la lógica directamente en `calcularSalario()`, sin monkey-patching.

### 4. Años bisiestos
**Función necesaria:** `diasEnAnio(year)` — devuelve 365 o 366 según el año.  
**Usar siempre** en cálculos de finiquito y vacaciones donde se divida por días del año.

### 5. Cloudflare — HTML truncado
**Síntoma:** El HTML aparece cortado, eliminando el cierre `</script>` o la referencia al JS.  
**Causa:** Cloudflare puede truncar HTML en ciertos tamaños.  
**Solución:** Strip del `<script` truncado + re-añadir la referencia correcta al script. Verificar siempre el source en producción tras deploy.

### 6. Prisma — columnas NOT NULL en tablas con datos existentes (`nominafarmacia`)
**Síntoma:** Error en migración al añadir columnas no nulables.  
**Solución:** Usar `--create-only` + añadir manualmente `DEFAULT 0` al SQL generado antes de aplicar.  
**Columnas afectadas en el pasado:** `at_base`, `irpf_base`, `ss_base`, `at_ep_company`.

---

## 🚀 Workflow de despliegue

1. Desarrollar y probar en local
2. Push a GitHub
3. Vercel recoge el push automáticamente
4. Cloudflare sirve desde Vercel vía proxy
5. **Verificar SIEMPRE** el HTML fuente en producción (riesgo de truncado Cloudflare)
6. Si hay problema de caché: purgar en el dashboard de Cloudflare

---

## 🔍 SEO — Estrategia para superar a farmaceando.com

### Estado actual
- farmaceando.com supera en posicionamiento pese a ser técnica y contenidamente inferior
- conveniodefarmacia.com tiene contenido de mayor calidad y precisión

### Keywords objetivo principales
- `calculadora sueldo farmacia`
- `convenio farmacia 2026`
- `sueldo neto farmacéutico`
- `finiquito farmacia`
- `nómina auxiliar farmacia`
- `calculadora finiquito farmacia`
- `trienios farmacia`
- `horas nocturnas farmacia`

### Acciones SEO prioritarias

**Técnico:**
- Core Web Vitals: asegurar LCP < 2,5s, CLS < 0,1, FID < 100ms
- Meta tags: `<title>` y `<meta description>` únicos y con keywords principales
- Open Graph + Twitter Card para compartibilidad
- Schema.org: `FAQPage` (para el bloque de preguntas frecuentes), `WebApplication`
- Canonical URL explícita
- Sitemap.xml y robots.txt correctos
- HTTPS + headers de seguridad (ya lo da Cloudflare)

**Contenido:**
- Los FAQ ya existentes son un activo SEO enorme — mantenerlos y ampliarlos
- Añadir contenido fresco periódicamente (actualizaciones de tablas, nuevas herramientas)
- Textos de intro con keywords naturales antes del primer fold
- `<h1>` único y descriptivo con keyword principal
- URLs de páginas adicionales limpias y descriptivas (ej: `/finiquito-farmacia`, `/convenio-bizkaia`)

**Autoridad / linkbuilding:**
- Enlazar fuentes oficiales (BOE) — ya se hace ✓
- Buscar menciones en foros de farmacéuticos, grupos Facebook/WhatsApp del sector
- Considerar artículos de blog en el dominio sobre temas laborales de farmacia

**UX (señal indirecta de SEO):**
- Bounce rate bajo = buen contenido → trabajar en que el usuario interactúe con la calculadora
- Tiempo en página: más herramientas = más tiempo
- Mobile-first: verificar experiencia móvil regularmente

---

## 🛠️ Herramientas / Calculadoras del sitio

### Actuales (mantener y mejorar)
1. **Nómina mensual** — calculadora principal
2. **Calculadora inversa** bruto → neto deseado
3. **Conversor jornada** — % ↔ horas, contratos temporales
4. **Estimador IRPF orientativo** (tablas AEAT)
5. **Calculadora otro sector** — cualquier convenio
6. **Calculadora atrasos** — subidas del 2% no aplicadas
7. **Simulador nuevo convenio** — proyectar subidas futuras
8. **Finiquito completo** — indemnización + vacaciones + prorrata
9. **Calculadora vacaciones** — días generados y valor económico
10. **Estimador pensión jubilación** SS 2026
11. **IT (baja por enfermedad)**
12. **Permiso maternidad/paternidad**

### Ideas de nuevas herramientas con potencial SEO
- Calculadora de **coste empresa** (lo que paga la empresa realmente)
- Simulador de **jornada reducida por guarda legal**
- Comparador de **sueldo entre convenios provinciales**
- Calculadora de **horas extra** (valor y cotización)

---

## ✍️ Convenciones de código

### JavaScript
- Código en español (nombres de funciones, variables, comentarios)
- Sin frameworks — vanilla JS puro
- Strict mode compatible (sin monkey-patching)
- Usar `const` y `let`, nunca `var`
- Formatear moneda: `toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })`
- Formatear porcentajes con `.toFixed(1)` o `.toFixed(2)` según contexto
- Función `diasEnAnio(year)` siempre disponible para cálculos de finiquito/vacaciones

### HTML
- Semántico: usar `<section>`, `<article>`, `<details>`, `<summary>` donde corresponda
- FAQs con `<details>/<summary>` para schema FAQPage y UX
- Un solo `<h1>` por página
- Atributos `alt` descriptivos en imágenes

### CSS
- Mobile-first
- Sin frameworks externos; CSS nativo

---

## 🔑 Variables y datos clave hardcodeados

```javascript
// Jornada
const HORAS_ANUALES = 1785;
const HORAS_SEMANA_ABIERTA = 37.5;    // farmacia abierta 365 días
const HORAS_SEMANA_CERRADA = 39.5;    // cierra domingos y 12 festivos

// Cotizaciones SS trabajador 2026
const CC_TRABAJADOR = 0.0470;
const DESEMPLEO_TRABAJADOR = 0.0155;
const FP_TRABAJADOR = 0.0010;
const MEI_TRABAJADOR = 0.0013;
const TOTAL_SS_TRABAJADOR = 0.0648;

// Vacaciones
const DIAS_VACACIONES_ANIO = 30; // días naturales
```

---

## 📋 Fuentes oficiales

| Documento | URL |
|---|---|
| XXV Convenio Nacional | https://www.boe.es/buscar/doc.php?id=BOE-A-2022-23018 |
| Tablas salariales 2025-2026 | https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-4220 |
| Convenio Asturias | https://afastur.com/wp-content/uploads/2023/11/70146.pdf |
| Convenio Bizkaia | https://www.auxfarbi.com/convenio/ |
| Convenio Gipuzkoa | https://partehartu.cofgipuzkoa.eus/media/... |

---

## 📞 Contacto / Formularios

- Formulario Formspree: `https://formspree.io/f/mlgpgkwv`
- ⚠️ NO usar email obfuscado de Cloudflare (causó problemas anteriormente)

---

## 🧠 Skills disponibles

> Leer el archivo SKILL correspondiente antes de cada tarea del tipo indicado.

| Skill | Cuándo usarla |
|---|---|
| `skills/seo.md` | Al añadir/modificar contenido, meta tags, schema, estructura HTML |
| `skills/calculadora-js.md` | Al crear o modificar cualquier función de cálculo en app.js |
| `skills/deploy-cloudflare-vercel.md` | Antes de cualquier deploy o tras errores en producción |
| `skills/contenido-faq.md` | Al añadir nuevas preguntas frecuentes o contenido informativo |
| `skills/schema-org.md` | Al implementar o modificar datos estructurados JSON-LD |

---

## ❌ Qué NO hacer

- No usar frameworks JS (React, Vue, etc.) — es una decisión consciente de rendimiento y simplicidad
- No monkey-patching de funciones existentes
- No calcular horas semanales dinámicamente desde días/año (usar constantes hardcodeadas)
- No poner emails directamente en HTML (usar Formspree)
- No hacer cambios en Prisma sin revisar tablas con datos existentes primero
- No ignorar el source HTML en producción después de cada deploy (truncado Cloudflare)
- No copiar contenido de farmaceando.com ni de otras webs
