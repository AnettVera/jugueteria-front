import React, { useState, useContext, useEffect } from 'react';
import "../../assets/Pages/LandingPage.scss";
import { CiSearch } from "react-icons/ci";
import Header from '../../components/Elements/Generales/Header';
import { AuthContext } from '../../config/context/auth-context';
import ProductCardPurchase from '../../components/Elements/Generales/ProductCardPurchase';
import CustomProducts from '../user/CustomProducts';
import PurchaseModal from './../../components/Elements/Generales/PurchaseModal'; 
import axios from "axios";
import { BeatLoader } from "react-spinners";
import _ from "lodash";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedProducts, setSelectedProducts] = useState("Lo más popular");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCategoryId, setCurrentCategoryId] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null); 
  const { user } = useContext(AuthContext);
  const [searchResults, setSearchResults] = useState([]);


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
    setSelectedProductId(productId); 
    setIsModalOpen(true);
  };


  const debouncedSearch = _.debounce(async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:6868/toystore/products/search/${query}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error al buscar los productos:", error);
    } finally {
      setLoading(false);
    }
  }, 300);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); 
    setSelectedProductId(null);
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
    const handleSearchInputChange = (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      debouncedSearch(query);
    };
    return products.map((product) => (
      <ProductCardPurchase
        key={product.id}
        name={product.name}
        image={product.images[0]}
        description={product.description}
        price={product.price}
        onClick={() => handleBuyClick(product.id)} 
      />
    ));
  };

  return (
    <div className="bg-background">
      <Header />
      <CustomProducts onCategoryChange={handleCategoryChange} />
      <div className="buscador">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Busca el producto que deseas"
            className="text-center__input"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
 
        </div>
        <div className="results">
          {loading ? (
            <BeatLoader color="#EF1A23" />
          ) : searchResults.length > 0 ? (
            <ul>
              {searchResults.map((product) => (
                <li key={product.product_id}>
                  <Link to={`/producto/${product.product_id}`}>{product.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p> </p>
          )}
        </div>
      </div>

      <div className="products">
        {renderProducts()}
      </div>

      {isModalOpen && <PurchaseModal onClose={handleCloseModal} productId={selectedProductId} />} 
    </div>
  );
};

export default Home;
