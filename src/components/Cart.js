import { Component } from "react";
import CartItem from "./CartItem";
class Cart extends Component {
  render() {
    const { cart, currentCurrency } = this.props.state;
    const { incrementProductCount, decrementProductCount } = this.props;

    return (
      <div className="cart-page">
        <h1>CART</h1>

        {cart.map((product, index) => {
          const price = product.prices.find(
            (el) => el.currency.symbol === currentCurrency
          );

          return (
            <CartItem
              state={{
                ...this.props.state,
                product,
                index,
                price,
                incrementProductCount,
                decrementProductCount,
                isLarge: true,
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default Cart;
