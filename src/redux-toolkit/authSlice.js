import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  token: localStorage.getItem('authToken') || null, 
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    removeToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    }
  }
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
