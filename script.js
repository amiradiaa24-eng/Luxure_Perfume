const products = [
    {
        id: 1,
        name: "Rose Elegance",
        category: "Women's Fragrance",
        image: "images/women-1.jpg"
    },
    {
        id: 2,
        name: "Velvet Bloom",
        category: "Women's Fragrance",
        image: "images/women-2.jpg"
    },
    {
        id: 3,
        name: "Floral Dream",
        category: "Women's Fragrance",
        image: "images/women-3.jpg"
    },
    {
        id: 4,
        name: "Dark Essence",
        category: "Men's Fragrance",
        image: "images/men-1.jpg"
    },
    {
        id: 5,
        name: "Royal Oud",
        category: "Men's Fragrance",
        image: "images/men-2.jpg"
    },
    {
        id: 6,
        name: "Black Intense",
        category: "Men's Fragrance",
        image: "images/men-3.jpg"
    }
];

const prices = {
    30: { outlet: 250, master: 300 },
    50: { outlet: 350, master: 420 },
    100: { outlet: 500, master: 600 }
};

const catalog = document.getElementById("catalog-grid");

if (catalog) {

    catalog.innerHTML = products.map(product => `
        <div class="catalog-card">

            <img src="${product.image}" alt="${product.name}">

            <div class="catalog-info">

                <p class="catalog-category">${product.category}</p>

                <h3>${product.name}</h3>

                <label>Choose Size:</label>
                <select class="size-select">
                    <option value="">Select Size</option>
                    <option value="30">30 ML</option>
                    <option value="50">50 ML</option>
                    <option value="100">100 ML</option>
                </select>

                <label>Choose Packaging:</label>
                <select class="packaging-select">
                    <option value="">Select Packaging</option>
                    <option value="outlet">Outlet - Without Box</option>
                    <option value="master">Master Box - With Box</option>
                </select>

                <label>Quantity:</label>
                <input class="quantity-input" type="number" value="1" min="1">

                <h3 class="catalog-price">Select your options</h3>

                <button class="catalog-add">ADD TO CART</button>

            </div>
        </div>
    `).join("");

    document.querySelectorAll(".catalog-card").forEach((card, index) => {

        const size = card.querySelector(".size-select");
        const packaging = card.querySelector(".packaging-select");
        const quantity = card.querySelector(".quantity-input");
        const price = card.querySelector(".catalog-price");
        const addButton = card.querySelector(".catalog-add");

        function updatePrice() {
            if (size.value && packaging.value) {
                price.textContent =
                    "Price: " + prices[size.value][packaging.value] + " EGP";
            } else {
                price.textContent = "Select your options";
            }
        }

        size.addEventListener("change", updatePrice);
        packaging.addEventListener("change", updatePrice);

        addButton.addEventListener("click", function () {

            if (!size.value || !packaging.value) {
                alert("Please select size and packaging!");
                return;
            }

            const qty = Number(quantity.value);

            if (!Number.isInteger(qty) || qty < 1) {
                alert("Please enter a valid quantity!");
                return;
            }

            const selectedProduct = products[index];

            const product = {
                id: selectedProduct.id,
                name: selectedProduct.name,
                category: selectedProduct.category,
                image: selectedProduct.image,
                size: size.value + " ML",
                packaging: packaging.value,
                price: prices[size.value][packaging.value],
                quantity: qty
            };

            let cart = JSON.parse(localStorage.getItem("luxureCart")) || [];

            cart.push(product);

            localStorage.setItem("luxureCart", JSON.stringify(cart));

            alert("Product added to cart successfully!");
        });
    });
}