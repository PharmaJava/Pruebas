/**

Sueldo Farmacia Pro - Versión 2026.5
Integración GTM + Lógica de Consentimiento de Cookies
*/

let myChart = null;
const DATA_CONVENIOS = {

// ── CONVENIO NACIONAL ──────────────────────────────────────────────────────
nacional: {
    nombre: "Nacional (XXV Convenio)",
    tipoAnt: 'cpg',   // CPG = Plus Ad Personam / Complemento Personal de Garantía
    aviso: null,
    tablas: {
        farmaceutico: {
            "2022": [1985.35, 81.70, 2.48, 0],
            "2023": [2064.76, 84.97, 2.48, 0],
            "2024": [2137.03, 87.94, 2.56, 0],
            "2025": [2179.77, 89.70, 2.61, 0],
            "2026": [2223.37, 91.49, 2.66, 0]
        },
        tecnico: {
            "2022": [1345.92, 0, 1.62, 0],
            "2023": [1399.75, 0, 1.69, 0],
            "2024": [1448.74, 0, 1.75, 0],
            "2025": [1477.71, 0, 1.79, 0],
            "2026": [1507.26, 0, 1.83, 0]
        },
        auxiliar: {
            "2022": [1223.91, 0, 1.61, 0],
            "2023": [1272.87, 0, 1.68, 0],
            "2024": [1317.42, 0, 1.73, 0],
            "2025": [1343.77, 0, 1.76, 0],
            "2026": [1370.64, 0, 1.80, 0]
        }
    }
},

// ── BARCELONA ─────────────────────────────────────────────────────────────
// El convenio propio de Barcelona fue anulado. Desde enero 2025, rige el
// Convenio Nacional. Los trabajadores contratados antes de 2025 conservan
// su salario bruto anterior (garantía ad personam); los nuevos entran por
// tablas nacionales. Mostramos las tablas históricas pre-2025 para
// consulta de atrasos; para 2025-2026 usamos tablas nacionales.
barcelona: {
    nombre: "Barcelona (Nacional desde ene-2025)",
    tipoAnt: 'ninguno',
    aviso: "⚠️ El convenio propio de Barcelona fue anulado. Desde enero 2025 aplica el Convenio Nacional. Los trabajadores anteriores conservan su salario bruto como garantía ad personam (introdúcelo en «Mejora Voluntaria» si supera la tabla nacional).",
    tablas: {
        farmaceutico: {
            // Hasta dic-2024: tabla provincial Barcelona
            "2022": [2200.00, 0, 2.05, 0],
            "2023": [2255.00, 0, 2.10, 0], 
            "2024": [2297.21, 0, 2.15, 0],
            // Desde 2025: tablas nacionales
            "2025": [2179.77, 89.70, 2.61, 0],
            "2026": [2223.37, 91.49, 2.66, 0]
        },
        tecnico: {
            "2022": [1460.00, 0, 1.35, 0],
            "2023": [1490.00, 0, 1.38, 0],
            "2024": [1515.20, 0, 1.40, 0],
            "2025": [1477.71, 0, 1.79, 0],
            "2026": [1507.26, 0, 1.83, 0]
        },
        auxiliar: {
            "2022": [1310.00, 0, 1.20, 0],
            "2023": [1340.00, 0, 1.23, 0],
            "2024": [1365.40, 0, 1.25, 0],
            "2025": [1343.77, 0, 1.76, 0],
            "2026": [1370.64, 0, 1.80, 0]
        }
    }
},

// ── GIRONA / TARRAGONA / LLEIDA ────────────────────────────────────────────
gironatarragona: {
    nombre: "Girona / Tarragona / Lleida",
    tipoAnt: 'ninguno',
    aviso: null,
    tablas: {
        farmaceutico: {
            "2024": [2180.50, 220.00, 1.95, 0],
            "2025": [2224.11, 224.40, 1.98, 0],
            "2026": [2268.59, 228.89, 2.02, 0]
        },
        tecnico: {
            "2024": [1460.30, 0, 1.30, 0],
            "2025": [1489.50, 0, 1.32, 0],
            "2026": [1519.29, 0, 1.35, 0]
        },
        auxiliar: {
            "2024": [1310.15, 0, 1.15, 0],
            "2025": [1336.35, 0, 1.17, 0],
            "2026": [1363.08, 0, 1.19, 0]
        }
    }
},

// ── ASTURIAS ───────────────────────────────────────────────────────────────
asturias: {
    nombre: "Asturias (15 pagas)",
    tipoAnt: 'ninguno',
    aviso: null,
    tablas: {
        farmaceutico: {
            "2024": [2110.00, 330.51, 1.75, 0],
            "2025": [2152.20, 337.12, 1.78, 0],
            "2026": [2195.24, 343.86, 1.81, 0]
        },
        tecnico: {
            "2024": [1430.00, 0, 1.18, 0],
            "2025": [1458.60, 0, 1.20, 0],
            "2026": [1487.77, 0, 1.22, 0]
        },
        auxiliar: {
            "2024": [1280.00, 0, 1.05, 0],
            "2025": [1305.60, 0, 1.07, 0],
            "2026": [1331.71, 0, 1.09, 0]
        }
    }
},

// ── BIZKAIA ────────────────────────────────────────────────────────────────
bizkaia: {
    nombre: "Bizkaia (País Vasco)",
    tipoAnt: 'quinquenio',
    aviso: null,
    tablas: {
        farmaceutico: {
            "2024": [2450.00, 0, 2.50, 60.00],
            "2025": [2499.00, 0, 2.55, 61.20],
            "2026": [2548.98, 0, 2.60, 62.42]
        },
        tecnico: {
            "2024": [1710.00, 0, 1.65, 42.00],
            "2025": [1744.20, 0, 1.68, 42.84],
            "2026": [1779.08, 0, 1.71, 43.70]
        },
        auxiliar: {
            "2024": [1560.00, 0, 1.50, 38.00],
            "2025": [1591.20, 0, 1.53, 38.76],
            "2026": [1623.02, 0, 1.56, 39.54]
        }
    }
},

// ── GIPUZKOA ───────────────────────────────────────────────────────────────
// Tablas propias del convenio de Gipuzkoa (ligéramente distintas a Bizkaia)
gipuzkoa: {
    nombre: "Gipuzkoa (País Vasco)",
    tipoAnt: 'quinquenio',
    aviso: null,
    tablas: {
        farmaceutico: {
            "2024": [2420.00, 0, 2.45, 58.00],
            "2025": [2468.40, 0, 2.50, 59.16],
            "2026": [2517.77, 0, 2.55, 60.34]
        },
        tecnico: {
            "2024": [1685.00, 0, 1.62, 41.00],
            "2025": [1718.70, 0, 1.65, 41.82],
            "2026": [1753.07, 0, 1.68, 42.66]
        },
        auxiliar: {
            "2024": [1535.00, 0, 1.47, 37.00],
            "2025": [1565.70, 0, 1.50, 37.74],
            "2026": [1597.01, 0, 1.53, 38.49]
        }
    }
},

// ── ÁLAVA ──────────────────────────────────────────────────────────────────
// Álava se rige por el Convenio Nacional. Entrada independiente para claridad.
alava: {
    nombre: "Álava (rige Convenio Nacional)",
    tipoAnt: 'cpg',
    aviso: "ℹ️ Álava no dispone de convenio provincial propio. Sus trabajadores se rigen por el XXV Convenio Colectivo Nacional de Oficinas de Farmacia.",
    tablas: {
        farmaceutico: {
            "2022": [1985.35, 81.70, 2.48, 0],
            "2023": [2064.76, 84.97, 2.48, 0],
            "2024": [2137.03, 87.94, 2.56, 0],
            "2025": [2179.77, 89.70, 2.61, 0],
            "2026": [2223.37, 91.49, 2.66, 0]
        },
        tecnico: {
            "2022": [1345.92, 0, 1.62, 0],
            "2023": [1399.75, 0, 1.69, 0],
            "2024": [1448.74, 0, 1.75, 0],
            "2025": [1477.71, 0, 1.79, 0],
            "2026": [1507.26, 0, 1.83, 0]
        },
        auxiliar: {
            "2022": [1223.91, 0, 1.61, 0],
            "2023": [1272.87, 0, 1.68, 0],
            "2024": [1317.42, 0, 1.73, 0],
            "2025": [1343.77, 0, 1.76, 0],
            "2026": [1370.64, 0, 1.80, 0]
        }
    }
}

};
function establecerCotizacionesOficiales() {
document.getElementById("cotizacionContComu").value = "4.7";
document.getElementById("cotizacionDesempleo").value = "1.55";
document.getElementById("cotizacionFormacion").value = "0.1";
document.getElementById("cotizacionMEI").value = "0.13";
}
document.addEventListener('DOMContentLoaded', () => {
establecerCotizacionesOficiales();

// Inicializar "desde" a enero 2025
const elAtrasosDesde = document.getElementById('atrasos-desde');
if (elAtrasosDesde) { elAtrasosDesde.min = '2025-01'; elAtrasosDesde.value = '2025-01'; }

// Inicializar "hasta" con el mes actual
const hoy = new Date();
const mesActual = `${hoy.getFullYear()}-${String(hoy.getMonth()+1).padStart(2,'0')}`;
const elAtrasosHasta = document.getElementById('atrasos-hasta');
if (elAtrasosHasta) elAtrasosHasta.value = mesActual;

// IRPF por defecto según categoría profesional
const IRPF_DEFAULT_POR_PROFESION = {
    farmaceutico: 15.86,
    tecnico:       11,
    auxiliar:       8
};

// Flag: true si el usuario ha tocado manualmente el IRPF
let _irpfModificadoManualmente = false;
document.getElementById('porcentajeIRPF').addEventListener('input', () => {
    _irpfModificadoManualmente = true;
});

document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', () => {
        if (input.id === 'convenio') updateUIForConvenio();
        if (input.id === 'profesion' && !_irpfModificadoManualmente) {
            const defecto = IRPF_DEFAULT_POR_PROFESION[input.value];
            if (defecto !== undefined) {
                document.getElementById('porcentajeIRPF').value = defecto;
            }
        }
        calcularSalario();
        calcularAtrasos();
        calcularSimulador();
    });
});
// Comprobar si ya aceptó cookies antes
if (!localStorage.getItem('cookiesAceptadas')) {
const banner = document.getElementById('cookie-banner');
if (banner) banner.style.display = 'flex';
} else {
// Si ya aceptó antes, notificamos a GTM al cargar
enviarEventoGTM('revisit_pague_view', { status: 'already_accepted' });
}
updateUIForConvenio();
calcularSalario();
calcularAtrasos();
calcularSimulador();
});
// FUNCIÓN CLAVE PARA LAS COOKIES
function aceptarCookies() {
localStorage.setItem('cookiesAceptadas', 'true');
const banner = document.getElementById('cookie-banner');
if (banner) banner.style.display = 'none';
// Disparamos un evento especial para que GTM sepa que ahora puede activar Analytics/Ads
if (window.dataLayer) {
window.dataLayer.push({
'event': 'cookie_consent_granted',
'consent_level': 'full'
});
}
}
// Función auxiliar para enviar datos solo si hay permiso
function enviarEventoGTM(nombreEvento, parametros = {}) {
if (localStorage.getItem('cookiesAceptadas') === 'true' && window.dataLayer) {
window.dataLayer.push({
'event': nombreEvento,
...parametros
});
}
}
function updateUIForConvenio() {
const convKey = document.getElementById('convenio').value;
const config = DATA_CONVENIOS[convKey];
const pagasSelect = document.getElementById('numPagas');
const antiguedadInput = document.getElementById('antiguedad');
const antiguedadGroup = antiguedadInput.closest('.input-group');
const labelAnt = document.getElementById('labelAntiguedad');
const cpgGroup = document.getElementById('cpg-group');

// ── Aviso de convenio ──────────────────────────────────────────────────────
const avisoEl = document.getElementById('convenio-aviso');
if (config.aviso) {
    avisoEl.textContent = config.aviso;
    avisoEl.style.display = 'block';
} else {
    avisoEl.style.display = 'none';
}

// ── Antigüedad ─────────────────────────────────────────────────────────────
if (config.tipoAnt === 'ninguno') {
    antiguedadInput.disabled = true;
    antiguedadInput.value = 0;
    antiguedadGroup.style.opacity = '0.5';
    antiguedadGroup.style.pointerEvents = 'none';
    if (labelAnt) labelAnt.innerText = "Antigüedad (No disponible)";
    if (cpgGroup) cpgGroup.style.display = 'none';
} else if (config.tipoAnt === 'quinquenio') {
    antiguedadInput.disabled = false;
    antiguedadGroup.style.opacity = '1';
    antiguedadGroup.style.pointerEvents = 'auto';
    if (labelAnt) labelAnt.innerText = "Nº Quinquenios";
    if (cpgGroup) cpgGroup.style.display = 'none';
} else if (config.tipoAnt === 'cpg') {
    // Nacional y Álava: campo antigüedad deshabilitado (no hay trienios en tabla)
    // pero se habilita el campo CPG
    antiguedadInput.disabled = true;
    antiguedadInput.value = 0;
    antiguedadGroup.style.opacity = '0.5';
    antiguedadGroup.style.pointerEvents = 'none';
    if (labelAnt) labelAnt.innerText = "Antigüedad (No disponible)";
    if (cpgGroup) cpgGroup.style.display = 'block';
}

// ── Pagas ─────────────────────────────────────────────────────────────────
const currentVal = pagasSelect.value;
pagasSelect.innerHTML = '';
pagasSelect.options.add(new Option("12 pagas", "12"));
if (convKey === 'asturias') {
    pagasSelect.options.add(new Option("15 pagas", "15"));
    pagasSelect.value = (currentVal === "12" || currentVal === "15") ? currentVal : "15";
} else {
    pagasSelect.options.add(new Option("14 pagas", "14"));
    pagasSelect.value = (currentVal === "12" || currentVal === "14") ? currentVal : "14";
}
}
function calcularSalario() {
// 1. Capturar inputs
const convKey = document.getElementById("convenio").value;
const prof = document.getElementById("profesion").value;
const anio = document.getElementById("anio").value;
const numPagas = parseInt(document.getElementById("numPagas").value);
const irpfPct = parseFloat(document.getElementById("porcentajeIRPF").value) / 100;
// Seguridad Social total
const totalSSPct = (
parseFloat(document.getElementById("cotizacionContComu").value) +
parseFloat(document.getElementById("cotizacionDesempleo").value) +
parseFloat(document.getElementById("cotizacionMEI").value) +
parseFloat(document.getElementById("cotizacionFormacion").value)
) / 100;
// 2. Obtener datos del convenio
const convData = DATA_CONVENIOS[convKey];
const tablaCat = convData.tablas[prof];
// Fallback a 2024 si el año no existe en convenios provinciales
const [base, plus, precioHora, valAnt] = tablaCat[anio] || tablaCat["2024"];
// 3. Variables de usuario
const jornPct = parseFloat(document.getElementById("porcentaje").value) / 100;
const hNoc = parseFloat(document.getElementById("numHoras").value) || 0;
const mejora = parseFloat(document.getElementById("mejoraSalarial").value) || 0;
const numAntiguedad = parseInt(document.getElementById("antiguedad").value) || 0;
// CPG (Plus Ad Personam / Complemento Personal de Garantía) - solo Nacional y Álava
const cpg = (convData.tipoAnt === 'cpg') ? (parseFloat(document.getElementById("cpgImporte").value) || 0) : 0;

// 4. Calcular antigüedad según tipo
let importeAntiguedadMes = 0;
if (convData.tipoAnt === 'quinquenio') {
    importeAntiguedadMes = (valAnt * numAntiguedad) * jornPct;
}
// 5. Cálculo de conceptos mensuales
// IMPORTANTE: El plus solo se paga en las 12 nóminas mensuales, NO en pagas extras
// El CPG sí se incluye en pagas extras (es consolidado)
const sueldoBaseMes = (base * jornPct) + (plus * jornPct) + mejora + importeAntiguedadMes + cpg;
const valorNocturnidadMes = hNoc * precioHora;
const brutoMes = sueldoBaseMes + valorNocturnidadMes;
// Bruto Paga Extra: Base + Antigüedad + Mejora + CPG (SIN plus, SIN nocturnidad)
const brutoExtra = (base * jornPct) + mejora + importeAntiguedadMes + cpg;
// 6. Determinar número real de pagas del convenio para prorrateo
const pagasRealesConvenio = (convKey === 'asturias') ? 15 : 14;
let netoMensual, netoExtra, brutoAnualTotal, irpfAnual, ssAnual;
if (numPagas === 12) {
const brutoAnualMensual = brutoMes * 12;
const brutoAnualExtras = brutoExtra * (pagasRealesConvenio - 12);
brutoAnualTotal = brutoAnualMensual + brutoAnualExtras;
const brutoMesProrrateado = brutoAnualTotal / 12;
const descuentoSS = brutoMesProrrateado * totalSSPct;
const descuentoIRPF = brutoMesProrrateado * irpfPct;
netoMensual = brutoMesProrrateado - descuentoSS - descuentoIRPF;
netoExtra = 0;
irpfAnual = brutoAnualTotal * irpfPct;
ssAnual = brutoAnualTotal * totalSSPct;
} else {
const prorrataExtra = (brutoExtra * (numPagas - 12)) / 12;
const baseCotizacion = brutoMes + prorrataExtra;
const descuentoSS = baseCotizacion * totalSSPct;
const descuentoIRPF_Mes = brutoMes * irpfPct;
netoMensual = brutoMes - descuentoSS - descuentoIRPF_Mes;
netoExtra = brutoExtra - (brutoExtra * irpfPct);
brutoAnualTotal = baseCotizacion * 12;
irpfAnual = (brutoMes * 12 * irpfPct) + (brutoExtra * (numPagas - 12) * irpfPct);
ssAnual = brutoAnualTotal * totalSSPct;
}
const netoAnual = brutoAnualTotal - irpfAnual - ssAnual;
enviarEventoGTM('calculo_realizado', {
'convenio': document.getElementById("convenio").value,
'sueldo_neto': netoAnual.toFixed(2)
});
updateChart(netoAnual, irpfAnual, ssAnual);
const brutoMensualRef = (numPagas === 12) ? (brutoAnualTotal / 12) : brutoMes;
renderizarResultados(numPagas, netoMensual, netoExtra, netoAnual, brutoAnualTotal, pagasRealesConvenio, irpfAnual, ssAnual, brutoMensualRef, brutoExtra);
renderizarComparativa(prof, anio, numPagas, irpfPct, totalSSPct, jornPct, hNoc, mejora);
renderizarCuriosidades(netoAnual, brutoAnualTotal, irpfAnual, ssAnual, jornPct);
}
// ── Utilidad: animación de conteo numérico ──
function animarNumero(elemento, valorFinal, duracion = 500) {
    if (!elemento) return;
    const inicio = parseFloat(elemento.dataset.valorActual || 0);
    elemento.dataset.valorActual = valorFinal;
    const rango = valorFinal - inicio;
    const startTime = performance.now();
    function step(now) {
        const elapsed = now - startTime;
        const progreso = Math.min(elapsed / duracion, 1);
        // Easing: ease-out cúbico
        const ease = 1 - Math.pow(1 - progreso, 3);
        const valorActual = inicio + rango * ease;
        elemento.textContent = valorActual.toLocaleString('es-ES', {minimumFractionDigits:2, maximumFractionDigits:2}) + ' €';
        if (progreso < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

function renderizarResultados(numPagas, netoMensual, netoExtra, netoAnual, brutoAnualTotal, pagasConvenio, irpfAnual, ssAnual, brutoMensualRef, brutoExtraRef) {
    const fmt = v => v.toLocaleString('es-ES', {minimumFractionDigits:2, maximumFractionDigits:2});
    let tarjetasMensuales = "";

    if (numPagas === 12) {
        tarjetasMensuales = `
            <div class="result-card result-card--mensual">
                <div class="result-card__icon">📅</div>
                <div class="result-card__label">Neto Mensual</div>
                <div class="result-card__value anim-num" id="anim-mensual"></div>
                <div class="result-card__sub">✓ ${pagasConvenio} pagas prorrateadas</div>
                ${brutoMensualRef ? `<div class="result-card__bruto">Bruto mensual: ${fmt(brutoMensualRef)} €</div>` : ''}
            </div>
        `;
    } else {
        tarjetasMensuales = `
            <div class="result-card result-card--mensual">
                <div class="result-card__icon">📅</div>
                <div class="result-card__label">Neto Mensual</div>
                <div class="result-card__value anim-num" id="anim-mensual"></div>
                <div class="result-card__sub">Nómina ordinaria</div>
                ${brutoMensualRef ? `<div class="result-card__bruto">Bruto mensual: ${fmt(brutoMensualRef)} €</div>` : ''}
            </div>
            <div class="result-card result-card--extra">
                <div class="result-card__icon">🎁</div>
                <div class="result-card__label">Paga Extra (neta)</div>
                <div class="result-card__value anim-num" id="anim-extra"></div>
                <div class="result-card__sub">${numPagas} pagas · sin plus/noct.</div>
                ${brutoExtraRef ? `<div class="result-card__bruto">Bruto paga extra: ${fmt(brutoExtraRef)} €</div>` : ''}
            </div>
        `;
    }

    const porcentajeNeto = ((netoAnual / brutoAnualTotal) * 100).toFixed(1);

    const html = `
        <div class="results-grid">
            ${tarjetasMensuales}
        </div>
        <div class="result-anual">
            <div class="result-anual__top">
                <span class="result-anual__label">💰 Total Neto Anual</span>
                <span class="result-anual__value anim-num" id="anim-anual"></span>
            </div>
            <div class="result-anual__bar-wrap">
                <div class="result-anual__bar" id="barra-neto" style="width:0%"></div>
            </div>
            <div class="result-anual__bottom">
                <span class="result-anual__bruto">Bruto anual: ${fmt(brutoAnualTotal)} €</span>
                <span class="result-anual__pct">${porcentajeNeto}% neto</span>
            </div>
        </div>
        <div class="desglose-deducciones">
            <div class="desglose-item desglose-item--neto">
                <span class="desglose-dot"></span>
                <span class="desglose-label">Neto</span>
                <span class="desglose-valor">${fmt(netoAnual)}</span>
                <span class="desglose-pct">(${porcentajeNeto}%)</span>
            </div>
            <div class="desglose-item desglose-item--irpf">
                <span class="desglose-dot"></span>
                <span class="desglose-label">IRPF</span>
                <span class="desglose-valor">${fmt(irpfAnual)}</span>
                <span class="desglose-pct">(${(irpfAnual / brutoAnualTotal * 100).toFixed(1)}%)</span>
            </div>
            <div class="desglose-item desglose-item--ss">
                <span class="desglose-dot"></span>
                <span class="desglose-label">SS/MEI</span>
                <span class="desglose-valor">${fmt(ssAnual)}</span>
                <span class="desglose-pct">(${(ssAnual / brutoAnualTotal * 100).toFixed(1)}%)</span>
            </div>
        </div>
    `;

    document.getElementById("resultados").innerHTML = html;

    // Animaciones
    animarNumero(document.getElementById('anim-anual'), netoAnual);
    animarNumero(document.getElementById('anim-mensual'), netoMensual);
    if (numPagas !== 12) animarNumero(document.getElementById('anim-extra'), netoExtra);

    const barra = document.getElementById('barra-neto');
    if (barra) setTimeout(() => barra.style.width = `${porcentajeNeto}%`, 100);
}

function updateChart(neto, irpf, ss) {
    const ctx = document.getElementById('salaryChart').getContext('2d');
    if (myChart) myChart.destroy();

    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Sueldo Neto', 'IRPF', 'Seguridad Social'],
            datasets: [{
                data: [neto, irpf, ss],
                backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: { size: 11 }
                    }
                }
            }
        }
    });
}

function renderizarComparativa(prof, anio, numPagas, irpfPct, totalSSPct, jornPct, hNoc, mejora) {
    const netos = {};
    let maxNeto = 0;
    let convActual = document.getElementById('convenio').value;

    Object.entries(DATA_CONVENIOS).forEach(([key, conv]) => {
        const pagasReales = (key === 'asturias') ? 15 : 14;
        const tabla = conv.tablas[prof];
        const row = tabla[anio] || tabla["2024"];
        if (!row) return;
        const [base, plus, precioHora, valAnt] = row;
        let antMes = 0; // Simplificamos: sin antigüedad en comparativa
        const {netoAnual} = calcularNetoAnualDesdeBase(base, plus, jornPct, mejora, antMes, hNoc, precioHora, numPagas, pagasReales, irpfPct, totalSSPct);
        netos[key] = netoAnual;
        if (netoAnual > maxNeto) maxNeto = netoAnual;
    });

    const htmlRows = Object.entries(netos).sort((a,b) => b[1] - a[1]).map(([key, neto]) => {
        const pct = (neto / maxNeto * 100).toFixed(1);
        const active = key === convActual ? 'comp-row--active' : '';
        return `
            <div class="comp-row ${active}">
                <span class="comp-row__nombre">${DATA_CONVENIOS[key].nombre}</span>
                <div class="comp-row__bar-wrap">
                    <div class="comp-row__bar" style="width:${pct}%"></div>
                </div>
                <span class="comp-row__valor">${neto.toLocaleString('es-ES', {minimumFractionDigits:0, maximumFractionDigits:0})} €</span>
            </div>
        `;
    }).join('');

    document.getElementById('comparativa-container').innerHTML = `
        <details class="comparativa-details">
            <summary class="comparativa-summary">
                <i class="fas fa-balance-scale"></i> Comparativa con otros convenios
            </summary>
            <div class="comparativa-body">
                <p class="comparativa-nota">Neto anual según tablas oficiales 2026, sin antigüedad</p>
                ${htmlRows}
            </div>
        </details>
    `;
}

async function exportarImagen() {
    const area = document.getElementById('capture-area');
    const btn = document.querySelector('.btn-export');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando...';
    btn.disabled = true;
    try {
        const canvas = await html2canvas(area, {
            scale: 2, backgroundColor: "#ffffff",
            useCORS: true, allowTaint: false, logging: false
        });
        enviarEventoGTM('descarga_imagen', { 'formato': 'png' });
        if (navigator.share) {
            canvas.toBlob(async (blob) => {
                if (!blob) { descargarDesdeCanvas(canvas); btn.innerHTML = originalText; btn.disabled = false; return; }
                const file = new File([blob], 'mi-sueldo-farmacia.png', { type: 'image/png' });
                const shareData = { files: [file], title: 'Mi Sueldo Farmacia Pro', text: 'Calcula tu sueldo neto en farmacia' };
                try {
                    if (navigator.canShare && navigator.canShare(shareData)) {
                        await navigator.share(shareData);
                    } else {
                        // Fallback: compartir el enlace (funciona en iOS cuando no se pueden compartir archivos)
                        await navigator.share({ url: window.location.href, title: 'Mi Sueldo Farmacia Pro', text: 'Calcula tu sueldo neto en farmacia' });
                    }
                } catch (e) {
                    if (e.name === 'AbortError') return;
                    // Si el share del enlace también falla, descarga en escritorio
                    descargarDesdeCanvas(canvas);
                }
                finally { btn.innerHTML = originalText; btn.disabled = false; }
            }, 'image/png');
            return;
        }
        descargarDesdeCanvas(canvas);
    } catch (error) {
        console.error('Error al exportar:', error);
        // En iOS, html2canvas falla frecuentemente — compartir el enlace como fallback
        if (navigator.share) {
            try {
                await navigator.share({ url: window.location.href, title: 'Mi Sueldo Farmacia Pro', text: 'Calcula tu sueldo neto en farmacia' });
            } catch (shareError) {
                if (shareError.name !== 'AbortError') {
                    alert("Error al generar la imagen. Intenta hacer una captura de pantalla.");
                }
            }
        } else {
            alert("Error al generar la imagen. Intenta hacer una captura de pantalla.");
        }
        btn.innerHTML = originalText; btn.disabled = false;
    } finally {
        if (!navigator.share) { btn.innerHTML = originalText; btn.disabled = false; }
    }
}
function descargarDesdeCanvas(canvas) {
    const link = document.createElement('a');
    link.download = 'mi-sueldo-farmacia-' + Date.now() + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}
// ── Curiosidades dinámicas ──
function renderizarCuriosidades(netoAnual, brutoAnual, irpfAnual, ssAnual, jornPct) {
    const fmt = (v, dec = 2) => v.toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec });

    // Horas trabajadas al año según convenio farmacia: 1785h
    const horasAnio = Math.round(1785 * jornPct);
    const netoHora = horasAnio > 0 ? netoAnual / horasAnio : 0;

    // Impuestos totales por día natural
    const impuestosDia = (irpfAnual + ssAnual) / 365;

    // Día de libertad fiscal: días del año trabajando "para el Estado"
    const pctImpuestos = (irpfAnual + ssAnual) / brutoAnual;
    const diasLibertad = Math.round(pctImpuestos * 365);
    const anioSeleccionado = parseInt(document.getElementById("anio").value) || new Date().getFullYear();
    const fechaLibertad = new Date(anioSeleccionado, 0, 1 + diasLibertad);
    const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
    const labelFecha = `${fechaLibertad.getDate()} ${meses[fechaLibertad.getMonth()]}`;
    const pctImpuestosFmt = (pctImpuestos * 100).toFixed(1);

    // Café al mes (precio medio café España: 1,50€)
    const cafes = Math.round(netoAnual / 12 / 1.50);

    document.getElementById('curiosidades-container').innerHTML = `
        <div class="curiosidades-strip">
            <div class="curiosidad-item">
                <span class="curiosidad-emoji">⏱️</span>
                <span class="curiosidad-valor">${fmt(netoHora)} €</span>
                <span class="curiosidad-label">neto por hora</span>
            </div>
            <div class="curiosidad-item">
                <span class="curiosidad-emoji">📅</span>
                <span class="curiosidad-valor">${fmt(impuestosDia)} €</span>
                <span class="curiosidad-label">impuestos/día</span>
            </div>
            <div class="curiosidad-item curiosidad-item--libertad" title="Cambia ajustando tu % de IRPF">
                <span class="curiosidad-emoji">🗓️</span>
                <span class="curiosidad-valor">${labelFecha}</span>
                <span class="curiosidad-sublabel">${diasLibertad} días · ${pctImpuestosFmt}% al Estado</span>
                <span class="curiosidad-label">día libertad fiscal</span>
            </div>
            <div class="curiosidad-item">
                <span class="curiosidad-emoji">☕</span>
                <span class="curiosidad-valor">${cafes}</span>
                <span class="curiosidad-label">cafés al mes</span>
            </div>
        </div>
    `;

    // ── Módulos adicionales (ex monkey-patch, ahora integrado) ──
    try {
        const convKey = document.getElementById("convenio").value;
        const prof    = document.getElementById("profesion").value;
        const anio    = document.getElementById("anio").value;
        const numPagas = parseInt(document.getElementById("numPagas").value);
        const irpfPct  = parseFloat(document.getElementById("porcentajeIRPF").value) / 100;
        const totalSSPct = (
            parseFloat(document.getElementById("cotizacionContComu").value) +
            parseFloat(document.getElementById("cotizacionDesempleo").value) +
            parseFloat(document.getElementById("cotizacionMEI").value) +
            parseFloat(document.getElementById("cotizacionFormacion").value)
        ) / 100;
        const jornPct = parseFloat(document.getElementById("porcentaje").value) / 100;
        const hNoc    = parseFloat(document.getElementById("numHoras").value) || 0;
        const mejora  = parseFloat(document.getElementById("mejoraSalarial").value) || 0;
        const cpg     = (DATA_CONVENIOS[convKey]?.tipoAnt === 'cpg')
            ? (parseFloat(document.getElementById("cpgImporte")?.value) || 0) : 0;
        const numAnt  = parseInt(document.getElementById("antiguedad").value) || 0;
        const valAnt  = (DATA_CONVENIOS[convKey]?.tablas[prof][anio] ||
                         DATA_CONVENIOS[convKey]?.tablas[prof]["2024"])?.[3] || 0;
        const precioHora = (DATA_CONVENIOS[convKey]?.tablas[prof][anio] ||
                            DATA_CONVENIOS[convKey]?.tablas[prof]["2024"])?.[2] || 0;
        const base = (DATA_CONVENIOS[convKey]?.tablas[prof][anio] ||
                      DATA_CONVENIOS[convKey]?.tablas[prof]["2024"])?.[0] || 0;
        const plus = (DATA_CONVENIOS[convKey]?.tablas[prof][anio] ||
                      DATA_CONVENIOS[convKey]?.tablas[prof]["2024"])?.[1] || 0;

        let importeAnt = 0;
        if (DATA_CONVENIOS[convKey]?.tipoAnt === 'quinquenio') importeAnt = valAnt * numAnt * jornPct;

        const brutoMes  = (base * jornPct) + (plus * jornPct) + mejora + importeAnt + cpg + (hNoc * precioHora);
        const brutoExtra = (base * jornPct) + mejora + importeAnt + cpg;
        const pagasReales = convKey === 'asturias' ? 15 : 14;

        let brutoAnualTotal, irpfAnual, ssAnual, netoMensual, netoExtra;
        if (numPagas === 12) {
            brutoAnualTotal = brutoMes * 12 + brutoExtra * (pagasReales - 12);
            const brutoProrrateado = brutoAnualTotal / 12;
            ssAnual  = brutoAnualTotal * totalSSPct;
            irpfAnual = brutoAnualTotal * irpfPct;
            netoMensual = brutoProrrateado - brutoProrrateado * totalSSPct - brutoProrrateado * irpfPct;
            netoExtra = 0;
        } else {
            const prorrata = brutoExtra * (numPagas - 12) / 12;
            const baseCot  = brutoMes + prorrata;
            brutoAnualTotal = baseCot * 12;
            ssAnual  = brutoAnualTotal * totalSSPct;
            irpfAnual = brutoMes * 12 * irpfPct + brutoExtra * (numPagas - 12) * irpfPct;
            netoMensual = brutoMes - baseCot * totalSSPct - brutoMes * irpfPct;
            netoExtra = brutoExtra * (1 - irpfPct);
        }
        const netoAnual = brutoAnualTotal - irpfAnual - ssAnual;
        const ssMes = (numPagas === 12 ? brutoAnualTotal / 12 : brutoMes + brutoExtra * (numPagas - 12) / 12) * totalSSPct;
        const irpfMes = brutoMes * irpfPct;

        actualizarIndicadorIRPF(parseFloat(document.getElementById("porcentajeIRPF").value));
        renderizarNominaVisual({
            convKey, prof, anio, numPagas, jornPct, irpfPct,
            salarioBase: base * jornPct,
            plusFacultativo: plus * jornPct,
            antiguedad: importeAnt,
            cpg,
            mejora,
            nocturnidad: hNoc * precioHora,
            brutoMes,
            brutoAnualTotal,
            baseCotizacion: numPagas === 12 ? brutoAnualTotal / 12 : brutoMes + brutoExtra * (numPagas - 12) / 12,
            ccPct: parseFloat(document.getElementById("cotizacionContComu").value) / 100,
            desempleoPct: parseFloat(document.getElementById("cotizacionDesempleo").value) / 100,
            formacionPct: parseFloat(document.getElementById("cotizacionFormacion").value) / 100,
            meiPct: parseFloat(document.getElementById("cotizacionMEI").value) / 100,
            ssMes,
            irpfMes,
            netoMensual
        });
        window._finiquitoBrutoAnual = brutoAnualTotal;
        const hPrecioInput = document.getElementById('h-precio-hora');
        if (hPrecioInput) {
            const horasAnualesContratadas = jornPct * HORAS_CONVENIO;
            const precioHoraReal = horasAnualesContratadas > 0
                ? brutoAnualTotal / horasAnualesContratadas
                : 0;
            hPrecioInput.placeholder = `${precioHoraReal.toFixed(2)} €/h (bruto anual ÷ horas año)`;
            if (!hPrecioInput.dataset.userSet) {
                hPrecioInput.value = precioHoraReal.toFixed(2);
            }
        }
        renderizarDesgloseMensual(netoMensual, netoExtra, numPagas, pagasReales);
        renderizarSliderIRPF(brutoAnualTotal, ssAnual);
        guardarEnHistorial(convKey, prof, anio, netoMensual, netoAnual);
    } catch(e) {
        console.warn('Error en módulos adicionales:', e);
    }
}

// ── Utilidad compartida: calcular neto anual a partir de base+plus+params ──
function calcularNetoAnualDesdeBase(base, plus, jornPct, mejora, importeAntiguedadMes, hNoc, precioHora, numPagas, pagasRealesConvenio, irpfPct, totalSSPct) {
    const sueldoBaseMes = (base * jornPct) + (plus * jornPct) + mejora + importeAntiguedadMes;
    const brutoMes = sueldoBaseMes + (hNoc * precioHora);
    const brutoExtra = (base * jornPct) + mejora + importeAntiguedadMes;
    let brutoAnualTotal, irpfAnual, ssAnual;
    if (numPagas === 12) {
        brutoAnualTotal = (brutoMes * 12) + (brutoExtra * (pagasRealesConvenio - 12));
        irpfAnual = brutoAnualTotal * irpfPct;
        ssAnual = brutoAnualTotal * totalSSPct;
    } else {
        const prorrataExtra = (brutoExtra * (numPagas - 12)) / 12;
        brutoAnualTotal = (brutoMes + prorrataExtra) * 12;
        irpfAnual = (brutoMes * 12 * irpfPct) + (brutoExtra * (numPagas - 12) * irpfPct);
        ssAnual = brutoAnualTotal * totalSSPct;
    }
    return { netoMes: brutoMes - ((brutoMes + (brutoExtra*(numPagas-12)/12)) * totalSSPct) - (brutoMes * irpfPct),
             netoAnual: brutoAnualTotal - irpfAnual - ssAnual,
             brutoAnual: brutoAnualTotal };
}

// ── Cálculo de atrasos ──
function calcularAtrasos() {
    const convKey = document.getElementById("convenio").value;
    const prof    = document.getElementById("profesion").value;
    const numPagas = parseInt(document.getElementById("numPagas").value);
    const irpfPct  = parseFloat(document.getElementById("porcentajeIRPF").value) / 100;
    const totalSSPct = (
        parseFloat(document.getElementById("cotizacionContComu").value) +
        parseFloat(document.getElementById("cotizacionDesempleo").value) +
        parseFloat(document.getElementById("cotizacionMEI").value) +
        parseFloat(document.getElementById("cotizacionFormacion").value)
    ) / 100;
    const jornPct  = parseFloat(document.getElementById("porcentaje").value) / 100;
    const hNoc     = parseFloat(document.getElementById("numHoras").value) || 0;
    const mejora   = parseFloat(document.getElementById("mejoraSalarial").value) || 0;
    const convData = DATA_CONVENIOS[convKey];
    const pagasRealesConvenio = (convKey === 'asturias') ? 15 : 14;

    const desde = document.getElementById("atrasos-desde")?.value;
    const hasta = document.getElementById("atrasos-hasta")?.value;
    const el    = document.getElementById("resultado-atrasos");
    if (!el) return;

    if (!desde || !hasta || desde > hasta) {
    }

    const fmt = v => v.toLocaleString('es-ES', {minimumFractionDigits:2, maximumFractionDigits:2});

    // Iterar mes a mes entre desde y hasta
    let totalDiferenciaNeta = 0;
    let mesesContados = 0;
    let detalles = [];

    let [yearD, monthD] = desde.split('-').map(Number);
    let [yearH, monthH] = hasta.split('-').map(Number);

    let y = yearD, m = monthD;
    while (y < yearH || (y === yearH && m <= monthH)) {
        const anioStr = String(y);
        const tablaCat = convData.tablas[prof];
        // Tabla del año en curso (fallback a 2024)
        const rowActual = tablaCat[anioStr] || tablaCat["2024"];
        // Tabla del año anterior (lo que cobraban antes de la subida obligada)
        const anioAnterior = String(Math.max(parseInt(Object.keys(tablaCat)[0]), y - 1));
        const rowAnterior  = tablaCat[anioAnterior] || rowActual;

        const [baseAct, plusAct, precioHoraAct] = rowActual;
        const [baseAnt, plusAnt, precioHoraAnt] = rowAnterior;

        // Neto mensual con tabla correcta
        const netoDeberiaHaber = calcularNetoMensualSimple(baseAct, plusAct, precioHoraAct, jornPct, mejora, hNoc, numPagas, pagasRealesConvenio, irpfPct, totalSSPct);
        // Neto mensual con tabla anterior (lo que cobra si no subieron)
        const netoCobrando    = calcularNetoMensualSimple(baseAnt, plusAnt, precioHoraAnt, jornPct, mejora, hNoc, numPagas, pagasRealesConvenio, irpfPct, totalSSPct);

        const difMes = netoDeberiaHaber - netoCobrando;
        totalDiferenciaNeta += difMes;
        mesesContados++;

        // Guardar resumen por año
        const key = anioStr;
        const existing = detalles.find(d => d.anio === key);
        if (existing) { existing.total += difMes; existing.meses++; }
        else detalles.push({ anio: key, total: difMes, meses: 1 });

        m++;
        if (m > 12) { m = 1; y++; }
    }

    if (mesesContados === 0 || totalDiferenciaNeta <= 0.01) {
        el.innerHTML = `<div class="atrasos-ok">✅ Con los datos actuales no se detectan atrasos pendientes.</div>`;
        return;
    }

    const filasDetalle = detalles.map(d => `
        <div class="atrasos-fila">
            <span>${d.anio} (${d.meses} mes${d.meses>1?'es':''})</span>
            <span class="atrasos-importe">${fmt(d.total)} €</span>
        </div>
    `).join('');

    el.innerHTML = `
        <div class="atrasos-resultado">
            <div class="atrasos-total">
                <span>💸 Total atrasos netos que te deben</span>
                <span class="atrasos-total-valor">${fmt(totalDiferenciaNeta)} €</span>
            </div>
            <div class="atrasos-desglose">
                ${filasDetalle}
            </div>
            <p class="atrasos-nota">Diferencia entre el sueldo que debiste cobrar (tablas oficiales) y el año anterior. Calculado en neto con tu IRPF actual.</p>
        </div>
    `;
}

function calcularNetoMensualSimple(base, plus, precioHora, jornPct, mejora, hNoc, numPagas, pagasRealesConvenio, irpfPct, totalSSPct) {
    const brutoMes   = (base * jornPct) + (plus * jornPct) + mejora + (hNoc * precioHora);
    const brutoExtra = (base * jornPct) + mejora;
    const prorrataExtra = (numPagas === 12) ? (brutoExtra * (pagasRealesConvenio - 12)) / 12 : (brutoExtra * (numPagas - 12)) / 12;
    const baseCot = brutoMes + prorrataExtra;
    return brutoMes - (baseCot * totalSSPct) - (brutoMes * irpfPct);
}

// ── Simulador nuevo convenio ──
function calcularSimulador() {
    const convKey  = document.getElementById("convenio").value;
    const prof     = document.getElementById("profesion").value;
    const numPagas = parseInt(document.getElementById("numPagas").value);
    const irpfPct  = parseFloat(document.getElementById("porcentajeIRPF").value) / 100;
    const totalSSPct = (
        parseFloat(document.getElementById("cotizacionContComu").value) +
        parseFloat(document.getElementById("cotizacionDesempleo").value) +
        parseFloat(document.getElementById("cotizacionMEI").value) +
        parseFloat(document.getElementById("cotizacionFormacion").value)
    ) / 100;
    const jornPct  = parseFloat(document.getElementById("porcentaje").value) / 100;
    const hNoc     = parseFloat(document.getElementById("numHoras").value) || 0;
    const mejora   = parseFloat(document.getElementById("mejoraSalarial").value) || 0;
    const numAntiguedad = parseInt(document.getElementById("antiguedad").value) || 0;

    const sub2025  = (parseFloat(document.getElementById("sim-subida-2025")?.value) || 0) / 100;
    const sub2026  = (parseFloat(document.getElementById("sim-subida-2026")?.value) || 0) / 100;

    const convData = DATA_CONVENIOS[convKey];
    const tablaCat = convData.tablas[prof];
    const pagasRealesConvenio = (convKey === 'asturias') ? 15 : 14;

    // Base de referencia: tabla 2024 del convenio (o la más antigua disponible)
    const baseAnio = tablaCat["2024"] || tablaCat[Object.keys(tablaCat)[0]];
    const [base2024, plus2024, precioHora2024, valAnt2024] = baseAnio;

    // Antigüedad para 2024
    const importeAntiguedadMes2024 = (convData.tipoAnt === 'quinquenio') ? (valAnt2024 * numAntiguedad) * jornPct : 0;

    // Cálculos para 2024 (base)
    const sueldoBaseMes2024 = (base2024 * jornPct) + (plus2024 * jornPct) + mejora + importeAntiguedadMes2024;
    const valorNocturnidadMes2024 = hNoc * precioHora2024;
    const brutoMes2024 = sueldoBaseMes2024 + valorNocturnidadMes2024;
    const brutoExtra2024 = (base2024 * jornPct) + mejora + importeAntiguedadMes2024;
    let netoMensual2024, netoExtra2024;
    if (numPagas === 12) {
        const brutoAnualMensual2024 = brutoMes2024 * 12;
        const brutoAnualExtras2024 = brutoExtra2024 * (pagasRealesConvenio - 12);
        const brutoAnualTotal2024 = brutoAnualMensual2024 + brutoAnualExtras2024;
        const brutoMesProrrateado2024 = brutoAnualTotal2024 / 12;
        const descuentoSS2024 = brutoMesProrrateado2024 * totalSSPct;
        const descuentoIRPF2024 = brutoMesProrrateado2024 * irpfPct;
        netoMensual2024 = brutoMesProrrateado2024 - descuentoSS2024 - descuentoIRPF2024;
        netoExtra2024 = 0;
    } else {
        const prorrataExtra2024 = (brutoExtra2024 * (numPagas - 12)) / 12;
        const baseCotizacion2024 = brutoMes2024 + prorrataExtra2024;
        const descuentoSS2024 = baseCotizacion2024 * totalSSPct;
        const descuentoIRPF_Mes2024 = brutoMes2024 * irpfPct;
        netoMensual2024 = brutoMes2024 - descuentoSS2024 - descuentoIRPF_Mes2024;
        netoExtra2024 = brutoExtra2024 - (brutoExtra2024 * irpfPct);
    }

    // Para 2025
    const base2025 = base2024 * (1 + sub2025);
    const plus2025 = plus2024 * (1 + sub2025);
    const precioHora2025 = precioHora2024 * (1 + sub2025);
    const valAnt2025 = valAnt2024 * (1 + sub2025);
    const importeAntiguedadMes2025 = (convData.tipoAnt === 'quinquenio') ? (valAnt2025 * numAntiguedad) * jornPct : 0;
    const sueldoBaseMes2025 = (base2025 * jornPct) + (plus2025 * jornPct) + mejora + importeAntiguedadMes2025;
    const valorNocturnidadMes2025 = hNoc * precioHora2025;
    const brutoMes2025 = sueldoBaseMes2025 + valorNocturnidadMes2025;
    const brutoExtra2025 = (base2025 * jornPct) + mejora + importeAntiguedadMes2025;
    let netoMensual2025, netoExtra2025;
    if (numPagas === 12) {
        const brutoAnualMensual2025 = brutoMes2025 * 12;
        const brutoAnualExtras2025 = brutoExtra2025 * (pagasRealesConvenio - 12);
        const brutoAnualTotal2025 = brutoAnualMensual2025 + brutoAnualExtras2025;
        const brutoMesProrrateado2025 = brutoAnualTotal2025 / 12;
        const descuentoSS2025 = brutoMesProrrateado2025 * totalSSPct;
        const descuentoIRPF2025 = brutoMesProrrateado2025 * irpfPct;
        netoMensual2025 = brutoMesProrrateado2025 - descuentoSS2025 - descuentoIRPF2025;
        netoExtra2025 = 0;
    } else {
        const prorrataExtra2025 = (brutoExtra2025 * (numPagas - 12)) / 12;
        const baseCotizacion2025 = brutoMes2025 + prorrataExtra2025;
        const descuentoSS2025 = baseCotizacion2025 * totalSSPct;
        const descuentoIRPF_Mes2025 = brutoMes2025 * irpfPct;
        netoMensual2025 = brutoMes2025 - descuentoSS2025 - descuentoIRPF_Mes2025;
        netoExtra2025 = brutoExtra2025 - (brutoExtra2025 * irpfPct);
    }

    // Para 2026
    const base2026 = base2025 * (1 + sub2026);
    const plus2026 = plus2025 * (1 + sub2026);
    const precioHora2026 = precioHora2025 * (1 + sub2026);
    const valAnt2026 = valAnt2025 * (1 + sub2026);
    const importeAntiguedadMes2026 = (convData.tipoAnt === 'quinquenio') ? (valAnt2026 * numAntiguedad) * jornPct : 0;
    const sueldoBaseMes2026 = (base2026 * jornPct) + (plus2026 * jornPct) + mejora + importeAntiguedadMes2026;
    const valorNocturnidadMes2026 = hNoc * precioHora2026;
    const brutoMes2026 = sueldoBaseMes2026 + valorNocturnidadMes2026;
    const brutoExtra2026 = (base2026 * jornPct) + mejora + importeAntiguedadMes2026;
    let netoMensual2026, netoExtra2026;
    if (numPagas === 12) {
        const brutoAnualMensual2026 = brutoMes2026 * 12;
        const brutoAnualExtras2026 = brutoExtra2026 * (pagasRealesConvenio - 12);
        const brutoAnualTotal2026 = brutoAnualMensual2026 + brutoAnualExtras2026;
        const brutoMesProrrateado2026 = brutoAnualTotal2026 / 12;
        const descuentoSS2026 = brutoMesProrrateado2026 * totalSSPct;
        const descuentoIRPF2026 = brutoMesProrrateado2026 * irpfPct;
        netoMensual2026 = brutoMesProrrateado2026 - descuentoSS2026 - descuentoIRPF2026;
        netoExtra2026 = 0;
    } else {
        const prorrataExtra2026 = (brutoExtra2026 * (numPagas - 12)) / 12;
        const baseCotizacion2026 = brutoMes2026 + prorrataExtra2026;
        const descuentoSS2026 = baseCotizacion2026 * totalSSPct;
        const descuentoIRPF_Mes2026 = brutoMes2026 * irpfPct;
        netoMensual2026 = brutoMes2026 - descuentoSS2026 - descuentoIRPF_Mes2026;
        netoExtra2026 = brutoExtra2026 - (brutoExtra2026 * irpfPct);
    }

    const fmt = v => v.toLocaleString('es-ES', {minimumFractionDigits:2, maximumFractionDigits:2});
    const diff25 = netoMensual2025 - netoMensual2024;
    const diff26 = netoMensual2026 - netoMensual2024;

    const displayNeto = (netoMensual, netoExtra) => numPagas === 12 ? `${fmt(netoMensual)} €/mes` : `${fmt(netoMensual)} €/mes<br>Paga: ${fmt(netoExtra)} €`;

    const elSimResultado = document.getElementById("resultado-simulador");
    if (!elSimResultado) return;
    elSimResultado.innerHTML = `
        <div class="simulador-resultado">
            <div class="sim-row sim-row--base">
                <span class="sim-anio">📌 Base 2024</span>
                <span class="sim-neto">${displayNeto(netoMensual2024, netoExtra2024)}</span>
                <span class="sim-diff">—</span>
            </div>
            <div class="sim-row sim-row--2025">
                <span class="sim-anio">📈 Con subida 2025 (+${(sub2025*100).toFixed(1)}%)</span>
                <span class="sim-neto">${displayNeto(netoMensual2025, netoExtra2025)}</span>
                <span class="sim-diff ${diff25>=0?'pos':'neg'}">${diff25>=0?'+':''}${fmt(diff25)} €</span>
            </div>
            <div class="sim-row sim-row--2026">
                <span class="sim-anio">🚀 Acumulado 2026 (+${((sub2025+sub2026+sub2025*sub2026)*100).toFixed(1)}%)</span>
                <span class="sim-neto">${displayNeto(netoMensual2026, netoExtra2026)}</span>
                <span class="sim-diff ${diff26>=0?'pos':'neg'}">${diff26>=0?'+':''}${fmt(diff26)} €</span>
            </div>
            <p class="atrasos-nota">Subida aplicada sobre tablas 2024. El % acumulado incluye el efecto compuesto.</p>
        </div>
    `;
}

function descargarImagen(dataURL) {
const link = document.createElement('a');
link.download = 'mi-sueldo-farmacia-' + new Date().getTime() + '.png';
link.href = dataURL;
link.click();
}
// ═══════════════════════════════════════════════════════════════════════════════
// SECCIONES NUEVAS: Slider jornada, Dark Mode, Tooltips, IRPF indicador,
// Calculadora Inversa, Bruto Libre, Wizard IRPF, Vacaciones, Pensión,
// Nómina visual, Slider IRPF, Desglose mensual, Historial, Reset cotizaciones
// ═══════════════════════════════════════════════════════════════════════════════

// ── Historial de cálculos ──────────────────────────────────────────────────────
const historial = [];

function guardarEnHistorial(convKey, prof, anio, netoMensual, netoAnual) {
    const ahora = new Date();
    const hora = `${String(ahora.getHours()).padStart(2,'0')}:${String(ahora.getMinutes()).padStart(2,'0')}`;
    historial.unshift({ convKey, prof, anio, netoMensual, netoAnual, hora });
    if (historial.length > 5) historial.pop();
    renderizarHistorial();
}

function renderizarHistorial() {
    const el = document.getElementById('historial-container');
    if (!el || historial.length < 2) return;
    const fmt = v => v.toLocaleString('es-ES', {minimumFractionDigits:0, maximumFractionDigits:0});
    const filas = historial.map((h, i) => `
        <div class="hist-fila ${i===0?'hist-fila--actual':''}">
            <span class="hist-label">${DATA_CONVENIOS[h.convKey]?.nombre?.split(' ')[0] || h.convKey} · ${h.prof} · ${h.anio}</span>
            <span class="hist-neto">${fmt(h.netoMensual)} €/mes</span>
            <span class="hist-hora">${h.hora}</span>
        </div>
    `).join('');
    el.innerHTML = `
        <details class="comparativa-details" style="margin-top:0.8rem;">
            <summary class="comparativa-summary"><i class="fas fa-history"></i> Historial de cálculos</summary>
            <div class="comparativa-body">${filas}</div>
        </details>`;
}

// ── Indicador IRPF ─────────────────────────────────────────────────────────────
function actualizarIndicadorIRPF(pct) {
    const el = document.getElementById('irpf-indicador');
    if (!el) return;
    let texto, clase;
    if (pct < 9)        { texto = '🟢 Bajo';    clase = 'irpf-indicador--bajo'; }
    else if (pct < 15)  { texto = '🟡 Normal';  clase = 'irpf-indicador--normal'; }
    else if (pct < 22)  { texto = '🟠 Medio';   clase = 'irpf-indicador--medio'; }
    else                { texto = '🔴 Alto';    clase = 'irpf-indicador--alto'; }
    el.textContent = texto;
    el.className = `irpf-indicador ${clase}`;
}

// ── Nómina visual profesional ──────────────────────────────────────────────────
function renderizarNominaVisual(datos) {
    const el = document.getElementById('nomina-visual-container');
    if (!el) return;

    // Compatibilidad con llamada antigua (por si acaso)
    if (typeof datos !== 'object') {
        datos = { brutoMes: arguments[0], ssMes: arguments[1], irpfMes: arguments[2], netoMensual: arguments[3], numPagas: arguments[4] };
    }

    const {
        convKey = 'nacional', prof = 'farmaceutico', anio = '2026', numPagas = 14, jornPct = 1, irpfPct = 0.15,
        salarioBase = 0, plusFacultativo = 0, antiguedad = 0, cpg = 0, mejora = 0, nocturnidad = 0,
        brutoMes = 0, brutoAnualTotal = brutoMes * 12, baseCotizacion = brutoMes,
        ccPct = 0.047, desempleoPct = 0.0155, formacionPct = 0.001, meiPct = 0.0013,
        ssMes = 0, irpfMes = 0, netoMensual = 0
    } = datos;

    const fmt = v => v.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const fmtPct = v => (v * 100).toFixed(2).replace('.', ',') + '%';

    // Etiquetas
    const CATEGORIAS = { farmaceutico: 'Farmacéutico/a', tecnico: 'Técnico/a de Farmacia', auxiliar: 'Auxiliar de Farmacia' };
    const CONVENIOS = {
        nacional: 'XXV Conv. Colectivo Nacional', asturias: 'Conv. Oficinas Farmacia Asturias',
        bizkaia: 'Conv. Oficinas Farmacia Bizkaia', gipuzkoa: 'Conv. Oficinas Farmacia Gipuzkoa',
        girona: 'Conv. Oficinas Farmacia Girona/Ll./Tgna.', alava: 'XXV Conv. Nacional (Álava)',
        bcn: 'XXV Conv. Nacional (Barcelona)'
    };

    // Período (mes actual)
    const hoy = new Date();
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const periodo = `1 al ${new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate()} de ${meses[hoy.getMonth()]} de ${hoy.getFullYear()}`;
    const jornPctLabel = Math.round(jornPct * 100) + '%';

    // Desglose SS trabajador
    const ssCC = baseCotizacion * ccPct;
    const ssDesemp = baseCotizacion * desempleoPct;
    const ssForm = baseCotizacion * formacionPct;
    const ssMEI = baseCotizacion * meiPct;

    // Coste empresa (cuotas patronales estimadas sobre baseCotizacion)
    // Tasas 2026: CC 23,60% · Desempleo 5,50% · FP 0,60% · FOGASA 0,20% · MEI 0,52% · AT/EP Farmacia ~1,50%
    const empCC       = baseCotizacion * 0.236;
    const empDesemp   = baseCotizacion * 0.055;
    const empFP       = baseCotizacion * 0.006;
    const empFOGASA   = baseCotizacion * 0.002;
    const empMEI      = baseCotizacion * 0.0052;
    const empAT       = baseCotizacion * 0.015;  // AT/EP Farmacia (CNAE 4773)
    const empSSTotalMes = empCC + empDesemp + empFP + empFOGASA + empMEI + empAT;
    // La base de cotización incluye la prorrata de pagas extras, que el empleador
    // amortiza mensualmente. costeTotalMes usa baseCotizacion (no solo brutoMes)
    // para reflejar el coste real mensual medio para la empresa.
    const prorrataPagasExtras = baseCotizacion - brutoMes;
    const costeTotalMes = baseCotizacion + empSSTotalMes;
    const costeTotalAnual = brutoAnualTotal + empSSTotalMes * 12;

    // Devengos a mostrar (solo los que sean > 0)
    const devengos = [
        { label: 'Salario base', importe: salarioBase },
        plusFacultativo > 0 ? { label: 'Plus de facultativo', importe: plusFacultativo } : null,
        cpg > 0 ? { label: 'Compl. Personal de Garantía (CPG)', importe: cpg } : null,
        antiguedad > 0 ? { label: 'Antigüedad / Quinquenios', importe: antiguedad } : null,
        mejora > 0 ? { label: 'Mejora voluntaria', importe: mejora } : null,
        nocturnidad > 0 ? { label: 'Nocturnidad', importe: nocturnidad } : null,
    ].filter(Boolean);

    const totalDevengado = devengos.reduce((s, d) => s + d.importe, 0);
    const totalDeducciones = ssCC + ssDesemp + ssForm + ssMEI + irpfMes;

    const devengosHTML = devengos.map(d => `
        <tr>
            <td class="nom-concepto">${d.label}</td>
            <td class="nom-importe">${fmt(d.importe)}</td>
        </tr>`).join('');

    el.innerHTML = `
    <details class="comparativa-details nom-details">
        <summary class="comparativa-summary"><i class="fas fa-file-invoice-dollar"></i> Recibo de salarios</summary>
        <div class="nom-wrapper">

            <!-- Cabecera empresa -->
            <div class="nom-header">
                <div class="nom-empresa-block">
                    <div class="nom-empresa-icon"><i class="fas fa-briefcase-medical"></i></div>
                    <div>
                        <div class="nom-empresa-nombre">Oficina de Farmacia</div>
                        <div class="nom-empresa-sub">Empleador · CIF: ————————</div>
                    </div>
                </div>
                <div class="nom-title-block">
                    <div class="nom-title">RECIBO DE SALARIOS</div>
                    <div class="nom-periodo">Período: ${periodo}</div>
                </div>
            </div>

            <!-- Datos trabajador -->
            <div class="nom-datos-grid">
                <div class="nom-dato"><span class="nom-dato-label">Trabajador/a</span><span class="nom-dato-val">————————————————</span></div>
                <div class="nom-dato"><span class="nom-dato-label">N.I.F.</span><span class="nom-dato-val">——————————</span></div>
                <div class="nom-dato"><span class="nom-dato-label">Categoría</span><span class="nom-dato-val">${CATEGORIAS[prof] || prof}</span></div>
                <div class="nom-dato"><span class="nom-dato-label">Jornada</span><span class="nom-dato-val">${jornPctLabel}</span></div>
                <div class="nom-dato"><span class="nom-dato-label">Convenio</span><span class="nom-dato-val">${CONVENIOS[convKey] || convKey}</span></div>
                <div class="nom-dato"><span class="nom-dato-label">Año tabla</span><span class="nom-dato-val">${anio}</span></div>
            </div>

            <!-- Cuerpo: devengos + deducciones -->
            <div class="nom-body">
                <!-- Devengos -->
                <div class="nom-col">
                    <div class="nom-col-title">DEVENGOS</div>
                    <table class="nom-table">
                        <thead><tr><th>Concepto</th><th>Importe</th></tr></thead>
                        <tbody>
                            ${devengosHTML}
                        </tbody>
                        <tfoot>
                            <tr class="nom-total-row">
                                <td>Total devengado</td>
                                <td>${fmt(totalDevengado)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <!-- Deducciones -->
                <div class="nom-col">
                    <div class="nom-col-title">DEDUCCIONES</div>
                    <table class="nom-table">
                        <thead><tr><th>Concepto</th><th>%</th><th>Importe</th></tr></thead>
                        <tbody>
                            <tr><td class="nom-concepto">Cot. C. Comunes</td><td class="nom-pct">${fmtPct(ccPct)}</td><td class="nom-importe">${fmt(ssCC)}</td></tr>
                            <tr><td class="nom-concepto">Desempleo</td><td class="nom-pct">${fmtPct(desempleoPct)}</td><td class="nom-importe">${fmt(ssDesemp)}</td></tr>
                            <tr><td class="nom-concepto">Form. Profesional</td><td class="nom-pct">${fmtPct(formacionPct)}</td><td class="nom-importe">${fmt(ssForm)}</td></tr>
                            <tr><td class="nom-concepto">MEI</td><td class="nom-pct">${fmtPct(meiPct)}</td><td class="nom-importe">${fmt(ssMEI)}</td></tr>
                            <tr class="nom-irpf-row"><td class="nom-concepto">Retención IRPF</td><td class="nom-pct">${fmtPct(irpfPct)}</td><td class="nom-importe">${fmt(irpfMes)}</td></tr>
                        </tbody>
                        <tfoot>
                            <tr class="nom-total-row">
                                <td colspan="2">Total deducciones</td>
                                <td>${fmt(totalDeducciones)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <!-- Líquido -->
            <div class="nom-liquido">
                <span class="nom-liquido-label">LÍQUIDO A PERCIBIR</span>
                <span class="nom-liquido-valor">${fmt(netoMensual)} €</span>
            </div>

            <!-- Bases de cotización -->
            <div class="nom-bases">
                <div class="nom-base-item"><span>Base cotiz. C. Comunes:</span><span>${fmt(baseCotizacion)} €</span></div>
                <div class="nom-base-item"><span>Base cotiz. IRPF:</span><span>${fmt(brutoMes)} €</span></div>
            </div>

            <!-- Coste empresa -->
            <div class="nom-coste-empresa">
                <div class="nom-coste-title">
                    <i class="fas fa-building"></i> COSTE TOTAL ESTIMADO PARA LA EMPRESA
                </div>
                <div class="nom-coste-body">
                    <div class="nom-coste-desglose">
                        <div class="nom-coste-fila">
                            <span>Salario bruto mensual</span>
                            <span>${fmt(brutoMes)} €</span>
                        </div>
                        ${prorrataPagasExtras > 0.01 ? `
                        <div class="nom-coste-fila nom-coste-fila--sub">
                            <span>+ Prorrata pagas extras (${numPagas - 12}×/año)</span>
                            <span>${fmt(prorrataPagasExtras)} €</span>
                        </div>` : ''}
                        <div class="nom-coste-fila nom-coste-fila--sub">
                            <span>+ S.S. empresa · CC (23,60%)</span>
                            <span>${fmt(empCC)} €</span>
                        </div>
                        <div class="nom-coste-fila nom-coste-fila--sub">
                            <span>+ Desempleo (5,50%)</span>
                            <span>${fmt(empDesemp)} €</span>
                        </div>
                        <div class="nom-coste-fila nom-coste-fila--sub">
                            <span>+ Form. Profesional (0,60%)</span>
                            <span>${fmt(empFP)} €</span>
                        </div>
                        <div class="nom-coste-fila nom-coste-fila--sub">
                            <span>+ FOGASA (0,20%)</span>
                            <span>${fmt(empFOGASA)} €</span>
                        </div>
                        <div class="nom-coste-fila nom-coste-fila--sub">
                            <span>+ MEI empresa (0,52%)</span>
                            <span>${fmt(empMEI)} €</span>
                        </div>
                        <div class="nom-coste-fila nom-coste-fila--sub">
                            <span>+ AT/EP Farmacia est. (1,50%)</span>
                            <span>${fmt(empAT)} €</span>
                        </div>
                    </div>
                    <div class="nom-coste-totales">
                        <div class="nom-coste-total">
                            <div class="nom-coste-total-label">MENSUAL</div>
                            <div class="nom-coste-total-valor">${fmt(costeTotalMes)} €</div>
                        </div>
                        <div class="nom-coste-total nom-coste-total--anual">
                            <div class="nom-coste-total-label">ANUAL</div>
                            <div class="nom-coste-total-valor">${fmt(costeTotalAnual)} €</div>
                        </div>
                    </div>
                </div>
                <div class="nom-coste-nota">* Estimación orientativa. AT/EP según tarifa CNAE 4773 (farmacias). Puede variar según tipo de contrato y mutua.</div>
            </div>

            <!-- Pie -->
            <div class="nom-footer">
                <div class="nom-firma">
                    <div class="nom-firma-linea"></div>
                    <div>Firma y sello empresa</div>
                </div>
                <div class="nom-disclaimer">
                    ⚠️ Documento orientativo generado por <strong>conveniodefarmacia.com</strong>.<br>
                    No sustituye a la nómina oficial emitida por la empresa.
                </div>
                <button class="nom-print-btn" onclick="window.print()"><i class="fas fa-print"></i> Imprimir</button>
            </div>

        </div>
    </details>`;
}

// ── Desglose mensual (los 12 meses del año) ────────────────────────────────────
function renderizarDesgloseMensual(netoMensual, netoExtra, numPagas, pagasConvenio) {
    const el = document.getElementById('desglose-mensual-container');
    if (!el) return;
    const fmt = v => v.toLocaleString('es-ES', {minimumFractionDigits:0, maximumFractionDigits:0});
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    // Determinar qué meses llevan paga extra
    const mesesExtra = new Set();
    if (numPagas >= 14) { mesesExtra.add(5); mesesExtra.add(11); } // junio y diciembre (índice 0-based)
    if (numPagas === 15) mesesExtra.add(2); // marzo para Asturias (3 extras)

    const filas = meses.map((mes, i) => {
        const esExtra = numPagas !== 12 && mesesExtra.has(i);
        const total = numPagas === 12 ? netoMensual : netoMensual + (esExtra ? netoExtra : 0);
        return `<div class="desglose-mes ${esExtra ? 'desglose-mes--extra' : ''}">
            <span class="desglose-mes__nombre">${mes}</span>
            <span class="desglose-mes__valor">${fmt(total)} €${esExtra ? ' <span class="badge-extra">+Extra</span>' : ''}</span>
        </div>`;
    }).join('');

    el.innerHTML = `
        <details class="comparativa-details" style="margin-top:0.8rem;">
            <summary class="comparativa-summary"><i class="fas fa-calendar-alt"></i> Cobros mes a mes</summary>
            <div class="desglose-meses-grid">${filas}</div>
        </details>`;
}

// ── Slider impacto IRPF ────────────────────────────────────────────────────────
function renderizarSliderIRPF(brutoAnual, ssAnual) {
    const el = document.getElementById('slider-irpf-container');
    if (!el) return;
    const irpfActual = parseFloat(document.getElementById('porcentajeIRPF').value) || 15;
    const calcNeto = (pct) => {
        const irpf = brutoAnual * (pct / 100);
        return brutoAnual - ssAnual - irpf;
    };
    const netoActual = calcNeto(irpfActual);
    const fmt = v => v.toLocaleString('es-ES', {minimumFractionDigits:0, maximumFractionDigits:0});
    el.innerHTML = `
        <details class="comparativa-details" style="margin-top:0.8rem;">
            <summary class="comparativa-summary"><i class="fas fa-sliders-h"></i> Impacto del IRPF en tu neto</summary>
            <div style="padding:0.75rem;">
                <p style="font-size:0.7rem; color:#6b7280; margin:0 0 0.5rem;">Mueve el slider para ver cómo cambia tu neto anual según la retención:</p>
                <input type="range" id="irpf-sim-slider" min="0" max="45" step="0.5" value="${irpfActual}" style="width:100%; accent-color:#059669;">
                <div style="display:flex; justify-content:space-between; font-size:0.65rem; color:#9ca3af; margin-top:2px;"><span>0%</span><span>45%</span></div>
                <div id="irpf-sim-resultado" style="margin-top:0.75rem; text-align:center; font-size:0.9rem; font-weight:700; color:#059669;">${irpfActual}% IRPF → ${fmt(netoActual)} € neto/año</div>
            </div>
        </details>`;

    document.getElementById('irpf-sim-slider').addEventListener('input', function() {
        const pct = parseFloat(this.value);
        const neto = calcNeto(pct);
        document.getElementById('irpf-sim-resultado').textContent = `${pct}% IRPF → ${fmt(neto)} € neto/año`;
    });
}

// ── Calculadora inversa ────────────────────────────────────────────────────────
function initCalculadoraInversa() {
    const btn = document.getElementById('btn-calcular-inversa');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const netoDeseado = parseFloat(document.getElementById('inv-neto-deseado').value) || 0;
        if (netoDeseado <= 0) return;
        const irpfPct = parseFloat(document.getElementById('porcentajeIRPF').value) / 100;
        const totalSSPct = (
            parseFloat(document.getElementById('cotizacionContComu').value) +
            parseFloat(document.getElementById('cotizacionDesempleo').value) +
            parseFloat(document.getElementById('cotizacionMEI').value) +
            parseFloat(document.getElementById('cotizacionFormacion').value)
        ) / 100;
        const numPagas = parseInt(document.getElementById('numPagas').value);
        const convKey = document.getElementById('convenio').value;
        const pagasReales = convKey === 'asturias' ? 15 : 14;

        // netoMes = brutoMes - (brutoMes + prorrata) * SS - brutoMes * IRPF
        // Despejar brutoMes:
        // Si 14 pagas: prorrata = brutoMes * (2/12) aprox
        // netoMes = brutoMes * (1 - IRPF - SS*(1 + (numPagas-12)/12))
        const factorExtra = (numPagas - 12) / 12;
        const divisor = 1 - irpfPct - totalSSPct * (1 + factorExtra);
        const brutoNecesario = netoDeseado / divisor;
        const fmt = v => v.toLocaleString('es-ES', {minimumFractionDigits:2, maximumFractionDigits:2});

        document.getElementById('resultado-inversa').innerHTML = `
            <div class="inversa-resultado">
                <div class="inversa-row">
                    <span>Bruto mensual necesario</span>
                    <span class="inversa-valor">${fmt(brutoNecesario)} €</span>
                </div>
                <div class="inversa-row">
                    <span>Bruto anual (${numPagas} pagas)</span>
                    <span class="inversa-valor">${fmt(brutoNecesario * numPagas)} €</span>
                </div>
                <p class="atrasos-nota">Con IRPF ${(irpfPct*100).toFixed(1)}% y SS ${(totalSSPct*100).toFixed(2)}%</p>
            </div>`;
    });
}

// ── Calculadora bruto libre ────────────────────────────────────────────────────
function initBrutoLibre() {
    const btn = document.getElementById('btn-calcular-bruto');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const brutoAnual = parseFloat(document.getElementById('bl-bruto-anual').value) || 0;
        if (brutoAnual <= 0) return;
        const irpfPct = parseFloat(document.getElementById('bl-irpf').value) / 100;
        const ssPct = parseFloat(document.getElementById('bl-ss').value) / 100;
        const numPagas = parseInt(document.getElementById('bl-pagas').value);
        const netoAnual = brutoAnual * (1 - irpfPct - ssPct);
        const brutoMes = brutoAnual / numPagas;
        const netoMes = netoAnual / numPagas;
        const fmt = v => v.toLocaleString('es-ES', {minimumFractionDigits:2, maximumFractionDigits:2});
        document.getElementById('resultado-bruto-libre').innerHTML = `
            <div class="inversa-resultado" style="margin-top:0.75rem;">
                <div class="inversa-row"><span>Neto mensual (1 de ${numPagas} pagas)</span><span class="inversa-valor" style="color:#059669;">${fmt(netoMes)} €</span></div>
                <div class="inversa-row"><span>Neto anual</span><span class="inversa-valor" style="color:#059669;">${fmt(netoAnual)} €</span></div>
                <div class="inversa-row"><span>Bruto mensual</span><span class="inversa-valor">${fmt(brutoMes)} €</span></div>
                <div class="inversa-row"><span>IRPF anual</span><span class="inversa-valor" style="color:#ef4444;">${fmt(brutoAnual * irpfPct)} €</span></div>
                <div class="inversa-row"><span>SS anual</span><span class="inversa-valor" style="color:#f59e0b;">${fmt(brutoAnual * ssPct)} €</span></div>
            </div>`;
    });
}

// ── Wizard IRPF ────────────────────────────────────────────────────────────────
const wizardState = {};
function initWizardIRPF() {
    document.querySelectorAll('.wizard-opcion').forEach(btn => {
        btn.addEventListener('click', function() {
            const grupo = this.dataset.grupo;
            const val = this.dataset.val;
            wizardState[grupo] = val;
            document.querySelectorAll(`.wizard-opcion[data-grupo="${grupo}"]`).forEach(b => b.classList.remove('wizard-opcion--activo'));
            this.classList.add('wizard-opcion--activo');
            if (wizardState.estado && wizardState.hijos !== undefined && wizardState.salario) {
                calcularWizardIRPF();
            }
        });
    });
}

function calcularWizardIRPF() {
    const { estado, hijos, salario } = wizardState;
    const nHijos = parseInt(hijos) || 0;
    // Tabla orientativa AEAT 2026
    const base = { bajo: 8, medio: 13, alto: 19, muyalto: 28 }[salario] || 15;
    let ajuste = 0;
    if (estado === 'casado_solo') ajuste -= 3;
    if (estado === 'monoparental') ajuste -= 2;
    if (estado === 'casado_conyuge') ajuste -= 1;
    ajuste -= nHijos * 1.5;
    const irpfEstimado = Math.max(2, Math.min(45, base + ajuste));
    const irpfRedondeado = Math.round(irpfEstimado * 2) / 2;

    document.getElementById('resultado-wizard').innerHTML = `
        <div class="wizard-resultado">
            <div class="wizard-resultado__valor">${irpfRedondeado}%</div>
            <div class="wizard-resultado__label">Retención IRPF orientativa</div>
            <button class="wizard-aplicar" onclick="aplicarIRPFWizard(${irpfRedondeado})">
                <i class="fas fa-check"></i> Aplicar este IRPF a mi cálculo
            </button>
            <p class="atrasos-nota">Estimación orientativa según tablas AEAT 2026. Para el dato exacto consulta a tu gestoría o usa el simulador de la AEAT.</p>
        </div>`;
}

function aplicarIRPFWizard(pct) {
    document.getElementById('porcentajeIRPF').value = pct;
    document.getElementById('porcentajeIRPF').dispatchEvent(new Event('input'));
    // Cerrar el details
    const details = document.getElementById('bloque-wizard-irpf');
    if (details) details.open = false;
}

// ── Calculadora de vacaciones ──────────────────────────────────────────────────
function initVacaciones() {
    const hoy = new Date();
    const vacRef = document.getElementById('vac-referencia');
    if (vacRef) vacRef.value = hoy.toISOString().split('T')[0];

    ['vac-alta', 'vac-referencia'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', calcularVacaciones);
    });
}

function calcularVacaciones() {
    const alta = document.getElementById('vac-alta').value;
    const ref  = document.getElementById('vac-referencia').value;
    const el   = document.getElementById('resultado-vacaciones');
    if (!alta || !ref || alta >= ref) { if (el) el.innerHTML = ''; return; }

    const fechaAlta = new Date(alta);
    const fechaRef  = new Date(ref);
    const msAnio = 365.25 * 24 * 3600 * 1000;
    const fraccion = Math.min(1, (fechaRef - fechaAlta) / msAnio);
    const diasGanados = fraccion * 30; // 30 días naturales convenio farmacia
    const diasGanadosR = Math.floor(diasGanados * 10) / 10;

    // Valor económico: neto diario * días
    const netoMensual = parseFloat(
        (document.getElementById('anim-mensual')?.dataset?.valorActual) || 1500
    );
    const valorDia = netoMensual * 12 / 365;
    const valorVac = valorDia * diasGanadosR;
    const fmt = v => v.toLocaleString('es-ES', {minimumFractionDigits:2, maximumFractionDigits:2});

    el.innerHTML = `
        <div class="inversa-resultado" style="margin-top:0.75rem;">
            <div class="inversa-row"><span>Días de vacaciones generados</span><span class="inversa-valor">${diasGanadosR} días</span></div>
            <div class="inversa-row"><span>Valor económico aproximado</span><span class="inversa-valor" style="color:#059669;">${fmt(valorVac)} €</span></div>
            <p class="atrasos-nota">Basado en 30 días naturales/año según el XXV Convenio. Valor calculado sobre tu neto mensual actual.</p>
        </div>`;
}

// ── Estimador de pensión ───────────────────────────────────────────────────────
function initPension() {
    const btn = document.getElementById('btn-calcular-pension');
    if (!btn) return;
    btn.addEventListener('click', calcularPension);
}

function calcularPension() {
    const edadActual = parseFloat(document.getElementById('pen-edad-actual').value) || 35;
    const aniosCotizados = parseFloat(document.getElementById('pen-anios-cotizados').value) || 10;
    const edadJub = parseFloat(document.getElementById('pen-edad-jubilacion').value) || 66.5;
    const baseManual = parseFloat(document.getElementById('pen-base-reguladora').value) || 0;

    // Base reguladora: media de los últimos 25 años (usamos bruto mensual actual como proxy)
    const brutoMesActual = parseFloat(
        document.getElementById('anim-mensual')?.dataset?.valorActual || 1800
    ) / (1 - (parseFloat(document.getElementById('porcentajeIRPF').value)||15)/100
           - (parseFloat(document.getElementById('cotizacionContComu').value)||4.7)/100);
    const baseReguladora = baseManual > 0 ? baseManual : brutoMesActual;

    const aniosFuturos = Math.max(0, edadJub - edadActual);
    const totalAnios = aniosCotizados + aniosFuturos;
    const aniosEfectivos = Math.min(37, totalAnios); // máx 37 años para el 100%

    // Porcentaje según años cotizados (tabla SS 2026)
    let pct;
    if (aniosEfectivos < 15) { pct = 0; }
    else if (aniosEfectivos < 25) { pct = 0.5 + (aniosEfectivos - 15) * 0.03; }
    else if (aniosEfectivos < 37) { pct = 0.8 + (aniosEfectivos - 25) * 0.019; }
    else { pct = 1.0; }

    // Penalización jubilación anticipada
    if (edadJub < 66.5) pct *= 0.92;

    const pension = baseReguladora * pct;
    // Pensión máxima SS 2026 aprox: 3.175 €/mes
    const pensionFinal = Math.min(3175, Math.max(0, pension));
    const pensionMinSS = 900; // pensión mínima contributiva aprox
    const pensionReal = Math.max(pensionMinSS, pensionFinal);

    const tasaSustitucion = (pensionReal / baseReguladora * 100).toFixed(1);
    const fmt = v => v.toLocaleString('es-ES', {minimumFractionDigits:0, maximumFractionDigits:0});

    document.getElementById('resultado-pension').innerHTML = `
        <div class="inversa-resultado" style="margin-top:0.75rem;">
            <div class="inversa-row"><span>Años cotizados al jubilarte</span><span class="inversa-valor">${Math.round(totalAnios)} años</span></div>
            <div class="inversa-row"><span>Base reguladora estimada</span><span class="inversa-valor">${fmt(baseReguladora)} €/mes</span></div>
            <div class="inversa-row"><span>% aplicado (${(pct*100).toFixed(0)}% de la base)</span><span class="inversa-valor">${(pct*100).toFixed(0)}%</span></div>
            <div class="inversa-row"><span><strong>Pensión estimada</strong></span><span class="inversa-valor" style="color:#7c3aed; font-size:1.1rem;">${fmt(pensionReal)} €/mes</span></div>
            <div class="inversa-row"><span>Tasa de sustitución</span><span class="inversa-valor">${tasaSustitucion}%</span></div>
            <p class="atrasos-nota">Estimación muy orientativa. Depende de cotizaciones futuras, actualizaciones de pensiones y normativa vigente al jubilarte. Consulta tu vida laboral en la Seguridad Social.</p>
        </div>`;
}

// ── Horas convenio (constante global) ─────────────────────────────────────────
const HORAS_CONVENIO = 1785;

// ── Actualizar hint de horas bajo el slider de jornada ───────────────────────
function actualizarJornadaHint(pct) {
    const hint = document.getElementById('jornada-horas-hint');
    if (!hint) return;
    const pctNum = parseFloat(pct) || 100;
    const horas  = (pctNum / 100) * HORAS_CONVENIO;
    const horasStr = Number.isInteger(horas)
        ? horas.toLocaleString('es-ES')
        : horas.toFixed(1).replace('.', ',');
    hint.textContent = `${pctNum}% · ${horasStr} h/año`;
}

// ── Slider de jornada + sincronización ────────────────────────────────────────
function initSliderJornada() {
    const input = document.getElementById('porcentaje');
    const slider = document.getElementById('porcentaje-slider');
    if (!input || !slider) return;
    slider.addEventListener('input', () => {
        input.value = slider.value;
        actualizarJornadaHint(slider.value);
        input.dispatchEvent(new Event('input'));
    });
    input.addEventListener('input', () => {
        slider.value = input.value;
        actualizarJornadaHint(input.value);
    });
    // Inicializar hint
    actualizarJornadaHint(input.value);
}

// ── Dark mode ──────────────────────────────────────────────────────────────────
function initDarkMode() {
    const btn = document.getElementById('dark-toggle');
    if (!btn) return;
    if (localStorage.getItem('darkMode') === 'on') {
        document.body.classList.add('dark');
        btn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('darkMode', isDark ? 'on' : 'off');
        btn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// ── Tooltips ───────────────────────────────────────────────────────────────────
function initTooltips() {
    const tooltip = document.getElementById('tooltip-global');
    if (!tooltip) return;
    document.querySelectorAll('.tooltip-trigger').forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            const tip = e.target.dataset.tip;
            if (!tip) return;
            tooltip.textContent = tip;
            tooltip.style.display = 'block';
        });
        el.addEventListener('mousemove', (e) => {
            tooltip.style.left = (e.pageX + 12) + 'px';
            tooltip.style.top  = (e.pageY - 8) + 'px';
        });
        el.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    });
}

// ── Reset cotizaciones ─────────────────────────────────────────────────────────
function initResetCotizaciones() {
    const btn = document.getElementById('btn-reset-cotizaciones');
    if (!btn) return;
    btn.addEventListener('click', () => {
        establecerCotizacionesOficiales();
        calcularSalario();
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// ── Finiquito & Indemnización por despido ──────────────────────────────────────
function initFiniquito() {
    const hoy = new Date().toISOString().split('T')[0];
    const finFecha = document.getElementById('fin-fecha-fin');
    if (finFecha) finFecha.value = hoy;

    const btn = document.getElementById('btn-calcular-finiquito');
    if (btn) btn.addEventListener('click', calcularFiniquito);

    // Botón sincronizar bruto con el convenio
    const btnSync = document.getElementById('btn-fin-sync');
    if (btnSync) {
        btnSync.addEventListener('click', () => {
            const campo = document.getElementById('fin-bruto-anual');
            if (window._finiquitoBrutoAnual && window._finiquitoBrutoAnual > 0) {
                campo.value = Math.round(window._finiquitoBrutoAnual);
                campo.style.borderColor = '#dc2626';
                setTimeout(() => campo.style.borderColor = '', 1200);
            } else {
                campo.placeholder = '⚠️ Calcula primero el sueldo arriba';
            }
        });
    }

    // Resaltar visualmente el radio seleccionado al hacer click
    document.querySelectorAll('input[name="fin-tipo"]').forEach(radio => {
        radio.addEventListener('change', () => {
            document.querySelectorAll('.fin-tipo-opcion').forEach(l => l.classList.remove('fin-tipo-opcion--checked'));
            radio.closest('.fin-tipo-opcion').classList.add('fin-tipo-opcion--checked');
        });
    });
}

function calcularFiniquito() {
    const tipo      = document.querySelector('input[name="fin-tipo"]:checked')?.value || 'improcedente';
    const fechaIni  = document.getElementById('fin-fecha-inicio').value;
    const fechaFin  = document.getElementById('fin-fecha-fin').value;
    const diasVacTomados = parseFloat(document.getElementById('fin-dias-vac').value) || 0;
    const el        = document.getElementById('resultado-finiquito');

    if (!fechaIni || !fechaFin || fechaIni >= fechaFin) {
        el.innerHTML = '<p style="color:#ef4444;font-size:0.75rem;margin-top:0.5rem;">Introduce las fechas correctamente.</p>';
        return;
    }

    // ── Datos salariales desde la calculadora principal ──────────────────────
    const convKey  = document.getElementById('convenio').value;
    const prof     = document.getElementById('profesion').value;
    const anio     = document.getElementById('anio').value;
    const numPagas = parseInt(document.getElementById('numPagas').value);
    const irpfPct  = parseFloat(document.getElementById('porcentajeIRPF').value) / 100;
    const jornPct  = parseFloat(document.getElementById('porcentaje').value) / 100;
    const mejora   = parseFloat(document.getElementById('mejoraSalarial').value) || 0;
    const hNoc     = parseFloat(document.getElementById('numHoras').value) || 0;

    const convData = DATA_CONVENIOS[convKey];
    const row      = convData.tablas[prof][anio] || convData.tablas[prof]['2024'];
    const [base, plus, precioHora, valAnt] = row;

    const numAnt   = parseInt(document.getElementById('antiguedad').value) || 0;
    const importeAnt = convData.tipoAnt === 'quinquenio' ? valAnt * numAnt * jornPct : 0;
    const cpg      = convData.tipoAnt === 'cpg' ? (parseFloat(document.getElementById('cpgImporte')?.value) || 0) : 0;

    let brutoMes   = (base * jornPct) + (plus * jornPct) + mejora + importeAnt + cpg + (hNoc * precioHora);
    let brutoExtra = (base * jornPct) + mejora + importeAnt + cpg;
    const pagasReales = convKey === 'asturias' ? 15 : 14;
    let brutoAnual  = brutoMes * 12 + brutoExtra * (pagasReales - 12);

    // ── Override con bruto anual personalizado ───────────────────────────────
    const brutoAnualCustom = parseFloat(document.getElementById('fin-bruto-anual')?.value) || 0;
    if (brutoAnualCustom > 0) {
        brutoAnual = brutoAnualCustom;
        // Aproximación: distribuir uniformemente entre todas las pagas
        brutoMes   = brutoAnualCustom / pagasReales;
        brutoExtra = brutoAnualCustom / pagasReales;
    }

    // Salario diario según ET: salario_anual / 365
    const salarioDiario    = brutoAnual / 365;
    // Mensualidad legal para el cómputo del tope: salario_anual / 12
    const salMensCompleto  = brutoAnual / 12;

    // ── Antigüedad real ──────────────────────────────────────────────────────
    const inicio  = new Date(fechaIni);
    const fin     = new Date(fechaFin);
    const msTot   = fin - inicio;
    const diasTot = Math.floor(msTot / 86400000);
    const aniosTrabajados = diasTot / 365.25;
    const aniosCompletos  = Math.floor(aniosTrabajados);
    const mesesRest       = Math.round((aniosTrabajados - aniosCompletos) * 12);

    const fmt = v => v.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // ── INDEMNIZACIÓN ────────────────────────────────────────────────────────
    let indemnizacion = 0;
    let notaIndem     = '';
    let detalleIndem  = '';
    const fechaReforma = new Date('2012-02-12');

    if (tipo !== 'disciplinario') {
        const diasIndem = tipo === 'objetivo' ? 20 : 33;
        const maxMens   = tipo === 'objetivo' ? 12 : 24;

        if (tipo === 'improcedente' && inicio < fechaReforma) {
            // Régimen transitorio: 45 días/año antes de la reforma, 33 después
            const msPre   = Math.min(fechaReforma - inicio, msTot);
            const msPost  = Math.max(0, msTot - msPre);
            const aniosPre  = msPre / (365.25 * 86400000);
            const aniosPost = msPost / (365.25 * 86400000);

            const indemPre  = salarioDiario * 45 * aniosPre;
            const indemPost = salarioDiario * 33 * aniosPost;
            const totalSinCap = indemPre + indemPost;
            const cap = salMensCompleto * maxMens;
            indemnizacion = Math.min(totalSinCap, cap);

            detalleIndem = `45 días×${aniosPre.toFixed(2)} años (pre-reform.) = ${fmt(indemPre)} €  |  33 días×${aniosPost.toFixed(2)} años = ${fmt(indemPost)} €`;
            if (totalSinCap > cap) notaIndem = `Limitada al máximo legal de ${maxMens} mensualidades (${fmt(cap)} €).`;
        } else {
            const totalSinCap = salarioDiario * diasIndem * aniosTrabajados;
            const cap = salMensCompleto * maxMens;
            indemnizacion = Math.min(totalSinCap, cap);
            detalleIndem  = `${diasIndem} días × ${aniosTrabajados.toFixed(2)} años × ${fmt(salarioDiario)} €/día`;
            if (totalSinCap > cap) notaIndem = `Limitada al máximo legal de ${maxMens} mensualidades (${fmt(cap)} €).`;
        }
    }

    // ── VACACIONES NO DISFRUTADAS ────────────────────────────────────────────
    // Generadas en el año actual (proporcional a días trabajados desde 1-ene o desde alta si es el primer año)
    const inicioAnio     = new Date(fin.getFullYear(), 0, 1);
    const inicioEfectivo = inicio > inicioAnio ? inicio : inicioAnio;
    const diasTrabajadosAnio = Math.floor((fin - inicioEfectivo) / 86400000) + 1;
    const vacGeneradas   = Math.min(30, parseFloat((diasTrabajadosAnio / 365 * 30).toFixed(1)));
    const vacPendientes  = Math.max(0, parseFloat((vacGeneradas - diasVacTomados).toFixed(1)));
    const valorVacaciones = vacPendientes * salarioDiario;

    // ── PRORRATA PAGAS EXTRAS ────────────────────────────────────────────────
    // Solo si el convenio tiene pagas separadas (numPagas > 12)
    let prorrataPagas = 0;
    let detalleProrrata = '';
    if (numPagas > 12) {
        const mesD = fin.getMonth();    // 0-based
        const diaD = fin.getDate();
        const diasEnMesD = new Date(fin.getFullYear(), mesD + 1, 0).getDate();
        const fracMes = diaD / diasEnMesD;

        if (pagasReales === 15) {
            // Asturias: Marzo(ene-mar), Junio(abr-jun), Diciembre(jul-dic)
            const extras15 = [
                { label: 'Marzo',      start: 0, end: 2, meses: 3 },
                { label: 'Junio',      start: 3, end: 5, meses: 3 },
                { label: 'Diciembre',  start: 6, end: 11, meses: 6 }
            ];
            extras15.forEach(({ label, start, end, meses }) => {
                if (mesD < start) return;        // aún no ha empezado el período
                if (mesD > end) return;           // ya se cobró esa paga
                const m = (mesD - start) + fracMes;
                prorrataPagas += brutoExtra * (Math.min(m, meses) / meses);
                detalleProrrata += `${label}: ${fmt(brutoExtra * Math.min(m, meses) / meses)} €  `;
            });
        } else {
            // 14 pagas: Junio(ene-jun), Diciembre(jul-dic)
            if (mesD < 6) {
                // Junio aún no cobrado
                const m = mesD + fracMes;
                const pJun = brutoExtra * (m / 6);
                prorrataPagas += pJun;
                detalleProrrata += `Paga jun.: ${fmt(pJun)} €  `;
            }
            if (mesD >= 6) {
                // Diciembre pendiente
                const m = (mesD - 6) + fracMes;
                const pDic = brutoExtra * (m / 6);
                prorrataPagas += pDic;
                detalleProrrata += `Paga dic.: ${fmt(pDic)} €`;
            }
        }
    }

    // ── SALARIO DÍAS TRABAJADOS DEL MES DEL DESPIDO ─────────────────────────
    const mesD2      = fin.getMonth();
    const diaD2      = fin.getDate();
    const diasEnMes2 = new Date(fin.getFullYear(), mesD2 + 1, 0).getDate();
    // Si numPagas=12, usar bruto prorrateado (extras ya embebidas en mensual)
    const brutoMesEfectivo = numPagas === 12 ? brutoAnual / 12 : brutoMes;
    const partesMes = brutoMesEfectivo * (diaD2 / diasEnMes2);

    // ── TOTALES ──────────────────────────────────────────────────────────────
    const partesProporcionalesBruto = partesMes + valorVacaciones + prorrataPagas;
    // Indemnización: exenta de IRPF hasta límite legal
    // Partes proporcionales: sujetas a IRPF ordinario
    const partesProporcionalesNeto  = partesProporcionalesBruto * (1 - irpfPct);
    const totalBruto = indemnizacion + partesProporcionalesBruto;
    const totalNeto  = indemnizacion + partesProporcionalesNeto;

    // ── RENDER ───────────────────────────────────────────────────────────────
    const nombreTipo = { disciplinario: 'Disciplinario', objetivo: 'Objetivo / Procedente', improcedente: 'Improcedente' }[tipo];

    el.innerHTML = `
        <div class="finiquito-resultado">

            <div class="finiquito-header">
                <span>⏱️ Antigüedad: <strong>${aniosCompletos} año${aniosCompletos !== 1 ? 's' : ''}${mesesRest > 0 ? ` y ${mesesRest} mes${mesesRest !== 1 ? 'es' : ''}` : ''}</strong></span>
                <span>📆 Salario día: <strong>${fmt(salarioDiario)} €</strong>${brutoAnualCustom > 0 ? ' <span style="font-size:0.6rem;opacity:0.75">(personalizado)</span>' : ''}</span>
            </div>

            ${tipo !== 'disciplinario' ? `
            <div class="finiquito-bloque">
                <div class="finiquito-titulo">💰 Indemnización — ${nombreTipo}</div>
                <div class="finiquito-fila">
                    <span style="font-size:0.72rem; color:#6b7280;">${detalleIndem}</span>
                    <span class="finiquito-valor" style="color:#dc2626;">${fmt(indemnizacion)} €</span>
                </div>
                ${notaIndem ? `<div class="finiquito-nota">${notaIndem}</div>` : ''}
                <div class="finiquito-nota irpf-exenta">✅ Exenta de IRPF hasta el límite legal establecido en el ET</div>
            </div>` : `
            <div class="finiquito-bloque finiquito-bloque--cero">
                <div class="finiquito-titulo">🚫 Despido disciplinario — sin indemnización</div>
                <div class="finiquito-nota">El despido disciplinario (art. 54 ET) no genera derecho a indemnización si la empresa acredita el incumplimiento grave.</div>
            </div>`}

            <div class="finiquito-bloque">
                <div class="finiquito-titulo">📅 Salario días trabajados en ${['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][mesD2]} (${diaD2} de ${diasEnMes2} días)</div>
                <div class="finiquito-fila">
                    <span style="font-size:0.72rem; color:#6b7280;">${fmt(brutoMesEfectivo)} € × ${diaD2}/${diasEnMes2}</span>
                    <span class="finiquito-valor">${fmt(partesMes)} €</span>
                </div>
            </div>

            <div class="finiquito-bloque">
                <div class="finiquito-titulo">🏖️ Vacaciones no disfrutadas — ${vacPendientes.toFixed(1)} días (de ${vacGeneradas} generados este año)</div>
                <div class="finiquito-fila">
                    <span style="font-size:0.72rem; color:#6b7280;">${vacPendientes.toFixed(1)} días × ${fmt(salarioDiario)} €/día</span>
                    <span class="finiquito-valor">${fmt(valorVacaciones)} €</span>
                </div>
            </div>

            ${numPagas > 12 ? `
            <div class="finiquito-bloque">
                <div class="finiquito-titulo">🎁 Prorrata pagas extras pendientes</div>
                <div class="finiquito-fila">
                    <span style="font-size:0.72rem; color:#6b7280;">${detalleProrrata || 'Parte proporcional no cobrada'}</span>
                    <span class="finiquito-valor">${fmt(prorrataPagas)} €</span>
                </div>
            </div>` : ''}

            <div class="finiquito-total">
                <div class="finiquito-total-row">
                    <span>TOTAL BRUTO FINIQUITO</span>
                    <span class="finiquito-total-valor">${fmt(totalBruto)} €</span>
                </div>
                <div class="finiquito-total-row finiquito-total-row--neto">
                    <span>Neto estimado (IRPF ${(irpfPct * 100).toFixed(1)}% sobre partes proporcionales)</span>
                    <span class="finiquito-total-valor">${fmt(totalNeto)} €</span>
                </div>
            </div>

            <p class="atrasos-nota" style="padding:0.6rem 0.8rem; margin:0; background:#fff;">
                ⚠️ La indemnización por despido está exenta de IRPF hasta el mínimo legal. Las partes proporcionales (salario, vacaciones y prorrata extras) tributan a tu tipo habitual. Estimación orientativa — consulta a tu asesoría laboral o sindicato.
            </p>
        </div>
    `;
}

// ── Horas anuales: conversor y balance ────────────────────────────────────────
function formatHorasMin(h) {
    const horas = Math.floor(h);
    const min   = Math.round((h - horas) * 60);
    return min > 0 ? `${horas}h ${min}min` : `${horas}h`;
}

function initHorasAnuales() {
    const pctInput       = document.getElementById('h-pct-input');
    const horasInput     = document.getElementById('h-horas-input');
    const semanaInput    = document.getElementById('h-horas-semana');
    const temporalCheck  = document.getElementById('h-temporal-check');
    const temporalFields = document.getElementById('h-temporal-fields');
    const resultado      = document.getElementById('h-conversor-resultado');
    const btnAplicar     = document.getElementById('btn-h-aplicar');
    const btnBalance     = document.getElementById('btn-h-balance');
    if (!pctInput) return;

    // Horas semanales de jornada completa según el convenio:
    // Las 1785 h/año se reparten sobre las semanas efectivamente trabajadas.
    //
    // ▸ Farmacia abierta TODOS los días del año:
    //   52 sem − 4,4 sem vacaciones (30 días nat.) = 47,6 sem → 1785 ÷ 47,6 = 37,5 h/sem
    //
    // ▸ Farmacia que cierra domingos + festivos (12 festivos laborables = 2,4 sem):
    //   47,6 sem − 2,4 sem festivos = 45,2 sem → 1785 ÷ 45,2 = 39,49 h/sem
    //
    // En ambos casos las 1785 h/año son las mismas; lo que varía es en cuántas
    // semanas reales se distribuyen.

    const DIAS_VACACIONES    = 30;                              // días naturales de vacaciones
    const SEMANAS_VACACIONES = DIAS_VACACIONES / 7;             // = 4,286 semanas
    // Constantes fijas de jornada
    const SEMANAS_EFECTIVAS_TOTAL = HORAS_CONVENIO / 37.5;  // = 47,6 sem (abierta todos los días)
    const FESTIVOS_LABORABLES     = 12;                      // festivos en día laborable
    const SEMANAS_FESTIVOS        = FESTIVOS_LABORABLES / 5; // = 2,4 sem (semana laboral = 5 días)

    // Selector de tipo de apertura (si existe en el HTML)
    const aperturaEl  = document.getElementById('h-apertura');
    const horasHint   = semanaInput ? semanaInput.closest('.input-group')?.querySelector('.horas-hint') : null;

    // Actualiza el placeholder del campo h/sem y el texto del hint según el tipo de apertura
    function actualizarPlaceholderSemana() {
        const { horasSemanaCompleto } = getConfigJornada();
        const cierraFestivos = aperturaEl && aperturaEl.value === 'cierra_festivos';
        const etiqueta = cierraFestivos
            ? `Jornada completa (cierra festivos): <strong>${horasSemanaCompleto.toFixed(2).replace('.', ',')} h/sem</strong>`
            : `Jornada completa (todos los días): <strong>${horasSemanaCompleto.toFixed(1).replace('.', ',')} h/sem</strong>`;
        if (semanaInput) {
            semanaInput.placeholder = `Jornada completa = ${horasSemanaCompleto.toFixed(2).replace('.', ',')} h/sem`;
        }
        if (horasHint) {
            horasHint.innerHTML = cierraFestivos
                ? `Jornada completa (cierra domingos + 12 festivos): <strong>39,49 h/sem</strong> · 1.785 h ÷ 45,2 semanas efectivas`
                : `Jornada completa (abierta todos los días): <strong>37,5 h/sem</strong> · 1.785 h ÷ 47,6 semanas efectivas`;
        }
    }

    // Función auxiliar: recalcula h/sem según el selector de apertura en cada llamada
    function getConfigJornada() {
        const cierraFestivos = aperturaEl && aperturaEl.value === 'cierra_festivos';
        const semanasEfectivas = cierraFestivos
            ? SEMANAS_EFECTIVAS_TOTAL - SEMANAS_FESTIVOS   // 47,6 − 2,4 = 45,2 sem
            : SEMANAS_EFECTIVAS_TOTAL;                     // 47,6 sem
        return {
            semanasEfectivas,
            horasSemanaCompleto: HORAS_CONVENIO / semanasEfectivas
            // → 37,5 h/sem (abierta todos los días) ó 39,49 h/sem (cierra festivos)
        };
    }

    function getDiasContrato() {
        const inicio = document.getElementById('h-fecha-inicio').value;
        const fin    = document.getElementById('h-fecha-fin').value;
        if (!inicio || !fin) return null;
        const ms = new Date(fin) - new Date(inicio);
        if (ms < 0) return null;
        return Math.round(ms / (1000 * 60 * 60 * 24)) + 1;
    }

    function getHorasAnualesBase(pct) {
        if (temporalCheck.checked) {
            const dias = getDiasContrato();
            if (!dias) return null;
            return (pct / 100) * HORAS_CONVENIO * (dias / 365);
        }
        return (pct / 100) * HORAS_CONVENIO;
    }

    function actualizarConversor() {
        const pct     = parseFloat(pctInput.value);
        const horas   = parseFloat(horasInput.value);
        const semanas = semanaInput ? parseFloat(semanaInput.value) : NaN;
        const active  = document.activeElement;

        // Recalcular h/sem según el tipo de apertura seleccionado
        const { horasSemanaCompleto: HORAS_SEMANA_COMPLETO } = getConfigJornada();

        let pctFinal = null, horasFinal = null, semanasFinal = null;

        if (active === pctInput) {
            // FUENTE: % — solo actuar si hay valor válido
            if (!isNaN(pct) && pct > 0) {
                horasFinal = getHorasAnualesBase(pct);
                if (horasFinal !== null) {
                    pctFinal     = pct;
                    semanasFinal = (pct / 100) * HORAS_SEMANA_COMPLETO;
                    horasInput.value  = Math.round(horasFinal * 2) / 2;
                    if (semanaInput) semanaInput.value = Math.round(semanasFinal * 2) / 2;
                }
            }
            // Si pctInput está vacío: no tocar nada, el if final ocultará el resultado

        } else if (active === horasInput) {
            // FUENTE: horas anuales — si está vacío, no sobreescribir
            if (!isNaN(horas) && horas > 0) {
                const dias = temporalCheck.checked ? getDiasContrato() : null;
                const horasRef = temporalCheck.checked
                    ? (dias ? HORAS_CONVENIO * (dias / 365) : null)
                    : HORAS_CONVENIO;
                if (horasRef) {
                    pctFinal     = (horas / horasRef) * 100;
                    horasFinal   = horas;
                    semanasFinal = (pctFinal / 100) * HORAS_SEMANA_COMPLETO;
                    pctInput.value    = Math.round(pctFinal * 10) / 10;
                    if (semanaInput) semanaInput.value = Math.round(semanasFinal * 2) / 2;
                }
            }
            // Si horasInput está vacío: NO recalcular desde pct (dejar que el usuario borre)

        } else if (semanaInput && active === semanaInput) {
            // FUENTE: horas/semana — si está vacío, no sobreescribir
            if (!isNaN(semanas) && semanas > 0) {
                pctFinal     = (semanas / HORAS_SEMANA_COMPLETO) * 100;
                horasFinal   = getHorasAnualesBase(pctFinal) ?? (pctFinal / 100) * HORAS_CONVENIO;
                semanasFinal = semanas;
                pctInput.value   = Math.round(pctFinal * 10) / 10;
                horasInput.value = Math.round(horasFinal * 2) / 2;
            }
            // Si semanaInput está vacío: NO recalcular

        } else {
            // Sin foco en ninguno de nuestros campos: recalcular pasivamente desde pct
            if (!isNaN(pct) && pct > 0) {
                horasFinal = getHorasAnualesBase(pct);
                if (horasFinal !== null) {
                    pctFinal     = pct;
                    semanasFinal = (pct / 100) * HORAS_SEMANA_COMPLETO;
                    horasInput.value  = Math.round(horasFinal * 2) / 2;
                    if (semanaInput) semanaInput.value = Math.round(semanasFinal * 2) / 2;
                }
            }
        }

        if (pctFinal !== null && horasFinal !== null) {
            const horasStr = horasFinal.toFixed(1).replace('.', ',').replace(/,0$/, '');
            const pctStr   = pctFinal.toFixed(1).replace(/\.0$/, '');
            const semStr   = semanasFinal !== null
                ? (Math.round(semanasFinal * 2) / 2).toFixed(1).replace('.', ',').replace(/,0$/, '')
                : null;
            let textoTemporal = '';
            if (temporalCheck.checked) {
                const dias = getDiasContrato();
                textoTemporal = dias ? ` · contrato de ${dias} días` : '';
            }
            resultado.style.display = 'block';
            resultado.innerHTML = `
                <div class="horas-conv-resultado">
                    <span class="horas-conv-pct">${pctStr}%</span>
                    <span class="horas-conv-sep">·</span>
                    <span class="horas-conv-horas">${horasStr} h/año</span>
                    ${semStr ? `<span class="horas-conv-sep">·</span><span class="horas-conv-semana">${semStr} h/sem</span>` : ''}
                    ${textoTemporal ? `<span class="horas-conv-temporal">${textoTemporal}</span>` : ''}
                </div>`;
            btnAplicar.style.display = 'flex';
            btnAplicar.dataset.pct = pctFinal.toFixed(2);
        } else {
            resultado.style.display = 'none';
            btnAplicar.style.display = 'none';
        }
    }

    pctInput.addEventListener('input', actualizarConversor);
    horasInput.addEventListener('input', actualizarConversor);
    if (semanaInput) semanaInput.addEventListener('input', actualizarConversor);
    if (aperturaEl) aperturaEl.addEventListener('change', () => {
        actualizarPlaceholderSemana();
        actualizarConversor();
    });
    // Inicializar placeholder al cargar
    actualizarPlaceholderSemana();

    temporalCheck.addEventListener('change', () => {
        temporalFields.style.display = temporalCheck.checked ? 'block' : 'none';
        if (!temporalCheck.checked) {
            document.getElementById('h-fecha-inicio').value = '';
            document.getElementById('h-fecha-fin').value = '';
        }
        actualizarConversor();
    });

    document.getElementById('h-fecha-inicio').addEventListener('change', actualizarConversor);
    document.getElementById('h-fecha-fin').addEventListener('change', actualizarConversor);

    btnAplicar.addEventListener('click', () => {
        const pct = parseFloat(btnAplicar.dataset.pct);
        if (!isNaN(pct)) {
            const pctRedondeado = Math.min(100, Math.max(1, Math.round(pct)));
            document.getElementById('porcentaje').value = pctRedondeado;
            document.getElementById('porcentaje-slider').value = pctRedondeado;
            actualizarJornadaHint(pctRedondeado);
            document.getElementById('porcentaje').dispatchEvent(new Event('input'));
            const txt = btnAplicar.innerHTML;
            btnAplicar.innerHTML = '<i class="fas fa-check"></i> ¡Aplicado a la nómina!';
            btnAplicar.style.background = 'linear-gradient(135deg,#059669,#047857)';
            setTimeout(() => { btnAplicar.innerHTML = txt; }, 2200);
        }
    });

    if (btnBalance) {
        btnBalance.addEventListener('click', calcularBalanceHoras);
    }

    // Marcar precio/hora como editado por el usuario si lo toca manualmente
    const precioHoraInput = document.getElementById('h-precio-hora');
    if (precioHoraInput) {
        precioHoraInput.addEventListener('input', () => {
            precioHoraInput.dataset.userSet = 'true';
        });
    }
}

function calcularBalanceHoras() {
    const realizadasInput = document.getElementById('h-realizadas');
    const precioHoraInput = document.getElementById('h-precio-hora');
    const resultado       = document.getElementById('h-balance-resultado');
    const temporalCheck   = document.getElementById('h-temporal-check');

    const hRealizadas = parseFloat(realizadasInput.value);
    if (isNaN(hRealizadas) || hRealizadas < 0) {
        resultado.innerHTML = '<p class="horas-error">Introduce las horas realizadas.</p>';
        return;
    }

    const jornPct = parseFloat(document.getElementById('porcentaje').value) / 100;
    let horasCorr;

    if (temporalCheck && temporalCheck.checked) {
        const inicio = document.getElementById('h-fecha-inicio').value;
        const fin    = document.getElementById('h-fecha-fin').value;
        if (!inicio || !fin) {
            resultado.innerHTML = '<p class="horas-error">Para el balance con contrato temporal, introduce primero las fechas en el conversor de arriba.</p>';
            return;
        }
        const dias = Math.round((new Date(fin) - new Date(inicio)) / (1000 * 60 * 60 * 24)) + 1;
        horasCorr = jornPct * HORAS_CONVENIO * (dias / 365);
    } else {
        horasCorr = jornPct * HORAS_CONVENIO;
    }

    const diferencia = hRealizadas - horasCorr;
    const precioHora = parseFloat(precioHoraInput.value) || 0;
    const horasCorrStr = horasCorr.toFixed(1).replace('.', ',');
    const hRealizadasStr = hRealizadas.toFixed(1).replace('.', ',');

    // Balance equilibrado (±0.1h de margen)
    if (Math.abs(diferencia) < 0.1) {
        resultado.innerHTML = `
            <div class="horas-balance horas-balance--ok">
                <span class="horas-balance__icon">✅</span>
                <div><strong>Balance perfecto</strong><br>Has realizado exactamente las ${horasCorrStr} h que te corresponden.</div>
            </div>`;
        return;
    }

    // Horas pendientes
    if (diferencia < 0) {
        const pendientes = Math.abs(diferencia).toFixed(1).replace('.', ',');
        resultado.innerHTML = `
            <div class="horas-balance horas-balance--pendiente">
                <span class="horas-balance__icon">📋</span>
                <div>
                    <strong>Te quedan ${pendientes} horas por realizar</strong><br>
                    Llevas ${hRealizadasStr} h de las ${horasCorrStr} h que te corresponden este año.
                </div>
            </div>`;
        return;
    }

    // Horas extra
    const extra     = diferencia;
    const extraStr  = extra.toFixed(1).replace('.', ',');
    const esAlerta  = extra > 80;

    let html = `
        <div class="horas-balance ${esAlerta ? 'horas-balance--alerta' : 'horas-balance--extra'}">
            <span class="horas-balance__icon">${esAlerta ? '🚨' : '⚡'}</span>
            <div>
                <strong>${esAlerta ? '⚠️ LÍMITE LEGAL SUPERADO · ' : ''}${extraStr} horas extra realizadas</strong><br>
                ${esAlerta
                    ? `<span class="horas-alerta-texto">Has superado el máximo legal de 80 horas extraordinarias al año. Debes comunicarlo a tu empresa.</span>`
                    : `Has hecho ${extraStr} h sobre tus ${horasCorrStr} h contratadas.`}
            </div>
        </div>`;

    // Tabla de compensación en tiempo
    const tipos = [
        { label: 'Diurnas laborables',  ratio: 1.75 },
        { label: 'Nocturnas laborables', ratio: 2.00 },
        { label: 'Diurnas festivas',    ratio: 2.00 },
        { label: 'Nocturnas festivas',  ratio: 2.50 },
    ];

    let filasT = tipos.map(t => `
        <tr>
            <td>${t.label}</td>
            <td>1h → ${formatHorasMin(t.ratio)}</td>
            <td><strong>${formatHorasMin(extra * t.ratio)}</strong></td>
        </tr>`).join('');

    let filasE = precioHora > 0 ? tipos.map(t => `
        <tr>
            <td>${t.label}</td>
            <td><strong>${(extra * precioHora).toFixed(2).replace('.', ',')} €</strong></td>
        </tr>`).join('') : '';

    html += `
        <div class="horas-comp">
            <p class="horas-comp__titulo"><i class="fas fa-exchange-alt"></i> Opciones de compensación</p>
            <div class="horas-comp__opciones">
                <div class="horas-comp__opcion">
                    <strong>🕐 En tiempo de descanso</strong>
                    <table class="horas-comp__tabla">
                        <thead><tr><th>Tipo de hora</th><th>Equivalencia</th><th>Tu descanso</th></tr></thead>
                        <tbody>${filasT}</tbody>
                    </table>
                </div>
                <div class="horas-comp__opcion">
                    <strong>💶 En dinero${precioHora > 0 ? ` · ${precioHora.toFixed(2).replace('.', ',')} €/h` : ''}</strong>
                    ${precioHora > 0
                        ? `<table class="horas-comp__tabla">
                            <thead><tr><th>Tipo de hora</th><th>Importe total</th></tr></thead>
                            <tbody>${filasE}</tbody>
                           </table>`
                        : `<p class="horas-comp__sin-precio">Introduce el precio/hora arriba para ver el importe.</p>`}
                </div>
            </div>
            <p class="horas-comp__legal">⚖️ Límite legal: máximo <strong>80 horas extra/año</strong>. El trabajador puede elegir entre descanso compensatorio o retribución económica.</p>
        </div>`;

    resultado.innerHTML = html;
}

// ── Navegación por pestañas + hub de tarjetas ─────────────────────────────────
function initTabsHub() {
    const tabs   = document.querySelectorAll('.tools-tab');
    const panels = document.querySelectorAll('.tools-panel');
    const cards  = document.querySelectorAll('.tool-card');
    const closes = document.querySelectorAll('.tool-content__close');

    // Cambiar de pestaña
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t  => t.classList.remove('tools-tab--active'));
            panels.forEach(p => p.classList.remove('tools-panel--active'));
            tab.classList.add('tools-tab--active');
            const target = document.querySelector(`.tools-panel[data-panel="${tab.dataset.tab}"]`);
            if (target) target.classList.add('tools-panel--active');
            // Cerrar tool-content al cambiar pestaña
            document.querySelectorAll('.tool-content').forEach(c => c.style.display = 'none');
            document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('tool-card--active'));
        });
    });

    // Abrir/cerrar herramienta desde tarjeta (acordeón dentro del panel)
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const toolId  = card.dataset.tool;
            const content = document.getElementById(toolId);
            if (!content) return;

            const isOpen = content.style.display === 'block';
            const panel  = card.closest('.tools-panel');

            // Cerrar todo en el panel activo
            panel.querySelectorAll('.tool-content').forEach(c => c.style.display = 'none');
            panel.querySelectorAll('.tool-card').forEach(c => c.classList.remove('tool-card--active'));

            if (!isOpen) {
                content.style.display = 'block';
                card.classList.add('tool-card--active');
                setTimeout(() => content.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
            }
        });
    });

    // Botones cerrar (×)
    closes.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.tool-content').style.display = 'none';
            document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('tool-card--active'));
        });
    });
}

// ── Situación Especial: IT Enfermedad Común y Maternidad/Paternidad ──────────
function initSituacionEspecial() {
    const selector = document.getElementById('situacionEspecial');
    const camposIT = document.getElementById('campos-it');
    const camposMat = document.getElementById('campos-maternidad');
    const btnIT = document.getElementById('btn-calcular-it');
    const btnMat = document.getElementById('btn-calcular-mat');
    if (!selector) return;

    // Inicializar fecha fin IT con hoy
    const hoy = new Date().toISOString().split('T')[0];
    const itFechaFin = document.getElementById('it-fecha-fin');
    if (itFechaFin) itFechaFin.value = hoy;

    selector.addEventListener('change', () => {
        const val = selector.value;
        camposIT.style.display = val === 'it-comun' ? 'block' : 'none';
        camposMat.style.display = val === 'maternidad' ? 'block' : 'none';
    });

    if (btnIT) btnIT.addEventListener('click', calcularNominaIT);
    if (btnMat) btnMat.addEventListener('click', calcularNominaMaternidad);
}

function _getDatosSalariales() {
    const convKey    = document.getElementById('convenio').value;
    const prof       = document.getElementById('profesion').value;
    const anio       = document.getElementById('anio').value;
    const jornPct    = parseFloat(document.getElementById('porcentaje').value) / 100;
    const numPagas   = parseInt(document.getElementById('numPagas').value);
    const mejora     = parseFloat(document.getElementById('mejoraSalarial').value) || 0;
    const hNoc       = parseFloat(document.getElementById('numHoras').value) || 0;
    const irpfPct    = parseFloat(document.getElementById('porcentajeIRPF').value) / 100;
    const totalSSPct = (
        parseFloat(document.getElementById('cotizacionContComu').value) +
        parseFloat(document.getElementById('cotizacionDesempleo').value) +
        parseFloat(document.getElementById('cotizacionMEI').value) +
        parseFloat(document.getElementById('cotizacionFormacion').value)
    ) / 100;
    const convData   = DATA_CONVENIOS[convKey];
    const row        = convData.tablas[prof][anio] || convData.tablas[prof]['2024'];
    const [base, plus, precioHora, valAnt] = row;
    const numAnt     = parseInt(document.getElementById('antiguedad').value) || 0;
    const importeAnt = convData.tipoAnt === 'quinquenio' ? valAnt * numAnt * jornPct : 0;
    const cpg        = convData.tipoAnt === 'cpg' ? (parseFloat(document.getElementById('cpgImporte')?.value) || 0) : 0;
    const pagasReales = convKey === 'asturias' ? 15 : 14;
    const brutoMes   = (base * jornPct) + (plus * jornPct) + mejora + importeAnt + cpg + (hNoc * precioHora);
    const brutoExtra = (base * jornPct) + mejora + importeAnt + cpg;
    const prorrata   = brutoExtra * (pagasReales - 12) / 12;
    const baseCotCC  = brutoMes + prorrata;
    const baseRegDia = baseCotCC / 30;
    return { brutoMes, brutoExtra, baseCotCC, baseRegDia, irpfPct, totalSSPct, numPagas, pagasReales };
}

function calcularNominaIT() {
    const resultado     = document.getElementById('resultado-it');
    const fechaIniVal   = document.getElementById('it-fecha-inicio').value;
    const fechaFinVal   = document.getElementById('it-fecha-fin').value;
    const hospitalizado = document.getElementById('it-hospitalizacion').checked;

    if (!fechaIniVal || !fechaFinVal || fechaIniVal > fechaFinVal) {
        resultado.innerHTML = '<p class="sit-error">Introduce las fechas de la baja correctamente.</p>';
        return;
    }

    const fechaIni  = new Date(fechaIniVal);
    const fechaFin  = new Date(fechaFinVal);
    const diasBaja  = Math.round((fechaFin - fechaIni) / 86400000) + 1;
    const { brutoMes, baseCotCC, baseRegDia, irpfPct, totalSSPct } = _getDatosSalariales();
    const fmt = v => v.toLocaleString('es-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2});

    // ── Tramos por días de baja ──────────────────────────────────────────────
    const d1 = Math.min(diasBaja, 3);                    // días 1–3 → 0%
    const d2 = Math.max(0, Math.min(diasBaja, 20) - 3);  // días 4–20 → 60%
    const d3 = Math.max(0, diasBaja - 20);               // días 21+ → 75%

    const imp2 = d2 * baseRegDia * 0.60;
    const imp3 = d3 * baseRegDia * 0.75;
    const totalSS = imp2 + imp3;

    let compConv = 0;
    if (hospitalizado) {
        compConv = d1 * baseRegDia * 1.00
                 + d2 * baseRegDia * 0.40
                 + d3 * baseRegDia * 0.25;
    }
    const totalBruto = totalSS + compConv;

    // ── Nómina mensual durante el mes de baja ────────────────────────────────
    // Asumimos que la baja cae dentro de UN mes (caso típico)
    // Días trabajados normales en ese mes + días en baja
    const diasMes       = 30; // base convenio
    const diasNormales  = diasMes - diasBaja;
    const diasNormales_ = Math.max(0, diasNormales);

    // Parte proporcional del salario por días trabajados normalmente
    const salarioDiario  = brutoMes / diasMes;
    const brutoTrabajado = salarioDiario * diasNormales_;

    // Prestación IT del mes (bruto, tributa IRPF pero NO cotiza SS por el trabajador)
    const prestacionMes = (totalBruto / diasBaja) * Math.min(diasBaja, diasMes);

    // Desglose de la nómina mensual
    const brutoNominaMes  = brutoTrabajado + prestacionMes;

    // SS: solo sobre los días trabajados (la prestación no cotiza para el trabajador)
    const baseCotMes      = baseCotCC * (diasNormales_ / diasMes);
    const descuentoSS     = baseCotMes * totalSSPct;

    // IRPF: sobre todo el bruto (prestación IT sí tributa)
    const descuentoIRPF   = brutoNominaMes * irpfPct;

    const netoMes         = brutoNominaMes - descuentoSS - descuentoIRPF;

    // Neto mensual normal (sin baja) para comparar
    const netoNormalMes   = brutoMes - baseCotCC * totalSSPct - brutoMes * irpfPct;
    const diferenciaNeta  = netoNormalMes - netoMes;

    // ── HTML ─────────────────────────────────────────────────────────────────
    resultado.innerHTML = `
        <div class="sit-resultado">
            <div class="sit-resultado__header">
                <span>📅 Baja de <strong>${diasBaja} día${diasBaja > 1 ? 's' : ''}</strong></span>
                ${hospitalizado ? '<span class="sit-badge sit-badge--hosp">🏥 Complemento convenio 100%</span>' : ''}
            </div>

            <!-- TRAMOS -->
            <div class="sit-tramos">
                <div class="sit-tramo">
                    <span class="sit-tramo__label">Días 1–3 (${d1} días) · <strong>0%</strong> — sin prestación</span>
                    <span class="sit-tramo__valor">0,00 €</span>
                    <div class="sit-tramo__bar" style="width:0%"></div>
                </div>
                <div class="sit-tramo">
                    <span class="sit-tramo__label">Días 4–20 (${d2} días) · <strong>60%</strong> base reg.</span>
                    <span class="sit-tramo__valor">${fmt(imp2)} €</span>
                    <div class="sit-tramo__bar sit-tramo__bar--60" style="width:${d2 > 0 ? 60 : 0}%"></div>
                </div>
                <div class="sit-tramo">
                    <span class="sit-tramo__label">Día 21+ (${d3} días) · <strong>75%</strong> base reg.</span>
                    <span class="sit-tramo__valor">${fmt(imp3)} €</span>
                    <div class="sit-tramo__bar sit-tramo__bar--75" style="width:${d3 > 0 ? 75 : 0}%"></div>
                </div>
                ${hospitalizado ? `
                <div class="sit-tramo sit-tramo--comp">
                    <span class="sit-tramo__label">➕ Complemento convenio (hasta 100%)</span>
                    <span class="sit-tramo__valor" style="color:#059669;">+${fmt(compConv)} €</span>
                    <div class="sit-tramo__bar" style="width:100%; background:linear-gradient(90deg,#059669,#34d399)"></div>
                </div>` : ''}
            </div>

            <!-- NÓMINA MENSUAL -->
            <div class="sit-nomina-card">
                <div class="sit-nomina-card__title">📋 Nómina estimada del mes de baja</div>
                <div class="sit-nomina-card__sub">(calculado sobre un mes de 30 días con ${diasNormales_} días trabajados + ${Math.min(diasBaja, diasMes)} días en baja)</div>

                <div class="sit-nomina-rows">
                    <div class="sit-nomina-row sit-nomina-row--plus">
                        <span>Salario por días trabajados (${diasNormales_} días)</span>
                        <span>${fmt(brutoTrabajado)} €</span>
                    </div>
                    <div class="sit-nomina-row sit-nomina-row--plus">
                        <span>Prestación IT${hospitalizado ? ' + complemento convenio' : ''}</span>
                        <span>${fmt(prestacionMes)} €</span>
                    </div>
                    <div class="sit-nomina-row sit-nomina-row--total">
                        <span>Bruto total del mes</span>
                        <span>${fmt(brutoNominaMes)} €</span>
                    </div>
                    <div class="sit-nomina-row sit-nomina-row--menos">
                        <span>– Seguridad Social (solo días trabajados)</span>
                        <span>−${fmt(descuentoSS)} €</span>
                    </div>
                    <div class="sit-nomina-row sit-nomina-row--menos">
                        <span>– IRPF ${(irpfPct*100).toFixed(1)}% (sobre todo el bruto)</span>
                        <span>−${fmt(descuentoIRPF)} €</span>
                    </div>
                    <div class="sit-nomina-row sit-nomina-row--neto">
                        <span>💰 NETO DEL MES EN BAJA</span>
                        <span>${fmt(netoMes)} €</span>
                    </div>
                    <div class="sit-nomina-row sit-nomina-row--ref">
                        <span>Tu neto normal sin baja</span>
                        <span>${fmt(netoNormalMes)} €</span>
                    </div>
                    <div class="sit-nomina-row sit-nomina-row--diff">
                        <span>Diferencia (dejas de cobrar este mes)</span>
                        <span>−${fmt(diferenciaNeta > 0 ? diferenciaNeta : 0)} €</span>
                    </div>
                </div>
            </div>

            <p class="sit-nota">
                ⚠️ Días 1–3: <strong>sin prestación</strong>.
                Días 4–15: empresa paga (pago delegado). Día 16+: INSS/Mutua.
                ${hospitalizado
                    ? 'Con hospitalización, el convenio (Art. 47) complementa al 100% hasta 6 meses.'
                    : 'Sin hospitalización, el convenio <strong>no complementa</strong> (Art. 47 XXV Conv.).'}
                La prestación IT <strong>sí tributa IRPF</strong> pero el trabajador <strong>no cotiza a SS</strong> durante la baja.
            </p>
        </div>`;
}

function calcularNominaMaternidad() {
    const resultado  = document.getElementById('resultado-maternidad');
    const fechaIniVal = document.getElementById('mat-fecha-inicio').value;
    const semanas    = parseInt(document.getElementById('mat-semanas').value) || 16;

    if (!fechaIniVal) {
        resultado.innerHTML = '<p class="sit-error">Introduce la fecha de inicio del permiso.</p>';
        return;
    }

    const inicio     = new Date(fechaIniVal);
    const fin        = new Date(inicio);
    fin.setDate(fin.getDate() + semanas * 7);
    const diasTotal  = semanas * 7;

    const { brutoMes, baseCotCC, baseRegDia, irpfPct, totalSSPct } = _getDatosSalariales();
    const fmt = v => v.toLocaleString('es-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2});

    // ── Prestación mensual ────────────────────────────────────────────────────
    // 100% base reguladora · exenta de IRPF · SÍ se descuenta cuota obrera SS
    // Fuente: RD 295/2009 art. 9 — «la entidad gestora descuenta la aportación
    // del trabajador a CC, desempleo y FP al hacer efectivo el subsidio».
    const prestacionMensual = baseRegDia * 30;          // bruto = base cotización CC
    const prestacionTotal   = baseRegDia * diasTotal;

    // ── SS cuota obrera (se descuenta de la prestación, base = baseCotCC) ────
    const ssPermiso         = baseCotCC * totalSSPct;   // igual que un mes normal
    const netoPermiso       = prestacionMensual - ssPermiso;  // sin IRPF (exento)
    const ssDiario          = ssPermiso / 30;

    // Neto mensual normal para comparar
    const netoNormalMes = brutoMes - (baseCotCC * totalSSPct) - (brutoMes * irpfPct);
    const diferenciaMes = netoPermiso - netoNormalMes;

    const ahorroIRPF    = brutoMes * irpfPct * (semanas / (52/12));
    const fechaFinStr   = fin.toLocaleDateString('es-ES', {day:'numeric', month:'short', year:'numeric'});

    resultado.innerHTML = `
        <div class="sit-resultado sit-resultado--mat">
            <div class="sit-resultado__header sit-resultado__header--mat">
                <span>👶 Permiso de <strong>${semanas} semanas</strong> · finaliza ${fechaFinStr}</span>
                <span class="sit-badge sit-badge--exento">✅ Exento de IRPF</span>
            </div>

            <!-- NÓMINA MENSUAL DURANTE EL PERMISO -->
            <div class="sit-nomina-card sit-nomina-card--mat">
                <div class="sit-nomina-card__title">📋 Lo que cobras cada mes durante el permiso</div>
                <div class="sit-nomina-card__sub">El INSS paga directamente al trabajador. No recibes nómina de la empresa.</div>

                <div class="sit-nomina-rows">
                    <div class="sit-nomina-row sit-nomina-row--plus">
                        <span>Prestación INSS (100% base reguladora)</span>
                        <span>${fmt(prestacionMensual)} €</span>
                    </div>
                    <div class="sit-nomina-row sit-nomina-row--exento">
                        <span>– IRPF</span>
                        <span style="color:#059669;">0,00 € <small>(exento art. 7.h LIRPF)</small></span>
                    </div>
                    <div class="sit-nomina-row sit-nomina-row--menos">
                        <span>– Seguridad Social <small>(${(totalSSPct*100).toFixed(2)}% · ${fmt(ssDiario)} €/día)</small></span>
                        <span>−${fmt(ssPermiso)} €</span>
                    </div>
                    <div class="sit-nomina-row sit-nomina-row--neto">
                        <span>💰 NETO MENSUAL EN PERMISO</span>
                        <span>${fmt(netoPermiso)} €</span>
                    </div>
                    <div class="sit-nomina-row sit-nomina-row--ref">
                        <span>Tu neto mensual habitual (sin permiso)</span>
                        <span>${fmt(netoNormalMes)} €</span>
                    </div>
                    <div class="sit-nomina-row ${diferenciaMes >= 0 ? 'sit-nomina-row--comp' : 'sit-nomina-row--diff'}">
                        <span>Diferencia mensual</span>
                        <span>${diferenciaMes >= 0 ? '+' : '−'}${fmt(Math.abs(diferenciaMes))} €</span>
                    </div>
                </div>
            </div>

            <!-- RESUMEN TOTAL -->
            <div class="sit-resumen">
                <div class="sit-resumen__fila">
                    <span>Base reguladora/día</span>
                    <span class="sit-resumen__valor">${fmt(baseRegDia)} €/día</span>
                </div>
                <div class="sit-resumen__fila">
                    <span>SS cuota obrera/día</span>
                    <span class="sit-resumen__valor" style="color:#b91c1c;">${fmt(ssDiario)} €/día</span>
                </div>
                <div class="sit-resumen__fila sit-resumen__fila--total">
                    <span><strong>Neto total durante el permiso (${semanas} sem.)</strong></span>
                    <span class="sit-resumen__valor"><strong>${fmt(netoPermiso / 30 * diasTotal)} €</strong></span>
                </div>
                <div class="sit-resumen__fila sit-resumen__fila--comp">
                    <span>💸 Ahorro fiscal IRPF durante el permiso</span>
                    <span class="sit-resumen__valor" style="color:#059669;">${fmt(ahorroIRPF)} €</span>
                </div>
            </div>

            <p class="sit-nota sit-nota--mat">
                ℹ️ La prestación está <strong>100% exenta de IRPF</strong> (STS 2018 + art. 7.h LIRPF), pero
                la <strong>cuota obrera de SS sí se descuenta</strong> de la prestación (RD 295/2009, art. 9).
                El INSS cotiza la cuota <em>patronal</em> durante el permiso: <strong>no pierdes derechos</strong> de jubilación ni paro.
            </p>
        </div>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// INICIALIZAR TODO al cargar el DOM
// ═══════════════════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    initSliderJornada();
    initDarkMode();
    initTooltips();
    initCalculadoraInversa();
    initBrutoLibre();
    initWizardIRPF();
    initVacaciones();
    initPension();
    initResetCotizaciones();
    initFiniquito();
    initHorasAnuales();
    initSituacionEspecial();
    initTabsHub();
});
