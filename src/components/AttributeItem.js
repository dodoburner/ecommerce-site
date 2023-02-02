import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateSelectedAttribute } from "../redux/productPDPSlice";

class AttributeItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { updateSelectedAttribute, attribute, item } = this.props;
    if (e.target.matches(".product-page *")) {
      updateSelectedAttribute({ attribute, item });
    }
    return false;
  }

  render() {
    const { attribute, item } = this.props;
    const selectedAttr = attribute.selected;
    const isSelected =
      selectedAttr && selectedAttr.displayValue === item.displayValue;

    return attribute.type === "text" ? (
      <div
        className={`item-text ${isSelected ? "item-text-selected" : ""}`}
        onClick={this.handleClick}
      >
        <p>{item.displayValue}</p>
      </div>
    ) : (
      <div
        className={`item-swatch ${isSelected ? "item-swatch-selected" : ""}`}
        style={{ background: item.value }}
        onClick={this.handleClick}
      />
    );
  }
}

AttributeItem.propTypes = {
  updateSelectedAttribute: PropTypes.func,
  attribute: PropTypes.object,
  item: PropTypes.object,
};

const mapDispatchToProps = {
  updateSelectedAttribute,
};

export default connect(null, mapDispatchToProps)(AttributeItem);
