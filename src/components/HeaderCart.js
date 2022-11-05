import { Component } from "react";
import "../styles/headerCart.css";

class HeaderCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: this.countTotal(),
    };
    this.getAttributeItems = this.getAttributeItems.bind(this);
  }

  countTotal() {
    let total = 0;
    const { cart, currentCurrency } = this.props.state;
    cart.forEach((product) => {
      const price = product.prices.find(
        (el) => el.currency.symbol === currentCurrency
      );
      total += price.amount;
    });
    return total.toFixed(2);
  }

  getAttributeItems(attribute) {
    const selectedValue = attribute.selected.displayValue;
    let items = attribute.items.map((item) => {
      const isSelected = selectedValue === item.displayValue;
      return attribute.type === "text" ? (
        <div
          className={`item-text ${isSelected ? "item-text-selected" : ""}`}
        >
          <p>{item.displayValue}</p>
        </div>
      ) : (
        <div
          className={`item-swatch ${isSelected ? "item-swatch-selected" : ""}`}
        >
          <div style={{ background: item.value }}></div>
        </div>
      );
    });

    return items;
  }

  render() {
    const { cart, currentCurrency } = this.props.state;

    return (
      <div className="cart">
        <p className="cart-title">
          My Bag, <span>{cart.length} items</span>
        </p>

        {cart.map((product) => {
          const price = product.prices.find(
            (el) => el.currency.symbol === currentCurrency
          );

          return (
            <div className="cart-item">
              <div className="cart-item-info">
                <p className="cart-item-name">{product.name}</p>
                <p className="cart-item-price">
                  {currentCurrency}
                  {price.amount}
                </p>

                <div className="cart-item-attributes-container">
                  {product.attributes.map((attribute) => {
                    const items = this.getAttributeItems(attribute);

                    return (
                      <div className="cart-item-attribute">
                        <p className="cart-item-attribute-name">
                          {attribute.name}
                        </p>
                        <div className="cart-item-attribute-items">{items}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="cart-item-amount">
                <button>+</button>
                <p>0</p>
                <button>-</button>
              </div>

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
          <button className="view-bag-btn">VIEW BAG</button>
          <button className="check-out-btn">CHECK OUT</button>
        </div>
      </div>
    );
  }
}

export default HeaderCart;
