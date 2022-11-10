import { Component } from "react";
import { client } from ".";
import { Outlet, Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import getData from "./getData";
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
    this.updateSelectedAttribute = this.updateSelectedAttribute.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    const fetchData = async () => {
      const response = await client.query({ query: getData });
      const categories = response.data.categories;
      this.setState({ categories: categories, currentCategory: categories[0] });
    };
    fetchData();
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
        let isSame = false
        if (el.id === product.id) {
          isSame = true
          product.attributes.forEach((attr, index) => {
            if (
              attr.selected.id !==
              el.attributes[index].selected.id
            ) {
              isSame = false;
            }
          });
        }
        return isSame
      });

      if (sameProduct) {
        sameProduct.count += 1;
        return {
          cart: [...prevState.cart],
          cartCount: (prevState.cartCount += 1),
        };
      } else {
        const cartProduct = { ...product, cartId: uuidv4() };
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
      return { cart: prevState.cart, cartCount: (prevState.cartCount += 1) };
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

  updateSelectedAttribute(product, attribute, item) {
    this.setState((prevState) => {
      const prod = prevState.cart.find((el) => el.cartId === product.cartId);
      const attr = prod.attributes.find((attr) => attr.name === attribute.name);
      attr.selected = item;
      return { cart: [...prevState.cart] };
    });
  }

  render() {
    return (
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Header
                  state={this.state}
                  updateCurrentCategory={this.updateCurrentCategory}
                  updateCurrentCurrency={this.updateCurrentCurrency}
                  incrementProductCount={this.incrementProductCount}
                  decrementProductCount={this.decrementProductCount}
                />
                <Outlet />
              </div>
            }
          >
            <Route
              index
              element={
                <Category state={this.state} addToCart={this.addToCart} />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  state={this.state}
                  addToCart={this.addToCart}
                  incrementProductCount={this.incrementProductCount}
                  decrementProductCount={this.decrementProductCount}
                  updateSelectedAttribute={this.updateSelectedAttribute}
                />
              }
            />
            <Route
              path="/:category/:id"
              element={
                <ProductPage state={this.state} addToCart={this.addToCart} />
              }
            />
          </Route>
        </Routes>
      </div>
    );
  }
}
