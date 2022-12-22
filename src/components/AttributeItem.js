import React, { Component } from "react";
import PropTypes from "prop-types";

export default class AttributeItem extends Component {
  render() {
    const {
      isOnProductPage,
      updateSelectedAttribute,
      product,
      attribute,
      item,
    } = this.props;
    const selectedAttr = attribute.selected;
    const isSelected =
      selectedAttr && selectedAttr.displayValue === item.displayValue;

    return attribute.type === "text" ? (
      <div
        className={`item-text ${isSelected ? "item-text-selected" : ""}`}
        onClick={
          isOnProductPage
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
          isOnProductPage
            ? () => {
                updateSelectedAttribute(product, attribute, item);
              }
            : null
        }
      >
        <div style={{ background: item.value }}></div>
      </div>
    );
  }
}

AttributeItem.propTypes = {
  isOnProductPage: PropTypes.bool,
  updateSelectedAttribute: PropTypes.func,
  product: PropTypes.object,
  attribute: PropTypes.object,
  item: PropTypes.object,
};
