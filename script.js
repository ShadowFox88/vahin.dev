window.addEventListener("DOMContentLoaded", (event) => {
    if (sessionStorage.getItem("darkMode") === null) {
        sessionStorage.setItem("darkMode", 'false');
    }
    sessionStorage.setItem("darkMode", !(sessionStorage.getItem("darkMode") === 'true'));
    toggleDarkMode();
});

function toggleDarkMode() {
    darkMode = sessionStorage.getItem("darkMode") === 'true';
    sessionStorage.setItem("darkMode", !darkMode);
    button = document.getElementsByClassName("dark-mode-toggle")[0];

    if (darkMode) {
        document.documentElement.style.setProperty('--bg-color', 'black');
        document.documentElement.style.setProperty('--text-color', 'hsl(210, 10%, 62%)');
        document.documentElement.style.setProperty('--link-color', 'darkcyan');
        document.documentElement.style.setProperty('--header-hover-bg', 'rgb(0,33,71)');
        document.documentElement.style.setProperty('--friends-background', '#333333');
        document.documentElement.style.setProperty('--dark-mode-button', 'white');

        button.src = "icons/sun.svg";
    } else {
        document.documentElement.style.setProperty('--bg-color', 'white');
        document.documentElement.style.setProperty('--text-color', 'hsl(210, 10%, 20%)');
        document.documentElement.style.setProperty('--link-color', 'blue');
        document.documentElement.style.setProperty('--header-hover-bg', 'lightgray');
        document.documentElement.style.setProperty('--friends-background', '#CCCCCC');
        document.documentElement.style.setProperty('--dark-mode-button', 'black');

        button.src = "icons/moon.svg";
    }
}