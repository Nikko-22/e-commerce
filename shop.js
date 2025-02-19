let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productName, productPrice, productImage) {
  const product = cart.find((item) => item.name === productName);
  if (product) {
    product.quantity++;
  } else {
    cart.push({
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
  updateCartCount();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
  updateCartCount();
}

function increaseQuantity(index) {
  cart[index].quantity++;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
  updateCartCount();
}

function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");
  const emptyCartMessage = document.getElementById("empty-cart");

  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    emptyCartMessage.style.display = "block";
  } else {
    emptyCartMessage.style.display = "none";

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <img src="${item.image}" alt="${
        item.name
      }" style="width: 50px; height: 50px; object-fit: cover;">
        ${item.name} - $${item.price.toFixed(2)}
        <div class="quantity-buttons">
          <button onclick="decreaseQuantity(${index})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity(${index})">+</button>
        </div>
        <button onclick="removeFromCart(${index})" style="padding:6px 10px; margin:10px 0; background:#c9184a; border:none; color:#fff; cursor:pointer; transition:background-color 0.3s ease;">Remove</button>
      `;
      cartItemsContainer.appendChild(li);
      total += item.price * item.quantity;
    });
  }

  cartTotalContainer.textContent = total.toFixed(2);
}

function toggleCart() {
  const cartSidebar = document.getElementById("cart-sidebar");
  const overlay = document.getElementById("overlay");
  const body = document.body;

  if (cartSidebar.classList.contains("open")) {
    cartSidebar.classList.remove("open");
    overlay.classList.remove("show");
    body.style.overflow = "auto";
  } else {
    cartSidebar.classList.add("open");
    overlay.classList.add("show");
    body.style.overflow = "hidden";
  }
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

function checkout() {
  window.location.href = "checkout.html";
}

updateCartDisplay();
updateCartCount();
