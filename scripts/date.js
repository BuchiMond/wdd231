// date.js
// Puts the current year and the document's last modified date into the footer.

// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    // 1. Copyright year, name and country
    const copyrightEl = document.getElementById("copyright");
    if (copyrightEl) {
        const year = new Date().getFullYear();
        // As requested include your name and country
        copyrightEl.textContent =
            `© ${year} Buchi Diamond Vitalis, Nigeria`;
    }

    // 2. Last modified date (provided by the browser)
    const lastModifiedEl = document.getElementById("lastModified");
    if (lastModifiedEl) {
        // document.lastModified returns a string; just display it
        lastModifiedEl.textContent = `Last modified: ${document.lastModified}`;
    }
});
