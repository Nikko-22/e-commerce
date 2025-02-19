let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
};

const addToCart = (productName, productPrice, productImage) => {
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
  saveCart();
  updateCartDisplay();
};

const removeFromCart = (index) => {
  cart.splice(index, 1);
  saveCart();
  updateCartDisplay();
};

const increaseQuantity = (index) => {
  cart[index].quantity++;
  saveCart();
  updateCartDisplay();
};

const decreaseQuantity = (index) => {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartDisplay();
};

const updateCartDisplay = () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");
  const emptyCartMessage = document.getElementById("empty-cart");
  const checkoutButton = document.querySelector(".checkout-button");
  const viewCartButton = document.querySelector(".checkout-button2");

  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    emptyCartMessage.style.display = "block";
    checkoutButton.style.display = "none";
    viewCartButton.style.display = "none";
  } else {
    emptyCartMessage.style.display = "none";
    checkoutButton.style.display = "block";
    viewCartButton.style.display = "block";

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <img src="${item.image}" alt="${
        item.name
      }" style="width: 100%; height: 100%; object-fit: cover;">
        ${item.name} - $${item.price.toFixed(2)}
        <div class="quantity-buttons">
          <button onclick="decreaseQuantity(${index})" class="qty-button">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity(${index})" class="qty-button">+</button>
        </div>
        <button onclick="removeFromCart(${index})" class="remove-button" style="padding:6px 10px; margin:10px 0; background:#c9184a; border:none; color:#fff; cursor:pointer; transition:background-color 0.3s ease;">Remove</button>
      `;
      cartItemsContainer.appendChild(li);
      total += item.price * item.quantity;
    });
  }

  cartTotalContainer.textContent = total.toFixed(2);

  // Prevent click event propagation on the quantity buttons and remove button
  document.querySelectorAll(".qty-button, .remove-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
};

const toggleCart = () => {
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
};

const updateCartCount = () => {
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
};

const checkout = () => {
  window.location.href = "checkout.html";
};

// Close the cart sidebar when clicking outside of it
document.addEventListener("click", (event) => {
  const cartSidebar = document.getElementById("cart-sidebar");
  const overlay = document.getElementById("overlay");

  if (
    overlay.classList.contains("show") &&
    !cartSidebar.contains(event.target) &&
    !event.target.closest(".cart-button")
  ) {
    toggleCart();
  }
});

// Ensure icon and span inside the cart button trigger the same function
document.querySelector(".cart-button").addEventListener("click", (event) => {
  event.stopPropagation();
  toggleCart();
});

document
  .querySelector(".fa-cart-shopping")
  .addEventListener("click", (event) => {
    event.stopPropagation();
    toggleCart();
  });

document.querySelector("#cart-count").addEventListener("click", (event) => {
  event.stopPropagation();
  toggleCart();
});

updateCartDisplay();
updateCartCount();
