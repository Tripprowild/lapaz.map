/**
 * Mapa Interactivo La Paz · receptor de datos en Google Sheets (v2)
 *
 * Pestañas que se crean solas:
 *   Solicitudes        negocios que llenan "Anúnciate en el mapa"
 *   Suscriptores       visitantes que verificaron su correo con código de 6 dígitos
 *   Cupones            cada cupón descargado (con el correo del suscriptor)
 *   Eventos propuestos eventos que suben los visitantes (se publican al poner estado = aprobado)
 *   Reportes           reportes de visitantes sobre eventos comunitarios
 *
 * Instalación y uso: ver INSTRUCCIONES.md
 */

const TZ = 'America/Mazatlan';

const COLUMNAS = {
  Solicitudes: ['fecha', 'estado', 'negocio', 'categoria', 'nivel', 'descripcion_breve', 'descripcion', 'direccion', 'lat', 'lon',
    'horario', 'telefono', 'whatsapp', 'email', 'web', 'instagram', 'facebook', 'tiktok', 'reservar', 'fotos',
    'recomendados', 'quiere_cupon', 'cupon_tipo', 'cupon_descripcion', 'cupon_vigencia',
    'responsable', 'cargo', 'comentarios', 'idioma', 'pagina'],
  Suscriptores: ['fecha', 'email', 'nombre', 'idioma', 'origen', 'estado'],
  Cupones: ['fecha', 'email', 'cupon', 'titulo', 'negocio', 'codigo', 'vence', 'perfil', 'idioma', 'pagina', 'canjeado'],
  'Eventos propuestos': ['id', 'fecha_envio', 'estado', 'nombre', 'categoria', 'inicio', 'fin', 'hora', 'lugar', 'direccion', 'lat', 'lon',
    'descripcion', 'precio', 'enlace', 'organizador', 'telefono', 'email', 'declaraciones', 'notas_admin'],
  Reportes: ['fecha', 'evento', 'motivo', 'email', 'pagina']
};

const AVISAR_POR_CORREO = true;           // avisarte de solicitudes y eventos nuevos
const MAX_PENDIENTES_POR_CORREO = 3;      // eventos pendientes por persona
const LIMITES = { latMin: 22.8, latMax: 25.2, lonMin: -112.8, lonMax: -109.3 }; // municipio de La Paz (aprox.)

/* ---------------- entrada ---------------- */
function doPost(e) {
  try {
    const d = JSON.parse((e.postData && e.postData.contents) || '{}');
    if (d.website2) return salida({ ok: true });              // campo trampa
    const accion = d.accion || d.tipo;
    if (accion === 'codigo') return salida(enviarCodigo(d));
    if (accion === 'verificar') return salida(verificar(d));
    if (accion === 'evento') return salida(proponerEvento(d));
    if (accion === 'reporte') return salida(reporte(d));
    if (accion === 'solicitud') return salida(solicitud(d));
    if (accion === 'cupon') return salida(cupon(d));
    return salida({ ok: false, error: 'accion' });
  } catch (err) {
    return salida({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  if (e && e.parameter && e.parameter.accion === 'eventos') return salida({ ok: true, eventos: eventosAprobados() });
  return salida({ ok: true, servicio: 'Mapa Interactivo La Paz' });
}

/* ---------------- verificación de correo ---------------- */
function enviarCodigo(d) {
  const email = normCorreo(d.email);
  if (!email) return { ok: false, error: 'correo' };
  const cache = CacheService.getScriptCache();
  const nKey = 'n:' + email, n = Number(cache.get(nKey) || 0);
  if (n >= 4) return { ok: false, error: 'limite' };                 // máx. 4 códigos por hora por correo
  if (MailApp.getRemainingDailyQuota() < 5) return { ok: false, error: 'cuota' };
  const codigo = String(Math.floor(100000 + Math.random() * 900000));
  cache.put('c:' + email, JSON.stringify({ codigo: codigo, intentos: 0 }), 600); // vence en 10 min
  cache.put(nKey, String(n + 1), 3600);
  const en = d.idioma === 'en';
  MailApp.sendEmail({
    to: email,
    subject: en ? 'Your code for the La Paz map: ' + codigo : 'Tu código del Mapa de La Paz: ' + codigo,
    body: (en ? 'Your verification code is ' : 'Tu código de verificación es ') + codigo +
      (en ? '\nIt expires in 10 minutes. If you did not request it, ignore this email.' : '\nVence en 10 minutos. Si no lo pediste, ignora este correo.'),
    name: 'Mapa de La Paz'
  });
  return { ok: true };
}

function verificar(d) {
  const email = normCorreo(d.email);
  if (!email) return { ok: false, error: 'correo' };
  const cache = CacheService.getScriptCache(), key = 'c:' + email, raw = cache.get(key);
  if (!raw) return { ok: false, error: 'codigo' };
  const o = JSON.parse(raw);
  if (o.intentos >= 5) { cache.remove(key); return { ok: false, error: 'intentos' }; }
  if (String(d.codigo || '').trim() !== o.codigo) { o.intentos++; cache.put(key, JSON.stringify(o), 600); return { ok: false, error: 'codigo' }; }
  cache.remove(key);
  conBloqueo(() => {
    const h = hoja('Suscriptores');
    const ya = h.getLastRow() > 1 && h.getRange(2, 2, h.getLastRow() - 1, 1).getValues().some(r => String(r[0]).toLowerCase() === email);
    if (!ya) h.appendRow([new Date(), email, limpiar(d.nombre), limpiar(d.idioma), limpiar(d.origen), 'activo']);
  });
  return { ok: true, token: token(email) };
}

function token(email) {
  const props = PropertiesService.getScriptProperties();
  let s = props.getProperty('SECRETO');
  if (!s) { s = Utilities.getUuid() + Utilities.getUuid(); props.setProperty('SECRETO', s); }
  return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(email, s)).replace(/=+$/, '');
}
function tokenValido(email, t) { return !!email && !!t && token(email) === t; }

/* ---------------- eventos comunitarios ---------------- */
function proponerEvento(d) {
  const email = normCorreo(d.email);
  if (!tokenValido(email, d.token)) return { ok: false, error: 'verificacion' };
  if (!turnstileOk(d.turnstile)) return { ok: false, error: 'captcha' };
  const hoy = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd');
  const max = Utilities.formatDate(new Date(Date.now() + 183 * 864e5), TZ, 'yyyy-MM-dd');
  const req = ['nombre', 'categoria', 'inicio', 'lugar', 'descripcion', 'organizador', 'telefono'];
  for (const k of req) if (!String(d[k] || '').trim()) return { ok: false, error: 'faltan', campo: k };
  const ini = String(d.inicio), fin = String(d.fin || d.inicio);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ini) || !/^\d{4}-\d{2}-\d{2}$/.test(fin)) return { ok: false, error: 'fecha' };
  if (ini < hoy || ini > max || fin < ini || (Date.parse(fin) - Date.parse(ini)) > 30 * 864e5) return { ok: false, error: 'fecha' };
  const desc = String(d.descripcion).trim();
  if (desc.length < 50 || desc.length > 600) return { ok: false, error: 'descripcion' };
  const lat = Number(d.lat), lon = Number(d.lon);
  if (!(lat >= LIMITES.latMin && lat <= LIMITES.latMax && lon >= LIMITES.lonMin && lon <= LIMITES.lonMax)) return { ok: false, error: 'ubicacion' };
  if (d.enlace && !/^https?:\/\/\S+$/i.test(String(d.enlace))) return { ok: false, error: 'enlace' };
  if (!(d.decl_organizador && d.decl_permiso && d.decl_reglas)) return { ok: false, error: 'declaraciones' };

  let id;
  const r = conBloqueo(() => {
    const h = hoja('Eventos propuestos');
    if (h.getLastRow() > 1) {
      const filas = h.getRange(2, 1, h.getLastRow() - 1, 18).getValues();
      const pend = filas.filter(f => String(f[17]).toLowerCase() === email && String(f[2]) === 'pendiente').length;
      if (pend >= MAX_PENDIENTES_POR_CORREO) return { ok: false, error: 'pendientes' };
    }
    id = Utilities.getUuid().slice(0, 8);
    h.appendRow([id, new Date(), 'pendiente', limpiar(d.nombre).slice(0, 90), limpiar(d.categoria), "'" + ini, "'" + fin, limpiar(d.hora).slice(0, 40),
      limpiar(d.lugar).slice(0, 90), limpiar(d.direccion).slice(0, 160), lat, lon, limpiar(desc), limpiar(d.precio).slice(0, 40),
      limpiar(d.enlace).slice(0, 300), limpiar(d.organizador).slice(0, 80), limpiar(d.telefono).slice(0, 30), email,
      'organizador/autorizado; permiso vía pública si aplica; acepta reglas', '']);
    return { ok: true, id: id };
  });
  if (r.ok && AVISAR_POR_CORREO) avisar('Mapa La Paz · evento propuesto: ' + d.nombre,
    'Evento: ' + d.nombre + '\nFechas: ' + ini + ' – ' + fin + ' ' + (d.hora || '') + '\nLugar: ' + d.lugar +
    '\nOrganizador: ' + d.organizador + ' · ' + email + ' · ' + d.telefono +
    '\n\nRevísalo en la pestaña "Eventos propuestos" y cambia el estado a "aprobado" para publicarlo.');
  return r;
}

function eventosAprobados() {
  const h = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Eventos propuestos');
  if (!h || h.getLastRow() < 2) return [];
  const hoy = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd');
  return h.getRange(2, 1, h.getLastRow() - 1, 17).getValues()
    .filter(f => String(f[2]).trim().toLowerCase() === 'aprobado' && fechaTxt(f[6] || f[5]) >= hoy)
    .map(f => ({ id: f[0], nombre: f[3], categoria: f[4], inicio: fechaTxt(f[5]), fin: fechaTxt(f[6] || f[5]), hora: f[7], lugar: f[8], direccion: f[9],
      lat: f[10], lon: f[11], descripcion: f[12], precio: f[13], enlace: f[14] }));   // sin teléfono ni correo
}

function reporte(d) {
  conBloqueo(() => hoja('Reportes').appendRow([new Date(), limpiar(d.evento), limpiar(d.motivo), limpiar(d.email), limpiar(d.pagina)]));
  return { ok: true };
}

/* ---------------- negocios y cupones ---------------- */
function solicitud(d) {
  conBloqueo(() => hoja('Solicitudes').appendRow(COLUMNAS.Solicitudes.map(c => c === 'fecha' ? new Date() : c === 'estado' ? 'pendiente' : limpiar(d[c]))));
  if (AVISAR_POR_CORREO) avisar('Mapa La Paz · nueva solicitud: ' + (d.negocio || ''),
    'Negocio: ' + (d.negocio || '') + '\nCategoría: ' + (d.categoria || '') + '\nNivel: ' + (d.nivel || '') +
    '\nContacto: ' + (d.responsable || '') + ' · ' + (d.email || '') + ' · ' + (d.telefono || '') + '\n\nRevisa la pestaña "Solicitudes".');
  return { ok: true };
}

function cupon(d) {
  const email = normCorreo(d.email);
  if (!tokenValido(email, d.token)) return { ok: false, error: 'verificacion' };
  conBloqueo(() => hoja('Cupones').appendRow(COLUMNAS.Cupones.map(c => c === 'fecha' ? new Date() : c === 'email' ? email : c === 'canjeado' ? '' : limpiar(d[c]))));
  return { ok: true };
}

/* ---------------- utilidades ---------------- */
function hoja(nombre) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let h = ss.getSheetByName(nombre);
  if (!h) {
    const cols = COLUMNAS[nombre];
    h = ss.insertSheet(nombre);
    h.appendRow(cols); h.setFrozenRows(1);
    h.getRange(1, 1, 1, cols.length).setFontWeight('bold').setBackground('#f3ead6');
  }
  return h;
}
function conBloqueo(fn) { const l = LockService.getScriptLock(); l.waitLock(10000); try { return fn(); } finally { l.releaseLock(); } }
function normCorreo(v) { const s = String(v || '').trim().toLowerCase(); return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length <= 120 ? s : ''; }
function fechaTxt(v) { return v instanceof Date ? Utilities.formatDate(v, TZ, 'yyyy-MM-dd') : String(v || '').replace(/^'/, '').slice(0, 10); }
// Evita que un texto que empiece con =, +, - o @ se convierta en fórmula.
function limpiar(v) { let s = v == null ? '' : String(v).slice(0, 2000); if (/^[=+\-@]/.test(s)) s = "'" + s; return s; }
function avisar(asunto, cuerpo) { const para = Session.getEffectiveUser().getEmail(); if (para) MailApp.sendEmail(para, asunto, cuerpo); }
// Cloudflare Turnstile (opcional): guarda TURNSTILE_SECRET en Propiedades del script para activarlo.
function turnstileOk(t) {
  const sec = PropertiesService.getScriptProperties().getProperty('TURNSTILE_SECRET');
  if (!sec) return true;
  if (!t) return false;
  const r = UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'post', payload: { secret: sec, response: t }, muteHttpExceptions: true });
  try { return JSON.parse(r.getContentText()).success === true; } catch (e) { return false; }
}
function salida(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
