import { Component } from "react";
import AttributeItem from "./AttributeItem";

export default class CartItem extends Component {
  constructor(props) {
    super(props);
    this.getAttributeItems = this.getAttributeItems.bind(this);
  }

  getAttributeItems(attribute) {
    const { product } = this.props.state;
    let items = attribute.items.map((item) => {
      return (
        <AttributeItem
          key={item.displayValue}
          state={{ ...this.props.state, product, item, attribute }}
        />
      );
    });

    return items;
  }

  render() {
    const { product, currentCurrency } = this.props.state;
    const price = product.prices.find(
      (el) => el.currency.symbol === currentCurrency
    );

    return (
      <>
        <div className="cart-item-info">
          <p className="cart-item-brand">{product.brand}</p>
          <p className="cart-item-name">{product.name}</p>
          <p className="cart-item-price">
            {currentCurrency}
            {price.amount}
          </p>

          <div className="cart-item-attributes-container">
            {product.attributes.map((attribute) => {
              const items = this.getAttributeItems(attribute);

              return (
                <div key={attribute.name} className="cart-item-attribute">
                  <p className="cart-item-attribute-name">{attribute.name}:</p>
                  <div className="cart-item-attribute-items">{items}</div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
