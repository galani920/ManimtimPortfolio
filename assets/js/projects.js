
"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const html = document.documentElement;

    /* =========================================
       THEME TOGGLE
    ========================================= */

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle
        ? themeToggle.querySelector("i")
        : null;

    function getSavedTheme() {
        try {
            const savedTheme = localStorage.getItem("portfolio-theme");

            return savedTheme === "dark" || savedTheme === "light"
                ? savedTheme
                : null;
        } catch (error) {
            return null;
        }
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem("portfolio-theme", theme);
        } catch (error) {
            // Theme switching still works if browser storage is unavailable.
        }
    }

    function applyTheme(theme) {
        html.setAttribute("data-bs-theme", theme);

        if (themeIcon) {
            themeIcon.className = theme === "dark"
                ? "bi bi-sun"
                : "bi bi-moon-stars";
        }

        if (themeToggle) {
            themeToggle.setAttribute(
                "aria-label",
                theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

            themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
        }
    }

    applyTheme(getSavedTheme() || html.getAttribute("data-bs-theme") || "light");

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const currentTheme = html.getAttribute("data-bs-theme");
            const nextTheme = currentTheme === "dark" ? "light" : "dark";

            applyTheme(nextTheme);
            saveTheme(nextTheme);
        });
    }

    /* =========================================
       BOOTSTRAP NAVIGATION DROPDOWN
    ========================================= */

    const dropdownButton = document.querySelector(
        ".portfolio-menu-button[data-bs-toggle='dropdown']"
    );

    if (dropdownButton) {
        if (typeof bootstrap !== "undefined" && bootstrap.Dropdown) {
            bootstrap.Dropdown.getOrCreateInstance(dropdownButton);
        } else {
            console.error(
                "Bootstrap JavaScript was not loaded. " +
                "Check the Bootstrap bundle script in project.html."
            );
        }
    }

    /* =========================================
       ACTIVE NAVIGATION LINK
    ========================================= */

    const navLinks = document.querySelectorAll(
        ".portfolio-dropdown .dropdown-item"
    );

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase() || "index.html";

    const currentHash = window.location.hash;

    navLinks.forEach(function (link) {
        const url = new URL(link.href, window.location.href);
        const targetPage = url.pathname.split("/").pop().toLowerCase();

        let isActive = false;

        if (targetPage === "project.html") {
            isActive = currentPage === "project.html";
        } else if (targetPage === "cv.html") {
            isActive = currentPage === "cv.html";
        } else if (targetPage === "index.html") {
            isActive = currentPage === "index.html" &&
                url.hash === currentHash &&
                url.hash !== "";
        }

        if (isActive) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });

    /* =========================================
       FOOTER YEAR
    ========================================= */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /* =========================================
       PROJECT IMAGE FALLBACKS
       Preserve the existing placeholder design.
    ========================================= */

    document.querySelectorAll(".academic-project-image").forEach(function (image) {
        function showPlaceholder() {
            image.style.display = "none";

            const placeholder = image.nextElementSibling;

            if (
                placeholder &&
                placeholder.classList.contains("project-image-placeholder")
            ) {
                placeholder.style.display = "flex";
            }
        }

        image.addEventListener("error", showPlaceholder);

        if (image.complete && image.naturalWidth === 0) {
            showPlaceholder();
        }
    });

    /* =========================================
       OPTIONAL PROJECT SEARCH AND FILTERS
       These handlers activate automatically if
       the matching controls exist in the HTML.
    ========================================= */

    const searchInput = document.getElementById("projectSearch");
    const clearSearchButton = document.getElementById("clearSearch");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const resetButtons = [
        document.getElementById("resetProjects"),
        document.getElementById("noProjectsReset")
    ].filter(Boolean);

    const projectItems = document.querySelectorAll(".project-item");
    const semesterSections = document.querySelectorAll(".semester-section");
    const resultCount = document.getElementById("projectResultCount");
    const noProjects = document.getElementById("noProjects");

    let activeFilter = "all";

    function filterProjects() {
        const query = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        let visibleCount = 0;

        projectItems.forEach(function (item) {
            const semester = (
                item.dataset.semester ||
                item.closest(".semester-section")?.id ||
                ""
            ).toLowerCase();

            const searchText = (
                (item.dataset.search || "") + " " + item.textContent
            ).toLowerCase();

            const matchesFilter =
                activeFilter === "all" || semester === activeFilter;

            const matchesSearch = searchText.includes(query);
            const visible = matchesFilter && matchesSearch;

            item.classList.toggle("d-none", !visible);
            item.hidden = !visible;

            if (visible) {
                visibleCount++;
            }
        });

        semesterSections.forEach(function (section) {
            const items = section.querySelectorAll(".project-item");

            if (items.length > 0) {
                const hasVisibleItem = Array.from(items).some(function (item) {
                    return !item.hidden;
                });

                section.classList.toggle("d-none", !hasVisibleItem);
            }
        });

        if (resultCount) {
            resultCount.textContent =
                "Showing " + visibleCount + " of " +
                projectItems.length + " projects";
        }

        if (noProjects) {
            noProjects.classList.toggle("d-none", visibleCount > 0);
        }

        if (clearSearchButton) {
            clearSearchButton.classList.toggle(
                "d-none",
                !searchInput || searchInput.value.length === 0
            );
        }
    }

    function resetProjects() {
        activeFilter = "all";

        if (searchInput) {
            searchInput.value = "";
        }

        filterButtons.forEach(function (button) {
            const active = button.dataset.filter === "all";

            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });

        filterProjects();
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterProjects);
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            activeFilter = button.dataset.filter || "all";

            filterButtons.forEach(function (otherButton) {
                const active = otherButton === button;

                otherButton.classList.toggle("active", active);
                otherButton.setAttribute("aria-pressed", String(active));
            });

            filterProjects();
        });
    });

    if (clearSearchButton) {
        clearSearchButton.addEventListener("click", function () {
            if (searchInput) {
                searchInput.value = "";
                searchInput.focus();
            }

            filterProjects();
        });
    }

    resetButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            resetProjects();
        });
    });

    /* =========================================
       INITIALIZE OPTIONAL FILTERS
    ========================================= */

    if (projectItems.length > 0) {
        filterProjects();
    }
});
