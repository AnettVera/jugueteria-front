import React, { useState, useContext, useEffect } from 'react';
import "../../assets/Pages/LandingPage.scss";
import { CiSearch } from "react-icons/ci";
import Header from '../../components/Elements/Generales/Header';
import { AuthContext } from '../../config/context/auth-context';
import ProductCardPurchase from '../../components/Elements/Generales/ProductCardPurchase';
import CustomProducts from '../user/CustomProducts';
import PurchaseModal from './../../components/Elements/Generales/PurchaseModal'; // Asegúrate de que el path sea correcto
import axios from "axios";
import { BeatLoader } from "react-spinners";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [selectedProducts, setSelectedProducts] = useState("Lo más popular");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCategoryId, setCurrentCategoryId] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null); // Estado para guardar el ID del producto seleccionado
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchProductsByCategory(currentCategoryId);
  }, [currentCategoryId]);

  const fetchProductsByCategory = async (categoryId = null) => {
    setLoading(true);
    try {
      let url = "http://localhost:6868/toystore/products/";
      if (categoryId) {
        url += `category/${categoryId}`;
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

  const handleCategoryChange = (products, categoryId) => {
    setSelectedProducts(products);
    setCurrentCategoryId(categoryId);
  };

  const handleSearch = () => {
    console.log("Buscando:", searchQuery);
  };

  const handleBuyClick = (productId) => {
    setSelectedProductId(productId); // Guardar el ID del producto seleccionado
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null); // Limpiar el ID del producto seleccionado cuando se cierra el modal
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
      <ProductCardPurchase
        key={product.id}
        name={product.name}
        image={product.images[0]}
        description={product.description}
        price={product.price}
        onClick={() => handleBuyClick(product.id)} // Pasar el ID del producto al hacer clic en comprar
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
      <div className="products">
        {renderProducts()}
      </div>

      {isModalOpen && <PurchaseModal onClose={handleCloseModal} productId={selectedProductId} />} {/* Pasar productId al modal */}
    </div>
  );
};

export default Home;
