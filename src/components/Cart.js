import { Component } from "react";
import CartItem from "./CartItem";
class Cart extends Component {
  // Find way to move this from both carts to top level to follow DRY
  constructor(props) {
    super(props);
    this.state = {
      total: this.countTotal(),
    };
  }

  componentDidUpdate(prevProps) {
    const prevCart = prevProps.state;
    const cart = this.props.state;
    if (prevCart !== cart) {
      this.setState({ total: this.countTotal() });
    }
  }

  countTotal() {
    let total = 0;
    const { cart, currentCurrency } = this.props.state;
    cart.forEach((product) => {
      const price = product.prices.find(
        (el) => el.currency.symbol === currentCurrency
      );
      total += price.amount * product.count;
    });
    return total.toFixed(2);
  }

  render() {
    const { cart, currentCurrency, cartCount } = this.props.state;
    const { incrementProductCount, decrementProductCount, updateSelectedAttribute } = this.props;
    const tax = (this.state.total / 21).toFixed(2);

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
                price,
                incrementProductCount,
                decrementProductCount,
                updateSelectedAttribute,
                isLarge: true,
              }}
            />
          );
        })}

        <div className="cart-info">
          <div>
            <p>Tax 21%:</p>
            <p>Quantity:</p>
            <p>Total:</p>
          </div>
          <div className="cart-info-numbers">
            <p>
              {currentCurrency}
              {tax}
            </p>
            <p>{cartCount}</p>
            <p>
              {currentCurrency}
              {this.state.total}
            </p>
          </div>
        </div>

        <button className="check-out-btn">ORDER</button>
      </div>
    );
  }
}

export default Cart;
