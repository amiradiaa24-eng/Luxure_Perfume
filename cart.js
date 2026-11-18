let cart = JSON.parse(localStorage.getItem("luxureCart")) || [];

const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

function displayCart() {
    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    cart.forEach((product, index) => {
        const itemTotal = product.price * product.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="product-card" style="margin-bottom:20px;">
                <h3>${product.name}</h3>
                <p>Size: ${product.size}</p>
                <p>Packaging: ${product.packaging}</p>
                <p>Price: ${product.price} EGP</p>
                <p>Quantity: ${product.quantity}</p>
                <h4>Subtotal: ${itemTotal} EGP</h4>
                <button onclick="removeItem(${index})">REMOVE</button>
            </div>
        `;
    });

    totalPrice.textContent = "Total: " + total + " EGP";
}

function removeItem(index) {
    cart.splice(index, 1);

    localStorage.setItem("luxureCart", JSON.stringify(cart));

    displayCart();
}

displayCart();