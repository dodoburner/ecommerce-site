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
      categories: []
    }
  }

  componentDidMount() {
    const fetchData = async () => {
      const response = await client.query({ query: getData })
      this.setState({ categories: response.data.categories })
    }
    fetchData()
  }

  render() {
    return (
      <div className="App">
        <Header categories={this.state.categories} />
        <Category category={this.state.categories[0]} />
      </div>
    )
  }
}

export default App;
