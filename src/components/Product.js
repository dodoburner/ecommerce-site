import { Component } from "react";
import { Link } from "react-router-dom";
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

  handleClick = (product) => {
    this.props.addToCart(product);
  };

  render() {
    const { product, currentCurrency } = this.props;
    const { isHovering } = this.state;
    const price = product.prices.find(
      (el) => el.currency.symbol === currentCurrency
    );

    return (
      <div
        className="product"
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {!product.inStock && <div className="out-of-stock">OUT OF STOCK</div>}
        <Link
          to={`${product.category}/${product.id}`}
        >
          <img className="product-img" src={product.gallery[0]} alt="product" />
          <p className="product-name">{product.name}</p>
          <p className="product-price">
            {price.currency.symbol}
            {price.amount}
          </p>
        </Link>

        {isHovering && product.inStock && (
          <div
            className="product-cart"
            onClick={() => this.handleClick(product)}
          >
            <img src={emptyCart} alt="empty cart" />
          </div>
        )}
      </div>
    );
  }
}

export default Product;
