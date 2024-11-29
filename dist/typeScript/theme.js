const themeButton = document.querySelector(".theme");
const currentTheme = getCookie("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
document.documentElement.setAttribute("data-theme", currentTheme);
themeButton.addEventListener("click", () => {
    let newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    document.cookie = `theme=${newTheme}; max-age=${86400 * 365}`;
});
export function getCookie(name) {
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
//# sourceMappingURL=theme.js.map