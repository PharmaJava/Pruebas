# SKILL: Deploy — Cloudflare + Vercel

## Arquitectura de despliegue

```
GitHub (repo) 
    → Vercel (build + hosting automático en cada push a main)
        → Cloudflare (proxy CDN + caché + HTTPS)
            → usuario final
```

---

## Flujo normal de deploy

1. **Desarrollar y probar en local**
   - Abrir `index.html` directamente en el navegador (no necesita servidor)
   - Verificar en Chrome + Firefox + móvil (DevTools)

2. **Commit y push a `main`**
   ```bash
   git add -A
   git commit -m "descripción del cambio"
   git push origin main
   ```

3. **Vercel hace el deploy automáticamente**
   - Verificar en el dashboard de Vercel que el build fue exitoso
   - URL de preview disponible antes de que llegue por Cloudflare

4. **Verificar en producción**
   - Abrir https://conveniodefarmacia.com en modo incógnito (para evitar caché del navegador)
   - **VER SOURCE HTML** (`Ctrl+U` o `Cmd+U`) — crítico para detectar truncado de Cloudflare
   - Verificar que el `</script>` cierra correctamente
   - Verificar que el `<script src="app.js">` (o similar) está presente y no cortado

---

## ⚠️ Problema conocido: Cloudflare trunca el HTML

### Síntoma
El HTML en producción aparece cortado. Los últimos `</script>` o la referencia al archivo JS desaparecen. La calculadora no carga o da error de JS.

### Diagnóstico
```bash
curl -s https://conveniodefarmacia.com | tail -50
# Si el output termina abruptamente sin </html>, hay truncado
```

### Solución
1. En el dashboard de Cloudflare → **Caching → Purge Everything**
2. Si persiste, revisar si Cloudflare tiene alguna regla de transformación activa (Transform Rules) que limite el tamaño
3. Como solución de emergencia: identificar el `<script` truncado, eliminarlo del HTML y volver a añadir la referencia correcta al JS

### Prevención
- Mantener el `index.html` tan compacto como sea posible (el JS pesado va en `app.js`)
- No incluir scripts inline muy largos en el HTML
- Después de CADA deploy, siempre hacer `View Source` en producción

---

## Cloudflare — configuración recomendada

### Reglas de caché
- HTML (`index.html`, `privacidad.html`): **Edge Cache TTL = 4 horas** (para que las actualizaciones se propaguen razonablemente rápido)
- Assets estáticos (CSS, JS, PNG): **Edge Cache TTL = 1 semana** + usar cache-busting con query string o hash en el nombre

### Cache-busting en producción
Si cambias `app.js`, actualizar la referencia en `index.html`:
```html
<!-- Cambiar el ?v= cada vez que actualices el JS -->
<script src="app.js?v=20260312"></script>
```

### SSL/TLS
- Modo: **Full (strict)** — asegura HTTPS end-to-end entre Cloudflare y Vercel
- Vercel provee certificado automático

### Minificación (Cloudflare)
- HTML: ON
- CSS: ON  
- JS: ON (Cloudflare Speed → Optimization)
- ⚠️ Si la minificación causa problemas, desactivar HTML minification primero

---

## Vercel — configuración

### `vercel.json` (si es necesario)
Para proyectos estáticos puro, generalmente no hace falta. Si hay problemas de routing:
```json
{
  "routes": [
    { "src": "/(.*)", "dest": "/$1" }
  ]
}
```

### Headers de seguridad (en Cloudflare o en vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

---

## Variables de entorno

El frontend es estático — no usa variables de entorno.  
El backend (`nominafarmacia`) usa `.env` con:
- `DATABASE_URL` — conexión PostgreSQL
- Variables de Prisma

⚠️ Nunca subir `.env` a GitHub. Verificar `.gitignore`.

---

## Rollback rápido en caso de emergencia

1. En el dashboard de Vercel → seleccionar el deploy anterior → **Redeploy**
2. O hacer `git revert` del commit problemático y push

---

## Diagnóstico de problemas en producción

### La calculadora no funciona
```
1. View Source → ¿está el <script src="app.js"> presente y no truncado?
2. Abrir DevTools Console → ¿hay errores JS?
3. Network tab → ¿carga app.js correctamente (200)? ¿o 404?
4. Si 404: ¿el nombre del archivo en HTML coincide exactamente con el nombre en el repo?
```

### Cambio no aparece en producción
```
1. ¿El push llegó a main? → verificar en GitHub
2. ¿El build de Vercel fue exitoso? → dashboard Vercel
3. ¿Caché de Cloudflare? → Caching → Purge Everything
4. ¿Caché del navegador? → Ctrl+Shift+R (hard refresh) o modo incógnito
```

### El formulario de contacto no envía
```
- Verificar que el action apunta a https://formspree.io/f/mlgpgkwv
- Probar enviando desde un dominio en producción (Formspree bloquea localhost por defecto en plan gratuito)
- Revisar la bandeja de Formspree en https://formspree.io/
```
