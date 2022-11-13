import React, { Component } from "react";
import PropTypes from "prop-types";
import iconDown from "../assets/icon-down.png";
import iconUp from "../assets/icon-up.png";

export default class CurrencyMenu extends Component {
  constructor(props) {
    super(props);
    this.renderCurrencies = this.renderCurrencies.bind(this);
    this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
    this.handleOpenCurrencyMenu = this.handleOpenCurrencyMenu.bind(this);
    this.state = {
      currencyMenuOpen: false,
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleCurrencyClick(value) {
    this.props.updateCurrentCurrency(value);
  }

  handleOpenCurrencyMenu() {
    this.setState({ currencyMenuOpen: !this.state.currencyMenuOpen });
  }

  renderCurrencies() {
    const { currentCategory } = this.props.state;
    return currentCategory.products[0].prices.map((price) => {
      const { symbol, label } = price.currency;
      return (
        <li onClick={() => this.handleCurrencyClick(symbol)} key={symbol}>
          {symbol} {label}
        </li>
      );
    });
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    const { currencyMenuOpen } = this.state;
    if (
      currencyMenuOpen &&
      this.wrapperRef &&
      !this.wrapperRef.current.contains(event.target)
    ) {
      this.setState({ currencyMenuOpen: false });
    }
  }

  render() {
    const { currentCurrency, currentCategory } = this.props.state;
    const { currencyMenuOpen } = this.state;

    return (
      <div className="currency-menu" onClick={this.handleOpenCurrencyMenu}>
        {currentCurrency}
        <img src={currencyMenuOpen ? iconUp : iconDown} alt="icon-down" />

        <ul className="currency-dropdown" ref={this.wrapperRef}>
          {"products" in currentCategory &&
            currencyMenuOpen &&
            this.renderCurrencies()}
        </ul>
      </div>
    );
  }
}

CurrencyMenu.propTypes = {
  state: PropTypes.shape({
    currentCategory: PropTypes.object,
    currentCurrency: PropTypes.string,
  }),
  updateCurrentCurrency: PropTypes.func,
};
