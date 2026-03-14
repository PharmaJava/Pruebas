# SKILL: Calculadora JavaScript — conveniodefarmacia.com

## Objetivo
Crear, depurar y modificar las funciones de cálculo de nómina, finiquito y herramientas laborales en `app.js` (o `script.js`).

---

## Antes de tocar cualquier función de cálculo

1. **Leer** el bloque de código afectado completo antes de modificar nada
2. **Identificar** qué datos entran y qué sale
3. **Verificar** los casos edge: jornada parcial, trienio 0, año bisiesto, Asturias (15 pagas), Barcelona (aplica Nacional desde ene-2025)
4. **Probar** con valores conocidos (tablas salariales oficiales del BOE) antes de dar el cambio por bueno

---

## Constantes — NO recalcular dinámicamente

```javascript
// Siempre definidas al inicio del script o como const globales
const HORAS_ANUALES_CONVENIO = 1785;
const HORAS_SEMANA_ABIERTA   = 37.5;   // farmacia abierta los 365 días
const HORAS_SEMANA_CERRADA   = 39.5;   // cierra domingos + 12 festivos

// SS trabajador 2026
const SS_CC        = 0.0470;
const SS_DESEMPLEO = 0.0155;
const SS_FP        = 0.0010;
const SS_MEI       = 0.0013;
const SS_TOTAL     = 0.0648;  // suma de las anteriores

// Vacaciones
const DIAS_VAC_ANUALES = 30; // días naturales por convenio
```

---

## Funciones críticas — implementación correcta

### `diasEnAnio(year)` — siempre disponible
```javascript
function diasEnAnio(year) {
  return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 366 : 365;
}
```
**Usar en:** finiquito (indemnización), vacaciones pendientes, pensión proporcional.

---

### `getConfigJornada(tipoApertura)` — configuración de jornada
```javascript
function getConfigJornada(tipoApertura) {
  // tipoApertura: 'abierta' | 'cerrada'
  if (tipoApertura === 'cerrada') {
    return { horasSemanales: 39.5, horasAnuales: 1785 };
  }
  return { horasSemanales: 37.5, horasAnuales: 1785 };
}
```
⚠️ Las horas anuales son SIEMPRE 1785. Solo cambia el equivalente semanal.

---

### `actualizarPlaceholderSemana(tipoApertura)` — actualizar UI
```javascript
function actualizarPlaceholderSemana(tipoApertura) {
  const config = getConfigJornada(tipoApertura);
  const el = document.getElementById('placeholder-semana');
  if (el) el.textContent = config.horasSemanales.toFixed(1) + ' h/sem';
}
```
⚠️ Siempre `.toFixed(1)` para mostrar horas. Nunca dejar el float raw.

---

### `calcularSS(baseCotizacion)` — cuotas SS trabajador
```javascript
function calcularSS(baseCotizacion) {
  return {
    cc:        baseCotizacion * SS_CC,
    desempleo: baseCotizacion * SS_DESEMPLEO,
    fp:        baseCotizacion * SS_FP,
    mei:       baseCotizacion * SS_MEI,
    total:     baseCotizacion * SS_TOTAL
  };
}
```

---

### `calcularNeto(brutoMensual, irpf, baseCotizacion)` — neto mensual
```javascript
function calcularNeto(brutoMensual, irpfPct, baseCotizacion) {
  const ss = calcularSS(baseCotizacion);
  const retencionIRPF = brutoMensual * (irpfPct / 100);
  return brutoMensual - ss.total - retencionIRPF;
}
```

---

### `calcularFiniquito(params)` — finiquito completo
```javascript
/*
  params: {
    brutoAnual,       // incluye pagas extras
    fechaAlta,        // Date
    fechaDespido,     // Date
    tipoDespido,      // 'disciplinario' | 'objetivo' | 'improcedente'
    vacDisfrutadas,   // días naturales ya disfrutados
    numPagas          // 12 | 14 | 15
  }
*/
function calcularFiniquito(params) {
  const { brutoAnual, fechaAlta, fechaDespido, tipoDespido, vacDisfrutadas, numPagas } = params;
  
  const anio = fechaDespido.getFullYear();
  const diasAnio = diasEnAnio(anio);
  const valorDia = brutoAnual / diasAnio;
  
  // 1. Indemnización
  let indemnizacion = 0;
  const aniosTrabajados = calcularAntiguedad(fechaAlta, fechaDespido); // en años decimales
  if (tipoDespido === 'objetivo') {
    indemnizacion = Math.min(valorDia * 20 * aniosTrabajados, (brutoAnual / 12) * 12);
  } else if (tipoDespido === 'improcedente') {
    indemnizacion = Math.min(valorDia * 33 * aniosTrabajados, (brutoAnual / 12) * 24);
  }
  
  // 2. Vacaciones pendientes
  const inicio = new Date(anio, 0, 1); // 1 enero del año de despido
  const diasTrabajadosAnio = Math.floor((fechaDespido - inicio) / 86400000) + 1;
  const vacGeneradas = (DIAS_VAC_ANUALES / diasAnio) * diasTrabajadosAnio;
  const vacPendientes = Math.max(0, vacGeneradas - vacDisfrutadas);
  const importeVac = vacPendientes * valorDia;
  
  // 3. Parte proporcional del mes
  const diasMes = fechaDespido.getDate();
  const diasEnMes = new Date(anio, fechaDespido.getMonth() + 1, 0).getDate();
  const parteProporMes = (brutoAnual / 12) * (diasMes / diasEnMes);
  
  // 4. Prorrata pagas extras pendientes
  // (calcular pagas extras que han generado desde la última cobrada)
  // ... lógica según numPagas
  
  return { indemnizacion, importeVac, parteProporMes, total: indemnizacion + importeVac + parteProporMes };
}
```

---

### `calcularInversa(netoDeseado, irpf, baseCotizacion)` — bruto necesario para neto
```javascript
function calcularInversa(netoDeseado, irpfPct, ssFactor = SS_TOTAL) {
  // Neto = Bruto * (1 - irpf/100 - ssFactor)
  // Bruto = Neto / (1 - irpf/100 - ssFactor)
  const factor = 1 - (irpfPct / 100) - ssFactor;
  if (factor <= 0) return null; // imposible
  return netoDeseado / factor;
}
```
⚠️ La base de cotización puede diferir del bruto en algunos casos (bases máximas/mínimas SS). En el caso simplificado, asumir base = bruto.

---

## Patrones a seguir

### Formateo de moneda
```javascript
function formatEuros(valor) {
  return valor.toLocaleString('es-ES', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  }) + ' €';
}
```

### Formateo de porcentaje
```javascript
// Para mostrar en pantalla, siempre .toFixed(2) salvo horas que usan .toFixed(1)
const irpfDisplay = (irpf).toFixed(2) + '%';
```

### Leer inputs de forma segura
```javascript
function getInputFloat(id, defaultVal = 0) {
  const el = document.getElementById(id);
  if (!el) return defaultVal;
  const val = parseFloat(el.value.replace(',', '.'));
  return isNaN(val) ? defaultVal : val;
}

function getInputInt(id, defaultVal = 0) {
  const el = document.getElementById(id);
  if (!el) return defaultVal;
  const val = parseInt(el.value, 10);
  return isNaN(val) ? defaultVal : val;
}
```

---

## Casos edge que SIEMPRE hay que probar

| Caso | Por qué |
|---|---|
| Trienios = 0 | Trabajador nuevo — no debe sumar nada |
| Jornada 50% | Proporcional en todos los conceptos salvo nocturnidad |
| Asturias 15 pagas | Lógica de pagas extras distinta |
| Barcelona | Desde ene-2025 aplica tablas del Nacional |
| Año bisiesto (2024, 2028) | `diasEnAnio()` debe devolver 366 |
| IRPF 0% | Neto = Bruto - SS |
| Baja desde día 1 | Días 1-3: cobran 0 |
| Contrato anterior 12/02/2012 | Régimen transitorio 45 días/año para el tramo previo |

---

## Anti-patrones — NUNCA hacer esto

```javascript
// ❌ MAL — monkey-patching
const _original = calcularSalario;
calcularSalario = function(...args) { ... _original(...args) };

// ✅ BIEN — extender la función directamente
function calcularSalario(params) {
  // lógica completa aquí
}
```

```javascript
// ❌ MAL — calcular horas semanales dinámicamente
const horasSemanales = HORAS_ANUALES / 52;  // → 34.32, INCORRECTO

// ✅ BIEN — usar constante
const horasSemanales = tipoApertura === 'cerrada' ? 39.5 : 37.5;
```

```javascript
// ❌ MAL — mostrar float sin formatear
el.textContent = horasSemanales + ' h/sem';   // → "37.5 h/sem" (puede dar "37.50000000001")

// ✅ BIEN
el.textContent = horasSemanales.toFixed(1) + ' h/sem';
```

---

## Flujo de prueba antes de commit

1. Abrir `index.html` en Chrome (local, sin servidor)
2. Probar con farmacéutico/a, Nacional, 0 trienios, IRPF 15%, 14 pagas → verificar contra tabla BOE
3. Probar con auxiliar, Bizkaia, 2 trienios, jornada 80%
4. Probar calculadora inversa: neto deseado 1.500 € → calcular → pasar ese bruto a la calculadora normal → debe dar ~1.500 € neto
5. Probar finiquito: despido improcedente, 5 años antigüedad, bruto 19.177 €/año → ~8.653 € indemnización
6. Probar en móvil (DevTools responsive) — especialmente los selects y inputs numéricos
