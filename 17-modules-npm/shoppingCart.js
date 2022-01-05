// Export module
console.log('Exporting module');

const shippingCost = 10;
const cart = [];

// Inline named export
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}

const totalPrice = 237;
const totalQuantity = 23;

// Named export
export { totalPrice, totalQuantity as tq} // Possible renaming

export default addToCart;