import React, { Component } from "react";
import { client } from "..";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProduct } from "../data";
import Product from "../components/Product";
import withRouter from "../hoc/withRouter";
import _ from "lodash";
import parse from "html-react-parser";
import { addToCart } from "../redux/cartReducer";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.updateSelectedAttribute = this.updateSelectedAttribute.bind(this);
    this.updateImg = this.updateImg.bind(this);
    this.state = {
      product: null,
      img: null,
    };
  }

  componentDidMount() {
    const fetchProduct = async () => {
      const { id } = this.props.params;
      const response = await client.query({
        query: getProduct,
        variables: { id },
      });
      const product = response.data.product;
      const attributes = product.attributes.map((attribute) => {
        return { ...attribute, selected: attribute.items[0] };
      });
      this.setState({
        product: { ...product, attributes },
        img: product.gallery[0],
      });
    };

    fetchProduct();
  }

  componentDidUpdate() {
    console.log(this.state.product.attributes[0].selected)
  }

  updateSelectedAttribute(attribute, item) {
    this.setState((prevState) => {
      const { product } = prevState;
      const attr = product.attributes.find(
        (attr) => attr.name === attribute.name
      );
      attr.selected = item;
      return { product };
    });
  }

  updateImg(img) {
    this.setState({ img });
  }

  render() {
    const { product, img } = this.state;
    const { currentCurrency } = this.props;
    const price = product
      ? product.prices.find((el) => el.currency.symbol === currentCurrency)
      : null;
    const { addToCart } = this.props;
    const updateSelectedAttribute = this.updateSelectedAttribute;

    return (
      <div className="product-page">
        {product ? (
          <div className="product-large">
            <div className="product-page-imgs">
              {product.gallery.map((img) => {
                return (
                  <img
                    className="product-page-img-small"
                    src={img}
                    alt={product.name}
                    onClick={() => this.updateImg(img)}
                    key={img}
                  />
                );
              })}
            </div>

            <div className="product-page-img-container">
              {!product.inStock && (
                <div className="out-of-stock">OUT OF STOCK</div>
              )}
              <img className="product-page-img" src={img} alt={product.name} />
            </div>

            <div>
              <Product
                product={product}
                isOnProductPage={true}
                updateSelectedAttribute={updateSelectedAttribute}
              />
              <p className="product-page-price">PRICE:</p>
              <p className="product-price">
                {currentCurrency}
                {price.amount}
              </p>
              {product.inStock ? (
                <button
                  onClick={() => addToCart(_.cloneDeep(product))}
                  className="add-to-cart-btn"
                >
                  ADD TO CART
                </button>
              ) : (
                <button className="add-to-cart-btn out-of-stock-btn">
                  ADD TO CART
                </button>
              )}

              <div className="description"> {parse(product.description)} </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

ProductPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
  currentCurrency: PropTypes.string,
  addToCart: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currentCurrency: state.cart.currentCurrency,
});

const mapDispatchToProps = {
  addToCart,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductPage)
);
