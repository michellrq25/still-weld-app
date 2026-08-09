// Configuración general del prototipo Still Weld

// Número de productos que se muestran inicialmente y por cada carga adicional
export const PRODUCTS_PER_PAGE = 8;

// Método de envío del formulario de contacto: 'whatsapp' o 'email'
export const CONTACT_METHOD = (process.env.CONTACT_METHOD || process.env.NEXT_PUBLIC_CONTACT_METHOD || 'whatsapp').toLowerCase();

// Correo de contacto principal
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'ventas@stillweld.com';

// Número de WhatsApp (versión formateada para mostrar en pantalla)
export const WHATSAPP_NUMBER_DISPLAY = process.env.WHATSAPP_NUMBER_DISPLAY || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_DISPLAY || '+51 991 691 313';

// Número de WhatsApp (versión limpia de solo dígitos para la API de enlaces de WhatsApp)
export const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '51991691313';

// Ruta base pública donde se almacenan las fotos reales de los productos
export const IMAGE_BASE_PATH = '/images/products';

// Umbral de stock para mostrar alerta de pocas unidades
export const STOCK_ALERT_THRESHOLD = 3;

