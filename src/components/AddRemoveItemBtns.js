import { Component } from "react";

export default class AddRemoveItemBtns extends Component {
  render() {
    const { incrementProductCount, decrementProductCount, product } = this.props.state;

    return (
      <div className="cart-item-amount">
        <button onClick={() => incrementProductCount(product.cartId)}>+</button>
        <p>{product.count}</p>
        <button onClick={() => decrementProductCount(product.cartId)}>-</button>
      </div>
    );
  }
}
