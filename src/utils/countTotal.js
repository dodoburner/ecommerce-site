export default function countTotal(cart, currentCurrency) {
  let total = 0;
  cart.forEach((product) => {
    const price = product.prices.find(
      (el) => el.currency.symbol === currentCurrency
    );
    total += price.amount * product.count;
  })
  return total.toFixed(2);
}

