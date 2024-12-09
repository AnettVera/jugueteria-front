import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../../../assets/Components/general/Modal.scss';
import { useCustomAlert } from './CustomAlert';

const PurchaseModal = ({ onClose, productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const { alert, showAlert } = useCustomAlert();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:6868/toystore/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        setError("No se pudo cargar la información del producto.");
      }
    };
    fetchProduct();
  }, [productId]);

  const handleConfirmClick = async (event) => {
    event.preventDefault();

    if (quantity <= 0) {
      setError("La cantidad debe ser mayor que 0.");
      return;
    }

    if (product && quantity > product.stock) {
      setError(`La cantidad no puede exceder el stock disponible (${product.stock}).`);
      return;
    }

    try {
      if (email.trim() === '') {
        await axios.put(`http://localhost:6868/toystore/products/${productId}/stock/${quantity}`);
        await showAlert({
          title: 'Stock actualizado',
          text: `El stock ha sido actualizado correctamente. Se redujeron ${quantity} unidades.`,
          icon: 'success',
        });
        onClose();
        return;
      }

      let userId = null;
      try {
        const userResponse = await axios.get(`http://localhost:6868/toystore/users/email/${email}`);
        userId = userResponse.data.user_id;
        console.log("Usuario encontrado:", userResponse.data);
      } catch (error) {
        await showAlert({
          title: 'Error',
          text: 'Este correo no está asociado a ninguna cuenta.',
          icon: 'error',
        });
        return;
      }

      const total = Number(product.price) * quantity;
      const orderData = {
        user_id: userId, 
        status: "completada", 
        total: total, 
        delivery_address: null, 
        orderDetails: [ 
            {
                name: product.name, 
                quantity: quantity, 
                unit_price: product.price, 
            }
        ]
    };
    
      
      const response = await axios.post("http://localhost:6868/toystore/orders", orderData);
      console.log("Orden creada:", response.data);
      

      await axios.put(`http://localhost:6868/toystore/products/${productId}/stock/${quantity}`);

      setError(null);
      await showAlert({
        title: 'Compra exitosa',
        text: `La compra se ha realizado correctamente. Total: $${total.toFixed(2)}`,
        icon: 'success',
      });
      onClose();
    } catch (error) {
      console.error("Error en la operación:", error);
      setError(error.response?.data?.message || "No se pudo completar la operación. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="modal-container">
      <div className="modal returns-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-content">
          <h2>Opciones de venta</h2>
          {product ? (
            <form onSubmit={handleConfirmClick}>
              <div className="form-group">
                <label htmlFor="quantity">Cantidad comprada</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo si es un cliente registrado:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <p>
                Precio del producto: <strong>${Number(product.price).toFixed(2)}</strong>
              </p>
              <p>
                Stock disponible: <strong>{product.stock}</strong>
              </p>
              <p>
                Total: <strong>${(Number(product.price) * quantity).toFixed(2)}</strong>
              </p>
              <label>
                Al confirmar la venta aseguras que el costo de este producto ya se encuentra en la caja y se eliminará del stock.
              </label>
              {error && <p className="error-message">{error}</p>}
              <div className="modal-buttons">
                <button type="button" className="cancel-button" onClick={onClose}>Cancelar</button>
                <button type="submit" className="save-button">Confirmar</button>
              </div>
            </form>
          ) : (
            <p>Cargando información del producto...</p>
          )}
        </div>
      </div>
      {alert}
    </div>
  );
};

export default PurchaseModal;
