// Script per la pagina di dettaglio del progetto

let currentGalleries = [];
let currentImageIndex = 0;
let lightboxItems = [];
let galleryKeyToLightboxIndex = new Map(); // key: `${gIdx}:${idx}` -> lightbox index

document.addEventListener('DOMContentLoaded', () => {
    loadProjectDetail();
    setupLightboxListeners();
});

// Funzione per ottenere i parametri dall'URL
function getUrlParameter(name) {
    const url = new URL(window.location);
    return url.searchParams.get(name);
}

// Funzione per caricare i dettagli del progetto
function loadProjectDetail() {
    const projectId = getUrlParameter('id');

    if (!projectId) {
        document.body.innerHTML = '<div class="container"><p>Progetto non trovato.</p></div>';
        return;
    }

    const project = getProjectById(projectId);

    if (!project) {
        document.body.innerHTML = '<div class="container"><p>Progetto non trovato.</p></div>';
        return;
    }

    // Popola la pagina con i dati del progetto
    document.title = project.title;
    document.getElementById('projectTitle').textContent = project.title;
    document.getElementById('projectDate').textContent = project.date;
    document.getElementById('projectDescription').textContent = project.fullDescription;

    // Prepare galleries: new format is project.galleries = [{ gallery: [...], layout: [...], title: '...' }, ...]
    const galleriesToRender = [];

    if (Array.isArray(project.galleries) && project.galleries.length) {
        project.galleries.forEach(g => {
            galleriesToRender.push({
                gallery: Array.isArray(g.gallery) ? g.gallery : [],
                layout: g.layout ?? g.galleryLayout ?? [],
                title: g.title ?? ''
            });
        });
    } else if (Array.isArray(project.gallery) && project.gallery.length) {
        // Backwards compatibility: single gallery
        galleriesToRender.push({
            gallery: project.gallery,
            layout: project.galleryLayout ?? [],
            title: project.galleryTitle ?? ''
        });
    }

    currentGalleries = galleriesToRender;

    // Build lightbox items (flatten across galleries) and mapping
    setupLightboxItems(galleriesToRender);

    // Render galleries
    renderAllGalleries(galleriesToRender);

    // Popola i dettagli
    if (project.details) {
        loadDetails(project.details);
    }

    // Popola i tags
    const tagsContainer = document.getElementById('projectTags');
    if (tagsContainer && Array.isArray(project.tags)) {
        tagsContainer.innerHTML = '';
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });
    }

    // Bottom text blocks (optional)
    loadProjectBlocks(project.blocks);
}

function loadProjectBlocks(blocks) {
    const section = document.getElementById('projectBlocksSection');
    const container = document.getElementById('projectBlocks');
    if (!section || !container) return;

    container.innerHTML = '';

    if (!Array.isArray(blocks) || blocks.length === 0) {
        section.style.display = 'none';
        return;
    }

    const validBlocks = blocks.filter(b => b && b.type === 'text' && (b.text || b.content || b.title));
    if (validBlocks.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = '';

    validBlocks.forEach((block) => {
        const el = document.createElement('section');
        el.className = 'project-block project-block-text';

        if (block.title) {
            const h = document.createElement('h3');
            h.className = 'project-block-title';
            h.textContent = block.title;
            el.appendChild(h);
        }

        const body = document.createElement('div');
        body.className = 'project-block-body';

        const raw = block.text ?? block.content ?? '';
        const paragraphs = String(raw)
            .split(/\n{2,}/)
            .map(p => p.trim())
            .filter(Boolean);

        paragraphs.forEach(pText => {
            const p = document.createElement('p');
            p.textContent = pText;
            body.appendChild(p);
        });

        el.appendChild(body);
        container.appendChild(el);
    });
}

function isImageItem(item) {
    return !item?.type || item.type === 'image';
}

function isVideoItem(item) {
    return item?.type === 'video';
}

function isTextItem(item) {
    return item?.type === 'text';
}

function setupLightboxItems(galleries) {
    lightboxItems = [];
    galleryKeyToLightboxIndex = new Map();

    galleries.forEach((g, gIdx) => {
        const gallery = Array.isArray(g.gallery) ? g.gallery : [];
        gallery.forEach((item, idx) => {
            if (isImageItem(item) && item?.src) {
                const lbIndex = lightboxItems.length;
                lightboxItems.push(item);
                galleryKeyToLightboxIndex.set(`${gIdx}:${idx}`, lbIndex);
            }
        });
    });
}

function renderAllGalleries(galleries) {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    galleries.forEach((g, gIdx) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'project-gallery';
        if (g.title) {
            const h = document.createElement('h3');
            h.className = 'gallery-title';
            h.textContent = g.title;
            wrapper.appendChild(h);
        }

        // container for this gallery's content
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'gallery-container';
        wrapper.appendChild(galleryContainer);

        loadGallery(g.gallery, g.layout, gIdx, galleryContainer);

        galleryGrid.appendChild(wrapper);
    });
}

// Funzione per caricare la gallery con sezioni di layout custom
function loadGallery(gallery, galleryLayout, galleryIdx = 0, parentContainer = null) {
    const galleryGrid = parentContainer || document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    // If this gallery has no specific layout, render a simple grid inside a container
    if (!galleryLayout || galleryLayout.length === 0) {
        const grid = document.createElement('div');
        grid.className = 'gallery-grid gallery-grid-simple';
        gallery.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.style.opacity = '0';
            galleryItem.style.animation = `fadeIn 0.6s ease forwards`;
            galleryItem.style.animationDelay = `${index * 0.05}s`;

            const node = createGalleryNode(item, `${galleryIdx}:${index}`, galleryItem);
            if (node) galleryItem.appendChild(node);
            grid.appendChild(galleryItem);
        });

        galleryGrid.appendChild(grid);
        return;
    }

    // Raggruppa le immagini per sezione (sections are local to this gallery)
    const sections = {};
    gallery.forEach((item, localIndex) => {
        const section = item.section || 0;
        if (!sections[section]) sections[section] = [];
        sections[section].push({ item, localIndex });
    });

    // Crea un wrapper per ogni sezione con il layout corretto
    galleryLayout.forEach((cols, sectionIndex) => {
        const sectionWrapper = document.createElement('div');
        sectionWrapper.className = `gallery-section gallery-section-cols-${cols}`;
        sectionWrapper.style.display = 'grid';
        sectionWrapper.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        sectionWrapper.style.gap = '1rem';
        sectionWrapper.style.marginBottom = '1rem';

        const sectionImages = sections[sectionIndex] || [];

        sectionImages.forEach(({ item, localIndex }, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.style.opacity = '0';
            galleryItem.style.animation = `fadeIn 0.6s ease forwards`;
            galleryItem.style.animationDelay = `${index * 0.05}s`;

            const node = createGalleryNode(item, `${galleryIdx}:${localIndex}`, galleryItem);
            if (node) galleryItem.appendChild(node);
            sectionWrapper.appendChild(galleryItem);
        });

        galleryGrid.appendChild(sectionWrapper);
    });
}

function createGalleryNode(item, galleryKey, galleryItemEl) {
    if (isTextItem(item)) {
        // Make it a full-width horizontal section within the grid
        galleryItemEl?.classList.add('gallery-item--full');
        galleryItemEl.style.cursor = 'default';

        const wrapper = document.createElement('div');
        wrapper.className = 'gallery-text gallery-text--full';

        if (item.title) {
            const title = document.createElement('h3');
            title.className = 'gallery-text-title';
            title.textContent = item.title;
            wrapper.appendChild(title);
        }

        const content = document.createElement('div');
        content.className = 'gallery-text-content';

        const raw = item.text ?? item.content ?? '';
        const paragraphs = String(raw)
            .split(/\n{2,}/)
            .map(p => p.trim())
            .filter(Boolean);

        paragraphs.forEach(pText => {
            const p = document.createElement('p');
            p.textContent = pText;
            content.appendChild(p);
        });

        wrapper.appendChild(content);

        if (item.caption || item.description) {
            const cap = document.createElement('div');
            cap.className = 'gallery-caption';
            cap.textContent = item.caption || item.description;
            wrapper.appendChild(cap);
        }

        return wrapper;
    }

    if (isVideoItem(item)) {
        galleryItemEl.style.cursor = 'default';

        const wrapper = document.createElement('div');
        wrapper.className = 'gallery-media';

        const video = document.createElement('video');
        video.className = 'gallery-video';
        video.src = item.src;
        video.controls = true;
        video.playsInline = true;
        if (item.poster) video.poster = item.poster;
        if (item.muted) video.muted = true;
        if (item.autoplay) video.autoplay = true;
        if (item.loop) video.loop = true;

        wrapper.appendChild(video);

        if (item.caption || item.description) {
            const cap = document.createElement('div');
            cap.className = 'gallery-caption';
            cap.textContent = item.caption || item.description;
            wrapper.appendChild(cap);
        }

        return wrapper;
    }

    // Default: image
    const wrapper = document.createElement('div');
    wrapper.className = 'gallery-media';

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt || `Gallery item`;
    img.className = 'gallery-image';

    const lbIndex = galleryKeyToLightboxIndex.get(String(galleryKey));
    if (lbIndex !== undefined) {
        img.addEventListener('click', () => openLightbox(lbIndex));
    }

    wrapper.appendChild(img);

    if (item.caption || item.description) {
        const cap = document.createElement('div');
        cap.className = 'gallery-caption';
        cap.textContent = item.caption || item.description;
        wrapper.appendChild(cap);
    }

    return wrapper;
}

// Funzione Lightbox
function openLightbox(index) {
    currentImageIndex = index;
    const modal = document.getElementById('lightboxModal');
    const image = document.getElementById('lightboxImage');
    
    if (!lightboxItems.length) return;
    image.src = lightboxItems[index].src;
    updateLightboxCounter();
    modal.classList.add('active');
    document.body.classList.add('lightbox-open');
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    modal.classList.remove('active');
    document.body.classList.remove('lightbox-open');
}

function nextImage() {
    if (!lightboxItems.length) return;
    currentImageIndex = (currentImageIndex + 1) % lightboxItems.length;
    const image = document.getElementById('lightboxImage');
    image.src = lightboxItems[currentImageIndex].src;
    updateLightboxCounter();
}

function prevImage() {
    if (!lightboxItems.length) return;
    currentImageIndex = (currentImageIndex - 1 + lightboxItems.length) % lightboxItems.length;
    const image = document.getElementById('lightboxImage');
    image.src = lightboxItems[currentImageIndex].src;
    updateLightboxCounter();
}

function updateLightboxCounter() {
    if (!lightboxItems.length) {
        const ctr = document.getElementById('lightboxCounter');
        if (ctr) ctr.textContent = '';
        return;
    }
    const ctr = document.getElementById('lightboxCounter');
    if (ctr) ctr.textContent = `${currentImageIndex + 1} / ${lightboxItems.length}`;
}

// Setup Lightbox Event Listeners
function setupLightboxListeners() {
    const modal = document.getElementById('lightboxModal');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    
    // Click on modal background to close
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeLightbox();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal || !modal.classList.contains('active')) return;
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightbox();
    });
}

// Funzione per caricare i dettagli
function loadDetails(details) {
    const detailsContainer = document.getElementById('projectDetails');
    if (!detailsContainer) return;

    detailsContainer.innerHTML = '';

    const detailsList = document.createElement('ul');
    detailsList.className = 'details-list';

    for (const [key, value] of Object.entries(details)) {
        const li = document.createElement('li');
        li.className = 'detail-item';

        const label = document.createElement('span');
        label.className = 'detail-label';
        label.textContent = key.charAt(0).toUpperCase() + key.slice(1);

        const valueSpan = document.createElement('span');
        valueSpan.className = 'detail-value';

        if (key === 'link') {
            const a = document.createElement('a');
            a.href = value;
            a.textContent = 'View Project';
            a.target = '_blank';
            valueSpan.appendChild(a);
        } else {
            valueSpan.textContent = value;
        }

        li.appendChild(label);
        li.appendChild(valueSpan);
        detailsList.appendChild(li);
    }

    detailsContainer.appendChild(detailsList);
}
