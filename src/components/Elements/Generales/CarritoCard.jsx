import React from 'react';
import '../../../assets/Pages/CarritoCard.scss';
import Trashcan from '../../../assets/images/Trashcan.svg';

const CarritoCard = ({ id, name, description, price, quantity, handleIncrement, handleDecrement, handleInputChange }) => {
    return (
        <div className="carritoPage__cartItem">
            <img src="https://via.placeholder.com/150" alt="imagen de producto" />
            <div className="carritoPage__cartItemDetails">
                <div className="carritoPage__cartItemInfo">
                    <h3>{name}</h3>
                    <p>{description}</p>
                </div>
                <div className="carritoPage__cartItemPrice">
                    <p>$ {price} mx</p>
                </div>
            </div>
            <div className="carritoPage__cartItemQuantity">
                <button onClick={() => handleDecrement(id)}>-</button>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleInputChange(id, e.target.value)}
                />
                <button onClick={() => handleIncrement(id)}>+</button>
            </div>
            <div className="carritoPage__cartItemDelete">
                <button>
                    <img src={Trashcan} alt="eliminar producto" />
                </button>
            </div>
        </div>
    );
};

export default CarritoCard;
