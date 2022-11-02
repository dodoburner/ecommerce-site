import { Component } from "react";

class Product extends Component {
  render() {
    const { product } = this.props

    return (
      <div className="product">
        <img src={product.gallery[0]} alt="product" />
        <p>{product.name}</p>
        <p>
          {product.prices[0].currency.symbol}
          {product.prices[0].amount}
        </p>
      </div>
    );
  }
}

export default Product
