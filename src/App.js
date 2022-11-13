import React, { Component } from "react";
import { client } from ".";
import { Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import getData from "./data";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      currentCategory: {},
      currentCurrency: "$",
      cart: [],
      cartCount: 0,
    };
    this.updateCurrentCategory = this.updateCurrentCategory.bind(this);
    this.updateCurrentCurrency = this.updateCurrentCurrency.bind(this);
    this.incrementProductCount = this.incrementProductCount.bind(this);
    this.decrementProductCount = this.decrementProductCount.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const cartCount = JSON.parse(localStorage.getItem("cartCount"));
    if (cart) {
      this.setState({ cart, cartCount });
    }

    const fetchData = async () => {
      const response = await client.query({ query: getData });
      const categories = response.data.categories;
      this.setState({ categories, currentCategory: categories[0] });
    };
    fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cart !== this.state.cart) {
      localStorage.setItem("cart", JSON.stringify(this.state.cart));
      localStorage.setItem("cartCount", this.state.cartCount);
    }
  }

  updateCurrentCategory(value) {
    this.setState({ currentCategory: value });
  }

  updateCurrentCurrency(value) {
    this.setState({ currentCurrency: value });
  }

  addToCart(product) {
    this.setState((prevState) => {
      const sameProduct = prevState.cart.find((el) => {
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
        return {
          cart: [...prevState.cart],
          cartCount: (prevState.cartCount += 1),
        };
      } else {
        const cartProduct = { ...product, cartId: uuidv4(), count: 1 };
        return {
          cart: [...prevState.cart, cartProduct],
          cartCount: (prevState.cartCount += 1),
        };
      }
    });
  }

  incrementProductCount(cartId) {
    this.setState((prevState) => {
      const product = prevState.cart.find(
        (product) => cartId === product.cartId
      );
      product.count += 1;
      return {
        cart: [...prevState.cart],
        cartCount: (prevState.cartCount += 1),
      };
    });
  }

  decrementProductCount(cartId) {
    this.setState((prevState) => {
      const product = prevState.cart.find(
        (product) => cartId === product.cartId
      );
      if (product.count === 1) {
        const index = prevState.cart.indexOf(product);
        prevState.cart.splice(index, 1);
      } else {
        product.count -= 1;
      }
      return {
        cart: [...prevState.cart],
        cartCount: (prevState.cartCount -= 1),
      };
    });
  }

  render() {
    return (
      <div className="App">
        <Header
          state={this.state}
          updateCurrentCategory={this.updateCurrentCategory}
          updateCurrentCurrency={this.updateCurrentCurrency}
          incrementProductCount={this.incrementProductCount}
          decrementProductCount={this.decrementProductCount}
        />
        <Routes>
          <Route
            path="/"
            element={<Category state={this.state} addToCart={this.addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                state={this.state}
                addToCart={this.addToCart}
                incrementProductCount={this.incrementProductCount}
                decrementProductCount={this.decrementProductCount}
              />
            }
          />
          <Route
            path="/:category/:id"
            element={
              <ProductPage state={this.state} addToCart={this.addToCart} />
            }
          />
        </Routes>
      </div>
    );
  }
}
