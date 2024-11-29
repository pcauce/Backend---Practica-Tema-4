import {Language, translations} from "./language.js";
import {setCartButtonListeners} from "./cart.js";

/* 1. Almacenamos en variables tanto cada una de las categorías del catálogo como el contenedor donde se mostrarán todos los productos */
const categories: NodeListOf<HTMLLIElement> = document.querySelectorAll(".category");
const products: HTMLDivElement = document.querySelector(".products") as HTMLDivElement;

/* 2. Cada vez que se carga la página, se cargan por defecto los productos de la categoría juguetes, ya que por ahora el cliente no ha
    seleccionado ninguna, de esta manera se evita que la sección de los productos esté vacía hasta que el cliente seleccione alguna categoría */
displayProducts(document.querySelector(`.category[data-text-code="toys"]`));

/* 3. Establecemos un listener a cada uan de las categorías, para que cada vez que se clique en una, el contenido de las sección de productos
    se actualice con los productos de la categoría selaccionada */
categories.forEach((category: HTMLLIElement) => {
    category.addEventListener("click", () => {
        displayProducts(category);
        setCartButtonListeners(category.dataset.textCode);
    });
});


/* Esta es la función encargada de mostrar los productos cada vez que se seleccione una categoría */
function displayProducts(category: HTMLLIElement): void {

    /* 1. Establecemos el valor "current" del dataset de la lista de categorías. Esto nos será de utilidad a la hora de generar de forma dinámica
        los nombres de los productos */
    (document.querySelector(".categories") as HTMLDivElement).dataset.current = category.dataset.textCode;

    /* 2. Vaciamos el contenido del contenedor de productos, para que ya no se muestren los productos de la categoría anterior */
    products.innerHTML = "";

    /* 3. Generamos los nombres de los productos de forma dinámica mediante el uso de un bucle for, en el que además se indica
        el número de productos que se mostrarán */
    for (let i = 0; i < 15; i++) {

        /* 3.1 Se crea el elemento del producto, que será posteriormente insertado en el contenedor de productos */
        let product: HTMLDivElement = document.createElement("div");

        /* 3.2 Guardamos en una variable la preferencia de idioma actual, con el fin de generar el nnombre del producto en
             el idioma correcto */
        const language: Language = document.documentElement.getAttribute("data-language") as Language;

        /* 3.3 Se genera el nombre del producto y se almacena en una variable, con el fin de insertarlo en la siguiente plantilla de HTML,
             que indica la estructura de cada producto */
        const productName: string = translations[language][(category.dataset.textCode)].substring(0, category.textContent.length - 1) + " " + (i + 1);

        /* 3.3 Se establece el contenido HTML del elemento creado en el primer paso de esta función */
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

        /* 3.4 Se inserta el producto en el cotenedor que los agrupa a todos */
        products.insertAdjacentElement("beforeend", product);
    }

    /* 4. Una vez introducidos todos los productos, se llama a la función "setCartButtonListeners" con el fin de asignar un listener al
        botón de añadir al carrito de cada uno de los productos */
    setCartButtonListeners(category.dataset.textCode);
}