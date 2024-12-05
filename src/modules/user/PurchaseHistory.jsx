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
  const user_id = location.state?.user_id;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:6868/toystore/user/${user_id}/orders`);
        console.log("Respuesta de la ordenes", response.data);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las órdenes del usuario:', error);
        setError('Error al obtener las órdenes del usuario.');
        setLoading(false);
      }
    };

    if (user_id) {
      fetchOrders();
    } else {
      setLoading(false);
      setError('Usuario no proporcionado.');
    }
  }, [user_id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return <p>Cargando órdenes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Header />
      <div className="purchase-history">
        <button className="back" onClick={handleBackClick}>
          <IoIosArrowBack /> Historial de compra
        </button>
        <div className="purchase-list">
          {orders.map((order) => (
            <div className="purchase-card" key={order.order_id}>
              <div className="purchase-details">
                <p className="purchase-id">Orden #{order.order_id}</p>
                <p className="purchase-date">Fecha: {new Date(order.date).toLocaleDateString()}</p>
                <p className="purchase-status">Estado: {order.status}</p>
                <p className="purchase-total">Total: ${order.total}</p>
              </div>
              <button
                className="purchase-button"
                onClick={() => navigate(`/historial/detalles/${order.order_id}`, {
                  state: {
                    user_id,
                    order_id: order.order_id,
                  },
                })}
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
