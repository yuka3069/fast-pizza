import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  cart: [
    // {
    //   pizzaId: 12,
    //   name: "Mediterranean",
    //   quantity: 2,
    //   unitPrice: 16,
    //   totalPrice: 32,
    // },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = newItem

      const index = state.cart.findIndex(
        (item) => item.pizzaId === action.payload.pizzaId,
      );
      if (index >= 0) {
        state.cart.at(index).quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },

    deleteItem(state, action) {
      //payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      //payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      //payload = pizzaID
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});
// console.log(cartSlice);
export default cartSlice.reducer;

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getTotalPrice = (store) =>
  store.cart.cart.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );
export const getTotalQuantity = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

const cartSelector = (store) => store.cart.cart;
export const getCart = createSelector([cartSelector], (cart) =>
  cart.map((item, index) => ({ ...item, key: index * 10 })),
);

export const getIsInCart = (id) => (store) =>
  store.cart.cart.findIndex((item) => item.pizzaId === id) >= 0;
export const getItemQuantity = (id) => (store) =>
  store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
