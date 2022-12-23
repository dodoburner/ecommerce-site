import React, { Component } from "react";
import PropTypes from "prop-types";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Category from "./pages/Category";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import { connect } from "react-redux";
import ErrorPage from "./pages/ErrorPage";
class App extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.cartItems !== this.props.cartItems) {
      localStorage.setItem("cartItems", JSON.stringify(this.props.cartItems));
      localStorage.setItem("cartCount", this.props.cartCount);
    }
    if (prevProps.currentCurrency !== this.props.currentCurrency) {
      localStorage.setItem(
        "currentCurrency",
        JSON.stringify(this.props.currentCurrency)
      );
    }
  }

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
          <Route path="/" element={<Navigate to="category/all" />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    );
  }
}

App.propTypes = {
  cartItems: PropTypes.array,
  currentCurrency: PropTypes.string,
  cartCount: PropTypes.number,
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
  cartCount: state.cart.count,
  currentCurrency: state.cart.currentCurrency,
});

export default connect(mapStateToProps, null)(App);
