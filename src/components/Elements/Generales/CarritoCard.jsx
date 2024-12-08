import React from 'react';
import '../../../assets/Pages/CarritoCard.scss';
import Trashcan from '../../../assets/images/Trashcan.svg';

const CarritoCard = ({ product, handleIncrement, handleDecrement, handleInputChange, handleRemove }) => {
    const { productCart, quantity } = product || {};
    const { name, description, price, images, stock } = productCart || {};

    // Validación para obtener datos del localStorage si productCart no tiene información
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedProduct = storedCart.find(item => item.product_id === product?.product_id) || {};

    const productName = name || storedProduct.name;
    const productDescription = description || storedProduct.description;
    const productPrice = price || storedProduct.price;
    const productImages = images || storedProduct.images || [];
    const productStock = stock || storedProduct.stock || 0;

    const productImageUrl = productImages?.[0]?.image_url
        ? `http://localhost:6868/${productImages[0].image_url}`
        : "https://via.placeholder.com/150";

    const totalPrice = (productPrice || 0) * quantity;

    return (
        <div className="carritoPage__cartItem">
            <img src={productImageUrl} alt="imagen de producto" />
            <div className="carritoPage__cartItemDetails">
                <div className="carritoPage__cartItemInfo">
                    <h3>{productName}</h3>
                    <p>{productDescription}</p>
                </div>
                <div className="carritoPage__cartItemPrice">
                    <p>$ {totalPrice.toFixed(2)} mx</p>
                </div>
            </div>
            <div className="carritoPage__cartItemQuantity">
                <button onClick={() => handleDecrement(product)} disabled={quantity <= 1}>-</button>
                <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => handleInputChange(product, e.target.value)}
                />
                <button
                    onClick={() => handleIncrement(product)}
                    className={quantity >= productStock ? "disabled-button" : ""}
                >
                    +
                </button>
            </div>
            <div className="carritoPage__cartItemDelete">
                <button onClick={() => handleRemove(product.product_id)}>
                    <img src={Trashcan} alt="eliminar producto" />
                </button>
            </div>
        </div>
    );
};

export default CarritoCard;
