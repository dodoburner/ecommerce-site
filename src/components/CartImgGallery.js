import { Component } from "react";
import iconLeft from "../assets/icon-left.png";
import iconRight from "../assets/icon-right.png";

export default class CartImgGallery extends Component {
  constructor(props) {
    super(props);
    this.updateImgIndex = this.updateImgIndex.bind(this);
    this.state = {
      imgIndex: 0,
    };
  }

  updateImgIndex(operation) {
    const { product } = this.props;
    const galleryLength = product.gallery.length - 1;
    const { imgIndex } = this.state;

    if (operation === "decrement" && imgIndex > 0) {
      this.setState((prevState) => ({ imgIndex: prevState.imgIndex - 1 }));
    } else if (operation === "increment" && imgIndex < galleryLength) {
      this.setState((prevState) => ({ imgIndex: prevState.imgIndex + 1 }));
    }
  }

  render() {
    const { product } = this.props;
    const { imgIndex } = this.state;
    return (
      <div className="img-container">
        <div
          className="left-sign"
          onClick={() => this.updateImgIndex("decrement")}
        >
          <img src={iconLeft} alt="previous" />
        </div>
        <img
          className="product-img"
          src={product.gallery[imgIndex]}
          alt={product.name}
        />
        <div
          className="right-sign"
          onClick={() => this.updateImgIndex("increment")}
        >
          <img src={iconRight} alt="next" />
        </div>
      </div>
    );
  }
}
