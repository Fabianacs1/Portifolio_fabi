document.addEventListener("DOMContentLoaded", function() {
    const username = 'Fabianacs1'; 

    const links = document.querySelectorAll('.nav__link');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const sections = document.querySelectorAll('.section');

    const revealSection = () => {
        const windowHeight = window.innerHeight;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < windowHeight) {
                section.classList.add('section--show');
            }
        });
    };

    window.addEventListener('scroll', revealSection);
    revealSection(); 

    const setActiveLink = () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); 

    const projects = [
        {
            name: "Gestão de Notas",
            description: "Projeto em grupo de sistema para gestão de notas escolares utilizando HTML, CSS e JavaScript.",
            url: "https://github.com/PhCalegari/Trabalho_nota_aluno.git"
        },
        {
            name: "Animal Finder",
            description: "Projeto em grupo de sistema para encontrar animais utilizando HTML, CSS e JavaScript.",
            url: "https://github.com/PhCalegari/AnimalFinderAEP.git"
        }
    ];

    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar repositórios: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(repos => {
            const reposList = document.getElementById('github-repos-list');

            projects.forEach(project => {
                const projectItem = document.createElement('div');
                projectItem.className = 'project pure-u-1 pure-u-md-1-2';
                projectItem.innerHTML = `
                    <h3 class="project__title">${project.name}</h3>
                    <p class="project__description">${project.description}</p>
                    <a href="${project.url}" target="_blank" class="project__link button">Ver Projeto</a>
                `;
                reposList.appendChild(projectItem);
            });
            repos.forEach(repo => {
                const repoItem = document.createElement('div');
                repoItem.className = 'project pure-u-1 pure-u-md-1-2';
                repoItem.innerHTML = `
                    <h3 class="project__title">${repo.name}</h3>
                    <p class="project__description">${repo.description || 'Sem descrição'}</p>
                    <a href="${repo.html_url}" target="_blank" class="project__link button">Ver Projeto</a>
                `;
                reposList.appendChild(repoItem);
            });
        })
        .catch(error => console.error('Erro ao buscar repositórios do GitHub:', error));
});
