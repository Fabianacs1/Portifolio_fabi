document.addEventListener("DOMContentLoaded", function() {
    const username = 'Fabianacs1';
    const linkTopo = document.getElementById('link-topo');
    const sections = document.querySelectorAll('.section');
    const links = document.querySelectorAll('.nav__link');

    // Função para exibir repositórios do GitHub
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao buscar repositórios: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(repos => {
        const reposList = document.getElementById('github-repos-list');
        if (!reposList) {
            console.error('Elemento com ID "github-repos-list" não encontrado.');
            return;
        }

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

    // Função para mostrar/ocultar seções
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

    // Função para definir o link ativo
    const setActiveLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
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

    
    const toggleButtonVisibility = () => {
        if (window.pageYOffset > 10) { 
            linkTopo.style.display = 'block'; 
        } else {
            linkTopo.style.display = 'none'; 
        }
    };
    window.addEventListener('scroll', toggleButtonVisibility);
    toggleButtonVisibility(); 
});
