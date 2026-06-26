# Still Weld App (Next.js + Decap CMS)

Este proyecto es el sitio web corporativo y catálogo interactivo de **Still Weld**, una empresa especializada en la venta de equipamiento industrial, soldadoras y equipo de protección personal (EPP).

La aplicación está desarrollada con **Next.js (App Router)** para un rendimiento excepcional y optimización de SEO (motores de búsqueda) mediante la generación de páginas estáticas en el servidor, e integrada con **Decap CMS** para permitir la edición del catálogo de productos de forma autogestionable y sin bases de datos tradicionales (Git-based CMS).

---

## 🛠️ Tecnologías Utilizadas

* **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
* **Biblioteca:** [React 19](https://react.dev/)
* **Estilos:** Vanilla CSS (Diseño responsivo premium y animaciones)
* **Gestor de Contenido (CMS):** [Decap CMS](https://decapcms.org/) (Persistido en `public/products.json` mediante commits automáticos a GitHub)
* **Iconografía:** [Lucide React](https://lucide.dev/)
* **Plataforma de Despliegue:** [Vercel](https://vercel.com/)

---

## 🚀 Inicio Rápido (Desarrollo Local)

Sigue estos pasos para ejecutar la aplicación en tu entorno de desarrollo local:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar el entorno de desarrollo:**
   ```bash
   npm run dev
   ```

Este comando levanta concurrentemente:
* El servidor de desarrollo de Next.js en [http://localhost:3000](http://localhost:3000)
* El backend local de Decap CMS en el puerto `8081` para interactuar con tus datos de desarrollo.

3. **Panel de Administración local:**
   * Abre [http://localhost:3000/admin](http://localhost:3000/admin) para añadir, modificar o borrar productos localmente.

---

## 📦 Compilación para Producción

Para compilar y optimizar el sitio web listo para producción, ejecuta:

```bash
npm run build
```

Next.js generará una versión estática altamente optimizada en la carpeta `.next/`, pre-renderizando el catálogo de productos para una carga instantánea y optimización SEO ideal.

---

## 🌐 Despliegue en Vercel

El proyecto está optimizado y listo para ser desplegado en **Vercel** con un solo clic importando el repositorio de GitHub. 

Para consultar los detalles sobre cómo enlazar tu repositorio y configurar la autenticación OAuth de GitHub en producción para Decap CMS, revisa la guía de despliegue en [DEPLOY.md](DEPLOY.md).
