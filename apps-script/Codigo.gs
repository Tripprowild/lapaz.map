/**
 * Mapa Interactivo La Paz · receptor de datos en Google Sheets
 *
 * Guarda en esta hoja de cálculo:
 *   - "Solicitudes": negocios que llenan el cuestionario de afiliados.html
 *   - "Cupones": cada cupón descargado desde el mapa (código, fecha, perfil del visitante)
 *
 * Instalación: ver INSTRUCCIONES.md (Extensiones → Apps Script → pegar → Implementar como aplicación web).
 */

const HOJAS = { solicitud: 'Solicitudes', cupon: 'Cupones' };

const COLUMNAS = {
  solicitud: ['fecha', 'estado', 'negocio', 'categoria', 'nivel', 'descripcion_breve', 'descripcion', 'direccion', 'lat', 'lon',
    'horario', 'telefono', 'whatsapp', 'email', 'web', 'instagram', 'facebook', 'tiktok', 'reservar', 'fotos',
    'recomendados', 'quiere_cupon', 'cupon_tipo', 'cupon_descripcion', 'cupon_vigencia',
    'responsable', 'cargo', 'comentarios', 'idioma', 'pagina'],
  cupon: ['fecha', 'cupon', 'titulo', 'negocio', 'codigo', 'vence', 'perfil', 'idioma', 'pagina', 'canjeado']
};

// Avisar por correo al dueño de la hoja cuando llega una solicitud nueva.
const AVISAR_POR_CORREO = true;

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    const nombreHoja = HOJAS[d.tipo];
    if (!nombreHoja) return salida({ ok: false, error: 'tipo desconocido' });
    if (d.website2) return salida({ ok: true }); // campo trampa contra robots

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const cols = COLUMNAS[d.tipo];
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      let hoja = ss.getSheetByName(nombreHoja);
      if (!hoja) {
        hoja = ss.insertSheet(nombreHoja);
        hoja.appendRow(cols);
        hoja.setFrozenRows(1);
        hoja.getRange(1, 1, 1, cols.length).setFontWeight('bold').setBackground('#f3ead6');
      }
      hoja.appendRow(cols.map(c => {
        if (c === 'fecha') return new Date();
        if (c === 'estado') return 'pendiente';
        if (c === 'canjeado') return '';
        return limpiar(d[c]);
      }));
    } finally {
      lock.releaseLock();
    }

    if (d.tipo === 'solicitud' && AVISAR_POR_CORREO) avisar(d);
    return salida({ ok: true });
  } catch (err) {
    return salida({ ok: false, error: String(err) });
  }
}

function doGet() {
  return salida({ ok: true, servicio: 'Mapa Interactivo La Paz' });
}

// Evita que un texto que empiece con =, +, - o @ se convierta en fórmula.
function limpiar(v) {
  let s = v == null ? '' : String(v).slice(0, 2000);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function avisar(d) {
  const para = Session.getEffectiveUser().getEmail();
  if (!para) return;
  MailApp.sendEmail(para, 'Mapa La Paz · nueva solicitud: ' + (d.negocio || ''),
    'Negocio: ' + (d.negocio || '') + '\nCategoría: ' + (d.categoria || '') + '\nNivel: ' + (d.nivel || '') +
    '\nContacto: ' + (d.responsable || '') + ' · ' + (d.email || '') + ' · ' + (d.telefono || '') +
    '\n\nRevisa la pestaña "Solicitudes" de tu hoja de cálculo.');
}

function salida(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
