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
      <body style="font-family: sans-serif; padding: 2rem; text-align: center;">
        <h2 style="color: red;">Error: No se recibió ningún código de GitHub</h2>
        <p>Por favor, cierra esta pestaña e intenta de nuevo.</p>
        <script>
          if (window.opener) {
            window.opener.postMessage("authorization:github:error:No code received", "*");
          }
          setTimeout(function() { window.close(); }, 500);
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
      const errorHtml = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <title>Error de Autenticación</title>
        </head>
        <body style="font-family: sans-serif; padding: 2rem;">
          <h2 style="color: red;">Error en el intercambio de Token</h2>
          <p>GitHub retornó un error: <strong>${data.error_description || data.error}</strong></p>
          <script>
            if (window.opener) {
              window.opener.postMessage("authorization:github:error:${data.error}", "*");
            }
            setTimeout(function() { window.close(); }, 500);
          </script>
        </body>
        </html>
      `;
      return new NextResponse(errorHtml, {
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
          <p>GitHub no entregó un token de acceso válido. Por favor verifica tus credenciales en Vercel.</p>
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

    const successHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <title>Autenticado Correctamente</title>
      </head>
      <body style="font-family: sans-serif; padding: 2rem; text-align: center;">
        <h2 style="color: green;">Autenticación Exitosa</h2>
        <p>Comunicando con la ventana principal y cerrando ventana...</p>
        <script>
          (function() {
            const token = "${data.access_token}";
            const messageData = {
              token: token,
              provider: "github"
            };
            
            if (window.opener) {
              // 1. Enviar formato string (Netlify CMS / Decap CMS clásico)
              window.opener.postMessage(
                "authorization:github:success:" + JSON.stringify(messageData),
                "*"
              );
              
              // 2. Enviar formato objeto (Decap CMS moderno)
              window.opener.postMessage(
                {
                  provider: "github",
                  type: "authorization",
                  token: token
                },
                "*"
              );
              
              // Retrasar el cierre 300ms para asegurar la entrega del mensaje en navegadores lentos
              setTimeout(function() {
                window.close();
              }, 300);
            } else {
              console.error("Error: window.opener es nulo.");
              document.body.innerHTML = "<p style='color:red;'>Error: No se pudo comunicar con la ventana principal. Por favor, cierra esta pestaña e intenta de nuevo.</p>";
            }
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
      <body style="font-family: sans-serif; padding: 2rem; text-align: center;">
        <h2 style="color: red;">Error interno del servidor</h2>
        <p>${error.message}</p>
        <script>
          if (window.opener) {
            window.opener.postMessage("authorization:github:error:internal_error", "*");
          }
          setTimeout(function() { window.close(); }, 500);
        </script>
      </body>
      </html>
    `;
    return new NextResponse(catchErrorHtml, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}
