import React, { useState, useEffect } from 'react';
import './../../assets/Pages/user/PurchaseDetails.scss';
import ReturnModal from '../../components/user/ReturnModal';
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from '../../components/Elements/Generales/Header';
import Purchase from './../../assets/images/purchase.jpeg';
import { useCustomAlert } from '../../components/Elements/Generales/CustomAlert';

const PurchaseDetails = () => {
  const location = useLocation();
  const { user_id, order_id } = location.state || {};
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { alert, showAlert } = useCustomAlert(); 

  const openSucces=()=>{
    showAlert({
      title: 'Disfruta de tus juguetes',
      text: 'En ToyStore trabajamos para ofrecerte una buena experiencia de compra, vuelve pronto.',
      icon: 'success', 
    });
  }
  const openInfo=()=>{
    showAlert({
          title: 'Lamentamos la demora',
          text: 'Tu pedido tiene un periodo de 15 posteriores a la fecha de compra para llegar a la ubicación registrada, si no lo recibes en ese periodo contactanos al correo toystore@gmail.com',
          icon: 'info', 
        });
  }

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
                src={Purchase}
                alt="Logo compra"
              />
              <p className="product-name">Compra #{orderDetails.order_id}</p>
            </div>

            <div className="order-info">
              <p><strong>Compra:</strong> #{orderDetails.order_id}</p>
              <p><strong>Cantidad pagada:</strong> {orderDetails.total} mx</p>
              <p><strong>Fecha de pedido:</strong> {new Date(orderDetails.updatedAt).toLocaleDateString()}</p>
              <p><strong>Plazo de entrega:</strong> pendiente</p>

              <p className="delivery-message">
                Esperamos que el envío haya
                salido bien y que los artículos hayan llegado en buen estado. Si no
                es así, puedes solicitar una devolución explicando la razón de la solicitud dentro de los
                10 días posteriores a la entrega, y de ser aceptada, te
                reembolsaremos tu dinero. ¡Esperamos que te diviertas y vuelvas
                pronto a ToyStore!
              </p>
              <div className="buttons">
                <button className="not-received" onClick={openInfo}>No he recibido mis artículos</button>
                <button className="return" onClick={openModal}>Solicitar devolución</button>
                <button className="received" onClick={openSucces}>He recibido mis artículos</button>
              </div>
            </div>
          </div>

      
        </div>

        {isModalOpen && <ReturnModal 
          orderId={order_id}
          productId={1}
          userId={user_id}
          onClose={closeModal} />}
          {alert}
      </div>
    </>
  );
};

export default PurchaseDetails;
