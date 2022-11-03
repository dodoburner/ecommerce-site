import { Component } from "react";
import Product from "./Product";

class Category extends Component {
  render() {
    const { currentCategory: category, currentCurrency } = this.props.state

    return (
      <div className="category-container">
        {"products" in category && (
          <>
            <h1 className="category-name">{category.name}</h1>
            <div className="products-grid">
              {category.products.map((product) => (
                <Product key={product.name} product={product} currentCurrency={currentCurrency} />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Category;
