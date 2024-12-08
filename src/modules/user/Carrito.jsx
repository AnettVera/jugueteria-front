import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Elements/Generales/Header';
import '../../assets/Pages/Carrito.scss';
import CarritoCard from '../../components/Elements/Generales/CarritoCard';
import { IoIosArrowBack } from "react-icons/io";
import { useCart } from '../../config/context/useCart';
import axios from 'axios';
import { useCustomAlert } from '../../components/Elements/Generales/CustomAlert';


const Carrito = () => {
    const [user, setUser] = useState(null);
    const { getCart, addToCart, removeFromCart } = useCart();
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();
    const { alert, showAlert } = useCustomAlert();


    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('jwt_token');
            const userId = localStorage.getItem('user_id');
            if (token && userId) {
                try {
                    const response = await axios.get(`http://localhost:6868/toystore/users/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` }, 
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };
        fetchUserData();
    }, []);
   


    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cart = await getCart();
                setProducts(cart);
                const initialQuantities = cart.reduce((acc, product) => {
                    acc[product.product_id] = product.quantity || 1;
                    return acc;
                }, {});
                setQuantities(initialQuantities);
            } catch (error) {
                console.error("Error al cargar el carrito:", error);
            }
        };
        fetchCart();
    }, [getCart]);

    const handleIncrement = (product) => {
        let productCart = product.productCart;
    
        // Validación: Recuperar datos desde localStorage si productCart no tiene información
        if (!productCart) {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            const storedProduct = storedCart.find(item => item.product_id === product.product_id);
            if (storedProduct) {
                productCart = storedProduct;
            } else {
                showAlert({
                    title: "Error",
                    text: "No se encontró información del producto en el almacenamiento local.",
                    icon: "error",
                });
                return;
            }
        }
    
        const maxStock = productCart.stock || product.stock || 0;
        const currentQuantity = quantities[product.product_id] || 1;
    
        if (currentQuantity >= maxStock) {
            showAlert({
                title: "Stock insuficiente",
                text: `No puedes agregar más de ${maxStock} unidades de este producto.`,
                icon: "error",
            });
        } else {
            setQuantities((prev) => ({
                ...prev,
                [product.product_id]: currentQuantity + 1,
            }));
            addToCart(product, 1);
        }
    };
    


    const handleDecrement = (product) => {
        setQuantities((prev) => {
            const newQuantity = Math.max(prev[product.product_id] - 1, 1);
            return { ...prev, [product.product_id]: newQuantity };
        });
        addToCart(product, -1);
    };


    const handleInputChange = (product, value) => {
        const parsedValue = parseInt(value, 10);
        const maxStock = product.productCart?.stock || product.stock;


        if (isNaN(parsedValue) || parsedValue <= 0) {
            showAlert({
                title: "Cantidad inválida",
                text: "Por favor ingresa un número mayor a 0.",
                icon: "error",
            });
            return;
        }


        if (parsedValue > maxStock) {
            showAlert({
                title: "Stock insuficiente",
                text: `Solo hay ${maxStock} unidades disponibles.`,
                icon: "error",
            });
            return;
        }


        setQuantities((prev) => ({ ...prev, [product.product_id]: parsedValue }));
        addToCart(product, parsedValue - (quantities[product.product_id] || 1));
    };


    const handleRemove = async (productId) => {
        await removeFromCart(productId);
        setProducts((prev) => prev.filter((product) => product.product_id !== productId));
    };


    const handleCheckout = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        try {
            const items = products.map((product) => {
                const productCart = product.productCart || product;
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
            showAlert({
                title: "Error",
                text: "Hubo un problema al procesar tu compra. Por favor, intenta nuevamente.",
                icon: "error",
            });
        } finally {
            setIsProcessing(false);
        }
    };


    const totalAmount = useMemo(() => {
        return products.reduce((total, product) => {
            const price = product.productCart?.price || product.price || 0;
            const quantity = quantities[product.product_id] || 1;
            return total + price * quantity;
        }, 0);
    }, [products, quantities]);


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
                    {products.length === 0 ? (
                        <div className="carritoPage__empty">
                            <p>No hay productos en el carrito</p>
                        </div>
                    ) : (
                        products.map(product => (
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
                        <p className="carritoPage__total">
                            Total a pagar: <strong>$ {totalAmount.toFixed(2)} mx</strong>
                        </p>
                        <button onClick={handleCheckout} disabled={products.length === 0 || isProcessing}>
                            {isProcessing ? "Procesando..." : "Realizar compra"}
                        </button>
                    </div>
                </div>
                {alert}
            </div>
        </>
    );
};


export default Carrito;