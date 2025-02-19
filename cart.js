let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <img src="${item.image}" alt="${
      item.name
    }" style="width: 50px; height: 50px;">
            ${item.name} - $${item.price.toFixed(2)}
          `;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeFromCart(index);

    li.appendChild(removeButton);
    cartItemsContainer.appendChild(li);
    total += item.price;
  });

  cartTotalContainer.textContent = total.toFixed(2);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

function goBack() {
  window.location.href = "shop.html";
}

updateCartDisplay();
