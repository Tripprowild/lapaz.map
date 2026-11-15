# Conectar el mapa con Google Sheets (unos 10 minutos)

Esto guarda en una hoja de cálculo de tu cuenta de Google:
- **Solicitudes**: los negocios que llenan el cuestionario "Anúnciate en el mapa".
- **Cupones**: cada cupón que descarga un visitante (código, fecha, perfil e idioma).

## Pasos
1. Entra a [sheets.new](https://sheets.new) con tu cuenta de Google. Ponle de nombre **Mapa La Paz · Registros**.
2. En el menú: **Extensiones → Apps Script**.
3. Borra lo que aparece y pega todo el contenido de `Codigo.gs`. Guarda (ícono de disco).
4. Arriba a la derecha: **Implementar → Nueva implementación**.
   - En el engrane, elige **Aplicación web**.
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquier persona**.
   - Haz clic en **Implementar** y autoriza los permisos (Google mostrará un aviso porque el script es tuyo y nuevo: *Configuración avanzada → Ir a…*).
5. Copia la **URL de la aplicación web** (termina en `/exec`).
6. Pégala en el chat con Claude, o tú mismo en `datos/lugares.json`, dentro de `"config"`:
   ```json
   "registroUrl": "https://script.google.com/macros/s/…/exec"
   ```

Las pestañas **Solicitudes** y **Cupones** se crean solas con el primer registro.

## Uso diario
- **Aprobar un negocio:** cambia la columna `estado` de `pendiente` a `aprobado` y pídele a Claude que lo agregue al mapa (o súmalo a `lugares.json`).
- **Canjear un cupón:** cuando un negocio te reporte un código, búscalo (Ctrl+F) en la pestaña **Cupones** y escribe la fecha en `canjeado`.
- Si cambias el código del script, vuelve a **Implementar → Gestionar implementaciones → editar → Nueva versión** para que la URL siga funcionando.
