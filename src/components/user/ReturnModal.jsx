import React from 'react';
import './../../assets/Components/general/Modal.scss';

const ReturnModal = ({ onClose }) => {
  return (
    <div className="modal-container">
      <div className="modal returns-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-content">
          <h2>Solicitud de devolución</h2>
          <form>
            <div className="upload-container">
              <div className="image-placeholder">Imagen</div>
              <button type="button" className="upload-button">Adjuntar evidencia</button>

              <p className="upload-instructions">
                Se debe adjuntar una evidencia fotográfica, dado que influye en la respuesta.
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="problem">¿Cuál es el problema con el artículo?</label>
              <input type="text" id="problem" name="problem" />
            </div>

            <div className="form-group">
              <label htmlFor="description">¿Describe qué ha pasado?</label>
              <textarea id="description" name="description" rows="4"></textarea>
            </div>

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
    </div>
  );
};

export default ReturnModal;
