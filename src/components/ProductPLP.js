import { Component } from "react";
import { Link } from "react-router-dom";
import emptyCart from "../assets/empty-cart-white.png";
class ProductPLP extends Component {
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
        className="plp-product"
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <Link to={`${product.category}/${product.id}`}>
          {!product.inStock && <div className="out-of-stock">OUT OF STOCK</div>}

          <img
            className="plp-product-img"
            src={product.gallery[0]}
            alt="product"
          />
          <p className="plp-product-name">{product.name}</p>
          <p className="plp-product-price">
            {price.currency.symbol}
            {price.amount}
          </p>
        </Link>

        {isHovering && product.inStock && (
          <div
            className="plp-product-cart"
            onClick={() => this.handleClick(product)}
          >
            <img src={emptyCart} alt="empty cart" />
          </div>
        )}
      </div>
    );
  }
}

export default ProductPLP;
