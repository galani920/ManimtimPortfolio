/* =========================================================
   ACADEMIC PROJECTS
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    const projects =
        Array.isArray(portfolioData.projects)
            ? portfolioData.projects
            : [];


    /* =====================================================
       PROJECT CONTAINERS
       ===================================================== */

    const containers = {

        Prelim:
            document.getElementById('prelim-projects'),

        Midterm:
            document.getElementById('midterm-projects'),

        Final:
            document.getElementById('final-projects')

    };


    /* =====================================================
       SECTION CONTAINERS
       ===================================================== */

    const sections = {

        Prelim:
            document.getElementById('prelim-section'),

        Midterm:
            document.getElementById('midterm-section'),

        Final:
            document.getElementById('final-section')

    };


    /* =====================================================
       ESCAPE HTML
       Prevents accidental HTML injection in content.
       ===================================================== */

    function escapeHTML(value) {

        const div =
            document.createElement('div');

        div.textContent =
            value ?? '';

        return div.innerHTML;

    }


    /* =====================================================
       CREATE TECHNOLOGY TAGS
       ===================================================== */

    function createTechnologyTags(technologies) {

        if (
            !Array.isArray(technologies) ||
            technologies.length === 0
        ) {

            return '';

        }


        return technologies
            .map(
                technology => `
                    <span class="skill-pill">
                        ${escapeHTML(technology)}
                    </span>
                `
            )
            .join('');

    }


    /* =====================================================
       CREATE PROJECT CARD
       ===================================================== */

    function createProjectCard(project) {

        const title =
            escapeHTML(project.title);

        const category =
            escapeHTML(project.category);

        const year =
            escapeHTML(project.year);

        const description =
            escapeHTML(project.description);

        const image =
            escapeHTML(project.image);

        const id =
            encodeURIComponent(project.id);


        return `

            <div class="col-md-6 col-xl-4">

                <article class="project-card h-100">


                    <!-- PROJECT IMAGE -->

                    <div class="project-image-wrapper">

                        <img
                            src="${image}"
                            alt="${title}"
                            class="project-image"
                            loading="lazy"
                        >

                    </div>


                    <!-- PROJECT CONTENT -->

                    <div class="p-4 d-flex flex-column h-100">


                        <!-- META -->

                        <div
                            class="d-flex justify-content-between align-items-center gap-2 mb-3"
                        >

                            <span class="tech-tag">

                                ${category}

                            </span>


                            <span class="small text-muted">

                                ${year}

                            </span>

                        </div>


                        <!-- TITLE -->

                        <h3 class="h5 fw-bold mb-2">

                            ${title}

                        </h3>


                        <!-- DESCRIPTION -->

                        <p class="text-secondary small mb-4">

                            ${description}

                        </p>


                        <!-- TECHNOLOGIES -->

                        <div
                            class="d-flex flex-wrap gap-2 mb-4"
                        >

                            ${createTechnologyTags(
                                project.technologies
                            )}

                        </div>


                        <!-- BUTTON -->

                        <div class="mt-auto">

                            <a
                                href="project.html?id=${id}"
                                class="btn btn-outline-primary btn-sm"
                            >

                                View Project

                                <i
                                    class="bi bi-arrow-right ms-1"
                                ></i>

                            </a>

                        </div>

                    </div>

                </article>

            </div>

        `;

    }


    /* =====================================================
       CREATE EMPTY STATE
       ===================================================== */

    function createEmptyState(period) {

        return `

            <div class="col-12">

                <div class="empty-state">

                    <i
                        class="bi bi-folder2-open fs-2 mb-3"
                    ></i>

                    <p class="mb-0 text-secondary">

                        No ${escapeHTML(period)}
                        projects have been added yet.

                    </p>

                </div>

            </div>

        `;

    }


    /* =====================================================
       RENDER PROJECTS
       ===================================================== */

    function renderProjects(period) {

        const container =
            containers[period];

        const section =
            sections[period];


        if (!container) {
            return;
        }


        const filteredProjects =
            projects.filter(project => {

                if (!project.period) {
                    return false;
                }


                return (
                    project.period.toLowerCase() ===
                    period.toLowerCase()
                );

            });


        /* ================================================
           HIDE EMPTY SECTIONS
           ================================================ */

        if (filteredProjects.length === 0) {

            container.innerHTML =
                createEmptyState(period);

            return;

        }


        /* ================================================
           SHOW SECTION
           ================================================ */

        if (section) {

            section.style.display =
                '';

        }


        /* ================================================
           CREATE CARDS
           ================================================ */

        container.innerHTML =
            filteredProjects
                .map(createProjectCard)
                .join('');

    }


    /* =====================================================
       RENDER ALL THREE SECTIONS
       ===================================================== */

    renderProjects('Prelim');

    renderProjects('Midterm');

    renderProjects('Final');

});