import React, { useState, useEffect } from 'react';
import './../../assets/Pages/user/PurchaseHistory.scss';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Elements/Generales/Header';
import { IoIosArrowBack } from "react-icons/io";
import axios from 'axios';

const PurchaseHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [returnStatuses, setReturnStatuses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchOrders = async () => {
      console.log('user_id:', user_id);
      try {
        const response = await axios.get(`http://localhost:6868/toystore/user/${user_id}/orders`);
        const sortedOrders = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        const ordersWithSequentialNumber = sortedOrders.map((order, index) => ({
          ...order,
          userOrderNumber: sortedOrders.length - index,
        }));
        setOrders(ordersWithSequentialNumber);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las órdenes del usuario:', error);
        setError('Error al obtener las órdenes del usuario.');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    console.log('orders:', orders);
    const fetchReturnStatuses = async () => {
      try {
        const statuses = {};
        for (const order of orders) {
          const response = await axios.get(`http://localhost:6868/toystore/returns/${order.order_id}`);
          if (response.data) {
            statuses[order.order_id] = response.data.status;
          }
        }
        setReturnStatuses(statuses);
      } catch (error) {
        console.error('Error al obtener el estado de devoluciones:', error);
      }
    };

    if (orders.length > 0) {
      fetchReturnStatuses();
    }
  }, [orders]);

  const handleBackClick = () => {
    navigate(-1);
  };


  return (
    <>
      <Header />
      <div className="purchase-history">
        <button className="back" onClick={handleBackClick}>
          <IoIosArrowBack /> Historial de compra
        </button>
        <div className="purchase-list">
          {orders.length === 0 ? (
            <div className="no-orders">Aún no hay órdenes hechas</div>
          ) : (
            orders.map((order) => (
              <div className="purchase-card" key={order.order_id}>
                <div className="purchase-details">
                  <p className="purchase-id">Orden #{order.userOrderNumber}</p>
                  <p className="purchase-date">Fecha: {new Date(order.date).toLocaleDateString()}</p>
                  <p className="purchase-status">Estado: {order.status}</p>
                  <p className="purchase-total">Total: ${order.total}</p>
                  {returnStatuses[order.order_id] && (
                    <p className="purchase-status">
                      Estado de devolución: {returnStatuses[order.order_id]}
                    </p>
                  )}
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
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default PurchaseHistory;
