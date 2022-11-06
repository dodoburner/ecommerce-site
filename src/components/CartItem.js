import { Component } from "react";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.getAttributeItems = this.getAttributeItems.bind(this);
  }

  getAttributeItems(attribute) {
    const selectedValue = attribute.selected.displayValue;
    let items = attribute.items.map((item) => {
      const isSelected = selectedValue === item.displayValue;
      return attribute.type === "text" ? (
        <div className={`item-text ${isSelected ? "item-text-selected" : ""}`}>
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
    const {
      product,
      index,
      incrementProductCount,
      decrementProductCount,
      currentCurrency,
      isLarge,
      price,
    } = this.props.state;

    return (
      <div className={isLarge ? 'cart-item-large' : 'cart-item'}>
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
                <div className="cart-item-attribute">
                  <p className="cart-item-attribute-name">{attribute.name}</p>
                  <div className="cart-item-attribute-items">{items}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="cart-item-amount">
          <button onClick={() => incrementProductCount(index)}>+</button>
          <p>{product.count}</p>
          <button onClick={() => decrementProductCount(index)}>-</button>
        </div>

        <img src={product.gallery[0]} alt={product.name} />
      </div>
    );
  }
}

export default CartItem
