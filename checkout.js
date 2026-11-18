let cart = JSON.parse(localStorage.getItem("luxureCart")) || [];

const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutForm = document.getElementById("checkout-form");

let total = 0;

function displayCheckout() {

    checkoutItems.innerHTML = "";
    total = 0;

    if (cart.length === 0) {
        checkoutItems.innerHTML = "<p>Your cart is empty.</p>";
        checkoutForm.style.display = "none";
        checkoutTotal.textContent = "Total: 0 EGP";
        return;
    }

    cart.forEach(function(product) {

        const itemTotal = product.price * product.quantity;

        total += itemTotal;

        checkoutItems.innerHTML += `
            <div class="checkout-item">
                <h3>${product.name}</h3>
                <p>Size: ${product.size}</p>
                <p>Packaging: ${product.packaging}</p>
                <p>Quantity: ${product.quantity}</p>
                <p>Price: ${product.price} EGP</p>
                <h4>Subtotal: ${itemTotal} EGP</h4>
            </div>
        `;

    });

    checkoutTotal.textContent = "Total: " + total + " EGP";
}

checkoutForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const customerName = document.getElementById("customer-name").value;
    const phone = document.getElementById("phone").value;
    const governorate = document.getElementById("governorate").value;
    const address = document.getElementById("address").value;
    const payment = document.getElementById("payment").value;

    const order = {
        customerName: customerName,
        phone: phone,
        governorate: governorate,
        address: address,
        payment: payment,
        products: cart,
        total: total,
        status: "Pending"
    };

    let orders = JSON.parse(localStorage.getItem("luxureOrders")) || [];

    orders.push(order);

    localStorage.setItem("luxureOrders", JSON.stringify(orders));

    localStorage.removeItem("luxureCart");

    alert("Your order has been placed successfully!");

    window.location.href = "index.html";

});

displayCheckout();