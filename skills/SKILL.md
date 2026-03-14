---
name: nomina-js
description: "Use when writing or modifying ANY calculation logic in app.js — nómina, finiquito, IT, maternidad, jornada, trienios, inversas. Trigger: calcular, nómina, bruto, neto, finiquito, trienio, jornada, horas, SS, IRPF, baja, IT."
---

# Cálculos de Nómina — conveniodefarmacia.com

## Antes de tocar cualquier función

1. Leer el bloque completo antes de modificar
2. Probar con valores del BOE como ground truth
3. Cubrir los casos edge de la tabla al final

## Constantes — NUNCA recalcular

```js
const HORAS_ANUALES   = 1785;
const H_SEM_ABIERTA   = 37.5;   // farmacia abierta 365 días
const H_SEM_CERRADA   = 39.5;   // cierra domingos + 12 festivos
// ⚠️ Las 1785h/año son iguales en ambos casos. Solo cambia el equivalente semanal.

// SS trabajador 2026
const SS_CC   = 0.0470;
const SS_DESEMP = 0.0155;
const SS_FP   = 0.0010;
const SS_MEI  = 0.0013;
const SS_TOTAL = 0.0648;  // suma — NO recalcular

const DIAS_VAC = 30; // días naturales/año por convenio
```

## Funciones críticas

### `diasEnAnio(year)` — SIEMPRE disponible
```js
function diasEnAnio(y) {
  return ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) ? 366 : 365;
}
```
Usar en: finiquito, vacaciones, pensión. Nunca hardcodear 365.

### `getConfigJornada(tipo)` — tipo: 'abierta' | 'cerrada'
```js
function getConfigJornada(tipo) {
  return { horasSemanales: tipo === 'cerrada' ? 39.5 : 37.5, horasAnuales: 1785 };
}
```

### Formateo — reglas fijas
```js
// Dinero
valor.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'
// Horas → siempre .toFixed(1), nunca float raw
horas.toFixed(1) + ' h/sem'
// Porcentaje → .toFixed(2)
pct.toFixed(2) + '%'
```

### Leer inputs sin explotar
```js
function getFloat(id, def = 0) {
  const v = parseFloat((document.getElementById(id)?.value || '').replace(',', '.'));
  return isNaN(v) ? def : v;
}
```

### Cálculo neto mensual
```js
// base puede diferir del bruto (máximos SS), en uso normal asumir base = bruto
function calcularNeto(bruto, irpfPct, base) {
  return bruto - base * SS_TOTAL - bruto * (irpfPct / 100);
}
```

### Cálculo inversa (bruto para neto deseado)
```js
function calcularInversa(neto, irpfPct, ssFactor = SS_TOTAL) {
  const f = 1 - (irpfPct / 100) - ssFactor;
  return f <= 0 ? null : neto / f;
}
```

### Finiquito — estructura
```js
// valorDia = brutoAnual / diasEnAnio(año despido)
// Indemnización:
//   objetivo:     min(valorDia * 20 * años, (brutoAnual/12) * 12)
//   improcedente: min(valorDia * 33 * años, (brutoAnual/12) * 24)
// Vacaciones pendientes:
//   generadas = (DIAS_VAC / diasAnio) * diasTrabajadosEnElAño
//   pendientes = max(0, generadas - vacDisfrutadas)
//   importe = pendientes * valorDia
// Prorrata pagas extras: calcular pagas extras devengadas no cobradas
```

## Reglas

| ✅ Hacer | ❌ Nunca |
|---|---|
| Constantes hardcodeadas | Calcular h/semana dinámicamente desde días/año |
| `.toFixed(1)` en horas | Mostrar floats raw |
| `diasEnAnio()` en finiquito | Hardcodear 365 |
| Lógica dentro de la función | Monkey-patching de funciones existentes |
| `const`/`let`, strict mode | `var`, monkey-patch |

## Casos edge — probar siempre

| Caso | Detalle |
|---|---|
| Trienios = 0 | No debe sumar nada |
| Jornada < 100% | Proporcional en todo EXCEPTO nocturnidad (precio/hora completo) |
| Asturias | 15 pagas, quinquenios (5% sb cada 5 años), no trienios |
| Barcelona | Desde ene-2025 aplica tablas del Nacional |
| IRPF = 0 | Neto = Bruto - SS |
| IT días 1-3 | Cobran 0 |
| IT días 4-20 | 60% base reguladora |
| IT día 21+ | 75% base reguladora |
| Baja con hospitalización | Complemento al 100% (art.47), máx. 6 meses |
| Maternidad/paternidad | 100% BR, paga INSS, exento IRPF |
| Contrato < 12/02/2012 | Régimen transitorio: 45 días/año para el tramo previo (tope 42 mens.) |
| Año bisiesto | `diasEnAnio()` → 366 |

## Valores de referencia 2026 (BOE-A-2026-4220)

| Categoría | Salario base | Plus |
|---|---|---|
| Farmacéutico/a Nacional | 2.223,37 €/mes | + 91,49 € fac. |
| Técnico/a Nacional | 1.507,26 €/mes | — |
| Auxiliar Nacional | 1.370,64 €/mes | — |
| Farmacéutico/a Bizkaia | 2.548,98 €/mes | — |

Nocturnidad Nacional: Farmacéutico 2,66 €/h · Técnico 1,83 €/h · Auxiliar 1,80 €/h
