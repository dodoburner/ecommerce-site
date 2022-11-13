import React, { Component } from "react";
import PropTypes from "prop-types";

export default class AddRemoveItemBtns extends Component {
  render() {
    const { incrementProductCount, decrementProductCount, product } =
      this.props.state;

    return (
      <div className="product-amount">
        <button onClick={() => incrementProductCount(product.cartId)}>+</button>
        <p>{product.count}</p>
        <button onClick={() => decrementProductCount(product.cartId)}>-</button>
      </div>
    );
  }
}

AddRemoveItemBtns.propTypes = {
  state: PropTypes.shape({
    incrementProductCount: PropTypes.func,
    decrementProductCount: PropTypes.func,
    product: PropTypes.object,
  }),
};
