/* =========================================================
   TROi MANIMTIM — PORTFOLIO DATA
   =========================================================

   EDIT YOUR PORTFOLIO CONTENT HERE.

   PROJECT PERIODS:
   - Prelim
   - Midterm
   - Final

   ========================================================= */

const portfolioData = {

    /* =====================================================
       SKILLS
       ===================================================== */

    skills: [

        {
            category: 'Technical',

            icon: 'bi-code-slash',

            items: [
                'HTML5',
                'CSS3',
                'JavaScript',
                'PHP',
                'MySQL',
                'Bootstrap',
                'Tailwind CSS',
                'Git / GitHub'
            ]
        },

        {
            category: 'Professional',

            icon: 'bi-person-workspace',

            items: [
                'Problem Solving',
                'Communication',
                'Team Collaboration',
                'Documentation',
                'UI/UX Fundamentals',
                'Project Planning'
            ]
        }

    ],


    /* =====================================================
       EXPERIENCE
       ===================================================== */

    experience: [

        {
            date: '2026 — Present',

            position: 'Full Stack',

            organization: 'Software Engineering 2',

            location: 'City College of Calamba',

            description:
                'Appointment and Payment System (Dental Clinic)'
        }

    ],


    /* =====================================================
       EDUCATION
       ===================================================== */

    education: [

        {
            year: '3rd Year',

            program: 'IT',

            school: 'City College of Calamba',

            detail: 'Bachelor of Science in Information Technology'
        }

    ],


    /* =====================================================
       CREDENTIALS
       ===================================================== */

    credentials: [

        {
            year: '2024',

            name: 'National Certificate on Computer Systems Servicing NC II',

            issuer: 'TESDA'
        }

    ],


    /* =====================================================
       ACADEMIC PROJECTS
       =====================================================

       IMPORTANT:

       period: 'Prelim'
       period: 'Midterm'
       period: 'Final'

       The project page automatically places each
       project in the correct section.

       ===================================================== */

    projects: [

        /* =================================================
           PRELIM
           ================================================= */

        {
            id: 'prelim-project-1',

            title: '[YOUR PRELIM PROJECT]',

            period: 'Prelim',

            category: 'Digital Arts',

            year: '2026',

            type: 'Academic',

            status: 'Completed',

            technologies: [
                '[TOOL / SOFTWARE]',
                '[TOOL / SOFTWARE]'
            ],

            description:
                '[Write a short description of your Prelim project.]',

            overview:
                '[Explain what the project is and what the activity was about.]',

            problem:
                '[Explain the design problem, requirement, or task given to you.]',

            solution:
                '[Explain how you approached and completed the project.]',

            features: [
                'Creative composition',
                'Visual design',
                'Organized layout'
            ],

            role: 'Designer',

            image:
                'assets/images/projects/prelim/prelim-project-1.jpg',

            demoUrl: '',

            sourceUrl: ''
        },


        {
            id: 'prelim-project-2',

            title: '[YOUR SECOND PRELIM PROJECT]',

            period: 'Prelim',

            category: 'Graphic Design',

            year: '2026',

            type: 'Academic',

            status: 'Completed',

            technologies: [
                '[TOOL / SOFTWARE]'
            ],

            description:
                '[Write a short description of your second Prelim project.]',

            overview:
                '[Explain the purpose and concept of the project.]',

            problem:
                '[Explain the requirements of the activity.]',

            solution:
                '[Explain how your design addressed the requirements.]',

            features: [
                'Visual hierarchy',
                'Typography',
                'Color application'
            ],

            role: 'Designer',

            image:
                'assets/images/projects/prelim/prelim-project-2.jpg',

            demoUrl: '',

            sourceUrl: ''
        },


        /* =================================================
           MIDTERM
           ================================================= */

        {
            id: 'midterm-project-1',

            title: '[YOUR MIDTERM PROJECT]',

            period: 'Midterm',

            category: 'Web Design',

            year: '2026',

            type: 'Academic',

            status: 'Completed',

            technologies: [
                'HTML',
                'CSS',
                'JavaScript'
            ],

            description:
                '[Write a short description of your Midterm project.]',

            overview:
                '[Explain what the project does and what you learned from creating it.]',

            problem:
                '[Explain the problem or task that the project addresses.]',

            solution:
                '[Explain how your project solves or addresses the task.]',

            features: [
                'Responsive interface',
                'Organized navigation',
                'User-friendly layout'
            ],

            role: 'Web Developer',

            image:
                'assets/images/projects/midterm/midterm-project-1.jpg',

            demoUrl: '',

            sourceUrl: ''
        },


        {
            id: 'midterm-project-2',

            title: '[YOUR SECOND MIDTERM PROJECT]',

            period: 'Midterm',

            category: 'Digital Arts',

            year: '2026',

            type: 'Academic',

            status: 'Completed',

            technologies: [
                '[TOOL / SOFTWARE]'
            ],

            description:
                '[Write a short description of your second Midterm project.]',

            overview:
                '[Explain the purpose and concept of this project.]',

            problem:
                '[Explain the requirements or design problem.]',

            solution:
                '[Explain how you completed the project.]',

            features: [
                'Creative design',
                'Visual composition',
                'Digital editing'
            ],

            role: 'Designer',

            image:
                'assets/images/projects/midterm/midterm-project-2.jpg',

            demoUrl: '',

            sourceUrl: ''
        },


        /* =================================================
           FINALS
           ================================================= */

        {
            id: 'final-project-1',

            title: 'WEB-BASED APPOINTMENT AND PAYMENT SYSTEM',

            period: 'Final',

            category: 'Web Development',

            year: '2025',

            type: 'Academic',

            status: 'Completed',

            technologies: [
                'HTML',
                'CSS',
                'JavaScript',
                'PHP',
                'MySQL'
            ],

            description:
                'A web-based system designed to manage appointments and payment-related records through a centralized platform.',

            overview:
                'The project focuses on creating a structured web-based system that can help organize appointment and payment information while providing a more convenient interface for managing records.',

            problem:
                'Manual appointment and payment processes can make it difficult to organize records, monitor schedules, and maintain accurate information.',

            solution:
                'The system provides a centralized web interface where appointment and payment information can be organized, managed, and stored in a database.',

            features: [
                'Appointment management',
                'Payment management',
                'Database integration',
                'Responsive interface',
                'Organized records'
            ],

            role: 'Full-Stack Developer',

            image:
                'assets/images/projects/final/appointment-payment-system.jpg',

            demoUrl: '',

            sourceUrl: ''
        },


        {
            id: 'final-project-2',

            title: '[YOUR SECOND FINAL PROJECT]',

            period: 'Final',

            category: 'Database System',

            year: '2026',

            type: 'Academic',

            status: 'Completed',

            technologies: [
                'JavaScript',
                'PHP',
                'MySQL'
            ],

            description:
                '[Write a short description of your Final project.]',

            overview:
                '[Explain what the project does and why it was created.]',

            problem:
                '[Explain the problem addressed by the project.]',

            solution:
                '[Explain how your system provides a solution.]',

            features: [
                'Data management',
                'Search and filtering',
                'Structured records',
                'Database integration'
            ],

            role: 'Full-Stack Developer',

            image:
                'assets/images/projects/final/final-project-2.jpg',

            demoUrl: '',

            sourceUrl: ''
        }

    ]

};