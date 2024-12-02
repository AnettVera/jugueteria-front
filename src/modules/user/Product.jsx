import React, { useEffect, useState } from 'react';
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import './../../assets/Pages/user/Product.scss';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ShippingOptions from '../../components/user/ShippingOptions';
import { useCustomAlert } from '../../components/Elements/Generales/CustomAlert';
import FloatingButton from '../../components/shared/FloatingButton';
import Header from '../../components/Elements/Generales/Header';
import { useNavigate,useParams } from "react-router-dom";
import axios from 'axios';

const Product = () => {
  const { productId } = useParams();  
  const [product, setProduct] = useState(null);
  //const [images, setImages] = useState(product.images ? product.images.map((image) => `http://localhost:6868/${image.image_url}`): []);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { alert, showAlert } = useCustomAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:6868/toystore/products/${productId}`);
        
        // Safely handle image formatting
        const images = response.data?.images 
          ? response.data.images.map(image => 
            `http://localhost:6868/${image.image_url}`
            )
          : ["https://via.placeholder.com/300"];

        // Format product data with safe defaults
        const formattedProduct = {
          id: response.data.id,
          name: response.data.name || 'Producto sin nombre',
          description: response.data.description || 'Sin descripción',
          price: response.data.price || 0,
          category: response.data.category?.name || 'Sin Categoría',
          images: images,
          currency: "mx",
          rating: response.data.rating || 5,
          comments: response.data.comments || []
        };


        setProduct(formattedProduct);
        setProduct(product);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
        setLoading(false);
      }
    };
    if (productId){
      fetchProductDetails();
    }
  }, [productId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleFloatingButtonClick = () => {
    console.log("Redirigiendo al carrito");
    navigate("/carrito-de-compras");
  };

  const handlePrevClick = () => {
    if (!product || !product.images) return;
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  const handleNextClick = () => {
    if (!product || !product.images) return;
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % product.images.length
    );
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
            <button 
            className="carousel-control next" 
            onClick={handleNextClick}
            disabled={!product || product.images.length === 0}
            >
              {<IoIosArrowForward />}
            </button>
          </div>

          <div className="product-info">
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
