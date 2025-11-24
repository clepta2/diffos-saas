// router.js – simple hash‑based router
// Loads HTML fragments into #app based on the hash (e.g. #login, #dashboard)

(function () {
    const routes = {
        "": "auth-screen.html", // default route – login screen
        "#login": "auth-screen.html",
        "#dashboard": "dashboard.html",
        "#orders": "orders.html",
        "#clients": "clients.html",
    };

    const loadPage = async (hash) => {
        const path = routes[hash] || routes["#login"];
        try {
            const res = await fetch(path);
            if (!res.ok) throw new Error(`Failed to load ${path}`);
            const html = await res.text();
            // Parse fetched HTML and extract <body> content only
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const bodyContent = doc.body.innerHTML;
            const app = document.getElementById("app");
            if (app) app.innerHTML = bodyContent;
            // after injecting, optionally run page‑specific init script
            const initFn = window["init" + (hash.replace("#", "").charAt(0).toUpperCase() + hash.slice(2))];
            if (typeof initFn === "function") initFn();
        } catch (e) {
            console.error(e);
        }
    };

    window.addEventListener("hashchange", () => loadPage(location.hash));
    // initial load
    loadPage(location.hash);
})();
