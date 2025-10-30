// navigation.js - controls hamburger and nav visibility (keeps behaviour from original solution)

document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("navToggle");
    const mainNav = document.getElementById("mainNav");

    function openNav() {
        mainNav.style.display = "block";
        navToggle.setAttribute("aria-expanded", "true");
        navToggle.setAttribute("aria-label", "Close navigation");
    }
    function closeNav() {
        mainNav.style.display = "none";
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation");
    }
    function toggleNav() {
        const expanded = navToggle.getAttribute("aria-expanded") === "true";
        if (expanded) closeNav();
        else openNav();
    }

    navToggle.addEventListener("click", toggleNav);

    mainNav.addEventListener("click", (e) => {
        if (e.target.tagName === "A" && window.innerWidth < 700) {
            closeNav();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeNav();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 700) {
            mainNav.style.display = "block";
            navToggle.style.display = "none";
            navToggle.setAttribute("aria-expanded", "false");
        } else {
            mainNav.style.display = "none";
            navToggle.style.display = "";
            navToggle.setAttribute("aria-expanded", "false");
        }
    });

    // initial state
    if (window.innerWidth >= 700) {
        mainNav.style.display = "block";
        navToggle.style.display = "none";
    } else {
        mainNav.style.display = "none";
        navToggle.style.display = "";
    }
});
