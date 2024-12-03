import React, { useState } from 'react';
import axios from 'axios';
import './../../assets/Components/general/Modal.scss';
import { useCustomAlert } from '../Elements/Generales/CustomAlert';

const ReturnModal = ({ onClose, orderId, productId, userId }) => {
  const [problem, setProblem] = useState('');
  const [description, setDescription] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [error, setError] = useState(null);
  const { alert, showAlert } = useCustomAlert(); 


  const handleConfirmClick = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:6868/toystore/return', {
        order_id: orderId,
        product_id: productId,
        user_id: userId,
        quantity: 1, 
        reason: problem,
        evidence_url: evidenceUrl
      });
      console.log("Solicitud de devolución creada:", response.data);
      onClose();
      // llamar alerta de éxito
    } catch (error) {
      console.error("Error al crear la solicitud de devolución:", error);
      setError("No se pudo crear la solicitud de devolución. Inténtalo de nuevo.");
      // llamar alerta de error
    }
  };

  return (
    <div className="modal-container">
      <div className="modal returns-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-content">
          <h2>Solicitud de devolución</h2>
          <form onSubmit={handleConfirmClick}>
            <div className="upload-container">
              <div className="image-placeholder">Imagen</div>
              <button 
                type="button" 
                className="upload-button" 
                onClick={() => setEvidenceUrl("URL_DE_EVIDENCIA") }
              >
                Adjuntar evidencia
              </button>
              <p className="upload-instructions">
                Se debe adjuntar una evidencia fotográfica, dado que influye en la respuesta.
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="problem">¿Cuál es el problema con el artículo?</label>
              <input 
                type="text" 
                id="problem" 
                name="problem" 
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">¿Describe qué ha pasado?</label>
              <textarea 
                id="description" 
                name="description" 
                rows="4" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="modal-buttons">
              <button type="button" className="cancel-button" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="save-button">
                Enviar solicitud
              </button>
            </div>
          </form>
        </div>
      </div>
      {alert}
    </div>
  
  );
};

export default ReturnModal;
