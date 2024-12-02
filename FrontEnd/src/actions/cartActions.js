import axios from 'axios';
import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO } from '../constants/cartConstants';

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    try {
        // Fetch product details
        const { data } = await axios.get(`/api/v1/product/${id}`);

        // Dispatch the action to add the item to the cart
        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.product._id, // Assuming your API returns `_id` for the product ID
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0]?.url, // Safely access the image URL
                stock: data.product.stock,
                quantity,
            },
        });

        // Save the updated cart items to local storage
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        console.error("Error adding item to cart:", error.message);
    }
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {
    try {
        // Fetch product details
        // Dispatch the action to add the item to the cart
        dispatch({
            type: REMOVE_ITEM_CART,
            payload: id,
        });

        // Save the updated cart items to local storage
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        console.error("Error adding item to cart:", error.message);
    }
};

export const saveShippingInfo = (data) => async (dispatch) => {
    try {
        // Fetch product details
        // Dispatch the action to add the item to the cart
        dispatch({
            type: SAVE_SHIPPING_INFO,
            payload: data,
        });

        // Save the updated cart items to local storage
        localStorage.setItem('shippingInfo', JSON.stringify(data));
    } catch (error) {
        console.error("Error adding item to cart:", error.message);
    }
};