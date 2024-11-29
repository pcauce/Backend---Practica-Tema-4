/* Importamos la función "getCookie" */
import {getCookie} from "./theme.js";

/* Exportamos el tipo "Language", que recoge los dos únicos valores válidos para la preferencia de lenguaje */
export type Language = "en" | "es";

/* Este objeto recoge las tradducciones de todos los textos estáticos de la página */
export const translations: Record<Language, Record<string, string>> = {
    es: {
        shop: "Tienda",
        login: "Iniciar Sesión",
        language: "Idioma",
        theme: "Tema",
        catalogue: "Catálogo",
        toys: "Juguetes",
        books: "Libros",
        videogames: "Videojuegos",
        movies: "Películas",
        bottles: "Botellas",
        radios: "Radios",
        add: "Añadir",
        cart: "Carrito",
    },
    en: {
        shop: "Store",
        login: "Login",
        language: "Language",
        theme: "Theme",
        catalogue: "Catalog",
        toys: "Toys",
        books: "Books",
        videogames: "Video Games",
        movies: "Movies",
        bottles: "Bottles",
        radios: "Radios",
        add: "Add",
        cart: "Cart",
    },
};

/* 1. Asignamos a una variable el botón encargado de cambiar el idioma y almacenar esta preferencia en una cookie */
const languageButton: HTMLButtonElement = document.querySelector(".language") as HTMLButtonElement;

/* 2. Almacenamos en esta variable todos los textos estáticos de la Página (los recogidos en el objeto "translations") */
const texts: NodeListOf<HTMLElement> = document.querySelectorAll("[data-text-code]");

/* 3. Cada vez que se carga la página, si la cookie de idioma ya tiene un valor guardado, este se asigna al atributo "data-language"
del elemento <html>*/
if (getCookie("language")) {
    document.documentElement.setAttribute("data-language", getCookie("language"));
    changeLanguage(getCookie("language"));
}

/* 4. Cada vez que se clique en el botón de cambio de idioma se llama la función "changeLanguage", enviando como
parámetro el idioma contrario al que está establecido al momento del click, como si de un switch se tratase */
languageButton.addEventListener("click", () => {
    if (getCookie("language")) {
        changeLanguage(getCookie("language") === "es" ? "en" : "es");
    } else {
        changeLanguage("en");
    }
});


/* Esta es la función encargada de traducir todos los textos de que haya en la página */
function changeLanguage(language: string): void {
    /* 1. Asignamos la nueva preferencia de idioma recibida como parámetro tanto a la cookie como al atributo "data-language" del elemento <html> */
    document.cookie = `language=${language}; max-age=${86400 * 365}`;
    if (getCookie("language")) document.documentElement.setAttribute("data-language", getCookie("language"));

    /* 2. Cambiamos el valor "textContent" de cada elemento según el valor correspondiente del objeto "translations" */
    texts.forEach(text => {
        text.textContent = translations[language][text.dataset.textCode];
    });

    /* Esta sección del código está destinada a la traducción de los nombres de producto, que se hace de forma separada ya que
    estos nombres de producto se generan de forma dinámica cada vez que selaccionamos una nueva categoría del catálogo */

    /* 3. Almacenamos en una variable los elementos <h3> que contienen el nombre de los productos */
    const productNames: NodeListOf<HTMLHeadingElement> = document.querySelectorAll(`[data-text-code="name"]`);

    /* 4. Almacenamos en una variable el nombre de la categoría de los productos que se están mostrando en este momento */
    const currentCategory: string = (document.querySelector(".categories") as HTMLDivElement)?.dataset.current;

    /* 5. Se asigna el nuevo nombre a cada uno de los productos, haciendo uso de una variable de índice "i" para asignar el número
    del producto de forma dínámica con cada iteración del bucle forEach */
    let i: number = 0;
    productNames.forEach((productName: HTMLHeadingElement) => {
        productName.textContent = translations[language][currentCategory].substring(0, translations[language][currentCategory].length - 1) + " " + (i + 1);
        i++;
    });

    /* 6. Llevamos a cabo el mismo proceso con los nombres de cada uno de los items del carrito */
    const cartItemsNames: NodeListOf<HTMLParagraphElement> = document.querySelectorAll(".item span");
    cartItemsNames.forEach((itemName: HTMLParagraphElement) => {
        itemName.textContent = translations[language][currentCategory].substring(0, translations[language][currentCategory].length - 1);
    });
}