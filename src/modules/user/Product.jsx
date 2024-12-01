import React, { useState } from 'react';
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import './../../assets/Pages/user/Product.scss';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ShippingOptions from '../../components/user/ShippingOptions';
import { useCustomAlert } from '../../components/Elements/Generales/CustomAlert';
import FloatingButton from '../../components/shared/FloatingButton';
import Header from '../../components/Elements/Generales/Header';
import { useLocation, useNavigate } from "react-router-dom"; // Importamos useNavigate

const productData = {
  "brand": "ENERGIZE LAB",
  "name": "Eilik",
  "description": "Eilik es el compañero perfecto para niños y adultos amantes de las mascotas, ¡con abundantes emociones, animaciones ociosas y funciones interactivas!",
  "price": 1300.00,
  "currency": "mx",
  "images": [
    "https://manuals.plus/wp-content/uploads/2024/06/ENERGIZE-LAB-Eilik-Cute-Robot-Pet-product.png?ezimgfmt=rs:368x447/rscb1/ngcb1/notWebP",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300"
  ],
  "rating": 5,
  "comments": [
    {
      "user": "Ana",
      "comment": "Lindo Robot Mascota para Niños y Adultos, Tu Perfecto Compañero Interactivo en Casa o en el Trabajo, Regalos Únicos para Niñas y Niños."
    },
    {
      "user": "Carlos",
      "comment": "Mis hijos aman a Eilik, es muy interactivo y divertido."
    }
  ]
};

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleFloatingButtonClick = () => {
    console.log("Redirigiendo al carrito");
    navigate("/carrito-de-compras");
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { alert, showAlert } = useCustomAlert();

  const product = productData;

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = async () => {
    console.log("Producto agregado al carrito");

    await showAlert({
      title: "Producto agregado",
      text: `${product.name} se ha añadido al carrito correctamente.`,
      icon: "success",
    });
  };

  return (
    <>
      <Header />
      <div className="product-details">
        <button className="back" onClick={handleBackClick}>
          <IoIosArrowBack /> Productos
        </button>
        <FloatingButton onClick={handleFloatingButtonClick} />

        <div className='content-details'>

          <div className="image-carousel">
            <button className="carousel-control prev" onClick={handlePrevClick}>{<IoIosArrowBack />}</button>
            <img
              src={product.images[currentImageIndex]}
              alt="Producto"
              className="product-image"
            />
            <button className="carousel-control next" onClick={handleNextClick}>{<IoIosArrowForward />}</button>
          </div>

          <div className="product-info">
            <h2 className="product-brand">{product.brand}</h2>
            <h1 className="product-name">{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <div className="actions">
              <div className="product-rating">
                {[...Array(product.rating)].map((_, i) => (
                  <FaStar key={i} className="star" />
                ))}
              </div>
              <div className="quantity-selector">
                <label htmlFor="quantity">Cantidad:</label>
                <input id="quantity" type="number" min="1" defaultValue="1" />
              </div>
            </div>
            <button className="zipcode-btn" onClick={handleModalOpen}>
              <FaMapMarkerAlt /> Realiza un pedido a domicilio de México
            </button>
            <div className="actions">
              <button className="add-to-cart" onClick={handleAddToCart}>
                <FaCartShopping /> Agregar al carrito
              </button>
              <span className="price-label">${product.price.toFixed(2)} {product.currency}</span>
            </div>
          </div>
        </div>

        <div className="product-comments">
          <h3>Comentarios:</h3>
          {product.comments.map((comment, index) => (
            <p key={index} className="comments-text">
              {comment.user}: {comment.comment}
            </p>
          ))}
        </div>

        {isModalOpen && <ShippingOptions onClose={handleModalClose} />}

        {alert}
      </div>
    </>
  );
};

export default Product;
