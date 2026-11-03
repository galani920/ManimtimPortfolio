```javascript
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* =========================================
       THEME TOGGLE
    ========================================= */

    const html = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle?.querySelector("i");

    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem("portfolio-theme");
    } catch (error) {
        // Continue using the page's default theme if storage is unavailable.
    }

    if (savedTheme === "dark" || savedTheme === "light") {
        html.setAttribute("data-bs-theme", savedTheme);
    }

    function updateThemeIcon() {
        if (!themeIcon) return;

        const isDark = html.getAttribute("data-bs-theme") === "dark";

        themeIcon.className = isDark
            ? "bi bi-sun"
            : "bi bi-moon-stars";

        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        themeToggle.setAttribute("aria-pressed", String(isDark));
    }

    updateThemeIcon();

    themeToggle?.addEventListener("click", function () {
        const isDark = html.getAttribute("data-bs-theme") === "dark";
        const newTheme = isDark ? "light" : "dark";

        html.setAttribute("data-bs-theme", newTheme);

        try {
            localStorage.setItem("portfolio-theme", newTheme);
        } catch (error) {
            // The theme still works for the current page session.
        }

        updateThemeIcon();
    });


    /* =========================================
       FOOTER YEAR
    ========================================= */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const navLinks = document.querySelectorAll(".nav-link-custom");

    function updateActiveNavigation() {
        const currentPage =
            window.location.pathname.split("/").pop() || "index.html";

        const currentHash = window.location.hash || "#home";

        navLinks.forEach(function (link) {
            let linkURL;

            try {
                linkURL = new URL(link.href, window.location.href);
            } catch (error) {
                return;
            }

            const linkPage =
                linkURL.pathname.split("/").pop() || "index.html";

            link.classList.remove("active");

            if (linkPage !== currentPage) return;

            if (
                currentPage === "project.html" ||
                currentPage === "cv.html"
            ) {
                link.classList.add("active");
                return;
            }

            if (linkURL.hash === currentHash) {
                link.classList.add("active");
            }
        });
    }

    updateActiveNavigation();

    window.addEventListener("hashchange", updateActiveNavigation);
    window.addEventListener("popstate", updateActiveNavigation);


    /* =========================================
       PROJECT SEARCH AND SEMESTER FILTERS
    ========================================= */

    const searchInput = document.getElementById("projectSearch");
    const clearButton = document.getElementById("clearSearch");
    const resetButton = document.getElementById("resetProjects");
    const noProjectsReset = document.getElementById("noProjectsReset");

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectItems = Array.from(
        document.querySelectorAll(".project-item")
    );
    const semesterSections = document.querySelectorAll(".semester-section");

    const resultCount = document.getElementById("projectResultCount");
    const noProjects = document.getElementById("noProjects");

    let activeFilter = "all";

    function normalizeText(value) {
        return String(value || "")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, " ");
    }

    function updateFilterButtons() {
        filterButtons.forEach(function (button) {
            const isActive = (button.dataset.filter || "all") === activeFilter;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
    }

    function filterProjects() {
        const searchValue = normalizeText(searchInput?.value);
        let visibleCount = 0;

        projectItems.forEach(function (project) {
            const semester = project.dataset.semester || "all";

            const searchableText = normalizeText(
                (project.dataset.search || "") + " " +
                project.textContent
            );

            const matchesSearch =
                searchValue === "" || searchableText.includes(searchValue);

            const matchesFilter =
                activeFilter === "all" || semester === activeFilter;

            const shouldDisplay = matchesSearch && matchesFilter;

            project.style.display = shouldDisplay ? "" : "none";
            project.setAttribute("aria-hidden", String(!shouldDisplay));

            if (shouldDisplay) {
                visibleCount++;
            }
        });

        /* Hide semester headings when no cards match. */

        semesterSections.forEach(function (section) {
            const visibleProjects = Array.from(
                section.querySelectorAll(".project-item")
            ).some(function (project) {
                return project.style.display !== "none";
            });

            section.style.display = visibleProjects ? "" : "none";
        });

        /* Update the results counter. */

        if (resultCount) {
            resultCount.textContent =
                `Showing ${visibleCount} of ${projectItems.length} projects`;
        }

        /* Display the empty-results message. */

        if (noProjects) {
            noProjects.hidden = visibleCount !== 0;
        }

        updateFilterButtons();
    }

    /* Search as the user types. */

    searchInput?.addEventListener("input", filterProjects);

    /* Filter by semester. */

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            activeFilter = button.dataset.filter || "all";
            filterProjects();
        });
    });

    /* Clear the search field and show projects for the active filter. */

    clearButton?.addEventListener("click", function () {
        if (searchInput) {
            searchInput.value = "";
        }

        filterProjects();
        searchInput?.focus();
    });

    /* Reset both the search and semester filter. */

    function resetProjectFilters() {
        if (searchInput) {
            searchInput.value = "";
        }

        activeFilter = "all";

        filterProjects();
    }

    resetButton?.addEventListener("click", resetProjectFilters);
    noProjectsReset?.addEventListener("click", resetProjectFilters);


    /* =========================================
       PROJECT DETAILS DATA
    ========================================= */

    const projectData = {
        fruitful: {
            title: "Fruitful Design",
            category: "Prelim | Academic Design",

            description:
                "An illustration project featuring a kiwi fruit. " +
                "The design highlights the sliced fruit, its green interior, " +
                "and its natural visual characteristics.",

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
                "A coffee-inspired logo design featuring a steaming cup " +
                "and coffee-related visual elements. The activity focuses " +
                "on developing a recognizable visual identity.",

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
                "Brew Haven is a seasonal coffee shop branding concept " +
                "centered on Pumpkin Spice Latte and the cozy atmosphere " +
                "of the rainy season. The project develops a consistent " +
                "visual identity across different promotional materials " +
                "and digital marketing assets.",

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
                "A Filipino horror movie poster concept titled " +
                "Gabi ng Lagim. The design uses bold typography, " +
                "a dark visual atmosphere, and contrasting colors " +
                "to communicate suspense and horror.",

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
                "A personal portfolio website wireframe designed " +
                "to organize and present academic projects, skills, " +
                "education, experience, and contact information.",

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


    /* =========================================
       PROJECT DETAILS MODAL
    ========================================= */

    const projectModalElement = document.getElementById("projectModal");

    const projectModal =
        projectModalElement &&
        typeof bootstrap !== "undefined" &&
        bootstrap.Modal
            ? bootstrap.Modal.getOrCreateInstance(projectModalElement)
            : null;

    const modalTitle = document.getElementById("projectModalTitle");
    const modalCategory = document.getElementById("modalCategory");
    const modalDescription = document.getElementById("modalDescription");
    const modalObjectives = document.getElementById("modalObjectives");
    const modalFeatures = document.getElementById("modalFeatures");
    const modalTechnologies = document.getElementById("modalTechnologies");
    const modalImages = document.getElementById("modalProjectImages");

    function createListItems(container, items) {
        if (!container) return;

        container.replaceChildren();

        items.forEach(function (itemText) {
            const listItem = document.createElement("li");
            listItem.textContent = itemText;
            container.appendChild(listItem);
        });
    }

    function createTechnologyTags(container, technologies) {
        if (!container) return;

        container.replaceChildren();

        technologies.forEach(function (technology) {
            const tag = document.createElement("span");

            tag.className = "technology-tag";
            tag.textContent = technology;

            container.appendChild(tag);
        });
    }

    function createProjectGallery(container, project) {
        if (!container) return;

        container.replaceChildren();

        project.images.forEach(function (imagePath, index) {
            const image = document.createElement("img");

            image.src = imagePath;
            image.alt = `${project.title} project image ${index + 1}`;
            image.loading = "lazy";

            image.addEventListener("error", function () {
                image.remove();
            }, { once: true });

            container.appendChild(image);
        });
    }

    function openProjectDetails(projectID) {
        const project = projectData[projectID];

        if (!project) {
            console.warn(`No project details found for "${projectID}".`);
            return;
        }

        if (modalTitle) {
            modalTitle.textContent = project.title;
        }

        if (modalCategory) {
            modalCategory.textContent = project.category;
        }

        if (modalDescription) {
            modalDescription.textContent = project.description;
        }

        createListItems(modalObjectives, project.objectives);
        createListItems(modalFeatures, project.features);
        createTechnologyTags(modalTechnologies, project.technologies);
        createProjectGallery(modalImages, project);

        if (projectModal) {
            projectModal.show();
        } else {
            console.error(
                "The project modal could not open. Check that Bootstrap's JavaScript bundle is loaded."
            );
        }
    }

    document.querySelectorAll(".view-project-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            openProjectDetails(button.dataset.project);
        });
    });


    /* =========================================
       BREW HAVEN IMAGE CAROUSEL
    ========================================= */

    const brewCarousel = document.getElementById("brewHavenCarousel");

    if (
        brewCarousel &&
        typeof bootstrap !== "undefined" &&
        bootstrap.Carousel
    ) {
        bootstrap.Carousel.getOrCreateInstance(brewCarousel, {
            interval: false,
            ride: false,
            wrap: true,
            touch: true,
            keyboard: true
        });
    }


    /* =========================================
       PROJECT IMAGE FALLBACKS
    ========================================= */

    document.querySelectorAll(".academic-project-image").forEach(function (image) {
        function showImageFallback() {
            image.style.display = "none";

            const placeholder = image.nextElementSibling;

            if (placeholder?.classList.contains("project-image-placeholder")) {
                placeholder.style.display = "flex";
            }
        }

        image.addEventListener("error", showImageFallback);

        // Also handle images that failed before this script initialized.
        if (image.complete && image.naturalWidth === 0) {
            showImageFallback();
        }
    });


    /* =========================================
       INITIALIZE PAGE
    ========================================= */

    updateActiveNavigation();
    filterProjects();
});
```
