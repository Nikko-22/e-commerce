let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCheckoutDisplay() {
  const checkoutItemsContainer = document.getElementById("checkout-items");
  const checkoutTotalContainer = document.getElementById("checkout-total");

  checkoutItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.image}" alt="${
      item.name
    }" style="width: 250px; height: 250px; object-fit: cover;">
      ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
    `;
    checkoutItemsContainer.appendChild(li);
    total += item.price * item.quantity;
  });

  checkoutTotalContainer.textContent = total.toFixed(2);
}

function placeOrder() {
  const billingForm = document.getElementById("billing-form");
  if (billingForm.checkValidity()) {
    alert("Your order has been placed!");
    localStorage.removeItem("cart");
    window.location.href = "shop.html";
  } else {
    alert("Please fill out all billing information.");
  }
}

function goBack() {
  window.location.href = "shop.html";
}

updateCheckoutDisplay();
