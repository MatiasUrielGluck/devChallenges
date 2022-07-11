const app = new Vue({
    el: "#projects",
    data: {
        projectList: [
            {
                src: "./images/portfolio/404.png",
                tags: ["HTML", "CSS"],
                projectName: "404 Not Found",
                projectDesc: "Project description",
                demo: "https://404-not-found-matias-uriel-gluck.netlify.app/",
                code: "https://github.com/MatiasUrielGluck/devChallenges/tree/main/404-not-found-master"
            },
            {
                src: "./images/portfolio/checkout.png",
                tags: ["HTML", "CSS", "JavaScript"],
                projectName: "Checkout",
                projectDesc: "Project description",
                demo: "https://404-not-found-matias-uriel-gluck.netlify.app/",
                code: "https://github.com/MatiasUrielGluck/devChallenges/tree/main/404-not-found-master"
            },
            {
                src: "./images/portfolio/edie.png",
                tags: ["HTML", "CSS", "JavaScript"],
                projectName: "Edie Homepage",
                projectDesc: "Project description",
                demo: "https://404-not-found-matias-uriel-gluck.netlify.app/",
                code: "https://github.com/MatiasUrielGluck/devChallenges/tree/main/404-not-found-master"
            },
            {
                src: "./images/portfolio/gallery.png",
                tags: ["HTML", "CSS"],
                projectName: "My gallery",
                projectDesc: "Project description",
                demo: "https://404-not-found-matias-uriel-gluck.netlify.app/",
                code: "https://github.com/MatiasUrielGluck/devChallenges/tree/main/404-not-found-master"
            },
            {
                src: "./images/portfolio/recipe.png",
                tags: ["HTML", "CSS"],
                projectName: "Recipe page",
                projectDesc: "Project description",
                demo: "https://404-not-found-matias-uriel-gluck.netlify.app/",
                code: "https://github.com/MatiasUrielGluck/devChallenges/tree/main/404-not-found-master"
            },
            {
                src: "./images/portfolio/team.png",
                tags: ["HTML", "CSS"],
                projectName: "Team page",
                projectDesc: "Project description",
                demo: "https://404-not-found-matias-uriel-gluck.netlify.app/",
                code: "https://github.com/MatiasUrielGluck/devChallenges/tree/main/404-not-found-master"
            },
            {
                src: "./images/portfolio/pianos.png",
                tags: ["HTML", "CSS", "JavaScript", "Python", "Fullstack"],
                projectName: "Gluck Pianos",
                projectDesc: "Project description",
                demo: "https://404-not-found-matias-uriel-gluck.netlify.app/",
                code: "https://github.com/MatiasUrielGluck/devChallenges/tree/main/404-not-found-master"
            },
            {
                src: "./images/portfolio/sudoku.png",
                tags: ["Python"],
                projectName: "Sudoku",
                projectDesc: "Project description",
                demo: "https://404-not-found-matias-uriel-gluck.netlify.app/",
                code: "https://github.com/MatiasUrielGluck/devChallenges/tree/main/404-not-found-master"
            }
        ],
        
        filters: [],
        filteredProjectList: [],
        projectShowcase: [],
        projectsPerPage: 3,
        pages: 0,
        page: 0
    },
    methods: {
        configShowcase: async function(page) {
            // Configures the project showcase without filters, by page.
            document.querySelector('#projects').classList.remove('animate')
            document.querySelector('#projects').classList.add('animateOff')
            await this.sleep(500)

            this.projectShowcase = []

            if (this.filteredProjectList.length > 0) {
                let start = page * this.projectsPerPage;
                let end = page * this.projectsPerPage + this.projectsPerPage;

                for (let i = start; i < end; i++) {
                    if (i < this.filteredProjectList.length) {
                        this.projectShowcase.push(this.filteredProjectList[i]);
                    }
                }
            }
            
            document.querySelector('#projects').classList.remove('animateOff')
            document.querySelector('#projects').classList.add('animate')
        },

        changePage: function(num) {
            // Changes the actual page
            if (num === 0) {
                this.page = 0;
                this.configShowcase(this.page);
            } else if (num === -1 && this.page > 0) {
                this.page--;
                this.configShowcase(this.page);
            } else if (num === 1 && this.page < this.pages - 1) {
                this.page++;
                this.configShowcase(this.page);
            }
        },

        sleep: function(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        changeProjectPerPage() {
            // Helps with the responsive design

            if (window.innerWidth < 650) {
                this.projectsPerPage = 1;
            } else if (window.innerWidth < 881) {
                this.projectsPerPage = 2;
            } else {
                this.projectsPerPage = 3;
            }

            this.pages = Math.ceil(this.filteredProjectList.length / this.projectsPerPage);
            if (this.page > this.pages - 1) {
                this.page--;
            }
            
            this.configShowcase(this.page);
        },

        configFilteredProjectList: function() {
            // Clear the array
            this.filteredProjectList = []

            if (this.filters.length === 0) {
                // Copy all the projectList elements into the filtered list
                for (const project of this.projectList) {
                    this.filteredProjectList.push(project);
                }
            } else {
                for (const project of this.projectList) {
                    let save = true
                    for (const tag of this.filters) {
                        if (!project.tags.includes(tag)) {
                            save = false;
                            break;
                        }
                    }
                    if (save === true) {
                        this.filteredProjectList.push(project);
                    }
                }
            }
        },
        
        toggleFilter: function(filterName) {
            // If filterName (tag) is not in the actual filters, this function adds it.
            // If it is included in the filters, it removes the tag.
            if (this.filters.includes(filterName)) {
                let index = 0;
                for (let i = 0; i < this.filters.length; i++) {
                    if (this.filters[i] === filterName) {
                        index = i;
                        break;
                    }
                }
                this.filters.splice(index, 1);
            } else {
                this.filters.push(filterName);
            }

            // Reconfigure the projects list.
            this.configFilteredProjectList();
            this.pages = Math.ceil(this.filteredProjectList.length / this.projectsPerPage);
            this.configShowcase(this.page);
        }
    },
    mounted() {
        window.addEventListener('resize', () => {
            this.changeProjectPerPage()
        })

        this.configFilteredProjectList();
        this.changeProjectPerPage()
        
    }
});