# SKILL: Contenido y FAQ — conveniodefarmacia.com

## Objetivo
Añadir o actualizar preguntas frecuentes y contenido informativo de calidad que mejore el posicionamiento SEO y aporte valor real a los trabajadores de farmacia.

---

## Principios de contenido

1. **Precisión ante todo** — Antonio es farmacéutico. El contenido debe ser correcto al 100%. Si hay duda sobre un dato legal o salarial, citar la fuente oficial (BOE) o indicar que se debe consultar con un asesor laboral.

2. **Más completo que farmaceando.com** — Antes de escribir un FAQ o sección nueva, comprobar si farmaceando.com lo tiene. Nuestro contenido debe ser más detallado, más preciso y más actualizado.

3. **Lenguaje claro para el trabajador** — El lector objetivo es un auxiliar, técnico o farmacéutico que quiere entender su nómina. Sin tecnicismos innecesarios. Si se usa un término técnico, explicarlo brevemente.

4. **Siempre actualizado** — Incluir el año (`2026`) cuando sea relevante. Marcar qué datos son del BOE y cuándo se actualizaron.

---

## Estructura de un FAQ bien escrito

```html
<details>
  <summary>¿[Pregunta directa y con keyword]?</summary>
  <div>
    <p>[Respuesta directa en la primera frase — no dar rodeos]</p>
    <p>[Ampliar con contexto, ejemplos numéricos si aplica]</p>
    <p>⚠️ <strong>Importante:</strong> [Matiz o excepción relevante si la hay]</p>
  </div>
</details>
```

### Longitud ideal
- Pregunta: 50-100 caracteres (para que Google la muestre completa en featured snippets)
- Respuesta: 100-300 palabras. Suficiente para ser completa, sin ser un artículo.

---

## FAQs ya existentes (NO duplicar, sí mejorar)

| Pregunta | Estado |
|---|---|
| ¿Qué conceptos incluye el sueldo base en 2026? | ✓ Existe |
| ¿Cómo se calculan las horas nocturnas? | ✓ Existe |
| ¿Qué es el MEI? | ✓ Existe |
| ¿Diferencia entre 12, 14 y 15 pagas? | ✓ Existe |
| ¿Qué son los trienios y quinquenios? | ✓ Existe |
| ¿Qué convenios están disponibles? | ✓ Existe |
| ¿Qué es el Plus Ad Personam / CPG? | ✓ Existe |
| ¿Cómo funciona la jornada parcial? | ✓ Existe |
| ¿Cuánto subirá el sueldo en 2025 y 2026? | ✓ Existe |
| ¿Cuánto corresponde de finiquito si me despiden? | ✓ Existe |
| ¿Qué incluye un finiquito completo? | ✓ Existe |
| ¿Cómo se calcula la indemnización por despido improcedente? | ✓ Existe |
| ¿Cómo se calculan las vacaciones pendientes en el finiquito? | ✓ Existe |

---

## FAQs candidatas a añadir (con potencial SEO)

### Bloque nómina
- ¿Cuánto cobra un farmacéutico/a en Bizkaia en 2026?
- ¿Qué diferencia hay entre el convenio de Bizkaia y el Nacional?
- ¿Cómo funciona el complemento por antigüedad en Asturias (quinquenios)?
- ¿Puedo cobrar menos del salario mínimo del convenio? ¿Qué hacer si es así?
- ¿Cómo se calcula la base reguladora para la baja?
- ¿Qué es la base de cotización y en qué difiere del salario bruto?

### Bloque baja / IT
- ¿Cuánto cobro si me pongo de baja los primeros 3 días?
- ¿Qué es el complemento del art. 47 del convenio y cuándo se aplica?
- ¿Me cuentan los días de baja como cotizados?

### Bloque maternidad/paternidad
- ¿Cuánto cobro durante el permiso de paternidad/maternidad?
- ¿Por qué la prestación de maternidad está exenta de IRPF?
- ¿Puedo trabajar a tiempo parcial durante el permiso de maternidad?

### Bloque finiquito / despido
- ¿Puedo negociar la indemnización aunque sea disciplinario?
- ¿Qué ocurre con mi seguro médico si me despiden?
- ¿En qué plazo tengo que cobrar el finiquito?
- ¿Qué pasa si firmo el finiquito y luego me arrepiento?

### Bloque convenio / laboral
- ¿Cuándo entra en vigor el XXVI Convenio de Farmacia?
- ¿Qué ocurre si mi farmacia no aplica las tablas del convenio?
- ¿Puedo pedir inspección de trabajo si no me pagan el trienio?
- ¿Qué horas son consideradas nocturnas en farmacia?

---

## Plantilla para añadir un nuevo FAQ

Cuando se pida añadir una FAQ nueva:

1. **Identificar la keyword principal** que quiere capturar esa pregunta
2. **Redactar la pregunta** comenzando con interrogativo (¿Cuánto...?, ¿Qué...?, ¿Cómo...?)
3. **Primera frase de la respuesta**: respuesta directa y concisa
4. **Cuerpo**: contexto, datos oficiales, ejemplo numérico si aplica
5. **Matiz/excepción** si es relevante (con emoji ⚠️ para visibilidad)
6. **Fuente** si se cita un dato (BOE, ET, TGSS)
7. **Añadir al schema FAQPage** en el JSON-LD (ver skill SEO)

---

## Textos de sección — cómo escribirlos

Los bloques de texto descriptivo bajo la calculadora (no FAQs) deben seguir esta estructura:

```
### [H3 con keyword] — ejemplo: "Tablas salariales XXV Convenio Farmacia 2026"

[Párrafo introductorio con keyword en la primera frase, 2-3 oraciones]

[Datos concretos: cifras, porcentajes, fechas — siempre de fuente oficial]

[Frase de cierre que lleva al usuario a usar la calculadora: "Usa la calculadora para..."]
```

---

## Tono y voz

- **Tono**: profesional pero cercano. Como un compañero farmacéutico que sabe de nóminas y te lo explica bien.
- **Persona**: segunda persona singular informal (tú). "Tu nómina", "si te despiden", "lo que te corresponde".
- **Evitar**: lenguaje excesivamente jurídico sin explicación, condescendencia, frases vagas sin datos.
- **Incluir**: cifras reales, referencias al BOE, ejemplos concretos con números.

---

## Cuando se actualicen tablas salariales (cada año)

1. Buscar el BOE correspondiente (publicado normalmente en enero-febrero del año)
2. Actualizar TODAS las tablas en `app.js`
3. Actualizar los textos informativos en `index.html` (sección "Tablas salariales")
4. Actualizar las FAQs que mencionen importes concretos
5. Actualizar el `<meta description>` del `<head>` con el nuevo año
6. Actualizar el `<title>` si contiene el año
7. Actualizar el texto "Actualización XXXX" en el footer o sección "Sobre esta calculadora"
8. Commit con mensaje descriptivo: `"Actualizar tablas salariales 2027 según BOE-A-2027-XXXX"`
