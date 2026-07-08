'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function ImageLightboxModal({ 
  isOpen, 
  onClose, 
  imageSrc, 
  productName, 
  productBrand, 
  productPrice, 
  productDescription,
  onCotizar 
}) {

  // Escuchar la tecla "Escape" para cerrar el modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Evitar scroll en la página de fondo cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="lightbox-overlay active" 
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      {/* Contenido del modal */}
      <div 
        className="lightbox-content" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de Cierre Flotante - Ubicado adentro para compartir el mismo contexto de apilamiento GPU */}
        <button 
          className="lightbox-close-btn" 
          onClick={onClose} 
          aria-label="Cerrar modal"
        >
          <X size={24} />
        </button>

        <div className="lightbox-image-container">
          <img 
            src={imageSrc} 
            alt={productName} 
            className="lightbox-image" 
          />
        </div>

        {/* Panel inferior de información del producto */}
        <div className="lightbox-info-panel">
          <div className="lightbox-info-text">
            <span className="lightbox-brand">{productBrand}</span>
            <h2 className="lightbox-name">{productName}</h2>
            {productDescription && (
              <p style={{ 
                fontSize: '0.9rem', 
                color: '#cccccc', 
                marginTop: '8px', 
                marginBottom: '14px', 
                lineHeight: '1.4',
                textAlign: 'left'
              }}>
                {productDescription}
              </p>
            )}
            <div className="lightbox-price">
              <span className="lightbox-price-label">Precio Inc. IGV</span>
              <span className="lightbox-price-value">S/ {productPrice.toFixed(2)}</span>
            </div>
          </div>

          <button 
            className="lightbox-cotizar-btn" 
            onClick={onCotizar}
            title="Cotizar por WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ marginRight: '8px' }}
            >
              <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.76.46 3.42 1.26 4.89l-1.34 4.9 5.02-1.32c1.42.77 3.03 1.21 4.74 1.21 5.52 0 10-4.48 10-10C22.004 6.48 17.524 2 12.004 2zm5.72 13.9c-.24.68-1.38 1.25-1.92 1.31-.49.05-.98.24-3.14-.62-2.77-1.1-4.56-3.95-4.7-4.14-.14-.19-1.12-1.5-1.12-2.86 0-1.36.7-2.02.95-2.29.2-.23.54-.34.85-.34.1 0 .2 0 .29.01.27.01.41.03.59.45.22.54.77 1.88.84 2.02.07.14.12.31.02.51-.1.2-.15.31-.3.49-.15.17-.31.39-.45.52-.16.15-.33.32-.14.65.19.32.85 1.4 1.82 2.27.97.87 1.79 1.14 2.1 1.27.31.13.5.11.69-.1.19-.22.82-.95 1.04-1.28.22-.33.44-.28.75-.17.31.11 1.96.93 2.3 1.1.34.17.57.25.65.39.08.14.08.82-.16 1.5z" />
            </svg>
            Cotizar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
