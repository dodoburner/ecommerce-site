import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
export default class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     currentCurrency: "$",
  //   };
  //   this.updateCurrentCategory = this.updateCurrentCategory.bind(this);
  //   this.updateCurrentCurrency = this.updateCurrentCurrency.bind(this);
  //   this.incrementProductCount = this.incrementProductCount.bind(this);
  //   this.decrementProductCount = this.decrementProductCount.bind(this);
  // }

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

  // updateCurrentCategory(value) {
  //   this.setState({ currentCategory: value });
  // }

  // updateCurrentCurrency(value) {
  //   this.setState({ currentCurrency: value });
  // }

  // incrementProductCount(cartId) {
  //   this.setState((prevState) => {
  //     const product = prevState.cart.find(
  //       (product) => cartId === product.cartId
  //     );
  //     product.count += 1;
  //     return {
  //       cart: [...prevState.cart],
  //       cartCount: (prevState.cartCount += 1),
  //     };
  //   });
  // }

  // decrementProductCount(cartId) {
  //   this.setState((prevState) => {
  //     const product = prevState.cart.find(
  //       (product) => cartId === product.cartId
  //     );
  //     if (product.count === 1) {
  //       const index = prevState.cart.indexOf(product);
  //       prevState.cart.splice(index, 1);
  //     } else {
  //       product.count -= 1;
  //     }
  //     return {
  //       cart: [...prevState.cart],
  //       cartCount: (prevState.cartCount -= 1),
  //     };
  //   });
  // }

  render() {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/:category" element={<Category state={this.state} />} />
          <Route
            path="/cart"
            element={
              <Cart
                state={this.state}
                incrementProductCount={this.incrementProductCount}
                decrementProductCount={this.decrementProductCount}
              />
            }
          />
          <Route
            path="/:category/:id"
            element={<ProductPage state={this.state} />}
          />
        </Routes>
      </div>
    );
  }
}
