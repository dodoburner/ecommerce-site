import React, { Component } from "react";
import PropTypes from "prop-types";
import AttributeItem from "./AttributeItem";
import { connect } from "react-redux";
class Product extends Component {
  constructor(props) {
    super(props);
    this.getAttributeItems = this.getAttributeItems.bind(this);
  }

  getAttributeItems(attribute) {
    const { product, updateSelectedAttribute, isOnProductPage } = this.props;
    let items = attribute.items.map((item) => {
      return (
        <AttributeItem
          key={item.displayValue}
          product={product}
          item={item}
          attribute={attribute}
          updateSelectedAttribute={updateSelectedAttribute}
          isOnProductPage={isOnProductPage}
        />
      );
    });

    return items;
  }

  render() {
    const { product, currentCurrency } = this.props;
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
  product: PropTypes.object,
  currentCurrency: PropTypes.string,
  updateSelectedAttribute: PropTypes.func,
  isOnProductPage: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  currentCurrency: state.cart.currentCurrency,
});

export default connect(mapStateToProps, null)(Product);
