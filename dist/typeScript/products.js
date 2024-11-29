import { translations } from "./language.js";
import { setCartButtonListeners } from "./cart.js";
const categories = document.querySelectorAll(".category");
const products = document.querySelector(".products");
displayProducts(document.querySelector(`.category[data-text-code="toys"]`));
categories.forEach((category) => {
    category.addEventListener("click", () => {
        displayProducts(category);
        setCartButtonListeners(category.dataset.textCode);
    });
});
function displayProducts(category) {
    document.querySelector(".categories").dataset.current = category.dataset.textCode;
    products.innerHTML = "";
    for (let i = 0; i < 15; i++) {
        let product = document.createElement("div");
        const language = document.documentElement.getAttribute("data-language");
        const productName = translations[language][(category.dataset.textCode)].substring(0, category.textContent.length - 1) + " " + (i + 1);
        product.innerHTML = `
                <div class="product" >
                    <img src="https://picsum.photos/225/150?random=${i}" alt="" width="225px" height="150px">
                    <div class="product-info">
                        <h3 data-text-code="name" data-product-id="${i}">${productName}</h3>
                        <div class="amount">
                            <label>
                                <input type="number" name="amount" min="0" max="10" value="0" data-product-id="${i}">
                            </label>
                            <button data-text-code="add" data-product-id="${i}">Añadir</button>
                        </div>
                    </div>
                </div>
            `;
        products.insertAdjacentElement("beforeend", product);
    }
    setCartButtonListeners(category.dataset.textCode);
}
//# sourceMappingURL=products.js.map