import { createSlice } from '@reduxjs/toolkit';

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    list: [], // Example initial state: an empty array of recipes
    status: 'idle',
    error: null,
  },
  reducers: {
    setRecipes: (state, action) => {
      state.list = action.payload; // Set the list of recipes
    },
    addRecipe: (state, action) => {
      state.list.push(action.payload); // Add a new recipe to the list
    },
    removeRecipe: (state, action) => {
      state.list = state.list.filter(
        (recipe) => recipe.id !== action.payload.id
      ); // Remove a recipe by id
    },
    clearRecipes(state) {
      state.list = [];
    },
  },
});

export const { setRecipes, addRecipe, removeRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;