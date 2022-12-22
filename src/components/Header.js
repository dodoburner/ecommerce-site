import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../assets/a-logo.png";
import HeaderCart from "./HeaderCart";
import emptyCart from "../assets/empty-cart.png";
import CurrencyMenu from "./CurrencyMenu";
import Nav from "./Nav";
import { connect } from "react-redux";

class Header extends Component {
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
    const { cartCount } = this.props;

    return (
      <header>
        <Nav />

        <Link to="/category/all">
          <img className="logo" src={logo} alt="store logo" />
        </Link>

        <div className="currency-cart-container">
          <CurrencyMenu />

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
              <HeaderCart handleOpenCart={this.handleOpenCart} />
            </div>
          )}
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  cartCount: PropTypes.number,
};

const mapStateToProps = (state) => ({
  cartCount: state.cart.count,
});

export default connect(mapStateToProps, null)(Header);
