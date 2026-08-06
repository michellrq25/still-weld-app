import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ShieldCheck, Flame, Wrench, ArrowRight } from 'lucide-react';
import { IMAGE_BASE_PATH } from '../../constants';

// Array de iconos predeterminados para las características técnicas
const SPEC_ICONS = [ShieldCheck, Flame, Wrench];

export default function HeroSection({ featuredProducts = [], scrollSection, onCotizarProduct }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll del carrusel cada 6 segundos
  useEffect(() => {
    if (featuredProducts.length <= 1) return;

    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 6000);

    return () => clearTimeout(timer);
  }, [currentSlide, featuredProducts.length]);

  if (!featuredProducts || featuredProducts.length === 0) return null;

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const handleCotizar = (product) => {
    if (onCotizarProduct) {
      onCotizarProduct(product);
    } else {
      const message = `*STILL WELD*\nHola, deseo cotizar el siguiente producto:\n\n• *${product.name}* (Marca: ${product.brand})\nPrecio Inc. IGV: S/ ${product.price.toFixed(2)}\n\nPor favor, confírmenme la disponibilidad de stock y detalles de entrega.`;
      const encodedText = encodeURIComponent(message);
      window.open(`https://wa.me/51999202852?text=${encodedText}`, '_blank');
    }
  };

  const activeProduct = featuredProducts[currentSlide];

  return (
    <section
      id="hero"
      className="hero-section"
      style={{ background: activeProduct.bgGradient }}
    >
      {/* Sutil cuadrícula industrial de fondo */}
      <div className="hero-grid-overlay" />

      {/* Flechas de navegación del carrusel */}
      {featuredProducts.length > 1 && (
        <>
          <button
            className="carousel-arrow arrow-left"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            aria-label="Diapositiva anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="carousel-arrow arrow-right"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            aria-label="Siguiente diapositiva"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div className="hero-container">
        {featuredProducts.map((product, index) => {
          const isActive = index === currentSlide;

          // Formatear la ruta de la imagen
          const imageUrl = product.image.startsWith('/')
            ? product.image
            : `${IMAGE_BASE_PATH}/${product.image}`;

          // Usar etiqueta/tag dinámico según categoría si no tiene uno definido
          const productTag = product.tag || (product.category === 'EPP' ? 'Seguridad y EPP' : 'Equipamiento Industrial');

          return (
            <div
              key={product.id}
              className={`hero-slide-wrapper ${isActive ? 'active' : 'inactive'}`}
            >
              {/* Contenido de texto a la izquierda */}
              <div className="hero-text-content">
                <div className="hero-badge-row">
                  <span className="hero-tag-badge">{productTag}</span>
                  <span className="hero-brand-badge">{product.brand}</span>
                </div>

                <h1 className="hero-title">
                  {product.name}
                </h1>

                <div className="hero-price-row">
                  <span className="price-label">Precio Inc. IGV:</span>
                  <span className="price-value" style={{ color: product.themeColor }}>
                    S/ {product.price.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="hero-buttons">
                  <button className="btn btn-primary" onClick={() => handleCotizar(product)}>
                    <span>Cotizar<span className="btn-desktop-only"> por WhatsApp</span><span className="btn-mobile-only"> producto</span></span>
                    <ArrowRight size={18} />
                  </button>
                  <button className="btn btn-secondary" onClick={() => scrollSection('productos')}>
                    <span>Ver Catálogo<span className="btn-desktop-only"> Completo</span></span>
                  </button>
                </div>
              </div>

              {/* Visualización del producto a la derecha */}
              <div className="hero-visual">
                <div
                  className="hero-image-glow-container"
                  style={{ '--glow-color': product.glowColor }}
                >
                  <div className="hero-image-wrapper">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="hero-product-image"
                      loading="eager"
                    />
                  </div>

                  {/* Badge de categoría flotante sobre la imagen */}
                  <div className="floating-category-badge" style={{ backgroundColor: product.themeColor }}>
                    {product.category}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicadores de progreso inferiores */}
      {featuredProducts.length > 1 && (
        <div className="carousel-indicators">
          {featuredProducts.map((product, index) => {
            const isActive = index === currentSlide;
            return (
              <button
                key={product.id}
                className={`indicator-btn ${isActive ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Ir a diapositiva ${index + 1}`}
              >
                <span className="indicator-num">0{index + 1}</span>
                <div className="indicator-bar-bg">
                  <div
                    className="indicator-bar-fill"
                    style={{
                      animationDuration: isActive ? '6s' : '0s',
                      backgroundColor: isActive ? product.themeColor : 'rgba(255,255,255,0.2)'
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
