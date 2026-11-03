
/* =========================================
   PORTFOLIO WEBSITE
   APP.JS — HOMEPAGE ONLY
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");

    /* =========================================
       THEME TOGGLE
       ========================================= */

    function setTheme(value) {
        root.setAttribute("data-bs-theme", value);
        localStorage.setItem("portfolio-theme", value);

        if (themeToggle) {
            themeToggle.innerHTML = value === "dark"
                ? '<i class="bi bi-sun"></i>'
                : '<i class="bi bi-moon-stars"></i>';
        }
    }

    const savedTheme = localStorage.getItem("portfolio-theme");
    setTheme(savedTheme === "dark" ? "dark" : "light");

    themeToggle?.addEventListener("click", () => {
        const currentTheme = root.getAttribute("data-bs-theme");
        setTheme(currentTheme === "dark" ? "light" : "dark");
    });

    /* =========================================
       FOOTER YEAR
       ========================================= */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /* =========================================
       HOMEPAGE CONTENT
       ========================================= */

    if (typeof portfolioData !== "undefined") {
        renderSkills();
        renderExperience();
        renderEducation();
        renderCredentials();
    } else {
        console.error(
            "Portfolio data was not loaded. Check that data.js is included before app.js."
        );
    }

    /* =========================================
       ACTIVE NAVIGATION
       ========================================= */

    const navLinks = document.querySelectorAll(
        ".portfolio-dropdown .dropdown-item"
    );

    const sections = document.querySelectorAll(
        "#home, #about, #skills, #experience, #education, #contact"
    );

    function updateActiveNavigation(hash) {
        const currentPage =
            window.location.pathname.split("/").pop() || "index.html";

        const currentHash = hash || window.location.hash || "#home";

        navLinks.forEach(link => {
            const linkURL = new URL(link.href, window.location.href);
            const linkPage =
                linkURL.pathname.split("/").pop() || "index.html";

            link.classList.remove("active");

            if (linkPage !== currentPage) return;

            if (currentPage === "project.html" || currentPage === "cv.html") {
                link.classList.add("active");
            } else if (
                linkPage === "index.html" &&
                linkURL.hash === currentHash
            ) {
                link.classList.add("active");
            }
        });
    }

    updateActiveNavigation();

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const linkURL = new URL(link.href, window.location.href);

            if (
                linkURL.pathname === window.location.pathname &&
                linkURL.hash
            ) {
                updateActiveNavigation(linkURL.hash);
            }
        });
    });

    window.addEventListener("hashchange", () => {
        updateActiveNavigation();
    });

    window.addEventListener("popstate", () => {
        updateActiveNavigation();
    });

    /* Highlight the section currently in view */
    if ("IntersectionObserver" in window && sections.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateActiveNavigation("#" + entry.target.id);
                }
            });
        }, {
            rootMargin: "-25% 0px -65% 0px"
        });

        sections.forEach(section => observer.observe(section));
    }
});


/* =========================================
   RENDER SKILLS
   ========================================= */

function renderSkills() {
    const container = document.getElementById("skillsGrid");

    if (!container || typeof portfolioData === "undefined") return;

    container.innerHTML = portfolioData.skills.map(group => `
        <div class="col-md-6">
            <div class="skill-panel h-100 p-4">
                <div class="d-flex align-items-center gap-2 mb-3">
                    <span class="icon-box">
                        <i class="bi ${x(group.icon)}"></i>
                    </span>

                    <h3 class="h5 fw-bold mb-0">
                        ${x(group.category)}
                    </h3>
                </div>

                <div class="d-flex flex-wrap gap-2">
                    ${group.items.map(skill => `
                        <span class="skill-pill">${x(skill)}</span>
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
    const container = document.getElementById("experienceTimeline");

    if (!container || typeof portfolioData === "undefined") return;

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
                    ${x(item.organization)} · ${x(item.location)}
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
    const container = document.getElementById("educationList");

    if (!container || typeof portfolioData === "undefined") return;

    container.innerHTML = portfolioData.education.map(item => `
        <article class="education-entry">
            <span class="education-year">${x(item.year)}</span>

            <h4 class="education-title">
                ${x(item.degree)}
            </h4>

            <p class="education-school">
                ${x(item.school)}
            </p>

            <p class="education-description mb-0">
                ${x(item.detail)}
            </p>
        </article>
    `).join("");
}


/* =========================================
   RENDER CERTIFICATES
   ========================================= */

function renderCredentials() {
    const container = document.getElementById("credentialsList");

    if (!container || typeof portfolioData === "undefined") return;

    container.innerHTML = portfolioData.credentials.map(item => `
        <article class="education-entry">
            <span class="education-year">${x(item.year)}</span>

            <h4 class="education-title">
                ${x(item.name)}
            </h4>

            <p class="education-school mb-0">
                ${x(item.issuer)}
            </p>
        </article>
    `).join("");
}


/* =========================================
   ESCAPE HTML
   ========================================= */

function x(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
