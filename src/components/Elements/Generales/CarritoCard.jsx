import React from 'react';
import '../../../assets/Pages/CarritoCard.scss';
import Trashcan from '../../../assets/images/Trashcan.svg';
import { useCustomAlert } from './CustomAlert';

const CarritoCard = ({ product, handleIncrement, handleDecrement, handleInputChange, handleRemove }) => {
    const { productCart, quantity } = product || {};
    const { name, description, price, images } = productCart || {};
    const { alert, showAlert } = useCustomAlert(); 


    // Obtener datos del local storage si no están disponibles en el objeto product
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedProduct = storedCart.find(item => item.product_id === product?.product_id) || {};

    const productName = name || storedProduct.name;
    const productDescription = description || storedProduct.description;
    const productPrice = price || storedProduct.price;
    const productImages = images || storedProduct.images || [];
    const productImageUrl = productImages.length > 0 
        ? (productImages[0]?.image_url ? `http://localhost:6868/${productImages[0].image_url}` : productImages[0])
        : "https://via.placeholder.com/150";

        const totalPrice = productPrice * quantity;
    return (
        <div className="carritoPage__cartItem">
            <img src={productImageUrl} alt="imagen de producto" />
            <div className="carritoPage__cartItemDetails">
                <div className="carritoPage__cartItemInfo">
                    <h3>{productName}</h3>
                    <p>{productDescription}</p>
                </div>
                <div className="carritoPage__cartItemPrice">
                    <p>$ {totalPrice} mx</p>
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
                <button onClick={() => handleRemove(product.id)}>
                    <img src={Trashcan} alt="eliminar producto" />
                </button>
            </div>
            {alert}
        </div>
    );
};

export default CarritoCard;


