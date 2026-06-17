// navigation.js
// Responsive navigation with accessible toggling and wayfinding.

// Elements
const navbutton = document.querySelector("#han-btn");
const navlinks = document.querySelector("#nav-bar");

// Defensive checks in case script loads on pages without these elements
if (navbutton && navlinks) {

    // Toggle function updates both visual class and ARIA state
    function toggleNav() {
        const expanded = navbutton.classList.toggle("show");
        navlinks.classList.toggle("show");
        navbutton.setAttribute("aria-expanded", expanded ? "true" : "false");
    }

    navbutton.addEventListener("click", toggleNav);

    // Allow keyboard activation (Enter / Space)
    navbutton.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleNav();
        }
    });

    // Close nav if focus moves away on small screens (improves wayfinding)
    document.addEventListener("click", (e) => {
        // if nav is open and click happens outside nav and button, close it
        if (navbutton.classList.contains("show")) {
            if (!navlinks.contains(e.target) && !navbutton.contains(e.target)) {
                navbutton.classList.remove("show");
                navlinks.classList.remove("show");
                navbutton.setAttribute("aria-expanded", "false");
            }
        }
    });

    // Close nav on escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navbutton.classList.contains("show")) {
            navbutton.classList.remove("show");
            navlinks.classList.remove("show");
            navbutton.setAttribute("aria-expanded", "false");
            navbutton.focus();
        }
    });
}
