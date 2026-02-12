let header = `
    <header>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>
        <img src="icons/sun.svg" alt="Toggle Dark Mode" width="24" height="24" class="dark-mode-toggle" onClick="toggleDarkMode()"/>
    </header>`


let footer = `    
    <footer>
        <p> &copy; 2026 Vahin Mehra</p>
    </footer>`

let friends = `
        <div class="friends">
            <a href="https://faaz.dev"><img src="images/ducki-avatar.jpg" alt="Ducki's Site" width="40" height="40" class="friends-icon" /></a>
            <a href="https://itswilli.dev"><img src="images/willi-avatar.jpg" alt="Willi's Site" width="40" height="40" class="friends-icon" /></a>
            <a href="https://deprecating.xyz/"><img src="images/dep-avatar.jpg" alt="Dep's Site" width="40" height="40" class="friends-icon" /></a>
            <a href="https://nithilanv.github.io/cv/"><img src="images/nithilan-avatar.jpg" alt="Nithilan's Site" width="40" height="40" class="friends-icon" /></a>
        </div>`

let quick_links = `
        <div class="quick-links">
            <h4>Quick Links</h4>

            <a href="https://github.com/ShadowFox88" target="_blank"><img src="icons/github.svg" alt="GitHub" width="24"
                    height="24" class="icon" /></a>
            <a href="https://vahin.dev/grafana" target="_blank"><img src="icons/grafana.svg" alt="Grafana" width="24"
                    height="24" class="icon" /></a>
            <a href="https://vahin.dev/jellyfin" target="_blank"><img src="icons/jellyfin.svg" alt="Jellyfin" width="24"
                    height="24" class="icon" /></a>
            <a href="https://vahin.dev/jellyseerr" target="_blank"><img src="icons/jellyseerr.svg" alt="Jellyserr"
                    width="24" height="24" class="icon" /></a>
            <a href="https://vahin.dev/umami" target="_blank"><img src="icons/umami.svg" alt="Umami" width="24"
                    height="24" class="icon" /></a>
            <a href="https://auth.vahin.dev/" target="_blank"><img src="icons/auth-fingerprint.svg" alt="Keycloak"
                    width="24" height="24" class="icon" /></a>
            <a href="https://registry.vahin.dev/" target="_blank"><img src="icons/docker.svg" alt="Harbor Registry"
                    width="24" height="24" class="icon" /></a>
            <a href="https://cdn.vahin.dev/" target="_blank"><img src="icons/image.svg" alt="Zipline CDN" width="24"
                    height="24" class="icon" /></a>
        </div>`

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

window.addEventListener("DOMContentLoaded", (event) => {
    if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
        document.body.insertAdjacentHTML("afterbegin", header);
        document.body.getElementsByTagName("header")[0].insertAdjacentHTML("beforeend", friends);
        document.body.insertAdjacentHTML("beforeend", footer);
        document.body.getElementsByTagName("footer")[0].insertAdjacentHTML("afterbegin", quick_links);
    } else {
        document.body.insertAdjacentHTML("afterbegin", header);
        document.body.insertAdjacentHTML("beforeend", footer);
    }

    if (sessionStorage.getItem("darkMode") === null) {
        sessionStorage.setItem("darkMode", 'false');
    }
    sessionStorage.setItem("darkMode", !(sessionStorage.getItem("darkMode") === 'true'));
    toggleDarkMode();
});