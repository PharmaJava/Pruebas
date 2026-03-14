/**
 * components.js — Componentes compartidos para conveniodefarmacia.com
 * Inyecta navegación, footer y funcionalidades comunes en todas las páginas.
 */

'use strict';

/* ========================================
   NAVEGACIÓN PRINCIPAL
   ======================================== */

const NAV_LINKS = [
  { href: 'calculadora-nomina', label: 'Calculadora Nómina', icon: 'fa-calculator' },
  { href: 'finiquito-farmacia', label: 'Finiquito', icon: 'fa-file-invoice-dollar' },
  { href: 'herramientas-farmacia', label: 'Herramientas', icon: 'fa-wrench' },
  { href: 'convenio-farmacia-2026', label: 'Convenio 2026', icon: 'fa-book' },
  { href: 'horas-jornada-farmacia', label: 'Horas y Jornada', icon: 'fa-clock' },
  { href: 'nocturnidad-farmacia', label: 'Nocturnidad', icon: 'fa-moon' },
  { href: 'vacaciones-farmacia', label: 'Vacaciones', icon: 'fa-umbrella-beach' },
  { href: 'baja-laboral-farmacia', label: 'Baja Laboral', icon: 'fa-briefcase-medical' },
  { href: 'maternidad-paternidad-farmacia', label: 'Maternidad', icon: 'fa-baby' },
  { href: 'pension-jubilacion-farmacia', label: 'Pensión', icon: 'fa-piggy-bank' },
  { href: 'trienios-farmacia', label: 'Trienios', icon: 'fa-calendar-check' },
  { href: 'bolsa-empleo', label: 'Bolsa de Empleo', icon: 'fa-briefcase' },
  { href: 'blog', label: 'Blog', icon: 'fa-newspaper' },
];

function getCurrentPath() {
  let path = window.location.pathname;
  // Quitar trailing slash excepto para /
  if (path !== '/' && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  // Quitar .html
  path = path.replace(/\.html$/, '');
  return path;
}

function renderNav() {
  const navEl = document.getElementById('main-nav');
  if (!navEl) return;

  const currentPath = getCurrentPath();

  const linksHTML = NAV_LINKS.map(link => {
    const isActive = currentPath === link.href ||
      (link.href !== './' && currentPath.endsWith(link.href));
    const ctaClass = link.isCta ? ' nav-link--cta' : '';
    return `<a href="${link.href}" class="nav-link${ctaClass}${isActive ? ' nav-link--active' : ''}" title="${link.label}">
      <i class="fa-solid ${link.icon}"></i>
      <span>${link.label}</span>
    </a>`;
  }).join('');

  navEl.innerHTML = `
    <div class="nav-container">
      <a href="./" class="nav-logo" title="Convenio de Farmacia — Inicio">
        <img src="assets/img/IMG_9941.png" alt="Sueldo Farmacia Pro" width="40" height="40" loading="eager">
        <span class="nav-logo-text">Convenio de Farmacia</span>
      </a>
      <button class="nav-toggle" aria-label="Abrir menú" aria-expanded="false" id="nav-toggle-btn">
        <i class="fa-solid fa-bars"></i>
      </button>
      <nav class="nav-links" id="nav-links" role="navigation" aria-label="Navegación principal">
        ${linksHTML}
      </nav>
      <button class="dark-mode-toggle" id="dark-mode-btn" title="Cambiar tema" aria-label="Cambiar modo oscuro">
        <i class="fa-solid fa-moon"></i>
      </button>
    </div>
  `;

  // Menú hamburguesa móvil
  const toggleBtn = document.getElementById('nav-toggle-btn');
  const navLinks = document.getElementById('nav-links');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('nav-links--open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      toggleBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!navEl.contains(e.target) && navLinks.classList.contains('nav-links--open')) {
        navLinks.classList.remove('nav-links--open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  }
}

/* ========================================
   FOOTER
   ======================================== */

function renderFooter() {
  const footerEl = document.getElementById('main-footer');
  if (!footerEl) return;

  const year = new Date().getFullYear();

  footerEl.innerHTML = `
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-col">
          <h3 class="footer-heading">Calculadoras</h3>
          <ul class="footer-links">
            <li><a href="calculadora-nomina">Calculadora de Nómina</a></li>
            <li><a href="finiquito-farmacia">Calculadora de Finiquito</a></li>
            <li><a href="vacaciones-farmacia">Calculadora de Vacaciones</a></li>
            <li><a href="nocturnidad-farmacia">Nocturnidad</a></li>
            <li><a href="pension-jubilacion-farmacia">Estimador de Pensión</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3 class="footer-heading">Convenio</h3>
          <ul class="footer-links">
            <li><a href="convenio-farmacia-2026">XXV Convenio Nacional 2026</a></li>
            <li><a href="convenio-farmacia-2026#bizkaia">Convenio Bizkaia</a></li>
            <li><a href="convenio-farmacia-2026#asturias">Convenio Asturias</a></li>
            <li><a href="convenio-farmacia-2026#sindicatos">Sindicatos</a></li>
            <li><a href="trienios-farmacia">Trienios y Antigüedad</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3 class="footer-heading">Empleo e Info</h3>
          <ul class="footer-links">
            <li><a href="bolsa-empleo">Bolsa de Empleo</a></li>
            <li><a href="bolsa-empleo#publicar-oferta">Publicar Oferta</a></li>
            <li><a href="baja-laboral-farmacia">Baja Laboral (IT)</a></li>
            <li><a href="maternidad-paternidad-farmacia">Maternidad y Paternidad</a></li>
            <li><a href="blog">Blog — Novedades</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3 class="footer-heading">Acerca de</h3>
          <ul class="footer-links">
            <li><a href="sobre-nosotros">Sobre Nosotros</a></li>
            <li><a href="contacto">Contacto</a></li>
            <li><a href="privacidad">Política de Privacidad</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${year} conveniodefarmacia.com — Creado por <strong>Antonio</strong>, farmacéutico y programador.</p>
        <p class="footer-disclaimer">Los cálculos son orientativos. Consulta con un asesor laboral para situaciones específicas.</p>
        <div class="footer-sources">
          <span>Fuentes oficiales:</span>
          <a href="https://www.boe.es/buscar/doc.php?id=BOE-A-2022-23018" target="_blank" rel="noopener">XXV Convenio (BOE)</a> ·
          <a href="https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-4220" target="_blank" rel="noopener">Tablas 2026 (BOE)</a>
        </div>
        <div class="footer-counter" style="display:none">
          <img src="https://librecounter.org/counter.svg" referrerpolicy="unsafe-url" alt="Contador de visitas" width="80" height="15" loading="lazy">
        </div>
      </div>
    </div>
  `;
}

/* ========================================
   BREADCRUMBS
   ======================================== */

function renderBreadcrumbs(items) {
  const bcEl = document.getElementById('breadcrumbs');
  if (!bcEl || !items || items.length === 0) return;

  const allItems = [{ label: 'Inicio', href: './' }, ...items];

  const bcHTML = allItems.map((item, i) => {
    const isLast = i === allItems.length - 1;
    if (isLast) {
      return `<span class="bc-current" aria-current="page">${item.label}</span>`;
    }
    return `<a href="${item.href}" class="bc-link">${item.label}</a>`;
  }).join('<span class="bc-sep" aria-hidden="true">/</span>');

  bcEl.innerHTML = `<nav aria-label="Breadcrumb" class="breadcrumb-nav">${bcHTML}</nav>`;

  // Schema BreadcrumbList
  const schemaItems = allItems.map((item, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": item.label,
    ...(item.href ? { "item": `https://conveniodefarmacia.com${item.href}` } : {})
  }));

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": schemaItems
  });
  document.head.appendChild(script);
}

/* ========================================
   DARK MODE
   ======================================== */

function initDarkModeShared() {
  const saved = localStorage.getItem('darkMode');
  if (saved === 'true') {
    document.body.classList.add('dark-mode');
  }

  // Esperar a que se renderice el nav
  setTimeout(() => {
    const btn = document.getElementById('dark-mode-btn');
    if (!btn) return;

    updateDarkModeIcon(btn);

    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDark);
      updateDarkModeIcon(btn);
    });
  }, 0);
}

function updateDarkModeIcon(btn) {
  const isDark = document.body.classList.contains('dark-mode');
  btn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

/* ========================================
   GTM & ANALYTICS
   ======================================== */

function initAnalytics() {
  // Google Tag Manager
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-552P3WBC');

  // Vercel Analytics
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  const vaScript = document.createElement('script');
  vaScript.defer = true;
  vaScript.src = '/_vercel/insights/script.js';
  document.head.appendChild(vaScript);

  // Vercel Speed Insights
  window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
  const siScript = document.createElement('script');
  siScript.defer = true;
  siScript.src = '/_vercel/speed-insights/script.js';
  document.head.appendChild(siScript);
}

function enviarEventoGTM(categoria, accion, etiqueta) {
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: 'evento_personalizado',
      eventCategory: categoria,
      eventAction: accion,
      eventLabel: etiqueta
    });
  }
}

/* ========================================
   CTA COMPARTIDO - Enlace a calculadora
   ======================================== */

function renderCTA(targetId, options = {}) {
  const el = document.getElementById(targetId);
  if (!el) return;

  const {
    text = 'Calcula tu nómina ahora',
    href = 'calculadora-nomina',
    subtitle = 'Calculadora gratuita con datos oficiales del BOE 2026'
  } = options;

  el.innerHTML = `
    <div class="cta-block">
      <a href="${href}" class="cta-button">
        <i class="fa-solid fa-calculator"></i> ${text}
      </a>
      <p class="cta-subtitle">${subtitle}</p>
    </div>
  `;
}

/* ========================================
   COOKIE BANNER
   ======================================== */

function renderCookieBanner() {
  if (localStorage.getItem('cookiesAceptadas')) return;
  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.className = 'cookie-banner';
  banner.style.cssText = 'display:flex;position:fixed;bottom:0;left:0;right:0;background:#1e293b;color:#f1f5f9;padding:0.75rem 1.25rem;align-items:center;justify-content:center;gap:1rem;z-index:9999;font-size:0.85rem;flex-wrap:wrap;';
  banner.innerHTML = `<p style="margin:0">🍪 Usamos cookies técnicas para el funcionamiento de la web. No recopilamos datos personales.</p><button onclick="aceptarCookies()" style="background:#059669;color:#fff;border:none;border-radius:6px;padding:0.4rem 1rem;font-weight:600;cursor:pointer;font-size:0.85rem;">Aceptar</button>`;
  document.body.appendChild(banner);
}

function aceptarCookies() {
  localStorage.setItem('cookiesAceptadas', 'true');
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.remove();
  if (window.dataLayer) window.dataLayer.push({ event: 'cookies_aceptadas' });
}

/* ========================================
   INIT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
  initDarkModeShared();
  initAnalytics();
  renderCookieBanner();
});
