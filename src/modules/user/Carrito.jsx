import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from '../../components/Elements/Generales/Header';
import '../../assets/Pages/Carrito.scss';
import CarritoCard from '../../components/Elements/Generales/CarritoCard';
import { IoIosArrowBack } from "react-icons/io";
import axios from 'axios';
import { useCart } from '../../config/context/useCart';

const Carrito = () => {
    const { getCart } = useCart();
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchCart = async () => {
            const cart = await getCart();
            setProducts(cart);
            console.log(cart);
            const initialQuantities = cart.reduce((acc, product) => {
                acc[product.id] = product.quantity || 1;
                return acc;
            }, {});
            setQuantities(initialQuantities);
        };
        fetchCart();
    }, [getCart]);

    const handleIncrement = (id) => {
        console.log("Incrementando cantidad del producto con ID:", id);
        setQuantities((prev) => {
            const newQuantity = prev[id] + 1; // Calcula el nuevo valor
            return {
                ...prev,
                [id]: newQuantity, // Actualiza solo este producto
            };
        });
    };

    const handleDecrement = (id) => {
        console.log("Decrementando cantidad del producto con ID:", id);
        setQuantities((prev) => {
            const newQuantity = Math.max(prev[id] - 1, 1); // Evita valores menores a 1
            return {
                ...prev,
                [id]: newQuantity,
            };
        });
    };

    const handleInputChange = (id, value) => {
        const parsedValue = parseInt(value, 10); // Convierte a número
        if (!isNaN(parsedValue) && parsedValue > 0) {
            setQuantities((prev) => ({
                ...prev,
                [id]: parsedValue, // Actualiza el valor ingresado
            }));
        }
    };

    const handleCheckout = async () => {
        try {
            const items = products.map((product) => ({
                name: product.name,
                price: product.price,
                quantity: quantities[product.id],
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

    const displayedProducts = useMemo(() => {
        return products.map((product) => ({
            ...product,
            quantity: quantities[product.id] || 1,
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

                    {displayedProducts.map(product => (
                        <CarritoCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            quantity={quantities[product.id] || 1} // Usa la cantidad del estado
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
