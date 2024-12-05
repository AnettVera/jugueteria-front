import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/Pages/admin_pages/SpecificReturnPage.scss";
import { IoIosArrowBack } from "react-icons/io";
import Return from './../../assets/images/return.jpeg'

const SpecificReturnPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    id,
    nameProduct,
    problema,
    descripcion,
    fechaDeCompra,
    fechaDeSolicitud,
    imageUrl,
    customerName,
  } = location.state || {}; // Obtenemos los datos enviados desde CardReturn

  const handleBackClick = () => {
    navigate(-1); // Navegar hacia atrás
  };

  return (
    <div className="specificReturnPage">
      <button className="back" onClick={handleBackClick}>
        <IoIosArrowBack /> DEVOLUCIONES
      </button>

      <div className="specificReturnPage__content">
        <div className="specificReturnPage__content-Image">
          <img
            src={Return}
            alt={nameProduct}
          />
        </div>

        <div className="specificReturnPage__content-Info">
         
          <div>
            <h3>Fecha de compra:</h3>{" "}
            <span>{fechaDeCompra || "No disponible"}</span>
          </div>
          <div>
            <h3>Problema:</h3> <span>{problema || "No especificado"}</span>
          </div>

          <h3>Descripción:</h3>
          <span>
           {descripcion || "No especificado"}
          </span>

          <div className="specificReturnPage__content-Info-Buttons">
           
            <button className="specificReturnPage__content-Info-Buttons-button2">
              Rechazar devolución
            </button>
            <button className="specificReturnPage__content-Info-Buttons-button3">
              Aceptar devolución
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificReturnPage;
