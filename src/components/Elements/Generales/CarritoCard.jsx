import React from 'react';
import '../../../assets/Pages/CarritoCard.scss';
import Trashcan from '../../../assets/images/Trashcan.svg';

const CarritoCard = ({ product, handleIncrement, handleDecrement, handleInputChange, handleRemove }) => {
    const { name, description, price, quantity, id } = product;

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
                <button onClick={() => handleDecrement(product)} disabled={product.quantity === 1}>-</button>
                <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => handleInputChange(product, e.target.value)}
                />
                <button onClick={() => handleIncrement(product)}>+</button>
            </div>
            <div className="carritoPage__cartItemDelete">
            <button onClick={() => handleRemove(product.product_id)}>

            {/* Llama a handleRemove */}
                    <img src={Trashcan} alt="eliminar producto" />
                </button>
            </div>
        </div>
    );
};

export default CarritoCard;


