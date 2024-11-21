import React, { useState, useEffect } from 'react';
import Header from '../../components/Elements/Generales/Header';
import '../../assets/Pages/Carrito.scss';
import CarritoCard from '../../components/Elements/Generales/CarritoCard';

const Carrito = () => {
    const initialProducts = [
        { id: 1, name: "Energize Lab Eilik", description: "Robot de 10x25 cm blanco con azul", price: "75.00" },
        { id: 2, name: "Energize Lab Eilik 2", description: "Robot de 12x30 cm negro con rojo", price: "85.00" },
    ];

    // Estado inicial de cantidades
    const [quantities, setQuantities] = useState({});

    // Sincroniza `quantities` con los productos al cargar o si cambian los productos
    useEffect(() => {
        const initialQuantities = initialProducts.reduce((acc, product) => {
            acc[product.id] = quantities[product.id] || 1; // Si ya existe, usa el valor anterior
            return acc;
        }, {});
        setQuantities(initialQuantities);
    }, [initialProducts]);

    // Incrementar cantidad
    const handleIncrement = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: prev[id] + 1,
        }));
    };

    // Decrementar cantidad
    const handleDecrement = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: prev[id] > 1 ? prev[id] - 1 : 1, // Asegúrate de que no sea menor a 1
        }));
    };

    // Cambiar cantidad directamente
    const handleInputChange = (id, value) => {
        const parsedValue = parseInt(value, 10);
        setQuantities((prev) => ({
            ...prev,
            [id]: parsedValue > 0 ? parsedValue : 1, // No permite valores menores que 1
        }));
    };

    return (
        <div className="carritoPage">
            <Header />
            <p>Carrito</p>
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
                        quantity={quantities[product.id] || 1} // Siempre muestra al menos 1
                        handleIncrement={handleIncrement}
                        handleDecrement={handleDecrement}
                        handleInputChange={handleInputChange}
                    />
                ))}

                <div className="carritoPage__footer">
                    <button>Realizar compra</button>
                </div>
            </div>
        </div>
    );
};

export default Carrito;
