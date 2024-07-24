import { createSlice } from '@reduxjs/toolkit';

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState: {
    list: [], // Example initial state: an empty array of restaurants
    status: 'idle',
    error: null,
  },
  reducers: {
    setRestaurants: (state, action) => {
      state.list = action.payload; // Set the list of restaurants
    },
    addRestaurant: (state, action) => {
      state.list.push(action.payload); // Add a new restaurant to the list
    },
    removeRestaurant: (state, action) => {
      state.list = state.list.filter(
        (restaurant) => restaurant.id !== action.payload.id
      ); // Remove a restaurant by id
    },
    clearRestaurants(state) {
      state.list = [];
    },
  },
});

export const { setRestaurants, addRestaurant, removeRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;