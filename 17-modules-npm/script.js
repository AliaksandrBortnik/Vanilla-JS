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
