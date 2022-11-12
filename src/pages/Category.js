import { Component } from "react";
import ProductPLP from "../components/ProductPLP";
class Category extends Component {
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

export default Category;
