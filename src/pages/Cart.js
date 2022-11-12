import { Component } from "react";
import AddRemoveItemBtns from "../components/AddRemoveItemBtns";
import CartImgGallery from "../components/CartImgGallery";
import CartItem from "../components/CartItem";
import countTotal from "../utils/countTotal";
class Cart extends Component {
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
    const { cart, currentCurrency, cartCount } = this.props.state;
    const {
      incrementProductCount,
      decrementProductCount,
      updateSelectedAttribute,
    } = this.props;
    const tax = (this.state.total / 21).toFixed(2);

    return (
      <div className="cart-page">
        <h1>CART</h1>

        {cart.map((product, index) => {
          return (
            <div className="cart-item-large" key={index}>
              <CartItem
                state={{
                  ...this.props.state,
                  product,
                  updateSelectedAttribute,
                  isLarge: true,
                }}
              />
              <AddRemoveItemBtns
                state={{
                  product,
                  incrementProductCount,
                  decrementProductCount,
                }}
              />
              <CartImgGallery product={product} />
            </div>
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
