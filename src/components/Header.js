import { Component } from "react";
import HeaderCart from "./HeaderCart";
import logo from "../assets/a-logo.png";
import emptyCart from "../assets/empty-cart.png";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import CurrencyMenu from "./CurrencyMenu";
class Header extends Component {
  constructor(props) {
    super(props);
    this.handleOpenCart = this.handleOpenCart.bind(this);
    this.state = {
      cartOpen: false,
    };
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

export default Header;
