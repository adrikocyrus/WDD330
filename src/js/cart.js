import { getLocalStorage, setImageFallback } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  
  document.querySelectorAll(".remove-btn").forEach(button => {
  button.addEventListener("click",(event)=>{
    const productId = event.target.dataset.id;
    console.log("Remove:",productId);
    removeCartItem(productId);
  });  
});
  const productList = document.querySelector(".product-list");
  if (!productList) {
    throw new Error("Could not find the cart product list");
  }

  const storedCart = getLocalStorage("so-cart");
  const cartItems = Array.isArray(storedCart)
    ? storedCart
    : storedCart
      ? [storedCart]
      : [];

  if (cartItems.length === 0) {
    productList.innerHTML = '<li class="cart-empty">Your cart is empty.</li>';
    return;
  }

  const quantities = new Map();
  for (const item of cartItems) {
    if (!item || !item.Id) {
      throw new Error("The cart contains an invalid product");
    }
    const current = quantities.get(item.Id);
    quantities.set(item.Id, {
      product: item,
      quantity: (current?.quantity ?? 0) + 1,
    });
  }

  const htmlItems = [...quantities.values()].map(({ product, quantity }) =>
    cartItemTemplate(product, quantity),
  );
  productList.innerHTML = htmlItems.join("");
  setImageFallback(productList);
}

function cartItemTemplate(item, quantity) {
  const newItem = `<li class="cart-card divider">
  <a href="/product_pages/?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
  <h2 class="card__name">${item.Name}</h2>
  <a href="/product_pages/?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <!--remove button-->
  <button class="remove-btn" data-id="${item.Id}">X</button>
 </li>`;


  return newItem;
}

function removeCartItem(productId){
  let cart = getLocalStorage("so-cart") || [];
  cart = cart.filter((item) => item.Id !==productId);
  localStorage.setItem("so-cart", JSON.stringify(cart));
  renderCartContents();
}

renderCartContents();

