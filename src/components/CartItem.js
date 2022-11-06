import { Component } from "react";
import iconLeft from "../assets/icon-left.png";
import iconRight from "../assets/icon-right.png";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.getAttributeItems = this.getAttributeItems.bind(this);
    this.updateImgIndex = this.updateImgIndex.bind(this);
    this.renderImg = this.renderImg.bind(this);
    this.state = {
        imgIndex: 0,
    };
  }

  getAttributeItems(product, attribute) {
    const { isLarge, updateSelectedAttribute } = this.props.state;
    const selectedValue = attribute.selected.displayValue;

    let items = attribute.items.map((item) => {
      const isSelected = selectedValue === item.displayValue;
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

  renderImg() {
    const { product } = this.props.state;
    const { imgIndex } = this.state;

    return (
      <div className="img-container">
        <div className="left-sign" onClick={() => this.updateImgIndex('decrement', product)}>
          <img src={iconLeft} alt="previous" />
        </div>
        <img
          className="product-img"
          src={product.gallery[imgIndex]}
          alt={product.name}
        />
        <div className="right-sign" onClick={() => this.updateImgIndex('increment', product)}>
          <img src={iconRight} alt="next" />
        </div>
      </div>
    );
  }

  updateImgIndex(operation, product) {
    const galleryLength = product.gallery.length - 1;
    const { imgIndex } = this.state;

    if (operation === 'decrement' && imgIndex > 0) {
      this.setState((prevState) => ({ imgIndex: prevState.imgIndex - 1}))
    } else if (operation === 'increment' && imgIndex < galleryLength) {
      this.setState((prevState) => ({ imgIndex: prevState.imgIndex + 1}))
    }
  }

  render() {
    const {
      product,
      incrementProductCount,
      decrementProductCount,
      currentCurrency,
      isLarge,
      price,
    } = this.props.state;

    return (
      <div className={isLarge ? "cart-item-large" : "cart-item"}>
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

        <div className="cart-item-amount">
          <button onClick={() => incrementProductCount(product.cartId)}>
            +
          </button>
          <p>{product.count}</p>
          <button onClick={() => decrementProductCount(product.cartId)}>
            -
          </button>
        </div>

        {isLarge ? (
          this.renderImg()
        ) : (
          <img src={product.gallery[0]} alt={product.name} />
        )}
      </div>
    );
  }
}

export default CartItem;
