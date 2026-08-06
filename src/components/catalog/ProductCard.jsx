import { Flame, Sparkles, ShieldCheck, Wrench } from 'lucide-react'

import { IMAGE_BASE_PATH } from '../../constants'

export default function ProductCard({ product, whatsappNumber, onImageClick }) {
  const handleCotizar = () => {
    const message = `*STILL WELD*\nHola, deseo cotizar el siguiente producto:\n\n• *${product.name}* (Marca: ${product.brand})\nPrecio Inc. IGV: S/ ${product.price.toFixed(2)}\n\nPor favor, confírmenme la disponibilidad de stock y detalles de entrega.`;
    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
  }

  return (
    <article className="product-card">
      <span className="product-badge-brand">{product.brand}</span>


      <div
        className={`product-image-container ${product.image ? 'clickable' : ''}`}
        onClick={product.image ? () => onImageClick(product) : undefined}
      >
        {product.image ? (
          <img
            src={product.image.startsWith('/') ? product.image : `${IMAGE_BASE_PATH}/${product.image}`}
            alt={product.name}
            className="product-image"
          />
        ) : (
          <div className="product-image-placeholder">
            {product.category === 'Soldadura' && <Flame size={48} strokeWidth={1.5} />}
            {product.category === 'Corte' && <Sparkles size={48} strokeWidth={1.5} />}
            {product.category === 'EPP' && <ShieldCheck size={48} strokeWidth={1.5} />}
            {product.category === 'Consumibles' && <Flame size={48} strokeWidth={1.5} style={{ opacity: 0.7 }} />}
            {product.category === 'Herramientas' && <Wrench size={48} strokeWidth={1.5} />}
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              FOTO REFERENCIAL {product.brand}
            </span>
          </div>
        )}
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-footer">
          <div className="product-price">
            <span className="price-label">Precio Inc. IGV</span>
            <span className="price-value">S/ {product.price.toFixed(2)}</span>
          </div>
          <button
            className="cotizar-btn"
            onClick={handleCotizar}
            title="Cotizar por WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ marginRight: '6px' }}
            >
              <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.76.46 3.42 1.26 4.89l-1.34 4.9 5.02-1.32c1.42.77 3.03 1.21 4.74 1.21 5.52 0 10-4.48 10-10C22.004 6.48 17.524 2 12.004 2zm5.72 13.9c-.24.68-1.38 1.25-1.92 1.31-.49.05-.98.24-3.14-.62-2.77-1.1-4.56-3.95-4.7-4.14-.14-.19-1.12-1.5-1.12-2.86 0-1.36.7-2.02.95-2.29.2-.23.54-.34.85-.34.1 0 .2 0 .29.01.27.01.41.03.59.45.22.54.77 1.88.84 2.02.07.14.12.31.02.51-.1.2-.15.31-.3.49-.15.17-.31.39-.45.52-.16.15-.33.32-.14.65.19.32.85 1.4 1.82 2.27.97.87 1.79 1.14 2.1 1.27.31.13.5.11.69-.1.19-.22.82-.95 1.04-1.28.22-.33.44-.28.75-.17.31.11 1.96.93 2.3 1.1.34.17.57.25.65.39.08.14.08.82-.16 1.5z" />
            </svg>
            <span>Cotizar<span className="btn-mobile-only"> producto</span></span>
          </button>
        </div>
      </div>
    </article>
  )
}
