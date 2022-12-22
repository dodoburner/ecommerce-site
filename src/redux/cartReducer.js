import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], count: 0, currentCurrency: "$" },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      console.log(product);
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
        state.count += 1;
      } else {
        const cartProduct = { ...product, cartId: uuidv4(), count: 1 };
        state.items = [...state.items, cartProduct];
        state.count += 1;
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
