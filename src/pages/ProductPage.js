import { Component } from "react";
import withRouter from "../hoc/withRouter";
class ProductPage extends Component {
  getProduct() {
    const { categories } = this.props.state;
    const { id } = this.props.params;
    const hasData = categories.length > 0;
    if (hasData) {
      const product = categories[0].products.find((el) => el.id === id)
      return product
    }
  }

  render() {
    const product = this.getProduct() || {};
    return (
      <div className="product-page">

      </div>
    )
  }
}

export default withRouter(ProductPage)