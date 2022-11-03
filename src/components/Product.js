import { Component } from "react";
import emptyCart from "../assets/empty-cart-white.png";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
    };
  }

  handleMouseOver = () => {
    this.setState({ isHovering: true });
  };

  handleMouseOut = () => {
    this.setState({ isHovering: false });
  };

  render() {
    const { product, currentCurrency } = this.props;
    const { isHovering } = this.state;
    const price = product.prices.find((el) => el.currency.symbol === currentCurrency);

    return (
      <div
        className="product"
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <img className="product-img" src={product.gallery[0]} alt="product" />
        <p className="product-name">{product.name}</p>
        <p className="product-price">
          {price.currency.symbol}
          {price.amount}
        </p>
        {isHovering && (
          <div className="product-cart">
            <img src={emptyCart} alt="empty cart" />
          </div>
        )}
      </div>
    );
  }
}

export default Product;
