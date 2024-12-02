import React from 'react';
import './../../../assets/Components/general/Modal.scss';

const PurchaseModal = ({ onClose }) => {
  return (
    <div className="modal-container">
      <div className="modal returns-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-content">
          <h2>Opciones de venta</h2>
          <form>
            <label>Al confirmar la venta aseguras que el costo de este producto ya se encuentra en la caja y se eliminará del stock.</label>
            <div className="modal-buttons">
              <button type="button" className="cancel-button" onClick={onClose}>Cancelar</button>
              <button type="submit" className="save-button">Confirmar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
