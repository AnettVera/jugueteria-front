import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/Pages/LandingPage.scss";
import { AuthContext } from "../../config/context/auth-context";
import Header from "../../components/Elements/Generales/Header";
import ProductCard from "../../components/Elements/Generales/ProductCard";
import Footer from "../../components/Elements/Generales/Footer";
import { CiSearch } from "react-icons/ci";
import FloatingButton from "../../components/shared/FloatingButton";
import CustomProducts from "./CustomProducts";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const LandingPage = () => {
  const [selectedProducts, setSelectedProducts] = useState("Lo más popular");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchProductsByCategory = async (categoryId = null) => {
    setLoading(true);
    try {
      let url = "http://localhost:6868/toystore/products/category";
      if (categoryId) {
        url += `/${categoryId}`;
      }

      const response = await axios.get(url);
      const formattedProducts = response.data.map((product) => ({
        id: product.product_id,
        name: product.name,
        description: product.description,
        price: product.price,
        images: [
          product.image_url || "https://via.placeholder.com/300",
          "https://via.placeholder.com/300",
          "https://via.placeholder.com/300",
          "https://via.placeholder.com/300"
        ],
        stock: product.stock
      }));

      setProducts(formattedProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsByCategory();
  }, []);

  const handleCategoryChange = (products, categoryId) => {
    setSelectedProducts(products);
    setCurrentCategoryId(categoryId);
    fetchProductsByCategory(categoryId);
  };

  const handleSearch = () => {
    console.log("Buscando:", searchQuery);
  };

  const handleFloatingButtonClick = () => {
    console.log("Redirigiendo al carrito");
    navigate("/carrito-de-compras");
  };

  const handleProductClick = (productName) => {
    navigate(`/producto/${productName}`);
  };

  const renderProducts = () => {
    if (loading) {
      return <BeatLoader color="#EF1A23" />;
    }

    if (error) {
      return <div>Error</div>;
    }

    if (products.length === 0) {
      return <div>No hay productos en esta categoría</div>;
    }

    return products.map((product) => (
      <ProductCard
        key={product.id}
        name={product.name}
        image={product.images[0]}
        description={product.description}
        price={product.price}
        onClick={() => handleProductClick(product.name)}
      />
    ));
  };

  return (
    <div className="bg-background">
      <Header />
      <CustomProducts onCategoryChange={handleCategoryChange} />
      <div className="text-center">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Busca el producto que deseas"
            className="text-center__input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-icon" onClick={handleSearch}>
            <CiSearch />
          </span>
        </div>
      </div>

      <h2 className="text-center">{selectedProducts}</h2>
      <FloatingButton onClick={handleFloatingButtonClick} />

      <div className="products">
        {renderProducts()}
      </div>

      <div className="landing-page">
        <h2 className="section-title">¿Quienes Somos?</h2>
        <div className="image-section">
          <img
            src="https://www.dondeir.com/wp-content/uploads/2018/12/jugueterias-en-ciudad-de-mexico.jpg"
            alt="Nuestro Equipo"
            className="rounded-image"
          />
        </div>

        <div className="branches-section">
          <h2 className="section-title">Nuestras Sucursales</h2>
          <div className="branches-grid">
            <img
              src="https://www.dondeir.com/wp-content/uploads/2018/12/jugueterias-en-ciudad-de-mexico.jpg"
              className="branch"
            />
            <img
              src="https://media.timeout.com/images/103845688/750/562/image.jpg"
              className="branch"
            />
            <img
              src="https://www.forbes.com.mx/2016/04/image-1.jpeg"
              className="branch"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQfS1HoZwF1zcxR6hdYRHMb1hnP32QcLs7wA&s"
              className="branch"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
