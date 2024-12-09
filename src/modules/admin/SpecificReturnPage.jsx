import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/Pages/admin_pages/SpecificReturnPage.scss";
import { IoIosArrowBack } from "react-icons/io";
import Return from "./../../assets/images/return.jpeg";
import RejectionReturn from "./../../components/Admin/RejectionReturn";
import axios from "axios";
import { useCustomAlert } from "../../components/Elements/Generales/CustomAlert";

const SpecificReturnPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { alert, showAlert } = useCustomAlert();

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const {
    id,
    nameProduct,
    problema,
    descripcion,
    fechaDeCompra,
    fechaDeSolicitud,
    imageUrl,
    userId,
  } = location.state || {};

  const handleBackClick = () => navigate(-1);

  const handleAcceptClick = async () => {
    try {
      await axios.put(`http://localhost:6868/toystore/returns/${id}`, {
        status: "aprobada",
        rejection_reason: null,
        user_id: userId,
      });
      await showAlert({
        title: "Devolución aceptada",
        text: "La devolución se ha aceptado exitosamente.",
        icon: "success",
      });
      navigate(-1);
    } catch (error) {
      console.error("Error al aceptar la devolución:", error);
      await showAlert({
        title: "Error",
        text: "No se pudo procesar la aceptación de la devolución.",
        icon: "error",
      });
    }
  };

  const handleRejectClick = () => setIsRejectModalOpen(true);

  return (
    <div className="specificReturnPage">
      <button className="back" onClick={handleBackClick}>
        <IoIosArrowBack /> DEVOLUCIONES
      </button>

      <div className="specificReturnPage__content">
        <div className="specificReturnPage__content-Image">
          <img src={Return} alt={nameProduct} />
        </div>
        <div className="specificReturnPage__content-Info">
          <div>
            <h3>Fecha de compra:</h3> <span>{fechaDeCompra || "No disponible"}</span>
          </div>
          <div>
            <h3>Problema:</h3> <span>{problema || "No especificado"}</span>
          </div>
          <h3>Descripción:</h3>
          <span>{descripcion || "No especificado"}</span>
          <div className="specificReturnPage__content-Info-Buttons">
            <button
              className="specificReturnPage__content-Info-Buttons-button2"
              onClick={handleRejectClick}
            >
              Rechazar devolución
            </button>
            <button
              className="specificReturnPage__content-Info-Buttons-button3"
              onClick={handleAcceptClick}
            >
              Aceptar devolución
            </button>
          </div>
        </div>
      </div>

      {isRejectModalOpen && (
        <RejectionReturn
          onClose={() => setIsRejectModalOpen(false)}
          returnId={id}
          userId={userId}
        />
      )}

      {alert}
    </div>
  );
};

export default SpecificReturnPage;
