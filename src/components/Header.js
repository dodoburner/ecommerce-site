import { Component } from "react";
import logo from "../assets/a-logo.png";
import iconDown from "../assets/icon-down.png";
import emptyCart from "../assets/empty-cart.png";
class Header extends Component {
  render() {
    return (
      <header>
        <ul>
          {this.props.categories.map((category) => (
            <li key={category.name}>{category.name}</li>
          ))}
        </ul>

        <img className="logo" src={logo} alt="store logo" />

        <div className="currency-cart-container">
					<button className="currency-changer">
						$
						<img src={iconDown} alt="icon-down" />
					</button>

					<button>
						<img src={emptyCart} />
					</button>
        </div>
      </header>
    );
  }
}

export default Header;
