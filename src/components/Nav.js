import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import withRouter from "../hoc/withRouter";

class Nav extends Component {
  render() {
    const categories = ["all", "clothes", "tech"];
    const location = this.props.location;

    return (
      <ul className="category-list">
        {categories.map((category) => {
          const headerActive = location.pathname.includes(category);
          return (
            <li className={headerActive ? "header-active" : ""} key={category}>
              <Link to={`category/${category}`}> {category}</Link>
              {headerActive ? <div className="header-active-line"></div> : null}
            </li>
          );
        })}
      </ul>
    );
  }
}

Nav.propTypes = {
  location: PropTypes.object,
};

export default withRouter(Nav);
