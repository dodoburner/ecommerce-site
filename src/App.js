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
}}
`
class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      currentCategory: ""
    }
    this.updateCurrentCategory = this.updateCurrentCategory.bind(this);
  }

  componentDidMount() {
    const fetchData = async () => {
      const response = await client.query({ query: getData })
      const categories = response.data.categories
      this.setState({ categories: categories, currentCategory: categories[0] })
    }
    fetchData()
  }

  updateCurrentCategory(value) {
    this.setState({ currentCategory: value })
  }

  render() {
    const { categories, currentCategory } = this.state
    return (
      <div className="App">
        <Header categories={categories} currentCategory={currentCategory} updateCurrentCategory={this.updateCurrentCategory} />
        <Category category={currentCategory} />
      </div>
    )
  }
}

export default App;
