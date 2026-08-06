import { ShieldAlert } from 'lucide-react'
import ProductCard from './ProductCard'

export default function ProductsCatalog({ 
  loading, 
  filteredProducts, 
  visibleCount, 
  setVisibleCount, 
  productsPerPage,
  whatsappNumber,
  onImageClick
}) {
  return (
    <section id="productos" style={{ scrollMarginTop: '100px' }}>
      <div className="section-header">
        <h2 className="section-title">Nuestro Catálogo</h2>
        <p className="section-desc">
          Equipos certificados y consumibles con entrega inmediata. Encuentra lo que necesitas con el buscador de arriba.
        </p>
      </div>

      {/* Grilla de Productos */}
      <div className="products-grid">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Cargando catálogo industrial...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.slice(0, visibleCount).map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              whatsappNumber={whatsappNumber} 
              onImageClick={onImageClick}
            />
          ))
        ) : (
          <div className="no-results">
            <ShieldAlert className="no-results-icon" size={48} />
            <h3>No encontramos productos</h3>
            <p>Prueba buscando con otros términos.</p>
          </div>
        )}
      </div>

      {visibleCount < filteredProducts.length && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={() => setVisibleCount((prev) => prev + productsPerPage)}>
            <span>Ver más productos</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
