import { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/cart.css";
import AddRemoveItemBtns from "./AddRemoveItemBtns";
import CartItem from "./CartItem";

class HeaderCart extends Component {
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
    const { cart, currentCurrency, cartCount} = this.props.state;
    const {
      handleOpenCart,
      incrementProductCount,
      decrementProductCount,
    } = this.props;

    return (
      <div className="cart">
        <p className="cart-title">
          My Bag, <span>{cartCount} items</span>
        </p>

        {cart.map((product, index) => {
          return (
            <div className="cart-item" key={index}>
              <CartItem
                state={{
                  ...this.props.state,
                  product,
                }}
              />
              <AddRemoveItemBtns
                state={{
                  product,
                  incrementProductCount,
                  decrementProductCount,
                }}
              />
              <img src={product.gallery[0]} alt={product.name} />
            </div>
          );
        })}

        <p className="cart-total">
          Total{" "}
          <span>
            {currentCurrency}
            {this.state.total}
          </span>
        </p>

        <div className="cart-buttons">
          <Link to="/cart" onClick={handleOpenCart}>
            <button className="view-bag-btn">VIEW BAG</button>
          </Link>
          <button className="check-out-btn">CHECK OUT</button>
        </div>
      </div>
    );
  }
}

export default HeaderCart;
