import { getCookie } from "./theme.js";
export const translations = {
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
const languageButton = document.querySelector(".language");
const texts = document.querySelectorAll("[data-text-code]");
if (getCookie("language")) {
    document.documentElement.setAttribute("data-language", getCookie("language"));
    changeLanguage(getCookie("language"));
}
languageButton.addEventListener("click", () => {
    if (getCookie("language")) {
        changeLanguage(getCookie("language") === "es" ? "en" : "es");
    }
    else {
        changeLanguage("en");
    }
});
function changeLanguage(language) {
    document.cookie = `language=${language}; max-age=${86400 * 365}`;
    if (getCookie("language"))
        document.documentElement.setAttribute("data-language", getCookie("language"));
    texts.forEach(text => {
        text.textContent = translations[language][text.dataset.textCode];
    });
    const productNames = document.querySelectorAll(`[data-text-code="name"]`);
    const currentCategory = document.querySelector(".categories")?.dataset.current;
    let i = 0;
    productNames.forEach((productName) => {
        productName.textContent = translations[language][currentCategory].substring(0, translations[language][currentCategory].length - 1) + " " + (i + 1);
        i++;
    });
    const cartItemsNames = document.querySelectorAll(".item span");
    cartItemsNames.forEach((itemName) => {
        itemName.textContent = translations[language][currentCategory].substring(0, translations[language][currentCategory].length - 1);
    });
}
//# sourceMappingURL=language.js.map