import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cart/cartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
