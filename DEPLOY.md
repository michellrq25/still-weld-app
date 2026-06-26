# Guía de Despliegue: Still Weld en Vercel (con Decap CMS)

Esta guía detalla los pasos para desplegar tu aplicación Next.js en **Vercel** y configurar la autenticación de **Decap CMS** sin depender de Netlify.

---

## Paso 1: Subir el proyecto a GitHub

Decap CMS requiere interactuar con tu repositorio de GitHub para guardar imágenes y cambios en `products.json` como confirmaciones de código (commits).

1. Inicializa y sube tus cambios a GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: migracion completa a Next.js"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```

2. Configura tu repositorio en [public/admin/config.yml](file:///c:/MICHELL/Freelance/Proyectos/React/still-weld-app/public/admin/config.yml):
   Asegúrate de cambiar la propiedad `repo` con tu usuario y repositorio de GitHub:
   ```yaml
   backend:
     name: github
     repo: TU_USUARIO_GITHUB/TU_REPOSITORIO_GITHUB
     branch: main
   ```

---

## Paso 2: Desplegar en Vercel

1. Ve a [Vercel](https://vercel.com/) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **Add New...** y luego en **Project**.
3. Importa tu repositorio `still-weld-app`.
4. Vercel detectará automáticamente que es un proyecto **Next.js** y configurará por sí mismo los comandos:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
5. Haz clic en **Deploy**. ¡Tu sitio ya estará en vivo!

---

## Paso 3: Configurar la Autenticación de Decap CMS en Vercel

Dado que ya no usamos Netlify Identity, necesitamos un **OAuth Provider** (Servidor de Autorización) para permitir el inicio de sesión seguro al panel `/admin`. 

Hay dos maneras recomendadas de hacerlo en Vercel:

### Opción A: Usar un OAuth Gatekeeper Externo (La más rápida y sencilla)

Puedes usar un servicio gratuito de pasarela OAuth como **Decap CMS OAuth Provider**:

1. Ve a [GitHub Developer Settings](https://github.com/settings/developers) y crea una nueva **OAuth App**:
   - **Application Name:** Still Weld Admin
   - **Homepage URL:** Tu URL de Vercel (ej. `https://still-weld.vercel.app`)
   - **Authorization callback URL:** `https://api.netlify.com/provider/oauth/callback` (si usas un proveedor que comparta este callback, o el provisto por la pasarela externa).
2. Obtén el **Client ID** y el **Client Secret** generados por GitHub.
3. Utiliza un servicio gratuito como [Decap CMS External OAuth](https://github.com/vencing/decap-cms-oauth-provider-node) o despliega tu propia mini-aplicación en Vercel con un solo clic usando el botón de despliegue de Vercel del repositorio oficial de pasarela de Decap.
4. En tu `public/admin/config.yml`, añade la URL de esa pasarela:
   ```yaml
   backend:
     name: github
     repo: TU_USUARIO_GITHUB/TU_REPOSITORIO_GITHUB
     branch: main
     base_url: https://tu-pasarela-oauth.vercel.app  # Reemplazar con la URL de tu pasarela OAuth
   ```

### Opción B: Integrar un Endpoint de Autenticación directamente en la App de Next.js

Dado que ahora estás usando Next.js, puedes crear una **API Route** interna en la carpeta `src/app/api/auth` que actúe como tu propio servidor OAuth, evitando servicios externos de terceros.
