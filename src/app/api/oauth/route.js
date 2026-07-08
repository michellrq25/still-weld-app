import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get('scope') || 'repo,user';
  
  const client_id = process.env.OAUTH_CLIENT_ID || process.env.GITHUB_CLIENT_ID;
  if (!client_id) {
    return NextResponse.json(
      { error: 'Falta la variable de entorno de Client ID (OAUTH_CLIENT_ID o GITHUB_CLIENT_ID)' },
      { status: 500 }
    );
  }

  // Redirigir a la pantalla de login de GitHub sin redirección explícita
  // (GitHub usará la URL de callback configurada en la App de OAuth)
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}`;
  return NextResponse.redirect(redirectUrl);
}
