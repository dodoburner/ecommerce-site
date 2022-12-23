import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductPLP from "../components/ProductPLP";
import { getCategory } from "../data";
import { client } from "..";
import withRouter from "../hoc/withRouter";
class Category extends Component {
  constructor() {
    super();
    this.state = {
      category: null,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = async () => {
    const response = await client.query({
      query: getCategory,
      variables: { title: this.props.params.categoryId },
    });
    const category = response.data.category;
    this.setState({ category });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    if (this.props.params.categoryId !== this.state.category.name) {
      this.fetchData();
    }
  }

  render() {
    const { category } = this.state;

    return (
      <div className="category-container">
        {category && (
          <>
            <h1 className="category-name">{category.name}</h1>
            <div className="products-grid">
              {category.products.map((product) => {
                const attributes = product.attributes.map((attribute) => {
                  return { ...attribute, selected: attribute.items[0] };
                });
                product = { ...product, attributes };

                return <ProductPLP key={product.name} product={product} />;
              })}
            </div>
          </>
        )}
      </div>
    );
  }
}

Category.propTypes = {
  params: PropTypes.shape({
    categoryId: PropTypes.string,
  }),
};

export default withRouter(Category);
