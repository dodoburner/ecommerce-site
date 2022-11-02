import { Component } from "react";
import Product from "./Product";

class Category extends Component {
  render() {
    const { category } = this.props

    return (
      <div className="category-container">
        {category && (
          <>
            <h1 className="category-name">{category.name}</h1>
            <div className="products-grid">
              {category.products.map((product) => (
                <Product product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Category;
