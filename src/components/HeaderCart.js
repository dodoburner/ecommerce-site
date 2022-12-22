import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AddRemoveItemBtns from "./AddRemoveItemBtns";
import Product from "./Product";
import countTotal from "../utils/countTotal";
import { connect } from "react-redux";

class HeaderCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: countTotal(this.props.items, this.props.currentCurrency),
    };
  }

  componentDidUpdate(prevProps) {
    const { items: prevItems } = prevProps;
    const { items, currentCurrency } = this.props;
    if (prevItems !== items) {
      this.setState({ total: countTotal(items, currentCurrency) });
    }
  }

  render() {
    const { items, currentCurrency, cartCount, handleOpenCart } = this.props;

    return (
      <div className="cart">
        <p className="cart-title">
          My Bag, <span>{cartCount} items</span>
        </p>

        {items.map((product, index) => {
          return (
            <div className="product" key={index}>
              <Product
                state={{
                  // ...this.props.state,
                  product,
                }}
              />
              <AddRemoveItemBtns
                state={{
                  product,
                  // incrementProductCount,
                  // decrementProductCount,
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

HeaderCart.propTypes = {
  handleOpenCart: PropTypes.func,
  items: PropTypes.array,
  currentCurrency: PropTypes.string,
  cartCount: PropTypes.number,
};

const mapStateToProps = (state) => ({
  items: state.cart.items,
  cartCount: state.cart.count,
  currentCurrency: state.cart.currentCurrency,
});

export default connect(mapStateToProps, null)(HeaderCart);
