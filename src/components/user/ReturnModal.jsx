import React, { useState } from 'react';
import axios from 'axios';
import './../../assets/Components/general/Modal.scss';
import { useCustomAlert } from '../Elements/Generales/CustomAlert';

const ReturnModal = ({ onClose, orderId, productId, userId }) => {
  const [problem, setProblem] = useState('');
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [error, setError] = useState({ message: null, type: null });
  const [isLoading, setIsLoading] = useState(false);
  const { alert, showAlert } = useCustomAlert();

  const validateForm = () => {
    if (!problem || !description || !product) {
      setError({ message: "Por favor, llena todos los campos requeridos.", type: "validation" });
      return false;
    }
    return true;
  };

  const submitRequest = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:6868/toystore/return', {
        order_id: orderId,
        product_id: productId,
        user_id: userId,
        quantity: 1,
        reason: problem,
        description: description,
        product_name:product,
        evidence_url: evidenceUrl,
      });
      console.log("Solicitud de devolución creada:", response.data);
      await showAlert({
        title: 'Se ha enviado la solicitud devolución',
        text: 'Hemos recibido tu solicitud de devolución en unos días recibiras una respuesta.',
        icon: 'success', // Tipo de icono de la alerta
      });
      onClose();
    } catch (error) {
      console.error("Error al crear la solicitud de devolución:", error);
      await showAlert({
        title: 'Error al enviar la solicitud',
        text: 'Verifica que hayas llenado los datos correspondientes y que tu sesion siga activa',
        icon: 'error', 
      });    
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmClick = (event) => {
    event.preventDefault();
    if (validateForm()) {
      submitRequest();
    }
  };

  return (
    <div className="modal-container" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description">
      <div className="modal returns-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-content">
          <h2 id="modal-title">Solicitud de devolución</h2>
          <form onSubmit={handleConfirmClick}>
            <div className="upload-container">
            
            </div>
            <div className="form-group">
              <label htmlFor="product">¿Cuál es el problema con el artículo?</label>
              <input
                type="text"
                id="product"
                name="product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
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
            {error.message && <p className="error-message">{error.message}</p>}
            <div className="modal-buttons">
              <button type="button" className="cancel-button" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="save-button" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar solicitud"}
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
