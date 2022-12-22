import React, { Component } from "react";
import PropTypes from "prop-types";
import AddRemoveItemBtns from "../components/AddRemoveItemBtns";
import CartImgGallery from "../components/CartImgGallery";
import Product from "../components/Product";
import countTotal from "../utils/countTotal";
import { connect } from "react-redux";
class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: countTotal(this.props.cartItems, this.props.currentCurrency),
    };
  }

  componentDidUpdate(prevProps) {
    const { cartItems: prevCartItems } = prevProps;
    const { cartItems, currentCurrency } = this.props;
    if (prevCartItems !== cartItems) {
      this.setState({ total: countTotal(cartItems, currentCurrency) });
    }
  }

  render() {
    const { cartItems, currentCurrency, cartCount } = this.props;
    const tax = (this.state.total / 21).toFixed(2);

    return (
      <div className="cart-page">
        <h1>CART</h1>

        {cartItems.map((product, index) => {
          return (
            <div className="product-large" key={index}>
              <Product product={product} />
              <AddRemoveItemBtns product={product} />
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

CartPage.propTypes = {
  cartItems: PropTypes.array,
  currentCurrency: PropTypes.string,
  cartCount: PropTypes.number,
  incrementProductCount: PropTypes.func,
  decrementProductCount: PropTypes.func,
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
  cartCount: state.cart.count,
  currentCurrency: state.cart.currentCurrency,
});

export default connect(mapStateToProps, null)(CartPage);
