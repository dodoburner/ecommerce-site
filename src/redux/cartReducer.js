import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

let initialState = { items: [], count: 0, currentCurrency: "$" };
const cartItems = JSON.parse(localStorage.getItem("cartItems"));
const cartCount = JSON.parse(localStorage.getItem("cartCount"));
const currentCurrency = JSON.parse(localStorage.getItem("currentCurrency"));

if (cartItems) {
  initialState.items = cartItems;
  initialState.count = cartCount;
}
if (currentCurrency) {
  initialState.currentCurrency = currentCurrency;
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const sameProduct = state.items.find((el) => {
        let isSame = false;
        if (el.id === product.id) {
          isSame = true;
          product.attributes.forEach((attr, index) => {
            if (attr.selected.id !== el.attributes[index].selected.id) {
              isSame = false;
            }
          });
        }
        return isSame;
      });

      if (sameProduct) {
        sameProduct.count += 1;
      } else {
        const cartProduct = { ...product, cartId: uuidv4(), count: 1 };
        state.items = [...state.items, cartProduct];
      }
      state.count += 1;
    },
    updateCurrentCurrency: (state, action) => {
      state.currentCurrency = action.payload;
    },
    incrementProductCount: (state, action) => {
      const { cartId } = action.payload;
      const product = state.items.find((product) => cartId === product.cartId);
      product.count += 1;
      state.count += 1;
    },
    decrementProductCount: (state, action) => {
      const { cartId } = action.payload;
      const product = state.items.find((product) => cartId === product.cartId);
      if (product.count === 1) {
        const index = state.items.indexOf(product);
        state.items.splice(index, 1);
      } else {
        product.count -= 1;
      }
      state.count -= 1;
    },
  },
});

export const {
  addToCart,
  updateCurrentCurrency,
  incrementProductCount,
  decrementProductCount,
} = cartSlice.actions;

export default cartSlice.reducer;
