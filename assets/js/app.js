
/* =========================================
   PORTFOLIO WEBSITE
   APP.JS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const root = document.documentElement;

    const themeToggle =
        document.getElementById("themeToggle");


    /* =========================================
       THEME TOGGLE
       ========================================= */

    function theme(value) {

        root.dataset.bsTheme = value;

        localStorage.setItem(
            "portfolio-theme",
            value
        );

        if (themeToggle) {

            themeToggle.innerHTML =
                value === "dark"
                    ? '<i class="bi bi-sun"></i>'
                    : '<i class="bi bi-moon-stars"></i>';

        }

    }


    // Load saved theme
    theme(
        localStorage.getItem("portfolio-theme") || "light"
    );


    // Switch between light and dark mode
    themeToggle?.addEventListener("click", () => {

        const currentTheme = root.dataset.bsTheme;

        theme(
            currentTheme === "dark"
                ? "light"
                : "dark"
        );

    });


    /* =========================================
       FOOTER YEAR
       ========================================= */

    const yearElement =
        document.getElementById("year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =========================================
       RENDER PORTFOLIO DATA
       ========================================= */

    renderSkills();

    renderExperience();

    renderEducation();

    renderCredentials();


    /* =========================================
       CONTACT FORM
       =========================================

       The previous mailto handler has been
       removed.

       EmailJS now handles contact submissions
       through the script in index.html.

       This prevents the old mailto function
       from interfering with EmailJS.

       ========================================= */

});


/* =========================================
   RENDER SKILLS
   ========================================= */

function renderSkills() {

    const container =
        document.getElementById("skillsGrid");

    if (!container) {
        return;
    }

    container.innerHTML = portfolioData.skills.map(group => `

        <div class="col-md-6">

            <div class="skill-panel h-100 p-4">

                <div class="d-flex align-items-center gap-2 mb-3">

                    <span class="icon-box">
                        <i class="bi ${group.icon}"></i>
                    </span>

                    <h3 class="h5 fw-bold mb-0">
                        ${x(group.category)}
                    </h3>

                </div>

                <div class="d-flex flex-wrap gap-2">

                    ${group.items.map(skill => `

                        <span class="skill-pill">
                            ${x(skill)}
                        </span>

                    `).join("")}

                </div>

            </div>

        </div>

    `).join("");

}


/* =========================================
   RENDER EXPERIENCE
   ========================================= */

function renderExperience() {

    const container =
        document.getElementById("experienceTimeline");

    if (!container) {
        return;
    }

    container.innerHTML = portfolioData.experience.map(item => `

        <article class="timeline-item">

            <div class="timeline-dot"></div>

            <div class="timeline-card">

                <div class="small text-primary fw-bold mb-2">
                    ${x(item.date)}
                </div>

                <h3 class="h4 fw-bold mb-1">
                    ${x(item.position)}
                </h3>

                <div class="text-body-secondary small mb-3">

                    ${x(item.organization)}
                    ·
                    ${x(item.location)}

                </div>

                <p class="text-body-secondary mb-0">
                    ${x(item.description)}
                </p>

            </div>

        </article>

    `).join("");

}


/* =========================================
   RENDER EDUCATION
   ========================================= */

function renderEducation() {

    const container =
        document.getElementById("educationList");

    if (!container) {
        return;
    }

    container.innerHTML = portfolioData.education.map(item => `

        <article class="stack-card">

            <span class="badge text-bg-primary-subtle text-primary">
                ${x(item.year)}
            </span>

            <h4 class="h5 fw-bold mt-3 mb-1">
                ${x(item.degree)}
            </h4>

            <p class="mb-1 text-body-secondary">
                ${x(item.school)}
            </p>

            <small class="text-body-secondary">
                ${x(item.detail)}
            </small>

        </article>

    `).join("");

}


/* =========================================
   RENDER CERTIFICATES
   ========================================= */

function renderCredentials() {

    const container =
        document.getElementById("credentialsList");

    if (!container) {
        return;
    }

    container.innerHTML = portfolioData.credentials.map(item => `

        <article class="stack-card">

            <span class="badge text-bg-primary-subtle text-primary">
                ${x(item.year)}
            </span>

            <h4 class="h5 fw-bold mt-3 mb-1">
                ${x(item.name)}
            </h4>

            <p class="mb-0 text-body-secondary">
                ${x(item.issuer)}
            </p>

        </article>

    `).join("");

}


/* =========================================
   ESCAPE HTML
   ========================================= */

function x(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}
