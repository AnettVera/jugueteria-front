import React from "react";
import '../../assets/Pages/admin_pages/SpecificReturnPage.scss'
import Header from "../../components/Elements/Generales/Header";

const SpecificReturnPage = () => {
    return (
        <div className="specificReturnPage">
            <Header />
            <p>DEVOLUCIONES</p>

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
                    <span>Al intentar usar el robot no enciende, aún cambiándole las pilas, el robot sigue sin funcionar o encender, desde que llegó.</span>

                    <div className="specificReturnPage__content-Info-Buttons">

                        <button className="specificReturnPage__content-Info-Buttons-button1">Contactar por correo</button>
                        <button className="specificReturnPage__content-Info-Buttons-button2">Rechazar devolución</button>
                        <button className="specificReturnPage__content-Info-Buttons-button3">Aceptar devolución</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecificReturnPage;