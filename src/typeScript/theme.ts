/* 1. Almacenamos en una variable el botón encargado tanto de cambiar el tema como de almacenar en una cookie esta preferencia */
const themeButton: HTMLButtonElement = document.querySelector(".theme") as HTMLButtonElement;

/* 2. Obtenemos el valor de la preferencia del tema actual: en prier lugar, comprobamos si la cookie tiene algún valor almacenado,
de no ser así, obtenemos la preferencia del tema establecida por el usuario en su navegador. */
const currentTheme = getCookie("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

/* 3. Asignamos la preferencia de tema a la cookie correspondiente */
document.documentElement.setAttribute("data-theme", currentTheme);

/* 4. Cada vez que se se pulse el botón de cambio de tema: */
themeButton.addEventListener("click", () => {
    /* 4.1 Leemos el valor del atributo "data-theme" del elemento <html>, y asignamos a la variable "newTheme" el valor contrario */
    let newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";

    /* 4.2 Asignamos el nuevo tema al atributo "data-theme" y lo almacenamos en la cookie */
    document.documentElement.setAttribute("data-theme", newTheme);
    document.cookie = `theme=${newTheme}; max-age=${86400 * 365}`;
});

/* Esta función se encarga de obtener el valor de una cookie concreta, recibiendo como parámetro su nombre */
export function getCookie(name:string): string | null {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let cookieName = cookie.split('=')[0].trim();

        if (cookieName === name) {
            return cookie.split('=')[1].trim();
        }
    }

    return null;
}