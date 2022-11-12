import { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/cart.css";
import AddRemoveItemBtns from "./AddRemoveItemBtns";
import CartItem from "./CartItem";
import countTotal from "../utils/countTotal";

class HeaderCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: countTotal(
        this.props.state.cart,
        this.props.state.currentCurrency
      ),
    };
  }

  componentDidUpdate(prevProps) {
    const { cart: prevCart } = prevProps.state;
    const { cart, currentCurrency } = this.props.state;
    if (prevCart !== cart) {
      this.setState({ total: countTotal(cart, currentCurrency) });
    }
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
