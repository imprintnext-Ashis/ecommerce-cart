
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './Action';
import cartReducer from './AddtoCart'

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer, 
  },
});

export default store;
