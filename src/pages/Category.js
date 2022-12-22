import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductPLP from "../components/ProductPLP";
import { getCategory } from "../data";
import { client } from "..";
import withRouter from "../hoc/withRouter";
import { connect } from "react-redux";
class Category extends Component {
  constructor() {
    super();
    this.state = {
      category: {},
      currentCurrency: "$",
    };
  }

  componentDidMount() {
    const fetchData = async () => {
      const response = await client.query({
        query: getCategory,
        variables: { title: this.props.params.category },
      });
      const category = response.data.category;
      this.setState({ category });
    };
    fetchData();
  }

  render() {
    const { category, currentCurrency } = this.state;
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
  params: PropTypes.shape({
    category: PropTypes.string,
  }),
  addToCart: PropTypes.func,
};

export default withRouter(connect(null, null)(Category));
