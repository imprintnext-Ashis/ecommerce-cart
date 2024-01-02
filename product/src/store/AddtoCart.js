
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const { id, name, price,quantity,image,stock} = action.payload;

            state.items.push({
                id,
                name,
                price,
                quantity,
                image,
                stock,
            });
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
        updateCartItemQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.items.find(item => item.id === productId);
            if (item) {
              item.quantity = quantity;
            }
        },
    },
});

export const selectCartItems = state => state.cart.items;

export const { addToCart, removeFromCart, clearCart,updateCartItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
