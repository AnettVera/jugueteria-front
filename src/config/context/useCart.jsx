import { useContext } from 'react';
import { AuthContext } from './auth-context';
import axios from 'axios';

export const useCart = () => {
    const { user } = useContext(AuthContext);

    const getLocalCart = async () => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        return Array.isArray(storedCart) ? storedCart : [];
    };


    const setLocalCart = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const addToCart = async (product, quantity) => {
        if (user.signed) {
            try {
                const responseCreateCart = await axios.post(`http://localhost:6868/toystore/carts/carts-user/${user.id}`, {});
                if (responseCreateCart.status === 200) {
                    await axios.post('http://localhost:6868/toystore/cart-products', {
                        cart_id: responseCreateCart.data.cart_id,
                        product_id: product.id,
                        quantity,
                    });
                }
            } catch (error) {
                console.error("Error al añadir producto al carrito del usuario:", error);
            }
        } else {
            // Asegúrate de usar await para obtener el carrito local
            const cart = await getLocalCart();
            const existingProduct = cart.find((item) => item.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.push({ ...product, quantity });
            }

            setLocalCart(cart);
        }
    };


    const getCart = async () => {
        if (user.signed) {
            try {
                const response = await axios.get(`http://localhost:6868/toystore/carts/user/${user.id}`);
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.error('Error al obtener el carrito:', error);
            }
        } else {
            const localCart = await getLocalCart();
            console.log(localCart);
            return localCart;
        }
    };

    const removeProduct = async (productId) => {
        if (user.signed) {
            try {
                await axios.delete(`http://localhost:6868/toystore/cart-products/${productId}`);
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
            }
        } else {
            const cart = await getLocalCart(); // Usar await
            const updatedCart = cart.filter((product) => product.id !== productId);
            setLocalCart(updatedCart);
        }
    };

    return {
        addToCart,
        getCart,
        removeProduct,
    };

}