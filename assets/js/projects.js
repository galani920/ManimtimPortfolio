
/* =========================================================
   TROI MANIMTIM PORTFOLIO — PROJECT PAGE JAVASCRIPT
   File: assets/js/project.js

   Features:
   - Dark/light theme toggle
   - Persistent theme preference
   - Active navigation link
   - Live project search
   - Semester filters
   - Clear and reset buttons
   - Empty search result handling
   - Project details modal
   - Project image gallery
   - Brew Haven carousel initialization
   - Automatic footer year
========================================================= */

"use strict";

/* =========================================================
   PROJECT DATA
========================================================= */

const projectData = {
    fruitful: {
        title: "Fruitful Design",
        category: "Prelim | Academic Design",

        description:
            "An illustration project featuring a kiwi fruit. The design highlights the sliced fruit, its green interior, and its natural visual characteristics.",

        objectives: [
            "Create an illustration based on a fruit subject.",
            "Practice visual composition and digital illustration.",
            "Explore the use of color and shape in graphic design."
        ],

        features: [
            "Kiwi fruit illustration.",
            "Visual representation of the fruit's interior.",
            "Creative composition and color application."
        ],

        technologies: [
            "Illustration",
            "Digital Art"
        ],

        images: [
            "assets/images/PRELIMACT1.jpg"
        ]
    },

    brand: {
        title: "Brand Design",
        category: "Prelim | Branding",

        description:
            "A coffee-inspired logo design featuring a steaming cup and coffee-related visual elements. The activity focuses on developing a recognizable visual identity.",

        objectives: [
            "Develop a recognizable coffee brand concept.",
            "Apply visual identity and logo design principles.",
            "Create a design that represents a coffee-related business."
        ],

        features: [
            "Coffee-inspired visual identity.",
            "Steaming coffee cup illustration.",
            "Coffee-related graphic elements."
        ],

        technologies: [
            "Logo Design",
            "Branding",
            "Graphics"
        ],

        images: [
            "assets/images/PRELIMACT2.jpg"
        ]
    },

    "brew-haven": {
        title: "Brew Haven Coffee Shop",
        category: "Midterm | Branding and Campaign Design",

        description:
            "Brew Haven is a seasonal coffee shop branding concept centered on Pumpkin Spice Latte and the cozy atmosphere of the rainy season. The project develops a consistent visual identity across different promotional materials and digital marketing assets.",

        objectives: [
            "Develop a cohesive coffee shop brand identity.",
            "Create a recognizable logo for Brew Haven.",
            "Promote the Pumpkin Spice Latte concept through visual advertising.",
            "Maintain consistent branding across different marketing materials.",
            "Create promotional designs that communicate the rainy-season theme."
        ],

        features: [
            "Original Brew Haven coffee shop logo.",
            "Pumpkin Spice Latte promotional banner.",
            "Landing page visual design.",
            "Newsletter header design.",
            "Social media promotional post.",
            "Coordinated brown, orange, and cream color palette.",
            "Coffee-inspired illustrations and typography."
        ],

        technologies: [
            "Logo Design",
            "Branding",
            "Graphic Design",
            "Campaign Design",
            "Digital Advertising",
            "Visual Communication"
        ],

        images: [
            "assets/images/MIDTERMACT1.jpg",
            "assets/images/BANNER AD.jpg",
            "assets/images/LANDING PAGE.jpg",
            "assets/images/NEWSLETTER HEADER.jpg",
            "assets/images/SOCIAL MEDIA POST.jpg"
        ]
    },

    typography: {
        title: "Typography",
        category: "Midterm | Poster Design",

        description:
            "A Filipino horror movie poster concept titled Gabi ng Lagim. The design uses bold typography, a dark visual atmosphere, and contrasting colors to communicate suspense and horror.",

        objectives: [
            "Explore typography as a major visual design element.",
            "Create an engaging horror movie poster concept.",
            "Use contrast and composition to establish a mood."
        ],

        features: [
            "Bold typography.",
            "Dark visual background.",
            "Suspenseful horror-themed composition.",
            "Filipino-inspired movie poster concept."
        ],

        technologies: [
            "Typography",
            "Poster Design",
            "Graphics"
        ],

        images: [
            "assets/images/MIDTERMACT2.jpg"
        ]
    },

    wireframe: {
        title: "Wireframe",
        category: "Finals | Web Design",

        description:
            "A personal portfolio website wireframe designed to organize and present academic projects, skills, education, experience, and contact information.",

        objectives: [
            "Plan the structure of a personal portfolio website.",
            "Organize content into clear website sections.",
            "Establish a user-friendly navigation structure."
        ],

        features: [
            "Homepage layout.",
            "Projects section.",
            "About and skills sections.",
            "Education and experience sections.",
            "Contact section."
        ],

        technologies: [
            "Figma",
            "UI/UX Design",
            "Wireframing"
        ],

        images: [
            "assets/images/FINALACT1.jpg"
        ]
    }
};


/* =========================================================
   INITIALIZE AFTER HTML HAS LOADED
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENT REFERENCES
    ===================================================== */

    const htmlElement = document.documentElement;

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle
        ? themeToggle.querySelector("i")
        : null;

    const projectSearch = document.getElementById("projectSearch");
    const clearSearch = document.getElementById("clearSearch");
    const resetProjects = document.getElementById("resetProjects");
    const noProjectsReset = document.getElementById("noProjectsReset");

    const filterButtons = Array.from(
        document.querySelectorAll(".filter-btn")
    );

    const projectItems = Array.from(
        document.querySelectorAll(".project-item")
    );

    const semesterSections = Array.from(
        document.querySelectorAll(".semester-section")
    );

    const projectResultCount =
        document.getElementById("projectResultCount");

    const noProjects = document.getElementById("noProjects");

    const projectModalElement =
        document.getElementById("projectModal");

    const projectModalTitle =
        document.getElementById("projectModalTitle");

    const modalCategory =
        document.getElementById("modalCategory");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalObjectives =
        document.getElementById("modalObjectives");

    const modalFeatures =
        document.getElementById("modalFeatures");

    const modalTechnologies =
        document.getElementById("modalTechnologies");

    const modalProjectImages =
        document.getElementById("modalProjectImages");


    /* =====================================================
       GENERAL HELPERS
    ===================================================== */

    function safelyReadTheme() {
        try {
            return localStorage.getItem("portfolio-theme");
        } catch (error) {
            return null;
        }
    }

    function safelySaveTheme(theme) {
        try {
            localStorage.setItem("portfolio-theme", theme);
        } catch (error) {
            // Theme switching still works when storage is unavailable.
        }
    }

    function setTheme(theme, savePreference = true) {
        const selectedTheme = theme === "dark" ? "dark" : "light";

        htmlElement.setAttribute("data-bs-theme", selectedTheme);

        if (themeIcon) {
            themeIcon.classList.toggle(
                "bi-sun",
                selectedTheme === "dark"
            );

            themeIcon.classList.toggle(
                "bi-moon-stars",
                selectedTheme === "light"
            );
        }

        if (themeToggle) {
            const nextTheme =
                selectedTheme === "dark" ? "light" : "dark";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to " + nextTheme + " mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to " + nextTheme + " mode"
            );
        }

        if (savePreference) {
            safelySaveTheme(selectedTheme);
        }
    }


    /* =====================================================
       THEME TOGGLE
    ===================================================== */

    const savedTheme = safelyReadTheme();

    const initialTheme =
        savedTheme === "dark" || savedTheme === "light"
            ? savedTheme
            : (
                htmlElement.getAttribute("data-bs-theme") || "light"
            );

    setTheme(initialTheme, false);

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const currentTheme =
                htmlElement.getAttribute("data-bs-theme");

            setTheme(
                currentTheme === "dark" ? "light" : "dark"
            );
        });
    }


    /* =====================================================
       FOOTER YEAR
    ===================================================== */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       ACTIVE NAVIGATION
       Preserve the existing dropdown and its appearance.
    ===================================================== */

    const currentPage = (
        window.location.pathname.split("/").pop() || "index.html"
    ).toLowerCase();

    document.querySelectorAll(".nav-link-custom").forEach(function (link) {
        const href = link.getAttribute("href");

        if (!href) {
            return;
        }

        const linkPage = href.split("#")[0].toLowerCase();

        const isCurrentPage =
            linkPage !== "" && linkPage === currentPage;

        link.classList.toggle("active", isCurrentPage);

        if (isCurrentPage) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });


    /* =====================================================
       PROJECT SEARCH AND SEMESTER FILTERS
    ===================================================== */

    let activeFilter = "all";

    function getProjectSearchText(projectItem) {
        const card = projectItem.querySelector(".academic-project-card");

        return [
            projectItem.getAttribute("data-search") || "",
            projectItem.getAttribute("data-semester") || "",
            card ? card.textContent : ""
        ]
            .join(" ")
            .toLowerCase()
            .trim();
    }

    function updateFilterButtons() {
        filterButtons.forEach(function (button) {
            const isActive =
                button.getAttribute("data-filter") === activeFilter;

            button.classList.toggle("active", isActive);

            button.setAttribute(
                "aria-pressed",
                isActive ? "true" : "false"
            );
        });
    }

    function filterProjects() {
        const query = projectSearch
            ? projectSearch.value.trim().toLowerCase()
            : "";

        let visibleCount = 0;

        projectItems.forEach(function (projectItem) {
            const semester = (
                projectItem.getAttribute("data-semester") || ""
            ).toLowerCase();

            const matchesSemester =
                activeFilter === "all" ||
                semester === activeFilter;

            const matchesSearch =
                query === "" ||
                getProjectSearchText(projectItem).includes(query);

            const shouldShow = matchesSemester && matchesSearch;

            projectItem.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }
        });

        // Hide semester headings when all their cards are filtered out.
        semesterSections.forEach(function (section) {
            const sectionProjects = Array.from(
                section.querySelectorAll(".project-item")
            );

            const hasVisibleProject = sectionProjects.some(function (item) {
                return !item.hidden;
            });

            section.hidden = !hasVisibleProject;
        });

        // Show or hide the empty-results message.
        if (noProjects) {
            noProjects.hidden = visibleCount > 0;
        }

        // Keep the result counter accurate.
        if (projectResultCount) {
            projectResultCount.textContent =
                "Showing " + visibleCount +
                " of " + projectItems.length + " projects";
        }

        updateFilterButtons();
    }

    // Live search.
    if (projectSearch) {
        projectSearch.addEventListener("input", filterProjects);

        // Escape clears the search field.
        projectSearch.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                projectSearch.value = "";
                filterProjects();
            }
        });
    }

    // Clear search without changing the selected semester.
    if (clearSearch) {
        clearSearch.addEventListener("click", function () {
            if (projectSearch) {
                projectSearch.value = "";
                filterProjects();
                projectSearch.focus();
            }
        });
    }

    // Semester filter buttons.
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            activeFilter = button.getAttribute("data-filter") || "all";
            filterProjects();
        });
    });

    // Reset search and all semester filters.
    function resetAllProjectFilters(focusSearch = false) {
        if (projectSearch) {
            projectSearch.value = "";
        }

        activeFilter = "all";

        filterProjects();

        if (focusSearch && projectSearch) {
            projectSearch.focus();
        }
    }

    if (resetProjects) {
        resetProjects.addEventListener("click", function () {
            resetAllProjectFilters();
        });
    }

    if (noProjectsReset) {
        noProjectsReset.addEventListener("click", function () {
            resetAllProjectFilters(true);
        });
    }


    /* =====================================================
       PROJECT DETAILS MODAL
    ===================================================== */

    let projectModalInstance = null;

    if (
        projectModalElement &&
        typeof bootstrap !== "undefined" &&
        bootstrap.Modal
    ) {
        projectModalInstance =
            bootstrap.Modal.getOrCreateInstance(projectModalElement);
    }

    function createListItems(container, items) {
        if (!container) {
            return;
        }

        container.replaceChildren();

        items.forEach(function (item) {
            const listItem = document.createElement("li");
            listItem.textContent = item;
            container.appendChild(listItem);
        });
    }

    function createTechnologyTags(container, technologies) {
        if (!container) {
            return;
        }

        container.replaceChildren();

        technologies.forEach(function (technology) {
            const tag = document.createElement("span");

            tag.className = "technology-tag";
            tag.textContent = technology;

            container.appendChild(tag);
        });
    }

    function createProjectGallery(container, images, projectTitle) {
        if (!container) {
            return;
        }

        container.replaceChildren();

        images.forEach(function (imagePath, index) {
            const image = document.createElement("img");

            image.src = imagePath;
            image.alt =
                projectTitle + " — project image " + (index + 1);
            image.loading = "lazy";

            image.addEventListener("error", function () {
                const placeholder = document.createElement("div");

                placeholder.className =
                    "project-image-placeholder";

                placeholder.style.display = "flex";
                placeholder.style.minHeight = "160px";
                placeholder.style.height = "auto";
                placeholder.style.borderRadius = "12px";

                const icon = document.createElement("i");
                icon.className = "bi bi-image";
                icon.setAttribute("aria-hidden", "true");

                const message = document.createElement("span");
                message.textContent =
                    "Image unavailable: " +
                    imagePath.split("/").pop();

                placeholder.append(icon, message);

                image.replaceWith(placeholder);
            }, { once: true });

            container.appendChild(image);
        });
    }

    function openProject(projectId) {
        const project = projectData[projectId];

        if (!project) {
            console.error(
                "Project details not found for data-project:",
                projectId
            );

            return;
        }

        if (!projectModalInstance) {
            console.error(
                "The project modal could not initialize. " +
                "Check that the Bootstrap bundle loads before project.js."
            );

            return;
        }

        if (projectModalTitle) {
            projectModalTitle.textContent = project.title;
        }

        if (modalCategory) {
            modalCategory.textContent = project.category;
        }

        if (modalDescription) {
            modalDescription.textContent = project.description;
        }

        createListItems(modalObjectives, project.objectives);
        createListItems(modalFeatures, project.features);

        createTechnologyTags(
            modalTechnologies,
            project.technologies
        );

        createProjectGallery(
            modalProjectImages,
            project.images,
            project.title
        );

        projectModalInstance.show();
    }

    // Event delegation ensures every View Full Project button works.
    document.addEventListener("click", function (event) {
        const button = event.target.closest(".view-project-btn");

        if (!button) {
            return;
        }

        event.preventDefault();

        const projectId = button.getAttribute("data-project");

        if (projectId) {
            openProject(projectId);
        }
    });


    /* =====================================================
       BREW HAVEN CAROUSEL
    ===================================================== */

    const brewHavenCarousel =
        document.getElementById("brewHavenCarousel");

    if (
        brewHavenCarousel &&
        typeof bootstrap !== "undefined" &&
        bootstrap.Carousel
    ) {
        bootstrap.Carousel.getOrCreateInstance(
            brewHavenCarousel,
            {
                interval: false,
                ride: false,
                wrap: true,
                touch: true,
                keyboard: true
            }
        );
    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    // Ensure the initial results, count, and filters are synchronized.
    filterProjects();

});
