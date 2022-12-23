import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  incrementProductCount,
  decrementProductCount,
} from "../redux/cartSlice";

class AddRemoveItemBtns extends Component {
  render() {
    const { incrementProductCount, decrementProductCount, product } =
      this.props;

    return (
      <div className="product-amount">
        <button
          onClick={() => incrementProductCount({ cartId: product.cartId })}
        >
          +
        </button>
        <p>{product.count}</p>
        <button
          onClick={() => decrementProductCount({ cartId: product.cartId })}
        >
          -
        </button>
      </div>
    );
  }
}

AddRemoveItemBtns.propTypes = {
  incrementProductCount: PropTypes.func,
  decrementProductCount: PropTypes.func,
  product: PropTypes.object,
};

const mapDispatchToProps = {
  incrementProductCount,
  decrementProductCount,
};

export default connect(null, mapDispatchToProps)(AddRemoveItemBtns);
