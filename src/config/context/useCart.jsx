import { useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext } from './auth-context';
import axios from 'axios';

export const useCart = () => {
    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const loadCart = async () => {
            const userId = user?.user_id || localStorage.getItem('user_id');
            if (user?.signed && userId) {
                try {
                    let cartId;
                    const existingCartResponse = await axios.get(`http://localhost:6868/toystore/cart-user/${userId}`);
                    if (existingCartResponse.data?.data?.id) {
                        cartId = existingCartResponse.data.data.id;
                    } else {
                        const response = await axios.post(`http://localhost:6868/toystore/cart-user/${userId}`, {});
                        cartId = response.data.data.cart_id;
                    }
                    localStorage.setItem('cart_id', cartId); // Almacenar el cart_id en localStorage
                    const cartResponse = await axios.get(`http://localhost:6868/toystore/cart-user/${userId}`);
                    setCart(cartResponse.data.data.cartProducts || []);
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        // Create the cart if not found
                        try {
                            const response = await axios.post(`http://localhost:6868/toystore/cart-user/${userId}`, {});
                            const cartId = response.data.data.cart_id;
                            localStorage.setItem('cart_id', cartId); // Almacenar el cart_id en localStorage
                            const cartResponse = await axios.get(`http://localhost:6868/toystore/cart-user/${userId}`);
                            setCart(cartResponse.data.data.cartProducts || []);
                        } catch (createError) {
                            console.error('Error al crear el carrito:', createError);
                        }
                    } else {
                        console.error('Error al cargar el carrito desde la base de datos:', error);
                    }
                }
            } else {
                const storedCart = JSON.parse(localStorage.getItem('cart'));
                if (storedCart) {
                    setCart((prevCart) => (prevCart.length > 0 ? prevCart : storedCart));
                }
            }
        };
        loadCart();
    }, [user]);

    useEffect(() => {
        if (!user?.signed) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, user]);

    const addToCart = useCallback(async (product, quantity) => {
        const userId = user?.user_id || localStorage.getItem('user_id');
        const cartId = localStorage.getItem('cart_id');
        if (user?.signed && userId && cartId) {
            try {
                const existingProductResponse = await axios.get(`http://localhost:6868/toystore/cart-products`, {
                    params: { cart_id: cartId, product_id: product.product_id }
                });
                if (existingProductResponse.data.length > 0) {
                    // Update the quantity of the existing product in the cart
                    const cartProductId = existingProductResponse.data[0].id;
                    await axios.put(`http://localhost:6868/toystore/cart-products/${cartProductId}`, {
                        quantity: existingProductResponse.data[0].quantity + quantity,
                    });
                } else {
                    // Add the new product to the cart
                    console.log('Adding product to cart:', product.product_id, quantity);
                    await axios.post('http://localhost:6868/toystore/cart-products', {
                        cart_id: cartId,
                        product_id: product.product_id,
                        quantity,
                    });
                }

                setCart((prevCart) => {
                    const existingProductIndex = prevCart.findIndex((item) => item.product_id === product.product_id);
                    if (existingProductIndex !== -1) {
                        const updatedCart = [...prevCart];
                        updatedCart[existingProductIndex].quantity += quantity;
                        return updatedCart;
                    } else {
                        return [...prevCart, { ...product, quantity }];
                    }
                });
            } catch (error) {
                console.error('Error al añadir producto al carrito del usuario:', error);
            }
        } else {
            setCart((prevCart) => {
                const existingProductIndex = prevCart.findIndex((item) => item.product_id === product.product_id);
                if (existingProductIndex !== -1) {
                    const updatedCart = [...prevCart];
                    updatedCart[existingProductIndex].quantity += quantity;
                    return updatedCart;
                } else {
                    return [...prevCart, { ...product, quantity }];
                }
            });
        }
    }, [user]);

    const removeFromCart = useCallback(async (cartProductId) => {
        const userId = user?.user_id || localStorage.getItem('user_id');
        const cartId = localStorage.getItem('cart_id');
        if (user?.signed && userId && cartId) {
            try {
                await axios.delete(`http://localhost:6868/toystore/cart-products/${cartProductId}`);
                setCart((prevCart) => prevCart.filter((item) => item.id !== cartProductId));
            } catch (error) {
                console.error('Error al eliminar el producto del carrito del usuario:', error);
            }
        } else {
            setCart((prevCart) => prevCart.filter((item) => item.id !== cartProductId));
        }
    }, [user]);

    const getCart = useCallback(() => {
        return cart;
    }, [cart]);

    return {
        cart,
        addToCart,
        removeFromCart,
        getCart,
    };
};