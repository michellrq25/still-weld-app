// Configuración rápida de productos destacados en el carrusel de inicio (HeroSection)
// Solo necesitas cambiar el 'id' (debe existir en products.json) y las 3 viñetas técnicas en 'specs'.
// La imagen, título, marca y categoría se sincronizan solos.

export const FEATURED_PRODUCTS_CONFIG = [
  {
    id: 9, // Máscara de Soldar Pipeliner
    themeColor: "#0095DA",
    specs: [
      "Fibra de Vidrio de Alta Resistencia",
      "Lente Flip-Up 2x4 Pulgadas",
      "Ajuste Ergonómico Ultraligero"
    ]
  },
  {
    id: 3, // Faja de Trazo Wizard Wrap
    themeColor: "#FFB800",
    specs: [
      "Para tuberías de 6\" a 30\"",
      "Soporta calor hasta 180°C",
      "Escala serigrafiada de precisión"
    ]
  },
  {
    id: 1, // Tafilete Jackson Safety
    themeColor: "#E65100",
    specs: [
      "Trinquete ajustable de gran tamaño",
      "Compatibilidad Universal Jackson 370",
      "Reposacabezas pivotante y ergonómico"
    ]
  }
];
