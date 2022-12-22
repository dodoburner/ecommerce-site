import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import withRouter from "../hoc/withRouter";

class Nav extends Component {
  render() {
    const categories = ["all", "clothes", "tech"];
    const currentCategory = this.props.location.pathname;

    return (
      <ul className="category-list">
        {categories.map((category) => {
          const headerActive = currentCategory === `/${category}`;
          return (
            <li
              className={headerActive ? "header-active" : ""}
              key={category}
              onClick={() => this.handleCategoryClick(category)}
            >
              <Link to={category}> {category}</Link>
              {headerActive ? <div className="header-active-line"></div> : null}
            </li>
          );
        })}
      </ul>
    );
  }
}

Nav.propTypes = {
  updateCurrentCategory: PropTypes.func,
  location: PropTypes.object,
};

export default withRouter(Nav);
