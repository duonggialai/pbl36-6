import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carts: [],
};

const cartsSlice = createSlice({
  name: 'cart', 
  initialState, 
  reducers: {
    addToCart: (state, action) => {
        const product = action.payload;
        const existingItem = state.carts.find(item => item.id === product.id);
      
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.carts.push({ ...product, quantity: 1 });
        }
      }
      ,
    // removeFromCart: (state, action) => {
    //   state.carts = state.carts.filter(item => item.id !== action.payload);
    // },
  },
});

export const { addToCart } = cartsSlice.actions;

export default cartsSlice.reducer;
