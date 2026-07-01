import { ChevronRight, Flame, Truck, ShieldCheck } from 'lucide-react'

export default function HeroSection({ scrollSection }) {
  return (
    <section id="hero" className="hero-section" style={{ background: 'linear-gradient(135deg, #1B5C82 0%, #0095DA 100%)' }}>
      <div className="hero-container">
        <div className="hero-text-content">
          <h1 className="hero-title">
            Equipamiento Industrial de <span>Marcas Líderes</span> en Perú
          </h1>
          <p className="hero-subtitle">
            Ofrecemos la más completa gama de máquinas de soldar, equipos de corte por plasma, insumos y equipos de protección personal (EPP) con garantía oficial y envíos rápidos a todo el país.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => scrollSection('productos')}>
              Explorar Catálogo <ChevronRight size={18} />
            </button>
            <button className="btn btn-secondary" onClick={() => scrollSection('contacto')}>
              Contactar Asesor
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <Flame size={24} />
            </div>
            <div className="stat-info">
              <h3>Soldadoras e Insumos</h3>
              <p>ESAB, INDURA, VICTOR y más.</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <Truck size={24} />
            </div>
            <div className="stat-info">
              <h3>Envíos a Todo el Perú</h3>
              <p>Despachos garantizados desde Lima.</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <ShieldCheck size={24} />
            </div>
            <div className="stat-info">
              <h3>Garantía & Soporte</h3>
              <p>Equipos 100% originales certificados.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
