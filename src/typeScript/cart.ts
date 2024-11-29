/* 1. Almacenamos en una variable el elemento del carrito */
const cart: HTMLDivElement = document.querySelector('.cart-items');

/* 2. Asignamos un listener a cada uno delos elementos del carrito con el fin de aportarles la
    siguiente funcionalidad: eliminar el producto del carrito haciendo clic en él */
document.querySelectorAll(".item").forEach(
    (item: HTMLDivElement) => {
        item.addEventListener("click", () => {
            item.remove();
        })
    }
);

/* 3. Actualizamos la variable de sesión que almacena el contenido del carrito antes de que el usuario
    navegue a otra página del sitio */
window.addEventListener('beforeunload', () => {
    updateCartSession(cart.innerHTML);
});

/* Esta función es la encargada de enviar una solicitud POST al archivo "home.php", que se encarga de
    gestionar la variable de sesión del carrito */
function updateCartSession(cartContent: string): void {
    fetch('/src/home.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartContent }),
    });
}

/* Esta función se encarga de dotar de funcionalidad a los botones para añadir un producto al carrito */
export function setCartButtonListeners(currentCategory: string):void {
    /* 1. Se almacenan en una variable todos los botones de añadir al carrito */
    const addButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(`[data-text-code="add"]`);

    /* 2. Asignamos un listener a cada uno de los botones para hacer que al clicarlos se añada ese producto al carrito */
    addButtons.forEach((button: HTMLButtonElement) => {
        button.addEventListener("click", () => {

            /* 2.1 Almacenamos en una variable la cantidad de unidades que se quieren añadir al carrito */
            const quantitySelector: HTMLInputElement = document.querySelector(`input[data-product-id="${button.dataset.productId}"]`) as HTMLInputElement;
            let quantity: string = quantitySelector.value;

            /* 2.2 Si la cantidad de unidades es mayor a 0 y la cantidad de los productos que ya hay en el carrito no supera
                el máximo, se añadirá el producto al carrito */
            if (quantity !== "0" && cart.childElementCount < 15) {
                const item: HTMLDivElement = document.createElement("div");
                item.classList.add("item");
                const itemName: string  = document.querySelector(`[data-product-id="${button.dataset.productId}"]`).textContent;
                const separatedItemName: string[] = itemName.split(" ");

                item.innerHTML = `<p><span data-text-code="${currentCategory}">${separatedItemName[0]}</span> ${separatedItemName[1]} <b>x ${quantity}</b></p>`;

                item.addEventListener("click", () => {
                    item.remove();
                })

                cart.insertAdjacentElement("beforeend", item);

                quantitySelector.value = "0";
            }
        });
    });
}