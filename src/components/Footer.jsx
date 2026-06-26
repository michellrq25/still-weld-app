import { Phone, Mail, MapPin, FileText } from 'lucide-react'

import { CATEGORIES } from '../constants'
const CATEGORIES_FOOTER = CATEGORIES.slice(1);

export default function Footer({
  whatsappNumberDisplay,
  setActiveCategory,
  scrollSection,
  setIsReclamacionesOpen
}) {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <a href="#" className="footer-logo" onClick={(e) => { e.preventDefault(); scrollSection('hero'); }}>
            STILL <span>WELD</span>
          </a>
          <p>
            Importadores y distribuidores autorizados de equipos y suministros de soldadura, corte y EPP industrial. Comprometidos con la excelencia operativa y seguridad de nuestros clientes.
          </p>
        </div>

        <div className="footer-col">
          <h3>Categorías</h3>
          <ul className="footer-links">
            {CATEGORIES_FOOTER.map((cat) => (
              <li key={cat}>
                <a href="#productos" onClick={(e) => { e.preventDefault(); setActiveCategory(cat); scrollSection('productos'); }}>
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Navegación</h3>
          <ul className="footer-links">
            <li><a href="#hero" onClick={(e) => { e.preventDefault(); scrollSection('hero'); }}>Inicio</a></li>
            <li><a href="#productos" onClick={(e) => { e.preventDefault(); scrollSection('productos'); }}>Catálogo</a></li>
            <li><a href="#contacto" onClick={(e) => { e.preventDefault(); scrollSection('contacto'); }}>Contacto</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Atención Lima & Provincias</h3>
          <div className="footer-contact-item">
            <Phone size={16} className="footer-contact-icon" />
            <span>{whatsappNumberDisplay}</span>
          </div>
          <div className="footer-contact-item">
            <Mail size={16} className="footer-contact-icon" />
            <span>ventas@stillweld.com</span>
          </div>
          <div className="footer-contact-item">
            <MapPin size={16} className="footer-contact-icon" />
            <span>Envíos directos a todo el país vía agencias Marvisur, Shalom o de su preferencia.</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Still Weld. Software desarrollado por GalactiCode Devs. Todos los derechos reservados. Lima, Perú.</p>
        <button className="reclamaciones-link-btn" onClick={() => setIsReclamacionesOpen(true)}>
          <FileText size={16} /> Libro de Reclamaciones
        </button>
      </div>
    </footer>
  )
}
