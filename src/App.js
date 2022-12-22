import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Category from "./pages/Category";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
export default class App extends Component {
  // componentDidMount() {
  //   const cart = JSON.parse(localStorage.getItem("cart"));
  //   const cartCount = JSON.parse(localStorage.getItem("cartCount"));
  //   if (cart) {
  //     this.setState({ cart, cartCount });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.cart !== this.state.cart) {
  //     localStorage.setItem("cart", JSON.stringify(this.state.cart));
  //     localStorage.setItem("cartCount", this.state.cartCount);
  //   }
  // }

  render() {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="category/:categoryId" element={<Category />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="category/:categoryId/products/:id"
            element={<ProductPage />}
          />
        </Routes>
      </div>
    );
  }
}
