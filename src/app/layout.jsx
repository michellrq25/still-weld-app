import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export const metadata = {
  title: 'Still Weld | Equipamiento Industrial, Soldadoras y EPP',
  description: 'Ofrecemos una amplia gama de equipos de soldadura, herramientas y accesorios de marcas líderes como ESAB, Indura y Victor. Encuentra máquinas de soldar, equipos de corte por plasma, EPP y más con envíos a todo el Perú.',
  icons: {
    icon: '/logo.jpeg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
