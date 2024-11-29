const cart = document.querySelector('.cart-items');
document.querySelectorAll(".item").forEach((item) => {
    item.addEventListener("click", () => {
        item.remove();
    });
});
window.addEventListener('beforeunload', () => {
    updateCartSession(cart.innerHTML);
});
function updateCartSession(cartContent) {
    fetch('/src/home.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartContent }),
    });
}
export function setCartButtonListeners(currentCategory) {
    const addButtons = document.querySelectorAll(`[data-text-code="add"]`);
    addButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const quantitySelector = document.querySelector(`input[data-product-id="${button.dataset.productId}"]`);
            let quantity = quantitySelector.value;
            if (quantity !== "0" && cart.childElementCount < 15) {
                const item = document.createElement("div");
                item.classList.add("item");
                const itemName = document.querySelector(`[data-product-id="${button.dataset.productId}"]`).textContent;
                const separatedItemName = itemName.split(" ");
                item.innerHTML = `<p><span data-text-code="${currentCategory}">${separatedItemName[0]}</span> ${separatedItemName[1]} <b>x ${quantity}</b></p>`;
                item.addEventListener("click", () => {
                    item.remove();
                });
                cart.insertAdjacentElement("beforeend", item);
                quantitySelector.value = "0";
            }
        });
    });
}
//# sourceMappingURL=cart.js.map