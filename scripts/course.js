// course.js
// Contains the courses array and code to render them, filter them and calculate total credits.

// Sample array of 10 course objects. Edit "completed" to true for courses you have completed.
const courses = [
    { id: 1, title: "Web Fundamentals", category: "WDD", credits: 3, completed: true },
    { id: 2, title: "Dynamic Web Fundamentals", category: "WDD", credits: 4, completed: true },
    { id: 3, title: "Web Frontend Development II", category: "WDD", credits: 3, completed: false },
    { id: 4, title: "Intro to Programming", category: "CSE", credits: 4, completed: true },
    { id: 5, title: "Programming with Functions", category: "CSE", credits: 3, completed: true },
    { id: 6, title: "Programming with Classes", category: "CSE", credits: 3, completed: false },
    { id: 7, title: "Web Full-Stack Development", category: "WDD", credits: 2, completed: true },
    { id: 8, title: "Web Backend Development", category: "CSE", credits: 2, completed: true },
    { id: 9, title: "Software Testing", category: "WDD", credits: 2, completed: false },
    { id: 10, title: "Web Services", category: "CSE", credits: 4, completed: false }
];

// Renders the list of courses in the #coursesList element
function renderCourses(list) {
    const container = document.getElementById("coursesList");
    const totalEl = document.getElementById("totalCredits");
    container.innerHTML = "";

    if (!list || list.length === 0) {
        container.innerHTML = "<p>No courses found.</p>";
        totalEl.textContent = "The total credits for the listed courses above is 0";
        return;
    }

    let totalCredits = 0;

    list.forEach(course => {
        totalCredits += course.credits;

        // create card
        const card = document.createElement("div");
        card.className = "course-card";

        const meta = document.createElement("div");
        meta.className = "course-meta";

        const title = document.createElement("p");
        title.className = "course-title";
        title.textContent = course.title;

        const sub = document.createElement("p");
        sub.className = "course-sub";
        sub.textContent = `${course.category} • ${course.credits} credits`;

        meta.appendChild(title);
        meta.appendChild(sub);

        const status = document.createElement("div");
        status.className = "course-status";
        status.textContent = course.completed ? "Completed" : "Incomplete";

        if (course.completed) {
            status.classList.add("course-completed");
            card.style.borderColor = "rgba(43, 95, 148, 0.14)";
            // optional: slightly highlight completed card background
            card.style.background = "linear-gradient(180deg, rgba(230, 236, 255, 0.6), #ffffff)";
        }

        card.appendChild(meta);
        card.appendChild(status);

        container.appendChild(card);
    });

    totalEl.textContent = `The total credits for the listed courses above is ${totalCredits}`;
}

// Filter helper
function filterCourses(filter) {
    if (filter === "all") {
        return courses;
    }
    return courses.filter(c => c.category === filter);
}

// Hook up filter buttons
function setupFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            // Update accessible pressed states
            buttons.forEach(b => b.setAttribute("aria-pressed", "false"));
            btn.setAttribute("aria-pressed", "true");

            const filter = btn.getAttribute("data-filter");
            const list = filterCourses(filter === "all" ? "all" : filter);
            renderCourses(list);
        });
    });
}

// Initialise on DOM ready
document.addEventListener("DOMContentLoaded", () => {
    setupFilters();
    // default show all courses
    renderCourses(courses);
});
