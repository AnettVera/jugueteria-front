import React, { useEffect, useState } from 'react';
import Header from '../../components/Elements/Generales/Header';
import '../../assets/Pages/Carrito.scss';
import CarritoCard from '../../components/Elements/Generales/CarritoCard';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';

const Carrito = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    const initialProducts = [
        { id: 1, name: "Energize Lab Eilik", description: "Robot de 10x25 cm blanco con azul", price: 75.00 },
        { id: 2, name: "Energize Lab Eilik 2", description: "Robot de 12x30 cm negro con rojo", price: 85.00 },
    ];

    // Inicializar el estado de cantidades
    const [quantities, setQuantities] = useState(
        initialProducts.reduce((acc, product) => {
            acc[product.id] = 1; // Cantidad inicial: 1 para cada producto
            return acc;
        }, {})
    );

    const handleIncrement = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: prev[id] + 1,
        }));
    };

    const handleDecrement = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: prev[id] > 1 ? prev[id] - 1 : 1,
        }));
    };

    const handleInputChange = (id, value) => {
        const parsedValue = parseInt(value, 10);
        setQuantities((prev) => ({
            ...prev,
            [id]: parsedValue > 0 ? parsedValue : 1,
        }));
    };

    const handleCheckout = async () => {
        try {
            const items = initialProducts.map((product) => ({
                name: product.name,
                price: product.price,
                quantity: quantities[product.id],
            }));

            const response = await axios.post('http://localhost:6868/toystore/checkout', { items });
            console.log("Respuesta de la API:", response.data);
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
                <button className="back" onClick={handleBackClick}>
                    <IoIosArrowBack /> Productos
                </button>
                <div className="carritoPage__cart">
                    <div className="carritoPage__cartHeader">
                        <p>Productos en carrito</p>
                    </div>

                    {initialProducts.map((product) => (
                        <CarritoCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            quantity={quantities[product.id]}
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
