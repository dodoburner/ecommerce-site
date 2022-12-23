import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productPDPReducer from "./productPDPSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    productPDP: productPDPReducer,
  },
});
