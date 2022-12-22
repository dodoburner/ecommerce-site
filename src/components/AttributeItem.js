import React, { Component } from "react";
import PropTypes from "prop-types";

export default class AttributeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttr: this.props.attribute.selected,
    };
  }

  componentDidMount() {
    console.log(this.state.selectedAttr);
  }

  componentDidUpdate() {
    console.log(this.state.selectedAttr);
  }
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
                updateSelectedAttribute(attribute, item);
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
                updateSelectedAttribute(attribute, item);
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
