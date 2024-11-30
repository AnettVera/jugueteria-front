import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Importamos useNavigate
import "../../assets/Pages/admin_pages/SpecificReturnPage.scss";
import { IoIosArrowBack } from "react-icons/io";

const SpecificReturnPage = () => {
    const location = useLocation();
    const navigate = useNavigate(); 
    const { nameProduct, problema, fechaDeCompra, fechaDeSolicitud } = location.state || {};

    const handleBackClick = () => {
        navigate(-1); 
    };

    return (
        <div className="specificReturnPage">
            <button className="back" onClick={handleBackClick}>
                <IoIosArrowBack /> DEVOLUCIONES
            </button>

            <div className="specificReturnPage__content">
                <div className="specificReturnPage__content-Image">
                    <p>Evidencia:</p>
                    <img src="https://via.placeholder.com/200" alt="Imagen del producto" />
                </div>

                <div className="specificReturnPage__content-Info">
                    <div>
                        <h3>Compra:</h3> <span className="numOrden">#65000500</span>
                    </div>
                    <div>
                        <h3>Cliente:</h3> <span>Marbein Cruz</span>
                    </div>
                    <div>
                        <h3>Fecha de entrega:</h3> <span>07/11/2024</span>
                    </div>
                    <div>
                        <h3>Problema:</h3> <span>El robot no enciende</span>
                    </div>

                    <h3>Descripción:</h3>
                    <span>
                        Al intentar usar el robot no enciende, aún cambiándole las pilas, el robot sigue sin
                        funcionar o encender, desde que llegó.
                    </span>

                    <div className="specificReturnPage__content-Info-Buttons">
                        <button className="specificReturnPage__content-Info-Buttons-button1">
                            Contactar por correo
                        </button>
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
