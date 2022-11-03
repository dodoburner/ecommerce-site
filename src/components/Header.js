import { Component } from "react";
import logo from "../assets/a-logo.png";
import iconDown from "../assets/icon-down.png";
import iconUp from "../assets/icon-up.png";
import emptyCart from "../assets/empty-cart.png";
class Header extends Component {
  constructor(props) {
    super(props);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
    this.handleOpenDropdown = this.handleOpenDropdown.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  handleOpenDropdown() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
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
    const { categories, currentCategory, currentCurrency } = this.props.state;
    const { dropdownOpen } = this.state;

    return (
      <header>
        <ul className="category-list">
          {categories.map((category) => {
            return (
              <li
                className={
                  currentCategory.name === category.name ? "header-active" : ""
                }
                key={category.name}
                onClick={() => this.handleCategoryClick(category)}
              >
                {category.name}
              </li>
            );
          })}
        </ul>

        <img className="logo" src={logo} alt="store logo" />

        <div className="currency-cart-container">
          <button
            className="currency-changer"
            onClick={this.handleOpenDropdown}
          >
            {currentCurrency}
            <img src={dropdownOpen ? iconUp : iconDown} alt="icon-down" />
            <ul className="currency-dropdown">
              {"products" in currentCategory &&
                dropdownOpen &&
                this.renderCurrencies()}
            </ul>
          </button>

          <button>
            <img src={emptyCart} alt="empty cart" />
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
