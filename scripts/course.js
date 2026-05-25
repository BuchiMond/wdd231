// course.js
// Contains the courses array and code to render them, filter them and calculate total credits.

const courses = [
    {
        id: 1,
        subject: "WDD",
        number: "130",
        title: "Web Fundamentals",
        category: "WDD",
        credits: 3,
        completed: true,
        certificate: "Web and Computer Programming",
        description: "Introduction to the fundamentals of web development, including HTML, CSS, and basic design principles. Students learn to build accessible, standards-compliant web pages.",
        technology: ["HTML", "CSS", "VS Code", "GitHub"]
    },
    {
        id: 2,
        subject: "WDD",
        number: "131",
        title: "Dynamic Web Fundamentals",
        category: "WDD",
        credits: 4,
        completed: true,
        certificate: "Web and Computer Programming",
        description: "Builds on web fundamentals by introducing JavaScript for dynamic, interactive web pages. Topics include DOM manipulation, events, and fetch API.",
        technology: ["HTML", "CSS", "JavaScript", "GitHub"]
    },
    {
        id: 3,
        subject: "WDD",
        number: "231",
        title: "Web Frontend Development II",
        category: "WDD",
        credits: 3,
        completed: false,
        certificate: "Web and Computer Programming",
        description: "Advanced front-end topics including responsive design patterns, CSS frameworks, component-based thinking, and modern JavaScript tooling.",
        technology: ["HTML", "CSS", "JavaScript", "React", "Vite"]
    },
    {
        id: 4,
        subject: "CSE",
        number: "110",
        title: "Intro to Programming",
        category: "CSE",
        credits: 4,
        completed: true,
        certificate: "Web and Computer Programming",
        description: "An introduction to programming concepts using Python. Covers variables, control flow, functions, and basic data structures.",
        technology: ["Python", "VS Code"]
    },
    {
        id: 5,
        subject: "CSE",
        number: "111",
        title: "Programming with Functions",
        category: "CSE",
        credits: 3,
        completed: true,
        certificate: "Web and Computer Programming",
        description: "Focuses on writing modular, reusable code using functions. Emphasises problem decomposition, testing, and documentation.",
        technology: ["Python", "VS Code", "pytest"]
    },
    {
        id: 6,
        subject: "CSE",
        number: "210",
        title: "Programming with Classes",
        category: "CSE",
        credits: 3,
        completed: false,
        certificate: "Web and Computer Programming",
        description: "Introduces object-oriented programming principles: classes, inheritance, encapsulation, and polymorphism through real-world projects.",
        technology: ["C#", "VS Code", ".NET"]
    },
    {
        id: 7,
        subject: "WDD",
        number: "330",
        title: "Web Full-Stack Development",
        category: "WDD",
        credits: 2,
        completed: true,
        certificate: "Web and Computer Programming",
        description: "Covers the full development cycle from front-end to back-end, including REST APIs, authentication, and deployment strategies.",
        technology: ["Node.js", "Express", "JavaScript", "MongoDB"]
    },
    {
        id: 8,
        subject: "CSE",
        number: "340",
        title: "Web Backend Development",
        category: "CSE",
        credits: 2,
        completed: true,
        certificate: "Web and Computer Programming",
        description: "In-depth study of server-side programming, database design, and API development using modern backend frameworks.",
        technology: ["Node.js", "PostgreSQL", "Express", "REST API"]
    },
    {
        id: 9,
        subject: "WDD",
        number: "430",
        title: "Software Testing",
        category: "WDD",
        credits: 2,
        completed: false,
        certificate: "Web and Computer Programming",
        description: "Principles and practices of software testing including unit tests, integration tests, and end-to-end testing for web applications.",
        technology: ["Jest", "Cypress", "JavaScript"]
    },
    {
        id: 10,
        subject: "CSE",
        number: "341",
        title: "Web Services",
        category: "CSE",
        credits: 4,
        completed: false,
        certificate: "Web and Computer Programming",
        description: "Designing and consuming web services and APIs. Topics include REST, GraphQL, authentication, and third-party integrations.",
        technology: ["Node.js", "REST", "GraphQL", "OAuth"]
    }
];

// Reference to the dialog element
const courseDetails = document.getElementById("course-details");

// Displays a modal with full course details
function displayCourseDetails(course) {
    courseDetails.innerHTML = "";
    courseDetails.innerHTML = `
        <button id="closeModal" aria-label="Close modal">&#x2715;</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <span class="modal-badge">${course.completed ? "✓ Completed" : "In Progress"}</span>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Certificate:</strong> ${course.certificate}</p>
        <hr class="modal-divider">
        <p>${course.description}</p>
        <hr class="modal-divider">
        <p><strong>Technologies:</strong></p>
        <div class="modal-tech">
            ${course.technology.map(t => `<span>${t}</span>`).join("")}
        </div>
    `;

    courseDetails.showModal();

    // Close via button
    document.getElementById("closeModal").addEventListener("click", () => {
        courseDetails.close();
    });

    // Close when clicking outside the dialog (on the backdrop)
    courseDetails.addEventListener("click", (e) => {
        const rect = courseDetails.getBoundingClientRect();
        const clickedOutside =
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom;
        if (clickedOutside) {
            courseDetails.close();
        }
    });
}

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

        const card = document.createElement("div");
        card.className = "course-card";
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `View details for ${course.title}`);

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
            card.style.background = "linear-gradient(180deg, rgba(230, 236, 255, 0.6), #ffffff)";
        } else {
            status.classList.add("course-incomplete");
        }

        card.appendChild(meta);
        card.appendChild(status);
        container.appendChild(card);

        // Open modal on click
        card.addEventListener("click", () => {
            displayCourseDetails(course);
        });

        // Also allow keyboard activation (Enter / Space)
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                displayCourseDetails(course);
            }
        });
    });

    totalEl.textContent = `The total credits for the listed courses above is ${totalCredits}`;
}

// Filter helper
function filterCourses(filter) {
    if (filter === "all") return courses;
    return courses.filter(c => c.category === filter);
}

// Hook up filter buttons
function setupFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.setAttribute("aria-pressed", "false"));
            btn.setAttribute("aria-pressed", "true");
            const filter = btn.getAttribute("data-filter");
            renderCourses(filterCourses(filter));
        });
    });
}

// Initialise on DOM ready
document.addEventListener("DOMContentLoaded", () => {
    setupFilters();
    renderCourses(courses);
});