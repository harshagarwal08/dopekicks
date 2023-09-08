import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize
      );
      if (item) {
        item.quantity += 1;
        if (item.quantity > 6) item.quantity = 6;
        item.price = item.attributes.price * item.quantity;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.cartItems.reduce(
        (total, item) => total + item.price,
        0
      );
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) =>
          item.id !== action.payload.id ||
          (item.id === action.payload.id &&
            item.selectedSize !== action.payload.selectedSize)
      );
      state.total = state.cartItems.reduce(
        (total, item) => total + item.price,
        0
      );
    },
    updateCart: (state, action) => {
      const updatedCartItems = state.cartItems.map((item) => {
        if (
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize
        ) {
          if (action.payload.key === "quantity") {
            item.price = item.attributes.price * action.payload.value;
            item.quantity = action.payload.value;
          } else if (action.payload.key === "selectedSize") {
            const itemWithSameSize = state.cartItems.find(
              (otherItem) =>
                otherItem.id === item.id &&
                otherItem.selectedSize === action.payload.value
            );
            if (itemWithSameSize) {
              itemWithSameSize.quantity += item.quantity;
              if (itemWithSameSize.quantity > 6) itemWithSameSize.quantity = 6;
              itemWithSameSize.price =
                itemWithSameSize.attributes.price * itemWithSameSize.quantity;
              return null;
            } else {
              item.selectedSize = action.payload.value;
            }
          }
        }
        return item;
      });
      state.cartItems = updatedCartItems.filter((item) => item !== null);
      state.total = state.cartItems.reduce(
        (total, item) => total + item.price,
        0
      );
    },
  },
});

export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
