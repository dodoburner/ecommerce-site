import { Component } from "react";

export default class AttributeItem extends Component {
  render() {
    const { isLarge, updateSelectedAttribute, product, attribute, item } = this.props.state
    const selectedAttr = attribute.selected;
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
  }
}