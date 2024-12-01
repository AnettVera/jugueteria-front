import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/Pages/LandingPage.scss";
import { AuthContext } from "../../config/context/auth-context";
import Header from "../../components/Elements/Generales/Header";
import ProductCard from "../../components/Elements/Generales/ProductCard";
import Footer from "../../components/Elements/Generales/Footer";
import Categories from "../../components/Elements/Generales/Categories";
import { CiSearch } from "react-icons/ci";
import FloatingButton from "../../components/shared/FloatingButton";
import CustomProducts from "./CustomProducts";

const LandingPage = () => {

  const [selectedProducts, setSelectedProducts] = useState("Lo más popular");
  const handleCategoryChange = (products) => {
    setSelectedProducts(products); 
  };
  const products = [
    {
      id: 1,
      brand: "ENERGIZE LAB",
      name: "Eilik",
      description: "Un compañero interactivo perfecto para todas las edades.",
      price: 1300.0,
      currency: "mx",
      images: [
        "https://manuals.plus/wp-content/uploads/2024/06/ENERGIZE-LAB-Eilik-Cute-Robot-Pet-product.png?ezimgfmt=rs:368x447/rscb1/ngcb1/notWebP",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300"
      ], rating: 5,
    },
    {
      id: 2,
      brand: "FunToyz",
      name: "RoboCar",
      description: "Un auto robotizado que mezcla velocidad y tecnología.",
      price: 800.0,
      currency: "mx",
      images: [
        "https://manuals.plus/wp-content/uploads/2024/06/ENERGIZE-LAB-Eilik-Cute-Robot-Pet-product.png?ezimgfmt=rs:368x447/rscb1/ngcb1/notWebP",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300"
      ], rating: 4,
    },
  ];


  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
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

  return (
    <div className="bg-background">
      <Header />
      <CustomProducts onCategoryChange={handleCategoryChange} />      <div className="text-center">
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

      <h2 className="text-center">{selectedProducts}</h2>      <FloatingButton onClick={handleFloatingButtonClick} /> 
      <div className="products">
        {products.map((product) => (
          <ProductCard
          key={product.id}
          name={product.name}
          image={product.images[0]}
          description={product.description}
          price={product.price}
          onClick={() => handleProductClick(product.name)}        />
        
        ))}
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

      <Footer/>
    </div>
  );
};

export default LandingPage;
