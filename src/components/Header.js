import { Component } from "react";
import HeaderCart from "./HeaderCart";
import logo from "../assets/a-logo.png";
import iconDown from "../assets/icon-down.png";
import iconUp from "../assets/icon-up.png";
import emptyCart from "../assets/empty-cart.png";
import { Link } from "react-router-dom";
class Header extends Component {
  constructor(props) {
    super(props);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
    this.handleOpenCurrencyDropdown =
      this.handleOpenCurrencyDropdown.bind(this);
    this.handleOpenCart = this.handleOpenCart.bind(this);
    this.state = {
      currencyDropdownOpen: false,
      cartOpen: false,
    };
  }

  handleOpenCurrencyDropdown() {
    this.setState({ currencyDropdownOpen: !this.state.currencyDropdownOpen });
  }

  handleOpenCart() {
    this.setState({ cartOpen: !this.state.cartOpen });
  }

  handleCategoryClick(value) {
    this.props.updateCurrentCategory(value);
  }

  handleCurrencyClick(value) {
    this.props.updateCurrentCurrency(value);
  }

  renderCurrencies() {
    const { currentCategory } = this.props.state;
    return currentCategory.products[0].prices.map((price) => {
      const { symbol, label } = price.currency;
      return (
        <li onClick={() => this.handleCurrencyClick(symbol)} key={symbol}>
          {symbol} {label}
        </li>
      );
    });
  }

  render() {
    const { categories, currentCategory, currentCurrency, cartCount } =
      this.props.state;
    const {
      incrementProductCount,
      decrementProductCount,
    } = this.props;
    const { currencyDropdownOpen } = this.state;

    return (
      <header>
        <ul className="category-list">
          {categories.map((category) => {
            const headerActive = currentCategory.name === category.name;
            return (
              <li
                className={headerActive ? "header-active" : ""}
                key={category.name}
                onClick={() => this.handleCategoryClick(category)}
              >
                <Link to="/"> {category.name}</Link>
                {headerActive ? (
                  <div className="header-active-line"></div>
                ) : null}
              </li>
            );
          })}
        </ul>

        <Link to="/">
          <img className="logo" src={logo} alt="store logo" />
        </Link>

        <div className="currency-cart-container">
          <div
            className="currency-changer"
            onClick={this.handleOpenCurrencyDropdown}
          >
            {currentCurrency}
            <img
              src={currencyDropdownOpen ? iconUp : iconDown}
              alt="icon-down"
            />
            <ul className="currency-dropdown">
              {"products" in currentCategory &&
                currencyDropdownOpen &&
                this.renderCurrencies()}
            </ul>
          </div>

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
