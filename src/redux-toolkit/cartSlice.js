import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCartFromServer,
  addProductToCart,
  updateProductQuantity,
  removeProductFromCart,
} from './cartThunk';

const initialState = {
  carts: [],
  loading: false,
  error: null,
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
    },

    removeFromCart: (state, action) => {
      state.carts = state.carts.filter(item => item.id !== action.payload);
    },

    updateCartItem: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.carts.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },

    setCartFromServer: (state, action) => {
      state.carts = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchCartFromServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartFromServer.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(fetchCartFromServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addProductToCart.fulfilled, (state, action) => {
        const newItem = action.payload;
        const existingItem = state.carts.find(item => item.id === newItem.id);
        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          state.carts.push(newItem);
        }
      })
 
      .addCase(updateProductQuantity.fulfilled, (state, action) => {
        const { id, quantity } = action.payload;
        const item = state.carts.find(item => item.id === id);
        if (item) {
          item.quantity = quantity;
        }
      })

      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.carts = state.carts.filter(item => item.id !== action.payload);
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItem,
  setCartFromServer,
} = cartsSlice.actions;

export default cartsSlice.reducer;
