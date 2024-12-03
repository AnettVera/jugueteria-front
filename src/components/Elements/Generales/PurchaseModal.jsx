import React, { useState } from 'react';
import axios from 'axios';
import './../../../assets/Components/general/Modal.scss';

const PurchaseModal = ({ onClose, productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  const handleConfirmClick = async (event) => {
    event.preventDefault();
    if (quantity <= 0) {
      setError("La cantidad debe ser mayor que 0.");
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:6868/toystore/products/${productId}/stock/${quantity}`);
      console.log("Stock actualizado:", response.data);
      setError(null); // Limpia errores previos
      alert("Stock actualizado exitosamente."); // Opcional: alerta de éxito
      onClose();
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
      setError(error.response?.data?.message || "No se pudo actualizar el stock. Inténtalo de nuevo.");
    }
  };
  

  return (
    <div className="modal-container">
      <div className="modal returns-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-content">
          <h2>Opciones de venta</h2>
          <form onSubmit={handleConfirmClick}>
            <input 
              type='number' 
              id='quantity' 
              name='quantity' 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)}
            />
            <label>Al confirmar la venta aseguras que el costo de este producto ya se encuentra en la caja y se eliminará del stock.</label>
            {error && <p className="error-message">{error}</p>}
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
