import React, { useState } from 'react';
import './../../assets/Pages/user/PurchaseDetails.scss';
import ReturnModal from '../../components/user/ReturnModal';
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom"; // Importamos useNavigate

const PurchaseDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
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
            <p>
              <strong>Compra:</strong> #65000500
            </p>
            <p>
              <strong>Cantidad:</strong> 2 artículos
            </p>
            <p>
              <strong>Plazo de entrega:</strong> 30/10/2024 al 07/11/2024
            </p>
            <p>
              <strong>Fecha de entrega:</strong> 07/11/2024
            </p>
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

        <div className="rating-section">
          <h2>Calificar:</h2>
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="star">
                ★
              </span>
            ))}
          </div>
          <textarea
            placeholder="Añadir comentarios sobre tu experiencia con el producto"
            className="rating-comments"
          ></textarea>
        </div>
      </div>

      {isModalOpen && <ReturnModal onClose={closeModal} />}
    </div>
    </>
  );
};

export default PurchaseDetails;
