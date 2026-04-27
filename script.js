// Script per componenti interattivi del portfolio

let selectedFilter = null;

// Carica i progetti dinamicamente dal CMS
document.addEventListener('DOMContentLoaded', () => {
    loadFilterTags();
    loadProjects();
    addAnimations();
});

// Funzione per estrarre tutti i tag unici dai progetti
function getAllUniqueTags() {
    const projects = getAllProjects();
    const allTags = new Set();
    
    projects.forEach(project => {
        project.tags.forEach(tag => {
            allTags.add(tag);
        });
    });
    
    return Array.from(allTags).sort();
}

// Funzione per caricare i bottoni di filtro
function loadFilterTags() {
    const filterContainer = document.getElementById('filterTags');
    const uniqueTags = getAllUniqueTags();
    
    // Bottone "All" per resettare il filtro
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.textContent = 'All';
    allBtn.addEventListener('click', () => {
        selectedFilter = null;
        filterProjects();
        updateFilterButtons();
    });
    filterContainer.appendChild(allBtn);
    
    // Bottoni per ogni tag
    uniqueTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = tag;
        btn.addEventListener('click', () => {
            selectedFilter = tag;
            filterProjects();
            updateFilterButtons();
        });
        filterContainer.appendChild(btn);
    });
}

// Funzione per aggiornare lo stato dei bottoni di filtro
function updateFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        const isAllBtn = btn.textContent === 'All';
        const isSelected = selectedFilter === null ? isAllBtn : btn.textContent === selectedFilter;
        
        if (isSelected) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Funzione per filtrare e visualizzare i progetti
function filterProjects() {
    const projects = document.querySelectorAll('.project');
    const allProjects = getAllProjects();
    
    projects.forEach(projectElement => {
        const projectId = parseInt(projectElement.getAttribute('data-project-id'));
        const projectData = allProjects.find(p => p.id === projectId);
        
        if (!selectedFilter) {
            // Mostra tutti i progetti
            projectElement.classList.remove('disabled');
        } else if (projectData && projectData.tags.includes(selectedFilter)) {
            // Mostra progetti con il tag selezionato
            projectElement.classList.remove('disabled');
        } else {
            // Oscura progetti senza il tag
            projectElement.classList.add('disabled');
        }
    });
}

// Funzione per caricare i progetti
function loadProjects() {
    const projectsList = document.getElementById('projectsList');
    const projects = getAllProjects();
    
    projects.forEach((project, index) => {
        const article = document.createElement('article');
        article.className = 'project';
        article.style.opacity = '0';
        article.style.animation = `fadeIn 0.6s ease forwards`;
        article.style.animationDelay = `${index * 0.1}s`;
        article.setAttribute('data-project-id', project.id);
        
        const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        article.innerHTML = `
            <a href="project.html?id=${project.id}" class="project-link" style="text-decoration: none; color: inherit;">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">
                    ${project.description}
                </p>
                <div class="project-meta">
                    ${tagsHTML}
                </div>
            </a>
        `;
        
        projectsList.appendChild(article);
    });
    
    // Salva il titolo del progetto in sessionStorage quando clicchi
    saveProjectTitle();
}

function saveProjectTitle() {
    const projects = getAllProjects();
    const links = document.querySelectorAll('.project-link');
    
    links.forEach((link) => {
        link.addEventListener('click', function() {
            const projectId = parseInt(link.closest('.project').getAttribute('data-project-id'));
            const project = projects.find(p => p.id === projectId);
            if (project) {
                sessionStorage.setItem('projectTitle', project.title);
            }
        });
    });
}

// Funzione per aggiungere animazioni
function addAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}
