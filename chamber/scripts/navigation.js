// navigation.js

// Select elements
const navbutton = document.querySelector("#hamburger");
const navlinks = document.querySelector(".nav-links");

// Only run if both elements exist
if (navbutton && navlinks) {

    function toggleNav() {
        const expanded = navlinks.classList.toggle("show");
        navbutton.setAttribute("aria-expanded", expanded ? "true" : "false");
    }

    // Toggle on click
    navbutton.addEventListener("click", toggleNav);

    // Keyboard support (Enter or Space)
    navbutton.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleNav();
        }
    });

    // Close menu if clicked outside
    document.addEventListener("click", (e) => {
        if (navlinks.classList.contains("show")) {
            if (!navlinks.contains(e.target) && !navbutton.contains(e.target)) {
                navlinks.classList.remove("show");
                navbutton.setAttribute("aria-expanded", "false");
            }
        }
    });

    // Close with Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navlinks.classList.contains("show")) {
            navlinks.classList.remove("show");
            navbutton.setAttribute("aria-expanded", "false");
            navbutton.focus();
        }
    });
}
