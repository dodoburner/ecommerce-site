import React, { Component } from "react";
import PropTypes from "prop-types";
import AttributeItem from "./AttributeItem";

export default class Product extends Component {
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
        <div className="product-info">
          <p className="product-brand">{product.brand}</p>
          <p className="product-name">{product.name}</p>
          <p className="product-price">
            {currentCurrency}
            {price.amount}
          </p>

          <div className="product-attributes-container">
            {product.attributes.map((attribute) => {
              const items = this.getAttributeItems(attribute);

              return (
                <div key={attribute.name} className="product-attribute">
                  <p className="product-attribute-name">{attribute.name}:</p>
                  <div className="product-attribute-items">{items}</div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

Product.propTypes = {
  state: PropTypes.shape({
    product: PropTypes.object,
    currentCurrency: PropTypes.string,
  }),
};
