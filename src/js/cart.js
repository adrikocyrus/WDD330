import { getLocalStorage } from "./utils.mjs";

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
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
  <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
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

