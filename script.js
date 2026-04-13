const API_URL = "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json";

let cart = [];

async function fetchProducts() {
  const res = await fetch(API_URL);
  const data = await res.json();
  displayProducts(data);
}

function displayProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
      <img src="${product.image}" />
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    `;

    container.appendChild(div);
  });
}

function addToCart(product) {
  cart.push(product);
  updateCart();
}

function updateCart() {
  document.getElementById("cart-count").innerText = cart.length;

  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price;

    const li = document.createElement("li");
    li.innerText = `${item.title} - $${item.price}`;
    cartItems.appendChild(li);
  });

  document.getElementById("total").innerText = total.toFixed(2);
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("hidden");
}

fetchProducts();
