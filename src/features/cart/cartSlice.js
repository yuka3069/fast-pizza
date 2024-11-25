import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import updateLocalStorageState from "../../utilities/updateLocalStorageState";
import getLocalStorageState from "../../utilities/getLocalStorageState";
// {
//   pizzaId: 12,
//   name: "Mediterranean",
//   quantity: 2,
//   unitPrice: 16,
//   totalPrice: 32,
// },
const initialState = {
  cart: JSON.parse(getLocalStorageState("cart")) || [],
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
      updateLocalStorageState("cart", state.cart);
    },

    deleteItem(state, action) {
      //payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    increaseItemQuantity(state, action) {
      //payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decreaseItemQuantity(state, action) {
      //payload = pizzaID
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart(state) {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart));
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
