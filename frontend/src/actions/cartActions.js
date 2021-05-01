import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                name: data.name,
                quantity: quantity,
                image: data.image,
                price: data.price,
                product: data._id,
                countInStock: data.countInStock,
            },
        });

        localStorage.setItem(
            'cartItems',
            JSON.stringify(getState().cart.cartItems)
        );
    } catch (error) {
        console.log(error);
    }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: {
                product: data._id,
            },
        });

        localStorage.setItem(
            'cartItems',
            JSON.stringify(getState().cart.cartItems)
        );
    } catch (error) {
        console.log(error);
    }
};