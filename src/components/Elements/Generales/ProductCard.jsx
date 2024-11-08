import React, { useState } from "react";
import "././../../../assets/Components/general/ProductCard.scss";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { PiShoppingCartSimpleFill,PiShoppingCartSimpleBold } from "react-icons/pi";


const ProductCard = ({ name, image, description, price }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const toggleCart = () => setIsAddedToCart(!isAddedToCart);

  return (
    <div className="product-card">
     
<div className="product-card__header">
    <img src={image} alt={name} className="product-card__image" />
    <button
        className={`product-card__favorite ${isFavorite ? "active" : ""}`}
        onClick={toggleFavorite}
    >
        {isFavorite ? ( <GoHeartFill /> ) : ( <GoHeart /> )}
    </button>
</div>
      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__description">{description}</p>
        <p className="product-card__price">${price}</p>
      </div>
      <button
        className={`product-card__cart-btn ${isAddedToCart ? "active" : ""}`}
        onClick={toggleCart}
      >
        {isAddedToCart?(<PiShoppingCartSimpleFill/>):(<PiShoppingCartSimpleBold/>)}
      </button>
    </div>
  );
};

export default ProductCard;
