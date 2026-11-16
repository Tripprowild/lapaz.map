# Conectar el mapa con Google Sheets (unos 10 minutos)

Esto guarda en una hoja de cálculo de tu cuenta de Google:
- **Solicitudes**: negocios que llenan "Anúnciate en el mapa".
- **Suscriptores**: visitantes que verificaron su correo con un código de 6 dígitos (necesario para ver cupones y proponer eventos).
- **Cupones**: cada cupón descargado, con el correo de quien lo bajó.
- **Eventos propuestos**: eventos que suben los visitantes.
- **Reportes**: avisos de visitantes sobre eventos comunitarios.

Las pestañas se crean solas con el primer registro.

## Instalación
1. Entra a [sheets.new](https://sheets.new) con tu cuenta de Google. Nombre: **Mapa La Paz · Registros**.
2. Menú **Extensiones → Apps Script**.
3. Borra lo que aparece, pega todo el contenido de `Codigo.gs` y guarda.
4. **Implementar → Nueva implementación → (engrane) Aplicación web**.
   - Ejecutar como: **Yo**. Quién tiene acceso: **Cualquier persona**.
   - **Implementar** y autoriza los permisos (Google avisa porque el script es nuevo: *Configuración avanzada → Ir a…*). Pedirá permiso para hojas de cálculo, enviar correos y conexiones externas.
5. Copia la **URL de la aplicación web** (termina en `/exec`) y pásasela a Claude, o ponla en `datos/lugares.json` → `"config"` → `"registroUrl"`.

## Uso diario
- **Aprobar un evento:** en *Eventos propuestos* cambia `estado` de `pendiente` a `aprobado`. Aparece en el mapa en minutos, sin tocar nada más. Para quitarlo, cambia a `rechazado` o `retirado`.
- **Reportes:** revisa la pestaña *Reportes*; si un evento tiene problemas, cambia su estado a `retirado`.
- **Aprobar un negocio:** en *Solicitudes* cambia `estado` a `aprobado` y pídele a Claude que lo agregue al mapa.
- **Canjear un cupón:** busca el código (Ctrl+F) en *Cupones* y escribe la fecha en `canjeado`.
- Si cambias el código: **Implementar → Gestionar implementaciones → editar (lápiz) → Versión: Nueva versión → Implementar**. La URL no cambia.

## Límites
- Gmail normal envía unos **100 correos al día** (códigos y avisos). Google Workspace: 1,500.
- Cada correo puede pedir máximo 4 códigos por hora; el código vence a los 10 minutos y permite 5 intentos.

## Captcha opcional (Cloudflare Turnstile, gratis)
Si llegan muchos eventos basura: crea un widget en dash.cloudflare.com → Turnstile, guarda la *Secret key* en Apps Script → **Configuración del proyecto → Propiedades del script** con el nombre `TURNSTILE_SECRET`, y pásale a Claude la *Site key*.
