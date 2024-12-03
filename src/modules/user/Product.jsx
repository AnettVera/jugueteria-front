import React, { useEffect, useState } from 'react';
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import './../../assets/Pages/user/Product.scss';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ShippingOptions from '../../components/user/ShippingOptions';
import { useCustomAlert } from '../../components/Elements/Generales/CustomAlert';
import FloatingButton from '../../components/shared/FloatingButton';
import Header from '../../components/Elements/Generales/Header';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useCart } from '../../config/context/useCart';
import Footer from '../../components/Elements/Generales/Footer';

const Product = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { alert, showAlert } = useCustomAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:6868/toystore/products/${id}`);
        if (response.status === 404) {
          throw new Error('Error al obtener el producto');
        }
        setProduct(response.data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleFloatingButtonClick = () => {
    console.log("Redirigiendo al carrito");
    navigate("/carrito-de-compras");
  };

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (product?.images.length || 1)) % (product?.images.length || 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (product?.images.length || 1));
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = async () => {
    if (product) {
      await addToCart(product, quantity);
      await showAlert({
        title: "Producto agregado",
        text: `${product.name} se ha añadido al carrito correctamente.`,
        icon: "success",
      });
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!product) {
    return <div>Error al cargar el producto.</div>;
  }

  return (
    <>
      <Header />
      <div className="product-details">
        <button className='back' onClick={handleBackClick}>{<IoIosArrowBack />} Regresar</button>
        <FloatingButton onClick={handleFloatingButtonClick} />
        <div className='content-details'>
          <div className="image-carousel">
            <button className="carousel-control prev" onClick={handlePrevClick}>{<IoIosArrowBack />}</button>
            <img
              src={product.images[currentImageIndex] || "https://via.placeholder.com/300"}
              alt="Producto"
              className="product-image"
            />
            <button className="carousel-control next" onClick={handleNextClick}>{<IoIosArrowForward />}</button>
          </div>

          <div className="product-info">
            <h2 className="product-brand">{product.category?.name || "Sin categoría"}</h2>
            <h1 className="product-name">{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <div className="actions">
              <div className="product-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < product.rating ? "star active" : "star"} />
                ))}
              </div>
              <div className="quantity-selector">
                <label htmlFor="quantity">Cantidad:</label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                />
              </div>
              <button className="zipcode-btn" onClick={handleModalOpen}>
                <FaMapMarkerAlt /> Realiza un pedido a domicilio de México
              </button>
              <div className="actions">
                <button className="add-to-cart" onClick={handleAddToCart}>
                  <FaCartShopping /> Agregar al carrito
                </button>
                <span className="price-label">${parseFloat(product.price).toFixed(2)} MXN</span>
              </div>
            </div>
          </div>
        </div>

{/**aqui iban los comentarios */}

        {isModalOpen && <ShippingOptions onClose={handleModalClose} />}
        {alert}
      </div>
      <Footer />
    </>
  );
};

export default Product;