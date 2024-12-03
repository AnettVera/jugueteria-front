import React, { useState, useEffect } from 'react';
import './../../assets/Pages/user/PurchaseHistory.scss';
import { useLocation, useNavigate } from "react-router-dom";
import Header from '../../components/Elements/Generales/Header';
import { IoIosArrowBack } from "react-icons/io";
import axios from 'axios';

const PurchaseHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const email = location.state?.email;
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:6868/toystore/user/email/${email}/orders`);
        console.log("Respuesta", response);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las órdenes del usuario', error);
        setError('Error al obtener las órdenes del usuario');
        setLoading(false);
      }
    };

    if (email) {
      fetchOrders(); 
    } else {
      setLoading(false);
      setError('Correo electrónico no proporcionado');
    }
  }, [email]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const purchases = [
    {
      id: '65000500',
      images: [
        "https://manuals.plus/wp-content/uploads/2024/06/ENERGIZE-LAB-Eilik-Cute-Robot-Pet-product.png?ezimgfmt=rs:368x447/rscb1/ngcb1/notWebP",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300"
      ],
      items: 2,
      message: 'Estimado cliente tu compra ha sido entregada',
      deliveryDate: '07/11/30',
    },
    {
      id: '65000500',
      images: [
        "https://manuals.plus/wp-content/uploads/2024/06/ENERGIZE-LAB-Eilik-Cute-Robot-Pet-product.png?ezimgfmt=rs:368x447/rscb1/ngcb1/notWebP",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300"
      ],
      items: 2,
      message: 'Estimado cliente tu compra ha sido entregada',
      deliveryDate: '07/11/30',
    },
  ];

  return (
    <>
      <Header />
      <div className="purchase-history">
        <button className="back" onClick={handleBackClick}>
          <IoIosArrowBack /> Historial de compra
        </button>
        <div className="purchase-list">
          {purchases.map((purchase, index) => (
            <div className="purchase-card" key={index}>
              <div className="purchase-image">
                <img src={purchase.images[0]} alt={`Imagen de compra ${purchase.id}`} />
              </div>
              <div className="purchase-details">
                <p className="purchase-id">Compra #{purchase.id}</p>
                <p className="purchase-items">{purchase.items} artículos</p>
                <p className="purchase-message">{purchase.message}</p>
              </div>
              <div className="purchase-delivery">
                <p className="delivery-date">Fecha de entrega:</p>
                <p>{purchase.deliveryDate}</p>
              </div>
              <button
                className="purchase-button"
                onClick={() => navigate(`/historial/detalles/${purchase.id}`)}
              >
                Ver más
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PurchaseHistory;
