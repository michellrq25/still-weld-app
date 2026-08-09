import { useState } from 'react'
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react'
import { CONTACT_METHOD, CONTACT_EMAIL, WHATSAPP_NUMBER } from '../../constants'

export default function ContactSection({ whatsappNumberDisplay }) {
  const [contactForm, setContactForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const isEmailMode = CONTACT_METHOD === 'email';

  const handleContactSubmit = (e) => {
    e.preventDefault();

    if (isEmailMode) {
      const subject = encodeURIComponent(`Consulta de Atención Personalizada - ${contactForm.nombre}`);
      const body = encodeURIComponent(
        `STILL WELD - Atención Personalizada\n\n` +
        `• Nombre: ${contactForm.nombre}\n` +
        `• Email: ${contactForm.email}\n` +
        `• Teléfono: ${contactForm.telefono || 'No especificado'}\n\n` +
        `Mensaje:\n${contactForm.mensaje}`
      );
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    } else {
      const message = `*STILL WELD - Atención Personalizada*\n\n` +
        `• *Nombre:* ${contactForm.nombre}\n` +
        `• *Email:* ${contactForm.email}\n` +
        `• *Teléfono:* ${contactForm.telefono || 'No especificado'}\n\n` +
        `*Mensaje:*\n${contactForm.mensaje}`;
      const encodedText = encodeURIComponent(message);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank');
    }

    setContactSubmitted(true);
    setTimeout(() => {
      setContactForm({ nombre: '', email: '', telefono: '', mensaje: '' });
      setContactSubmitted(false);
    }, 5000);
  }

  return (
    <section id="contacto" className="contact-section">
      <div className="contact-grid">
        <div className="contact-info-panel">
          <h2 className="contact-info-title">Atención Personalizada</h2>
          <p className="contact-info-desc">
            ¿Necesitas una cotización por volumen, asesoría técnica o tienes preguntas sobre nuestros productos? Escríbenos y un asesor te responderá a la brevedad.
          </p>

          <div className="contact-details-list">
            <div className="contact-detail-item">
              <div className="contact-detail-icon">
                <Phone size={20} />
              </div>
              <div className="contact-detail-text">
                <h4>WhatsApp / Central Telefónica</h4>
                <p>{whatsappNumberDisplay} (Atención Lunes a Sábado)</p>
              </div>
            </div>

            <div className="contact-detail-item">
              <div className="contact-detail-icon">
                <Mail size={20} />
              </div>
              <div className="contact-detail-text">
                <h4>Correo Electrónico</h4>
                <p>{CONTACT_EMAIL}</p>
              </div>
            </div>

            <div className="contact-detail-item">
              <div className="contact-detail-icon">
                <MapPin size={20} />
              </div>
              <div className="contact-detail-text">
                <h4>Almacén Principal y Envíos</h4>
                <p>Lima Centro - Despachos a nivel nacional a través de agencias seleccionadas.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-nombre">Nombre Completo *</label>
              <input
                type="text"
                id="contact-nombre"
                className="form-input"
                required
                value={contactForm.nombre}
                onChange={(e) => setContactForm({ ...contactForm, nombre: e.target.value })}
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Correo Electrónico *</label>
                <input
                  type="email"
                  id="contact-email"
                  className="form-input"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-tel">Teléfono / Celular</label>
                <input
                  type="tel"
                  id="contact-tel"
                  className="form-input"
                  value={contactForm.telefono}
                  onChange={(e) => setContactForm({ ...contactForm, telefono: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-msg">Mensaje o Detalle del Requerimiento *</label>
              <textarea
                id="contact-msg"
                className="form-textarea"
                required
                value={contactForm.mensaje}
                onChange={(e) => setContactForm({ ...contactForm, mensaje: e.target.value })}
                placeholder="Describe las herramientas, marcas o consumibles de tu interés..."
              />
            </div>

            <button type="submit" className="btn btn-primary form-submit-btn">
              {isEmailMode ? 'Enviar por Correo' : 'Enviar por WhatsApp'} {isEmailMode ? <Mail size={16} /> : <Send size={16} />}
            </button>

            {contactSubmitted && (
              <div className="form-success-alert">
                <CheckCircle2 size={20} />
                <span>
                  {isEmailMode 
                    ? '¡Gracias! Se abrirá tu aplicación de correo para enviar la consulta.' 
                    : '¡Gracias! Tu mensaje ha sido enviado por WhatsApp. Un asesor se comunicará contigo pronto.'}
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
