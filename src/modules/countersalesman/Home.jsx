import React, {useState, useContext} from 'react'
import { Link, useNavigate } from "react-router-dom"; 
import "../../assets/Pages/LandingPage.scss";
import { CiSearch } from "react-icons/ci";
import Header from '../../components/Elements/Generales/Header';
import { AuthContext } from '../../config/context/auth-context';
import ProductCard from '../../components/Elements/Generales/ProductCard';
import FloatingButton from '../../components/shared/FloatingButton';
import CustomProducts from '../user/CustomProducts';

const Home = () => {
    
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


 

  </div>
  )
}

export default Home
