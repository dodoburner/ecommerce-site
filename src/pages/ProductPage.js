import { Component } from "react";
import { client } from "..";
import CartItem from "../components/CartItem";
import withRouter from "../hoc/withRouter";
import { getProduct } from "../getData";
class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.updateSelectedAttribute = this.updateSelectedAttribute.bind(this);
    this.state = {
      product: null,
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
      this.setState({ product: { ...product, attributes, count: 1 } });
    };

    fetchProduct();
  }

  updateSelectedAttribute(product, attribute, item) {
    const attr = product.attributes.find(
      (attr) => attr.name === attribute.name
    );
    attr.selected = item;
    this.setState({ product });
  }

  render() {
    const { product } = this.state;
    const { currentCurrency } = this.props.state;
    const price = product
      ? product.prices.find((el) => el.currency.symbol === currentCurrency)
      : null;
    const { addToCart } = this.props;
    const updateSelectedAttribute = this.updateSelectedAttribute;

    return (
      <div className="product-page">
        {product ? (
          <div className="cart-item-large">
            <img
              className="product-page-img"
              src={product.gallery[0]}
              alt={product.name}
            />

            <div>
              <CartItem
                state={{
                  ...this.props.state,
                  product,
                  isLarge: true,
                  updateSelectedAttribute,
                }}
              />

              <p className="product-page-price">PRICE:</p>
              <p className="cart-item-price">
                {currentCurrency}
                {price.amount}
              </p>

              <button
                onClick={() => addToCart(product)}
                className="add-to-cart-btn"
              >
                ADD TO CART
              </button>

              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(ProductPage);
