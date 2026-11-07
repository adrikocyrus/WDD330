import { getParam} from "./utils.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from './ProductDetails.mjs';

const dataSource = new ProductData("tents");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);
product.init();
console.log(window.location.href);
console.log(window.location.search);
console.log(getParam("product"));
//function addProductToCart(product) {
//  const cartItems = getLocalStorage("so-cart") || [];
//  cartItems.push(product);
//  setLocalStorage("so-cart", cartItems);


function addProductToCart(product) {
  // Retrieve current contents from local storage
  let cartItems = getLocalStorage("so-cart");

  // Force cartItems to be an array if it isn't one already (handles old, single-object data)
  if (!Array.isArray(cartItems)) {
    cartItems = cartItems ? [cartItems] : [];
  }

  // Safely push the new product into the array
  cartItems.push(product);

  // Save the updated array back to local storage
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
//async function addToCartHandler(e) {
//  const product = await dataSource.findProductById(e.target.dataset.id);
// addProductToCart(product);
//}

// add listener to Add to Cart button
//document
//  .getElementById("addToCart")
//  .addEventListener("click", addToCartHandler);

//test getParam
//const productId = getParam("product");
//console.log("product id:, productId")
