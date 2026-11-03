
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* =========================================
       THEME TOGGLE
    ========================================= */

    const html = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle?.querySelector("i");

    try {
        const savedTheme = localStorage.getItem("portfolio-theme");

        if (savedTheme === "dark" || savedTheme === "light") {
            html.setAttribute("data-bs-theme", savedTheme);
        }
    } catch (error) {
        // Continue using the current theme if storage is unavailable.
    }

    function updateThemeIcon() {
        if (!themeIcon) return;

        const isDark = html.getAttribute("data-bs-theme") === "dark";

        themeIcon.className = isDark
            ? "bi bi-sun"
            : "bi bi-moon-stars";
    }

    updateThemeIcon();

    themeToggle?.addEventListener("click", function () {
        const isDark = html.getAttribute("data-bs-theme") === "dark";
        const newTheme = isDark ? "light" : "dark";

        html.setAttribute("data-bs-theme", newTheme);

        try {
            localStorage.setItem("portfolio-theme", newTheme);
        } catch (error) {
            // The theme still changes for the current page.
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

        navLinks.forEach(link => {
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
            } else if (linkURL.hash === currentHash) {
                link.classList.add("active");
            }
        });
    }

    updateActiveNavigation();

    window.addEventListener("hashchange", updateActiveNavigation);
    window.addEventListener("popstate", updateActiveNavigation);


    /* =========================================
       PROJECT SEARCH AND SEMESTER FILTER
    ========================================= */

    const searchInput = document.getElementById("projectSearch");
    const clearButton = document.getElementById("clearSearch");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // Supports both project-item and the original project card markup.
    const projectItems = document.querySelectorAll(
        ".project-item, .academic-project-card"
    );

    const semesterSections = document.querySelectorAll(".semester-section");

    const resultCount = document.getElementById("projectResultCount");
    const noProjects = document.getElementById("noProjects");

    let activeFilter = "all";

    function getProjectSemester(project) {
        const item = project.closest(".project-item") || project;

        return (
            item.dataset.semester ||
            project.dataset.semester ||
            project.closest(".semester-section")?.id ||
            ""
        ).toLowerCase();
    }

    function filterProjects() {
        const searchValue = (searchInput?.value || "")
            .toLowerCase()
            .trim();

        let visibleCount = 0;

        projectItems.forEach(project => {
            const semester = getProjectSemester(project);

            const searchableText = (
                (project.dataset.search || "") + " " +
                (project.dataset.title || "") + " " +
                (project.dataset.description || "") + " " +
                project.textContent
            ).toLowerCase();

            const matchesSearch = searchableText.includes(searchValue);

            const matchesFilter =
                activeFilter === "all" ||
                semester === activeFilter ||
                semester.includes(activeFilter);

            const shouldDisplay = matchesSearch && matchesFilter;

            project.style.display = shouldDisplay ? "" : "none";

            if (shouldDisplay) {
                visibleCount++;
            }
        });

        // Hide semester sections with no visible projects.
        semesterSections.forEach(section => {
            const visibleProjects = Array.from(
                section.querySelectorAll(
                    ".project-item, .academic-project-card"
                )
            ).filter(project => {
                return project.style.display !== "none" &&
                    getComputedStyle(project).display !== "none";
            });

            section.style.display =
                visibleProjects.length > 0 ? "" : "none";
        });

        if (resultCount) {
            resultCount.textContent =
                `Showing ${visibleCount} of ${projectItems.length} projects`;
        }

        if (noProjects) {
            noProjects.hidden = visibleCount !== 0;
        }
    }

    searchInput?.addEventListener("input", filterProjects);

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
                btn.setAttribute("aria-pressed", "false");
            });

            this.classList.add("active");
            this.setAttribute("aria-pressed", "true");

            activeFilter = (
                this.dataset.filter || "all"
            ).toLowerCase();

            filterProjects();
        });
    });

    function resetProjectFilters() {
        if (searchInput) {
            searchInput.value = "";
        }

        activeFilter = "all";

        filterButtons.forEach(button => {
            const isAll = button.dataset.filter === "all";

            button.classList.toggle("active", isAll);
            button.setAttribute("aria-pressed", String(isAll));
        });

        filterProjects();
        searchInput?.focus();
    }

    clearButton?.addEventListener("click", resetProjectFilters);

    document.getElementById("resetProjects")
        ?.addEventListener("click", resetProjectFilters);


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
                "visual identity across promotional materials and digital " +
                "marketing assets.",

            objectives: [
                "Develop a cohesive coffee shop brand identity.",
                "Create a recognizable logo for Brew Haven.",
                "Promote the Pumpkin Spice Latte concept through visual advertising.",
                "Maintain consistent branding across marketing materials.",
                "Create promotional designs that communicate the rainy-season theme."
            ],

            features: [
                "Original Brew Haven coffee shop logo.",
                "Pumpkin Spice Latte promotional poster.",
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

    const modalElement = document.getElementById("projectModal");

    const projectModal =
        modalElement && window.bootstrap?.Modal
            ? bootstrap.Modal.getOrCreateInstance(modalElement)
            : null;

    const modalTitle = document.getElementById("projectModalTitle");
    const modalCategory = document.getElementById("modalCategory");
    const modalDescription = document.getElementById("modalDescription");

    const modalObjectives = document.getElementById("modalObjectives");
    const modalFeatures = document.getElementById("modalFeatures");
    const modalTechnologies = document.getElementById("modalTechnologies");
    const modalImages = document.getElementById("modalProjectImages");

    function populateList(container, items, className = "") {
        if (!container) return;

        container.replaceChildren();

        items.forEach(item => {
            const element = document.createElement("li");
            element.textContent = item;

            if (className) {
                element.className = className;
            }

            container.appendChild(element);
        });
    }

    function openProjectDetails(projectID) {
        const project = projectData[projectID];

        if (!project) {
            console.warn("Project details not found:", projectID);
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

        populateList(modalObjectives, project.objectives);
        populateList(modalFeatures, project.features);

        if (modalTechnologies) {
            modalTechnologies.replaceChildren();

            project.technologies.forEach(technology => {
                const tag = document.createElement("span");

                tag.className = "technology-tag";
                tag.textContent = technology;

                modalTechnologies.appendChild(tag);
            });
        }

        if (modalImages) {
            modalImages.replaceChildren();

            project.images.forEach((imagePath, index) => {
                const imageWrapper = document.createElement("div");
                imageWrapper.className = "modal-project-image-wrapper";

                const image = document.createElement("img");
                image.src = imagePath;
                image.alt = `${project.title} — image ${index + 1}`;
                image.loading = "lazy";

                image.onerror = function () {
                    imageWrapper.remove();
                };

                imageWrapper.appendChild(image);
                modalImages.appendChild(imageWrapper);
            });
        }

        if (projectModal) {
            projectModal.show();
        } else {
            // Fallback if Bootstrap's modal markup or script is missing.
            console.warn(
                "Project modal is unavailable. Check the modal HTML and Bootstrap script."
            );
        }
    }

    // Buttons can use data-project="brew-haven", for example.
    document.querySelectorAll(".view-project-btn").forEach(button => {
        button.addEventListener("click", function () {
            openProjectDetails(this.dataset.project);
        });
    });

    // Also supports cards with a data-project attribute.
    document.querySelectorAll(".project-item[data-project], " +
        ".academic-project-card[data-project]").forEach(card => {

        card.querySelectorAll(".view-project-btn").forEach(() => {
            // The button handler above takes priority.
        });

        if (card.querySelector(".view-project-btn")) return;

        card.querySelectorAll(".view-project, .project-view-button")
            .forEach(button => {
                button.addEventListener("click", function (event) {
                    event.preventDefault();
                    openProjectDetails(card.dataset.project);
                });
            });
    });


    /* =========================================
       BREW HAVEN CAROUSEL
    ========================================= */

    const brewCarousel = document.getElementById("brewHavenCarousel");

    if (brewCarousel && window.bootstrap?.Carousel) {
        const carousel = bootstrap.Carousel.getOrCreateInstance(
            brewCarousel,
            {
                interval: false,
                ride: false,
                wrap: true,
                touch: true,
                keyboard: true
            }
        );

        // Explicit controls support custom previous/next buttons too.
        document.querySelectorAll("[data-brew-prev]").forEach(button => {
            button.addEventListener("click", () => carousel.prev());
        });

        document.querySelectorAll("[data-brew-next]").forEach(button => {
            button.addEventListener("click", () => carousel.next());
        });

        // Update optional slide counter and accessible slide labels.
        const slideCounter = document.getElementById("brewHavenSlideCounter");
        const slides = brewCarousel.querySelectorAll(".carousel-item");

        function updateCarouselCounter() {
            const activeSlide = brewCarousel.querySelector(".carousel-item.active");
            const activeIndex = Array.from(slides).indexOf(activeSlide);

            if (slideCounter) {
                slideCounter.textContent =
                    `${Math.max(activeIndex + 1, 1)} / ${slides.length}`;
            }
        }

        brewCarousel.addEventListener(
            "slid.bs.carousel",
            updateCarouselCounter
        );

        updateCarouselCounter();

        // Clicking an image opens it larger in a new browser tab.
        brewCarousel.querySelectorAll(".carousel-item img").forEach(image => {
            image.style.cursor = "zoom-in";
            image.title = "Open full-size image in a new tab";

            image.addEventListener("click", function () {
                if (!this.src) return;

                const imageWindow = window.open(this.src, "_blank", "noopener");

                if (imageWindow) {
                    imageWindow.opener = null;
                }
            });
        });
    }


    /* =========================================
       INITIALIZE
    ========================================= */

    filterProjects();

});
