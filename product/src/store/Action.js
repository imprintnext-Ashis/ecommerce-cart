
import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({


  name: 'product',
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state, action) => {
      const { id, name, price,stock,description, image } = action.payload;

      state.products.push({
        id,
        name,
        price,
        stock,
        description,
        image,
      });
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
  },
});

export const selectAllProducts = state => state.product.products;

export const { addProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
