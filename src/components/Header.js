import { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header>
        <ul>
          {this.props.categories.map((category) => (
            <li key={category.name}>{category.name}</li>
          ))}
        </ul>
      </header>
    );
  }
}

export default Header;
