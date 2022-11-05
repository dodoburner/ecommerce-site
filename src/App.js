import { Component } from "react";
import { client } from ".";
import { gql } from "@apollo/client";
import Header from "./components/Header";
import Category from "./components/Category";

const getData = gql`
  {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;
class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      currentCategory: {},
      currentCurrency: "$",
      cart: [],
    };
    this.updateCurrentCategory = this.updateCurrentCategory.bind(this);
    this.updateCurrentCurrency = this.updateCurrentCurrency.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    const fetchData = async () => {
      const response = await client.query({ query: getData });
      const categories = response.data.categories;
      this.setState({ categories: categories, currentCategory: categories[0] });
    };
    fetchData();
  }

  updateCurrentCategory(value) {
    this.setState({ currentCategory: value });
  }

  updateCurrentCurrency(value) {
    this.setState({ currentCurrency: value });
  }

  addToCart(product) {
    this.setState((prevState) => ({
      cart: [...prevState.cart, product],
    }));
  }

  render() {
    return (
      <div className="App">
        <Header
          state={this.state}
          updateCurrentCategory={this.updateCurrentCategory}
          updateCurrentCurrency={this.updateCurrentCurrency}
        />
        <Category state={this.state} addToCart={this.addToCart} />
      </div>
    );
  }
}

export default App;
