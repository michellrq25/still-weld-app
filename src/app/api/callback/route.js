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

    const successHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <title>Autenticado Correctamente</title>
      </head>
      <body>
        <p>Autenticación exitosa. Cargando panel administrador...</p>
        <script>
          (function() {
            const messageData = {
              token: "${data.access_token}",
              provider: "github"
            };
            
            window.opener.postMessage(
              "authorization:github:success:" + JSON.stringify(messageData),
              "*"
            );
            window.close();
          })();
        </script>
      </body>
      </html>
    `;

    return new NextResponse(successHtml, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });

  } catch (error) {
    const catchErrorHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <title>Error de Servidor</title>
      </head>
      <body>
        <p>Error interno: ${error.message}</p>
        <script>
          window.opener.postMessage("authorization:github:error:${error.message}", "*");
          window.close();
        </script>
      </body>
      </html>
    `;
    return new NextResponse(catchErrorHtml, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}
