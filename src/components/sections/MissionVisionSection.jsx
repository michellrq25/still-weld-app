import { Target, Compass } from 'lucide-react';

export default function MissionVisionSection() {
  return (
    <section className="mission-vision-section" id="nosotros">
      <div className="section-header">
        <h2 className="section-title">Nuestra Empresa</h2>
        <p className="section-desc">
          Conoce el propósito y la visión de futuro que guían nuestro compromiso diario con la industria metalmecánica.
        </p>
      </div>

      <div className="mission-vision-grid">
        {/* Tarjeta Misión */}
        <div className="mission-card">
          <div className="mission-icon-wrapper">
            <Target size={32} className="mission-icon" />
          </div>
          <h3 className="mission-card-title">Nuestra Misión</h3>
          <p className="mission-card-text">
            Proveer equipos y consumibles de soldadura y corte de la más alta calidad, garantizando seguridad, eficiencia y soporte técnico especializado para potenciar el crecimiento y éxito de nuestros clientes industriales y artesanales.
          </p>
        </div>

        {/* Tarjeta Visión */}
        <div className="mission-card">
          <div className="mission-icon-wrapper">
            <Compass size={32} className="mission-icon" />
          </div>
          <h3 className="mission-card-title">Nuestra Visión</h3>
          <p className="mission-card-text">
            Ser reconocidos para el 2030 como el socio estratégico líder a nivel nacional en soluciones de soldadura, corte y protección industrial, destacando por nuestra innovación, entregas inmediatas y compromiso inquebrantable con la excelencia y la seguridad.
          </p>
        </div>
      </div>
    </section>
  );
}
