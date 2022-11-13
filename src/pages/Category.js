import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductPLP from "../components/ProductPLP";
export default class Category extends Component {
  render() {
    const { currentCategory: category, currentCurrency } = this.props.state;
    const { addToCart } = this.props;

    return (
      <div className="category-container">
        {"products" in category && (
          <>
            <h1 className="category-name">{category.name}</h1>
            <div className="products-grid">
              {category.products.map((product) => {
                const attributes = product.attributes.map((attribute) => {
                  return { ...attribute, selected: attribute.items[0] };
                });
                product = { ...product, attributes };

                return (
                  <ProductPLP
                    key={product.name}
                    product={product}
                    currentCurrency={currentCurrency}
                    addToCart={addToCart}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }
}

Category.propTypes = {
  state: PropTypes.shape({
    currentCategory: PropTypes.object,
    currentCurrency: PropTypes.string,
  }),
  addToCart: PropTypes.func,
};
