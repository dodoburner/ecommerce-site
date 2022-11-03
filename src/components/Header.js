import { Component } from "react";
import logo from "../assets/a-logo.png";
import iconDown from "../assets/icon-down.png";
import emptyCart from "../assets/empty-cart.png";
class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(value) {
    this.props.updateCurrentCategory(value)
  }

  render() {
    const { categories, currentCategory } = this.props;

    return (
      <header>
        <ul>
          {categories.map((category) => {
            return (
              <li
                className={
                  currentCategory.name === category.name ? "header-active" : ""
                }
                key={category.name}
                onClick={() => this.handleClick(category)}
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
