// 1. Import each individual
//import {addToCart, totalPrice as price, tq} from './shoppingCart.js';

console.log('Importing module')

// addToCart('bread', 5);
// console.log(price, tq)

// 2. Import all together as a namespace
// import * as ShoppingCart from './shoppingCart.js';
//
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice, ShoppingCart.tq)

// 3. Import default
// import addToCart from "./shoppingCart.js";
// addToCart('pizza', 2);

// 4. Possible mix of default and named
import addToCart, {cart} from "./shoppingCart.js";
addToCart('pizza', 2);
addToCart('bread', 5);
addToCart('apple', 4);

console.log(cart)


// 5. Top-level await import ES2022. No longer need async wrapper
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

// async function getData() {
//   console.warn('Start loading')
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   console.log(data);
// }
//
// getData();

// console.warn('Loaded')

const getLastPost = async function() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);

  return {
    title: data.at(-1).title, // Array.prototype.at is a new feature of ES2022
    text: data.at(-1).body
  };
}

// const lastPost = await getLastPost(); // Previously we were using .then()
// console.log(lastPost)

// 6. Old-style module pattern. Used before ES modules
// Module encapsulates private data and stuff and exposes public API
// Module was simply a IIFE function
const ShoppingCart = (function() {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    cart,
    totalPrice,
    totalQuantity,
    addToCart
  };
})();

ShoppingCart.addToCart('apple', 2);
console.log(ShoppingCart)