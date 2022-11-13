import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../assets/a-logo.png";
import HeaderCart from "./HeaderCart";
import emptyCart from "../assets/empty-cart.png";
import Nav from "./Nav";
import CurrencyMenu from "./CurrencyMenu";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.handleOpenCart = this.handleOpenCart.bind(this);
    this.state = {
      cartOpen: false,
    };
  }

  componentDidUpdate() {
    if (this.state.cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }

  handleOpenCart() {
    this.setState({ cartOpen: !this.state.cartOpen });
  }

  render() {
    const { categories, currentCategory, currentCurrency, cartCount } =
      this.props.state;
    const {
      incrementProductCount,
      decrementProductCount,
      updateCurrentCategory,
      updateCurrentCurrency,
    } = this.props;

    return (
      <header>
        <Nav
          state={{ categories, currentCategory }}
          updateCurrentCategory={updateCurrentCategory}
        />

        <Link to="/">
          <img className="logo" src={logo} alt="store logo" />
        </Link>

        <div className="currency-cart-container">
          <CurrencyMenu
            state={{ currentCurrency, currentCategory }}
            updateCurrentCurrency={updateCurrentCurrency}
          />

          <div className="cart-img-container" onClick={this.handleOpenCart}>
            <img className="cart-img" src={emptyCart} alt="cart" />
            {cartCount > 0 ? (
              <div className="cart-count">{cartCount}</div>
            ) : null}
          </div>

          {this.state.cartOpen && (
            <div
              className="cart-container"
              onClick={(e) => {
                if (e.target !== e.currentTarget) return;
                this.handleOpenCart();
              }}
            >
              <HeaderCart
                state={this.props.state}
                incrementProductCount={incrementProductCount}
                decrementProductCount={decrementProductCount}
                handleOpenCart={this.handleOpenCart}
              />
            </div>
          )}
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  state: PropTypes.shape({
    categories: PropTypes.array,
    currentCategory: PropTypes.object,
    currentCurrency: PropTypes.string,
    cartCount: PropTypes.number,
  }),
  incrementProductCount: PropTypes.func,
  decrementProductCount: PropTypes.func,
  updateCurrentCategory: PropTypes.func,
  updateCurrentCurrency: PropTypes.func,
};
