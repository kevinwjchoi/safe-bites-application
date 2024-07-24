import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice.js';
import restaurantReducer from './features/restaurantSlice';
import recipeReducer from './features/recipeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    restaurants: restaurantReducer,
    recipes: recipeReducer,
  },
});

export default store;