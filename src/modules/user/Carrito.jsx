import React, { useEffect, useState, useMemo, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Elements/Generales/Header';
import '../../assets/Pages/Carrito.scss';
import CarritoCard from '../../components/Elements/Generales/CarritoCard';
import { IoIosArrowBack } from "react-icons/io";
import { useCart } from '../../config/context/useCart';
import axios from 'axios';

const Carrito = () => {
    const [user, setUser] = useState(null);
    const { getCart, addToCart, removeFromCart } = useCart();
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('jwt_token');
            const userId = localStorage.getItem('user_id');
            if (token && userId) {
                try {
                    const response = await axios.get(`http://localhost:6868/toystore/users/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };
        console.log(user);
        fetchUserData();
    }, []);

    const handleBackClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchCart = async () => {
            const cart = await getCart();
            setProducts(cart);
            const initialQuantities = cart.reduce((acc, product) => {
                acc[product.product_id] = product.quantity || 1;
                return acc;
            }, {});
            setQuantities(initialQuantities);
        };
        fetchCart();
    }, [getCart]);

    const handleIncrement = (product) => {
        setQuantities((prev) => {
            const newQuantity = prev[product.product_id] + 1;
            return {
                ...prev,
                [product.product_id]: newQuantity,
            };
        });
        addToCart(product, 1);
    };

    const handleDecrement = (product) => {
        setQuantities((prev) => {
            const newQuantity = Math.max(prev[product.product_id] - 1, 1);
            return {
                ...prev,
                [product.product_id]: newQuantity,
            };
        });
        addToCart(product, -1);
    };

    const handleInputChange = (product, value) => {
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue) && parsedValue > 0) {
            setQuantities((prev) => ({
                ...prev,
                [product.product_id]: parsedValue,
            }));
            addToCart(product, parsedValue - (quantities[product.product_id] || 1));
        }
    };

    const handleRemove = async (productId) => {
        await removeFromCart(productId);
        setProducts((prevProducts) => prevProducts.filter((product) => product.product_id !== productId));
    };

    const handleCheckout = async () => {
        try {
            const items = products.map((product) => {
                const productCart = product.productCart || product; // Usa product directamente si productCart es undefined
                return {
                    name: productCart.name,
                    price: productCart.price,
                    quantity: quantities[product.product_id],
                };
            });
            const response = await axios.post('http://localhost:6868/toystore/checkout', { items, email: user?.email });
            const checkoutUrl = response.data.url;
            if (checkoutUrl && checkoutUrl.startsWith('http')) {
                window.location.replace(checkoutUrl);
            } else {
                throw new Error('URL de redirección no válida');
            }
        } catch (error) {
            console.error("Error durante el proceso de compra:", error);
            alert("Hubo un problema al procesar tu compra. Por favor, intenta nuevamente.");
        }
    };

    const displayedProducts = useMemo(() => {
        return products.map((product) => ({
            ...product,
            quantity: quantities[product.product_id] || 1,
        }));
    }, [products, quantities]);

    return (
        <>
            <Header />
            <div className="carritoPage">
                <button className="back" onClick={handleBackClick}>
                    <IoIosArrowBack /> Productos
                </button>
                <div className="carritoPage__cart">
                    <div className="carritoPage__cartHeader">
                        <p>Productos en carrito</p>
                    </div>

                    {products.length === 0 ? (
                        <div className="carritoPage__empty">
                            <p>No hay productos en el carrito</p>
                        </div>
                    ) : (
                        displayedProducts.map(product => (
                            <CarritoCard
                                key={product.product_id}
                                product={product}
                                handleIncrement={handleIncrement}
                                handleDecrement={handleDecrement}
                                handleInputChange={handleInputChange}
                                handleRemove={handleRemove}
                            />
                        ))
                    )}
                    <div className="carritoPage__footer">
                        <button onClick={handleCheckout} disabled={products.length === 0}>Realizar compra</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Carrito;