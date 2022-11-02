import { Component } from "react";
import { client } from ".";
import Header from "./components/Header";
import { gql } from "@apollo/client";

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
      data: []
    }
  }

  componentDidMount() {
    const fetchData = async () => {
      const response = await client.query({ query: getData })
      this.setState({ data: response.data.categories })
    }
    fetchData()
  }

  render() {
    return (
      <div className="App">
        <Header categories={this.state.data} />
      </div>
    )
  }
}

export default App;
