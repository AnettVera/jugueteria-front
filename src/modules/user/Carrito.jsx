import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Elements/Generales/Header';
import '../../assets/Pages/Carrito.scss';
import CarritoCard from '../../components/Elements/Generales/CarritoCard';
import { IoIosArrowBack } from "react-icons/io";
import { useCart } from '../../config/context/useCart';
import axios from 'axios';

const Carrito = () => {
    const { getCart, addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            const cart = await getCart();
            const normalizedCart = cart.map(product => ({
                ...product,
                quantity: product.quantity || 1,
            }));
            setProducts(normalizedCart);
        };
        fetchCart();
    }, [getCart]);

    const handleIncrement = (product) => {
        const updatedProducts = products.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setProducts(updatedProducts);
        addToCart(product, 1);
    };

    const handleDecrement = (product) => {
        const updatedProducts = products.map(item =>
            item.id === product.id
                ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                : item
        );
        setProducts(updatedProducts);
        addToCart(product, -1);
    };

    const handleInputChange = (product, value) => {
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue) && parsedValue > 0) {
            const updatedProducts = products.map(item =>
                item.id === product.id ? { ...item, quantity: parsedValue } : item
            );
            setProducts(updatedProducts);
            const difference = parsedValue - product.quantity;
            addToCart(product, difference);
        }
    };

    const handleCheckout = async () => {
        try {
            const items = products.map(({ name, price, quantity }) => ({
                name,
                price,
                quantity,
            }));

            const response = await axios.post('http://localhost:6868/toystore/checkout', { items });
            if (response.data.url) {
                window.location.replace(response.data.url);
            }
        } catch (error) {
            console.error("Error durante el proceso de compra:", error);
            alert("Hubo un problema al procesar tu compra. Por favor, intenta nuevamente.");
        }
    };

    return (
        <>
            <Header />
            <div className="carritoPage">
                <button className="back" onClick={() => navigate(-1)}>
                    <IoIosArrowBack /> Productos
                </button>
                <div className="carritoPage__cart">
                    <div className="carritoPage__cartHeader">
                        <p>Productos en carrito</p>
                    </div>

                    {products.map(product => (
                        <CarritoCard
                            key={product.id}
                            product={product}
                            handleIncrement={handleIncrement}
                            handleDecrement={handleDecrement}
                            handleInputChange={handleInputChange}
                        />
                    ))}

                    <div className="carritoPage__footer">
                        <button onClick={handleCheckout}>Realizar compra</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Carrito;
