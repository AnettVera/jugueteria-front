import React from 'react';
import './../../assets/Components/general/Modal.scss';

const ShippingOptions = ({ onClose }) => {
    return (
        <div className='modal-container'>
            <div className='modal shopping-options'>
                <button className='close-button' onClick={onClose}>×</button>
                <div className='modal-content'>
                    <h2>Opciones de Envío</h2>
                    <div className="zipcode-input">
                        <input type="text" placeholder="Ingresa tu código postal" />
                        <button>Consultar</button>
                    </div>
                    <div className="shipping-details">
                        <p><strong>Envío gratuito</strong></p>
                        <p>Llega el lunes, 11 de noviembre</p>
                    </div>
                    <p className="disclaimer">
                        Los tiempos de entrega son aproximados y sujetos a cambios. El cálculo final del envío se realizará al finalizar tu compra.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShippingOptions;
