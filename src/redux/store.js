import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import productPDPReducer from "./productPDPReducer";

export default configureStore({
  reducer: {
    cart: cartReducer,
    productPDP: productPDPReducer,
  },
});
