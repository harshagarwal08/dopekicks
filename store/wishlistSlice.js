import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistedItems: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const item = state.wishlistedItems.find(
        (item) => item.id === action.payload.id
      );
      if (!item) {
        state.wishlistedItems.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistedItems = state.wishlistedItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
