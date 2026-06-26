import { useState } from 'react'
import { FileText, X, Send, CheckCircle2 } from 'lucide-react'

export default function ReclamacionesModal({ isOpen, setIsOpen }) {
  const [reclamacionSubmitted, setReclamacionSubmitted] = useState(false);
  const [reclamacionTicket, setReclamacionTicket] = useState('');
  const [reclamacionesForm, setReclamacionesForm] = useState({
    tipoDocumento: 'DNI',
    nroDocumento: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    domicilio: '',
    email: '',
    telefono: '',
    tipoReclamo: 'Reclamo',
    detalle: '',
    pedido: ''
  });

  const handleReclamacionesSubmit = (e) => {
    e.preventDefault();
    const ticket = `REC-${Math.floor(100000 + Math.random() * 900000)}`;
    setReclamacionTicket(ticket);
    setReclamacionSubmitted(true);
  };

  const closeReclamacionesModal = () => {
    setIsOpen(false);
    setReclamacionSubmitted(false);
    setReclamacionesForm({
      tipoDocumento: 'DNI',
      nroDocumento: '',
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      domicilio: '',
      email: '',
      telefono: '',
      tipoReclamo: 'Reclamo',
      detalle: '',
      pedido: ''
    });
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={closeReclamacionesModal}>
      <div className="reclamaciones-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FileText size={20} /> Libro de Reclamaciones Digital</h2>
          <button className="modal-close-btn" onClick={closeReclamacionesModal}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {!reclamacionSubmitted ? (
            <form className="reclamaciones-form" onSubmit={handleReclamacionesSubmit}>
              <div className="modal-intro-box">
                Conforme a lo establecido en el Código de Protección y Defensa del Consumidor (Ley N° 29571), Still Weld pone a su disposición este Libro de Reclamaciones virtual para que pueda registrar su disconformidad respecto a un producto o servicio.
              </div>

              {/* Sección 1: Identificación del Consumidor */}
              <h3 className="form-section-title">1. Identificación del Consumidor</h3>

              <div className="form-grid-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="rec-tipo-doc">Tipo Documento *</label>
                  <select
                    id="rec-tipo-doc"
                    className="form-input"
                    style={{ padding: '0.7rem' }}
                    value={reclamacionesForm.tipoDocumento}
                    onChange={(e) => setReclamacionesForm({ ...reclamacionesForm, tipoDocumento: e.target.value })}
                  >
                    <option value="DNI">DNI</option>
                    <option value="RUC">RUC</option>
                    <option value="CE">C.E.</option>
                  </select>
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label" htmlFor="rec-doc">Número Documento *</label>
                  <input
                    type="text"
                    id="rec-doc"
                    className="form-input"
                    required
                    value={reclamacionesForm.nroDocumento}
                    onChange={(e) => setReclamacionesForm({ ...reclamacionesForm, nroDocumento: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="rec-nombres">Nombres Completos / Razón Social *</label>
                <input
                  type="text"
                  id="rec-nombres"
                  className="form-input"
                  required
                  value={reclamacionesForm.nombres}
                  onChange={(e) => setReclamacionesForm({ ...reclamacionesForm, nombres: e.target.value })}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="rec-paterno">Apellido Paterno</label>
                  <input
                    type="text"
                    id="rec-paterno"
                    className="form-input"
                    value={reclamacionesForm.apellidoPaterno}
                    onChange={(e) => setReclamacionesForm({ ...reclamacionesForm, apellidoPaterno: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="rec-materno">Apellido Materno</label>
                  <input
                    type="text"
                    id="rec-materno"
                    className="form-input"
                    value={reclamacionesForm.apellidoMaterno}
                    onChange={(e) => setReclamacionesForm({ ...reclamacionesForm, apellidoMaterno: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="rec-domicilio">Domicilio *</label>
                <input
                  type="text"
                  id="rec-domicilio"
                  className="form-input"
                  required
                  value={reclamacionesForm.domicilio}
                  onChange={(e) => setReclamacionesForm({ ...reclamacionesForm, domicilio: e.target.value })}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="rec-email">Correo Electrónico *</label>
                  <input
                    type="email"
                    id="rec-email"
                    className="form-input"
                    required
                    value={reclamacionesForm.email}
                    onChange={(e) => setReclamacionesForm({ ...reclamacionesForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="rec-tel">Teléfono / Celular *</label>
                  <input
                    type="tel"
                    id="rec-tel"
                    className="form-input"
                    required
                    value={reclamacionesForm.telefono}
                    onChange={(e) => setReclamacionesForm({ ...reclamacionesForm, telefono: e.target.value })}
                  />
                </div>
              </div>

              {/* Sección 2: Detalle de Reclamación */}
              <h3 className="form-section-title">2. Detalle de la Reclamación</h3>

              <div className="form-group">
                <label className="form-label">Tipo de Reclamación *</label>
                <div className="form-radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="tipoReclamo"
                      value="Reclamo"
                      checked={reclamacionesForm.tipoReclamo === 'Reclamo'}
                      onChange={() => setReclamacionesForm({ ...reclamacionesForm, tipoReclamo: 'Reclamo' })}
                    />
                    <span>Reclamo (Disconformidad relacionada al producto adquirido)</span>
                  </label>
                </div>
                <div className="form-radio-group" style={{ marginTop: '-0.75rem' }}>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="tipoReclamo"
                      value="Queja"
                      checked={reclamacionesForm.tipoReclamo === 'Queja'}
                      onChange={() => setReclamacionesForm({ ...reclamacionesForm, tipoReclamo: 'Queja' })}
                    />
                    <span>Queja (Disconformidad respecto a la atención al cliente)</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="rec-detalle">Detalle del Reclamo o Queja *</label>
                <textarea
                  id="rec-detalle"
                  className="form-textarea"
                  required
                  value={reclamacionesForm.detalle}
                  onChange={(e) => setReclamacionesForm({ ...reclamacionesForm, detalle: e.target.value })}
                  placeholder="Explique detalladamente qué ocurrió con el producto o con la atención..."
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="rec-pedido">Pedido del Consumidor</label>
                <textarea
                  id="rec-pedido"
                  className="form-textarea"
                  value={reclamacionesForm.pedido}
                  onChange={(e) => setReclamacionesForm({ ...reclamacionesForm, pedido: e.target.value })}
                  placeholder="Qué solicita (ejemplo: cambio del equipo, devolución del dinero, disculpas formales...)"
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-cancel" onClick={closeReclamacionesModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Registrar Hoja de Reclamación <Send size={16} />
                </button>
              </div>
            </form>
          ) : (
            <div className="modal-success-screen">
              <div className="success-icon-wrapper">
                <CheckCircle2 size={64} />
              </div>
              <h3>¡Reclamación Registrada!</h3>
              <p>Su hoja de reclamación ha sido procesada de manera exitosa conforme a la normativa vigente.</p>
              <div className="ticket-number">CÓDIGO TICKET: {reclamacionTicket}</div>
              <p style={{ fontSize: '0.85rem' }}>
                Hemos enviado una copia fiel del documento registrado en PDF (simulado) a su correo electrónico: <strong>{reclamacionesForm.email}</strong>. Responderemos a su solicitud en un plazo máximo de quince (15) días hábiles.
              </p>
              <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={closeReclamacionesModal}>
                Entendido / Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
