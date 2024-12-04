import React, { useState, useEffect } from 'react';
import './../../assets/Pages/user/PurchaseDetails.scss';
import ReturnModal from '../../components/user/ReturnModal';
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from '../../components/Elements/Generales/Header';

const PurchaseDetails = () => {
  const location = useLocation();
  const { user_id, order_id } = location.state || {};
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:6868/toystore/orders/${order_id}`); 
        setOrderDetails(response.data);
        setLoading(false);
       
        
      } catch (error) {
        console.error("Error al obtener detalles de la orden:", error);
        setError("Error al obtener los detalles de la orden.");
        setLoading(false);
      }
    };

    if (order_id) {
      fetchOrderDetails();
    } else {
      setError("Faltan datos necesarios para obtener los detalles de la orden.");
      setLoading(false);
    }
  }, [order_id]);

  useEffect(() => {
    if (!user_id || !order_id) {
      console.error("Faltan datos necesarios para el componente.");
      navigate(-1); 
    }
  }, [user_id, order_id, navigate]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (loading) {
    return <p>Cargando detalles de la orden...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Header />
      <div className='purchase'>
        <button className="back" onClick={handleBackClick}>
          <IoIosArrowBack /> Detalles de la compra
        </button>
        <div className="purchase-details-page">
          <div className="details-container">
            <div className="product-image">
              <img
                src="https://manuals.plus/wp-content/uploads/2024/06/ENERGIZE-LAB-Eilik-Cute-Robot-Pet-product.png?ezimgfmt=rs:368x447/rscb1/ngcb1/notWebP"
                alt="Robot Eilik"
              />
              <p className="product-name">Robot Eilik</p>
            </div>

            <div className="order-info">
              <p><strong>Compra:</strong> #{orderDetails.order_id}</p>
              <p><strong>Cantidad pagada:</strong> {orderDetails.total} mx</p>
              <p><strong>Fecha de pedido:</strong> {new Date(orderDetails.updatedAt).toLocaleDateString()}</p>
              <p><strong>Plazo de entrega:</strong> pendiente</p>

              <p className="delivery-message">
                Tus artículos han sido entregados. Esperamos que el envío haya
                salido bien y que los artículos hayan llegado en buen estado. Si no
                es así, puedes solicitar una devolución con evidencias dentro de los
                10 días posteriores a la entrega, y de ser aceptada, te
                reembolsaremos tu dinero. ¡Esperamos que te diviertas y vuelvas
                pronto a ToyStore!
              </p>
              <div className="buttons">
                <button className="not-received">No he recibido mis artículos</button>
                <button className="return" onClick={openModal}>Solicitar devolución</button>
                <button className="received">He recibido mis artículos</button>
              </div>
            </div>
          </div>

      
        </div>

        {isModalOpen && <ReturnModal 
          orderId={order_id}
          productId={1}
          userId={user_id}
          onClose={closeModal} />}
      </div>
    </>
  );
};

export default PurchaseDetails;
