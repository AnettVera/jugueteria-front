import React, { useState } from "react";
import "././../../../assets/Components/general/ProductCard.scss";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { PiShoppingCartSimpleFill,PiShoppingCartSimpleBold } from "react-icons/pi";


const ProductCard = ({ name, images, description, price, onClick }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const toggleCart = () => setIsAddedToCart(!isAddedToCart);
  const [currentImage, setCurrentImage] = useState(0); 

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };
  

  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-card__header">
      <img src={images[currentImage]} alt={name} className="product-card__image" />      
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__description">{description}</p>
        <p className="product-card__price">${price}</p>
      </div>
      <button
        className={`product-card__cart-btn ${isAddedToCart ? "active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleCart();
        }}
      >
        {isAddedToCart ? <PiShoppingCartSimpleFill /> : <PiShoppingCartSimpleBold />}
      </button>
    </div>
  );
};


export default ProductCard;
