
document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       THEME TOGGLE
    ========================================= */

    const html = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle?.querySelector("i");

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark" || savedTheme === "light") {
        html.setAttribute("data-bs-theme", savedTheme);
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

        localStorage.setItem("portfolio-theme", newTheme);

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

            const linkURL = new URL(link.href, window.location.href);

            const linkPage =
                linkURL.pathname.split("/").pop() || "index.html";

            link.classList.remove("active");

            if (linkPage !== currentPage) return;

            if (currentPage === "project.html" ||
                currentPage === "cv.html") {

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
       PROJECT SEARCH AND FILTER
    ========================================= */

    const searchInput = document.getElementById("projectSearch");
    const clearButton = document.getElementById("clearSearch");
    const filterButtons = document.querySelectorAll(".filter-btn");

    const projectItems = document.querySelectorAll(".project-item");
    const semesterSections = document.querySelectorAll(".semester-section");

    const resultCount = document.getElementById("projectResultCount");
    const noProjects = document.getElementById("noProjects");

    let activeFilter = "all";

    function filterProjects() {

        const searchValue = searchInput.value
            .toLowerCase()
            .trim();

        let visibleCount = 0;

        projectItems.forEach(project => {

            const semester = project.dataset.semester;

            const searchableText = (
                project.dataset.search + " " +
                project.textContent
            ).toLowerCase();

            const matchesSearch =
                searchableText.includes(searchValue);

            const matchesFilter =
                activeFilter === "all" ||
                semester === activeFilter;

            const shouldDisplay =
                matchesSearch && matchesFilter;

            project.style.display =
                shouldDisplay ? "" : "none";

            if (shouldDisplay) {
                visibleCount++;
            }

        });


        /* Hide empty semester sections */

        semesterSections.forEach(section => {

            const visibleProjects = section.querySelectorAll(
                ".project-item:not([style*='display: none'])"
            );

            section.style.display =
                visibleProjects.length > 0 ? "" : "none";

        });


        /* Update result counter */

        if (resultCount) {

            resultCount.textContent =
                `Showing ${visibleCount} of ${projectItems.length} projects`;

        }


        /* No results message */

        if (noProjects) {
            noProjects.hidden = visibleCount !== 0;
        }

    }


    /* REAL-TIME SEARCH */

    searchInput?.addEventListener("input", filterProjects);


    /* SEMESTER FILTER */

    filterButtons.forEach(button => {

        button.addEventListener("click", function () {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            this.classList.add("active");

            activeFilter = this.dataset.filter;

            filterProjects();

        });

    });


    /* CLEAR SEARCH */

    clearButton?.addEventListener("click", function () {

        searchInput.value = "";

        activeFilter = "all";

        filterButtons.forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.filter === "all"
            );
        });

        filterProjects();

        searchInput.focus();

    });


    /* RESET FILTERS */

    document.getElementById("resetProjects")
        ?.addEventListener("click", function () {

            clearButton?.click();

        });


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

    const projectModalElement =
        document.getElementById("projectModal");

    const projectModal = projectModalElement
        ? new bootstrap.Modal(projectModalElement)
        : null;

    const modalTitle =
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

    const modalImages =
        document.getElementById("modalProjectImages");


    /* OPEN PROJECT DETAILS */

    document.querySelectorAll(".view-project-btn")
        .forEach(button => {

            button.addEventListener("click", function () {

                const projectID = this.dataset.project;

                const project = projectData[projectID];

                if (!project) return;

                modalTitle.textContent = project.title;

                modalCategory.textContent = project.category;

                modalDescription.textContent = project.description;


                /* OBJECTIVES */

                modalObjectives.innerHTML = "";

                project.objectives.forEach(objective => {

                    const li = document.createElement("li");

                    li.textContent = objective;

                    modalObjectives.appendChild(li);

                });


                /* FEATURES */

                modalFeatures.innerHTML = "";

                project.features.forEach(feature => {

                    const li = document.createElement("li");

                    li.textContent = feature;

                    modalFeatures.appendChild(li);

                });


                /* TECHNOLOGIES */

                modalTechnologies.innerHTML = "";

                project.technologies.forEach(technology => {

                    const span = document.createElement("span");

                    span.className = "technology-tag";

                    span.textContent = technology;

                    modalTechnologies.appendChild(span);

                });


                /* PROJECT IMAGES */

                modalImages.innerHTML = "";

                project.images.forEach((imagePath, index) => {

                    const img = document.createElement("img");

                    img.src = imagePath;

                    img.alt = `${project.title} project image ${index + 1}`;

                    img.loading = "lazy";

                    img.onerror = function () {
                        this.style.display = "none";
                    };

                    modalImages.appendChild(img);

                });


                projectModal?.show();

            });

        });


    /* =========================================
       CAROUSEL
    ========================================= */

    const brewCarousel =
        document.getElementById("brewHavenCarousel");

    if (brewCarousel) {

        new bootstrap.Carousel(brewCarousel, {
            interval: false,
            ride: false,
            wrap: true,
            touch: true,
            keyboard: true
        });

    }


    /* INITIALIZE FILTERS */

    filterProjects();

});
