import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductPLP from "../components/ProductPLP";
import { getCategory } from "../data";
import { client } from "..";
import withRouter from "../hoc/withRouter";
import ErrorPage from "./ErrorPage";
import { CATEGORIES } from "../data";

class Category extends Component {
  constructor() {
    super();
    this.state = {
      category: null,
      status: "idle",
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = async () => {
    const response = await client.query({
      query: getCategory,
      variables: { title: this.props.params.categoryId },
    });

    const { category } = response.data;
    if (category) {
      this.setState({ category, status: "succeeded" });
    } else {
      this.setState({ status: "failed" });
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    const { categoryId } = this.props.params;
    const { category, status } = this.state;
    if (
      (category && categoryId !== category.name) ||
      (CATEGORIES.includes(categoryId) && status === "failed")
    ) {
      this.fetchData();
    }
  }

  render() {
    const { category, status } = this.state;

    if (status === "failed") {
      return <ErrorPage />;
    } else if (status === "succeeded") {
      return (
        <div className="category-container">
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
        </div>
      );
    }
  }
}

Category.propTypes = {
  params: PropTypes.shape({
    categoryId: PropTypes.string,
  }),
};

export default withRouter(Category);
