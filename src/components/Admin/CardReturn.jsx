import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/Components/admin/CardReturn.scss";
import axios from "axios";
import Return from "./../../assets/images/return.jpeg";

const CardReturn = ({
  id,
  nameProduct,
  problema,
  descripcion,
  fechaDeCompra,
  fechaDeSolicitud,
  imageUrl,
  userId,
}) => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:6868/toystore/orders/${fechaDeCompra}`);
        setOrder(response.data);
      } catch (error) {
        console.error("Error al obtener la orden:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [fechaDeCompra]);

  const formatDate = (isoString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };

  const handleViewClick = () => {
    
    navigate(`/devoluciones/producto/${id}`, {
      state: {
        id,
        nameProduct,
        problema,
        descripcion,
        fechaDeCompra: order?.createdAt,
        fechaDeSolicitud,
        imageUrl,
        userId,
      },
    });
  };

  return (
    <div className="cardReturn">
      <div className="cardReturn__content-description">
        <div className="cardReturn__image">
          <img src={Return} alt={nameProduct} />
        </div>
        <div>
          <p className="cardReturn__title">{nameProduct}</p>
          <p className="cardReturn__problema">
            <span>Problema:</span> {problema}
          </p>
        </div>
      </div>
      <div className="cardReturn__content-date">
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>Error al cargar la orden</p>
        ) : (
          <div>
            <p className="cardReturn__fechaDeCompra">
              <span>Fecha de compra:</span> {formatDate(order?.createdAt)}
            </p>
            <p className="cardReturn__fechaDeSolicitud">
              <span>Fecha de solicitud:</span> {formatDate(fechaDeSolicitud)}
            </p>
          </div>
        )}
        <div className="cardReturn__buttonVer">
          <button onClick={handleViewClick}>Ver</button>
        </div>
      </div>
    </div>
  );
};

export default CardReturn;
