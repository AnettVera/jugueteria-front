import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/Components/admin/CardReturn.scss';

const CardReturn = ({
  id,
  nameProduct,
  problema,
  fechaDeCompra,
  fechaDeSolicitud,
  imageUrl,
  customerName, 
}) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/devoluciones/producto/${id}`);
  };
  

  return (
    <div className="cardReturn">
      <div className="cardReturn__content-description">
        <div className="cardReturn__image">
          <img src={imageUrl} alt={nameProduct} />
        </div>
        <div>
          <p className="cardReturn__title">{nameProduct}</p>
          <p className="cardReturn__problema"><span>Problema:</span> {problema}</p>
        </div>
      </div>
      <div className="cardReturn__content-date">
        <div>
          <p className="cardReturn__fechaDeCompra"><span>Fecha de compra:</span> {fechaDeCompra}</p>
          <p className="cardReturn__fechaDeSolicitud"><span>Fecha de solicitud:</span> {fechaDeSolicitud}</p>
        </div>
        <div className="cardReturn__buttonVer">
          <button onClick={handleViewClick}>Ver</button>
        </div>
      </div>
    </div>
  );
};

export default CardReturn;
