(function () {
    function initNavbar() {
        const navContainer = document.querySelector(".nav-container");
        if (!navContainer || navContainer.querySelector(".burger")) return;

        const burger = document.createElement("button");
        burger.className = "burger";
        burger.type = "button";
        burger.setAttribute("aria-label", "Toggle menu");
        burger.setAttribute("aria-expanded", "false");
        burger.innerHTML = '<span class="burger-icon"></span>';

        burger.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = navContainer.classList.toggle("open");
            burger.setAttribute("aria-expanded", String(isOpen));
        });

        // close menu when a nav link is clicked
        navContainer.querySelectorAll(".nav a").forEach((link) => {
            link.addEventListener("click", () => {
                navContainer.classList.remove("open");
                burger.setAttribute("aria-expanded", "false");
            });
        });

        // close when clicking outside the navbar
        document.addEventListener("click", (e) => {
            if (!navContainer.contains(e.target) && navContainer.classList.contains("open")) {
                navContainer.classList.remove("open");
                burger.setAttribute("aria-expanded", "false");
            }
        });

        // close when resizing back to desktop
        window.addEventListener("resize", () => {
            if (window.innerWidth > 720 && navContainer.classList.contains("open")) {
                navContainer.classList.remove("open");
                burger.setAttribute("aria-expanded", "false");
            }
        });

        // insert as first child so burger sits on the left
        navContainer.insertBefore(burger, navContainer.firstChild);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initNavbar);
    } else {
        initNavbar();
    }
})();
