import React, { useState, useEffect } from 'react';
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import './../../assets/Pages/user/Product.scss';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ShippingOptions from '../../components/user/ShippingOptions';
import { useCustomAlert } from '../../components/Elements/Generales/CustomAlert';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { id } = useParams(); // Obtén el id desde la URL
  const [product, setProduct] = useState(null); // Estado para el producto
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  const { alert, showAlert } = useCustomAlert();

  // Solicita el producto desde el backend
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:6868/toystore/products/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener el producto');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
    await showAlert({
      title: "Producto agregado",
      text: `${product.name} se ha añadido al carrito correctamente.`,
      icon: "success",
    });
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-details">
      <div className='content-details'>
        <div className="image-carousel">
          <button className="carousel-control prev" onClick={handlePrevClick}>{<IoIosArrowBack />}</button>
          <img
            src={product.images[currentImageIndex]?.url || "https://via.placeholder.com/300"}
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
            <span className="price-label">${parseFloat(product.price).toFixed(2)} MXN</span>
          </div>
        </div>
      </div>

      <div className="product-comments">
        <h3>Comentarios:</h3>
        {/* Renderiza comentarios si están disponibles */}
        {product.comments?.map((comment, index) => (
          <p key={index} className="comments-text">
            {comment.user}: {comment.comment}
          </p>
        )) || <p>No hay comentarios disponibles.</p>}
      </div>

      {isModalOpen && <ShippingOptions onClose={handleModalClose} />}
      {alert}
    </div>
  );
};

export default Product;
