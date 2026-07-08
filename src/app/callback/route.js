import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    const errorHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <title>Error de Autenticación</title>
      </head>
      <body>
        <p>Error: No se recibió ningún código de GitHub.</p>
        <script>
          window.opener.postMessage("authorization:github:error:No code received", "*");
          window.close();
        </script>
      </body>
      </html>
    `;
    return new NextResponse(errorHtml, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      const errorResponseHtml = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <title>Error de Autenticación</title>
        </head>
        <body>
          <p>Error de GitHub: ${data.error_description || data.error}</p>
          <script>
            window.opener.postMessage("authorization:github:error:${data.error}", "*");
            window.close();
          </script>
        </body>
        </html>
      `;
      return new NextResponse(errorResponseHtml, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    if (!data.access_token) {
      const noTokenHtml = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <title>Error de Autenticación</title>
        </head>
        <body style="font-family: sans-serif; padding: 2rem;">
          <h2 style="color: red;">Error: No se recibió Token de Acceso</h2>
          <p>GitHub no entregó un token de acceso válido. Esto puede deberse a que las credenciales (Client ID o Client Secret) configuradas en Vercel son incorrectas o no coinciden con la OAuth App de GitHub.</p>
          <p>Respuesta detallada de GitHub:</p>
          <pre style="background: #f4f4f4; padding: 1rem; border-radius: 4px;"><code>\${JSON.stringify(data, null, 2)}</code></pre>
          <script>
            if (window.opener) {
              window.opener.postMessage("authorization:github:error:No access token received", "*");
            }
          </script>
        </body>
        </html>
      `;
      return new NextResponse(noTokenHtml, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    const host = request.headers.get('host') || 'still-weld-app.vercel.app';
    const protocol = host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https';

    // Redirigir al panel de administración con el hash de acceso
    // Decap CMS (corriendo en el popup redirigido) procesará el hash,
    // enviará el postMessage a la ventana principal de forma nativa y se cerrará solo.
    const redirectUrl = `${protocol}://${host}/admin/index.html#access_token=${data.access_token}&token_type=bearer`;
    return NextResponse.redirect(redirectUrl);

  } catch (error) {
    const catchErrorHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <title>Error de Servidor</title>
      </head>
      <body style="font-family: sans-serif; padding: 2rem; text-align: center;">
        <h2 style="color: red;">Error interno del servidor</h2>
        <p>${error.message}</p>
      </body>
      </html>
    `;
    return new NextResponse(catchErrorHtml, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}
