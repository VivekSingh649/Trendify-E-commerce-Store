import { createSlice } from "@reduxjs/toolkit";

export const addToCart = createSlice({
  name: "Cart",
  initialState: JSON.parse(localStorage.getItem("cart")) || [],
  reducers: {
    addCart: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeCart: (state, action) => {
      const updatedState = state.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export const { addCart, removeCart } = addToCart.actions;
export default addToCart.reducer;
