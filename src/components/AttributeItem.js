import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateSelectedAttribute } from "../redux/productPDPReducer";

class AttributeItem extends Component {
  render() {
    const { isOnProductPage, updateSelectedAttribute, attribute, item } =
      this.props;
    const selectedAttr = attribute.selected;
    const isSelected =
      selectedAttr && selectedAttr.displayValue === item.displayValue;

    return attribute.type === "text" ? (
      <div
        className={`item-text ${isSelected ? "item-text-selected" : ""}`}
        onClick={
          isOnProductPage
            ? () => {
                updateSelectedAttribute({attribute, item});
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
                updateSelectedAttribute({attribute, item});
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

const mapStateToProps = (state) => ({
  currentCurrency: state.cart.currentCurrency,
  product: state.productPDP.details,
});

const mapDispatchToProps = {
  updateSelectedAttribute,
};

export default connect(mapStateToProps, mapDispatchToProps)(AttributeItem);
