import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],  
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCheckoutProducts(state, action) {
      state.products = action.payload;
    },
    resetCheckout(state) {
      state.products = [];
    },
  },
});

export const { setCheckoutProducts, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
