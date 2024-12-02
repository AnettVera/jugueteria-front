import React, { useState } from "react";
import "././../../../assets/Components/general/ProductCard.scss";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { PiShoppingCartSimpleFill,PiShoppingCartSimpleBold } from "react-icons/pi";


const ProductCardPurchase = ({ name, image, description, price, onClick }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-card__header">
        <img src={image} alt={name} className="product-card__image" />
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__description">{description}</p>
        <p className="product-card__price">${price}</p>
      </div>
      <button
        className={`product-card__cart-btn ${isAddedToCart ? "active" : ""}`}
      >Vender
      </button>
    </div>
  );
};


export default ProductCardPurchase;
