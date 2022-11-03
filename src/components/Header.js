import { Component } from "react";
import logo from "../assets/a-logo.png";
import iconDown from "../assets/icon-down.png";
import emptyCart from "../assets/empty-cart.png";
class Header extends Component {
  constructor(props) {
    super(props);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
  }

  handleCategoryClick(value) {
    this.props.updateCurrentCategory(value);
  }

  handleCurrencyClick(value) {
    this.props.updateCurrentCurrency(value);
  }

  renderCurrencies() {
    return this.props.currentCategory.products[0].prices.map((price) => {
      const { symbol, label } = price.currency;
      return (
        <li onClick={() => this.handleCurrencyClick(label)}>
          {symbol} {label}
        </li>
      );
    });
  }

  render() {
    const { categories, currentCategory } = this.props;

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
          <button className="currency-changer">
            $
            <img src={iconDown} alt="icon-down" />
            <ul className="currency-dropdown">
              {"products" in currentCategory && this.renderCurrencies()}
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
