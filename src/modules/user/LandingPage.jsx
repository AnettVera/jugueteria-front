import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importar useNavigate
import "../../assets/Pages/LandingPage.scss";
import { AuthContext } from "../../config/context/auth-context";
import Header from "../../components/Elements/Generales/Header";
import ProductCard from "../../components/Elements/Generales/ProductCard";
import Footer from "../../components/Elements/Generales/Footer";
import Categories from "../../components/Elements/Generales/Categories";
import { CiSearch } from "react-icons/ci";
import FloatingButton from "../../components/shared/FloatingButton";

const LandingPage = () => {
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
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Toy Store</h1>
            <p>Juguetes que inspiran la imaginación de niños y adultos.</p>
          </div>
          <div className="hero-image">
            <img
              src="https://i.pinimg.com/originals/fb/14/dd/fb14dd15ec54616867445fc670cd8e5f.png"
              alt="Juguetes felices"
            />
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="hero-wave"
        >
          <path
            fill="#EF1A23"
            fillOpacity="1"
            d="M0,288L60,282.7C120,277,240,267,360,250.7C480,235,600,213,720,197.3C840,181,960,171,1080,186.7C1200,203,1320,245,1380,266.7L1440,288L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </section>
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

      <Categories />
      <h2 className="text-center">Los más populares</h2>
      <FloatingButton onClick={handleFloatingButtonClick} /> 
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

      <Footer />
    </div>
  );
};

export default LandingPage;
