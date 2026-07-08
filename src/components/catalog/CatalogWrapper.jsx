'use client';

import { useState, useMemo, useEffect } from 'react';

import Header from '../layout/Header';
import HeroSection from '../sections/HeroSection';
import ProductsCatalog from './ProductsCatalog';
import ContactSection from '../sections/ContactSection';
import Footer from '../layout/Footer';
import ReclamacionesModal from '../ui/ReclamacionesModal';
import ImageLightboxModal from '../ui/ImageLightboxModal';
import MissionVisionSection from '../sections/MissionVisionSection';

import { PRODUCTS_PER_PAGE, WHATSAPP_NUMBER_DISPLAY, WHATSAPP_NUMBER, IMAGE_BASE_PATH } from '../../constants';

export default function CatalogWrapper({ initialProducts }) {
  // Estados principales
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isReclamacionesOpen, setIsReclamacionesOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [products] = useState(initialProducts || []);
  const [activeLightboxProduct, setActiveLightboxProduct] = useState(null);

  const handleCotizarProduct = (product) => {
    const message = `*STILL WELD*\nHola, deseo cotizar el siguiente producto:\n\n• *${product.name}* (Marca: ${product.brand})\nPrecio Inc. IGV: S/ ${product.price.toFixed(2)}\n\nPor favor, confírmenme la disponibilidad de stock y detalles de entrega.`;
    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank');
  };

  // Resetear la cantidad de productos visibles cuando cambia la categoría o búsqueda
  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, [activeCategory, searchQuery]);

  // Manejar el cambio del término de búsqueda y desplazar automáticamente a productos
  const handleSearchChange = (query) => {
    const isFirstChar = searchQuery === '' && query !== '';
    setSearchQuery(query);
    if (query.trim() !== '') {
      setActiveCategory('Todos');
      if (isFirstChar) {
        scrollSection('productos');
      }
    }
  };

  // Filtrado de productos en tiempo real (con normalización y raíces flexibles para español)
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products.filter((product) => activeCategory === 'Todos' || product.category === activeCategory);
    }

    const cleanText = (text) => {
      return (text || '')
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
    };

    const queryTerms = cleanText(searchQuery)
      .split(/\s+/)
      .filter(Boolean)
      .map((term) => {
        // Quitar sufijos comunes en español de plurales y sustantivos instrumentales/agentes
        // para extraer la raíz de búsqueda (ej. soldadoras/soldadores/soldadora/soldador -> sold)
        return term.replace(/(adoras|adores|adora|ador|as|es|s)$/g, '');
      })
      .filter((term) => term.length > 0);

    return products.filter((product) => {
      const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory;
      
      const productFields = [
        product.name,
        product.brand,
        product.category,
        product.description
      ].map(cleanText);

      const matchesSearch = queryTerms.every((term) => 
        productFields.some((field) => field.includes(term))
      );

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const scrollSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-wrapper">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={handleSearchChange} 
        scrollSection={scrollSection} 
      />

      <HeroSection 
        scrollSection={scrollSection} 
      />

      <main className="main-content">
        <ProductsCatalog 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          loading={false}
          filteredProducts={filteredProducts}
          visibleCount={visibleCount}
          setVisibleCount={setVisibleCount}
          productsPerPage={PRODUCTS_PER_PAGE}
          whatsappNumber={WHATSAPP_NUMBER}
          onImageClick={(product) => setActiveLightboxProduct(product)}
        />

        <MissionVisionSection />

        <ContactSection 
          whatsappNumberDisplay={WHATSAPP_NUMBER_DISPLAY} 
        />
      </main>

      <Footer 
        whatsappNumberDisplay={WHATSAPP_NUMBER_DISPLAY}
        setActiveCategory={setActiveCategory}
        scrollSection={scrollSection}
        setIsReclamacionesOpen={setIsReclamacionesOpen}
      />

      <ReclamacionesModal 
        isOpen={isReclamacionesOpen} 
        setIsOpen={setIsReclamacionesOpen} 
      />

      {/* WHATSAPP FLOATING BUTTON */}
      <button
        className="whatsapp-float"
        onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20deseo%20informaci%C3%B3n%20sobre%20equipos%20de%20soldar`, '_blank')}
        aria-label="Contactar por WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.76.46 3.42 1.26 4.89l-1.34 4.9 5.02-1.32c1.42.77 3.03 1.21 4.74 1.21 5.52 0 10-4.48 10-10C22.004 6.48 17.524 2 12.004 2zm5.72 13.9c-.24.68-1.38 1.25-1.92 1.31-.49.05-.98.24-3.14-.62-2.77-1.1-4.56-3.95-4.7-4.14-.14-.19-1.12-1.5-1.12-2.86 0-1.36.7-2.02.95-2.29.2-.23.54-.34.85-.34.1 0 .2 0 .29.01.27.01.41.03.59.45.22.54.77 1.88.84 2.02.07.14.12.31.02.51-.1.2-.15.31-.3.49-.15.17-.31.39-.45.52-.16.15-.33.32-.14.65.19.32.85 1.4 1.82 2.27.97.87 1.79 1.14 2.1 1.27.31.13.5.11.69-.1.19-.22.82-.95 1.04-1.28.22-.33.44-.28.75-.17.31.11 1.96.93 2.3 1.1.34.17.57.25.65.39.08.14.08.82-.16 1.5z" />
        </svg>
      </button>

      {activeLightboxProduct && (
        <ImageLightboxModal
          isOpen={!!activeLightboxProduct}
          onClose={() => setActiveLightboxProduct(null)}
          imageSrc={
            activeLightboxProduct.image.startsWith('/') 
              ? activeLightboxProduct.image 
              : `${IMAGE_BASE_PATH}/${activeLightboxProduct.image}`
          }
          productName={activeLightboxProduct.name}
          productBrand={activeLightboxProduct.brand}
          productPrice={activeLightboxProduct.price}
          productDescription={activeLightboxProduct.description}
          onCotizar={() => handleCotizarProduct(activeLightboxProduct)}
        />
      )}
    </div>
  );
}
