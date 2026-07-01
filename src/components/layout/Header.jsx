import { useState } from 'react'
import { Search, X, Menu } from 'lucide-react'
import Logo from '../ui/Logo'

export default function Header({ searchQuery, setSearchQuery, scrollSection }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    scrollSection(sectionId);
  }

  return (
    <header className="site-header">
      <div className="header-container">
        <a href="#" className="logo-link" onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}>
          <div className="logo-icon">
            <Logo size={40} />
          </div>
          <span className="logo-text">STILL <span>WELD</span></span>
        </a>

        {/* Buscador */}
        <div className="search-bar">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Buscar soldadoras, EPP, marcas (ESAB, Indura...)"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Menú de Navegación */}
        <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="#hero" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}>Inicio</a>
          <a href="#productos" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('productos'); }}>Productos</a>
          <a href="#nosotros" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('nosotros'); }}>Nosotros</a>
          <a href="#contacto" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('contacto'); }}>Contacto</a>
        </nav>

        {/* Acciones */}
        <div className="header-actions">
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}
