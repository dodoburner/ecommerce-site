import { Component } from "react";

export default class CartItem extends Component {
  constructor(props) {
    super(props);
    this.getAttributeItems = this.getAttributeItems.bind(this);
  }

  getAttributeItems(product, attribute) {
    const { isLarge, updateSelectedAttribute } = this.props.state;
    const selectedAttr = attribute.selected;

    let items = attribute.items.map((item) => {
      const isSelected =
        selectedAttr && selectedAttr.displayValue === item.displayValue;
      return attribute.type === "text" ? (
        <div
          className={`item-text ${isSelected ? "item-text-selected" : ""}`}
          onClick={
            isLarge
              ? () => {
                  updateSelectedAttribute(product, attribute, item);
                }
              : null
          }
        >
          <p>{item.displayValue}</p>
        </div>
      ) : (
        <div
          className={`item-swatch ${isSelected ? "item-swatch-selected" : ""}`}
          onClick={
            isLarge
              ? () => {
                  updateSelectedAttribute(product, attribute, item);
                }
              : null
          }
        >
          <div style={{ background: item.value }}></div>
        </div>
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
              const items = this.getAttributeItems(product, attribute);

              return (
                <div className="cart-item-attribute">
                  <p className="cart-item-attribute-name">{attribute.name}</p>
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
