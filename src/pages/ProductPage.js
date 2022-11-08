import { Component } from "react";
import CartItem from "../components/CartItem";
import withRouter from "../hoc/withRouter";
class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.getProduct = this.getProduct.bind(this);
  }

  getProduct() {
    const { categories } = this.props.state;
    const { id } = this.props.params;
    const hasData = categories.length > 0;
    if (hasData) {
      const product = categories[0].products.find((el) => el.id === id);
      return product;
    }
  }

  render() {
    const product = this.getProduct();
    
    return (
      <div className="product-page">
        {product ? (
          <div className="cart-item-large">
            <img src={product.gallery[0]} alt={product.name} />
            <CartItem state={{...this.props.state, product: product}} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(ProductPage);
