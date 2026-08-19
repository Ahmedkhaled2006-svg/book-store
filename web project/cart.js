
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
    const container = document.getElementById("cartContainer"); 
    const totalPriceElement = document.getElementById("totalPrice"); 
    
    if (!container)

        return;

    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        if (totalPriceElement) totalPriceElement.textContent = "0";
        return;
    }

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartCard = document.createElement("div");
        cartCard.className = "cart-item";

        cartCard.innerHTML = `
            <img src="${item.image}" alt="${item.title}" style="width: 80px; height: 110px; object-fit: cover;">
            <div class="cart-details">
                <h3>${item.title}</h3>
                <p>Price: EGP ${item.price}</p>
                <div class="quantity-controls">
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <div class="cart-actions">
                <p>Subtotal: EGP ${itemTotal}</p>
                <button class="delete-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;

        container.appendChild(cartCard);
    });

    if (totalPriceElement) {
        totalPriceElement.textContent = total;
    }
}


function changeQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCartAndRefresh();
}


function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartAndRefresh();
}


function saveCartAndRefresh() {
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}


 document.addEventListener("DOMContentLoaded", displayCart);