function buildProjectNav(current) {
    const projects = Object.values(window.PROJECT_CONTENT).sort((a, b) => a.id - b.id);
    const currentIndex = projects.findIndex(item => item.id === current.id);
    const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

    const prevControl = prev
        ? `<a href="${prev.path}" class="btn-neon"><i class="fa-solid fa-arrow-left"></i> ${prev.code}</a>`
        : `<span class="prj-nav-disabled">Premier projet</span>`;

    const nextControl = next
        ? `<a href="${next.path}" class="btn-neon">${next.code} <i class="fa-solid fa-arrow-right"></i></a>`
        : `<span class="prj-nav-disabled">Dernier projet</span>`;

    return `
        <section class="glass prj-journey reveal delay-3" aria-label="Navigation projets">
            <div class="prj-journey-controls">
                ${prevControl}
                <a href="index.html#projects" class="btn-neon"><i class="fa-solid fa-table-cells-large"></i> Tous les projets</a>
                ${nextControl}
            </div>
        </section>
    `;
}

function buildCommandBlock(commands) {
    if (!Array.isArray(commands) || commands.length === 0) {
        return "";
    }

    const lines = commands.map(line => `<code>${line}</code>`).join("");
    return `<div class="prj-command-block">${lines}</div>`;
}

function renderProjectPage() {
    const key = document.body.getAttribute("data-project");
    const data = window.PROJECT_CONTENT && window.PROJECT_CONTENT[key];

    if (!data) {
        return;
    }

    document.documentElement.style.setProperty("--prj-accent", data.theme.accent);
    document.documentElement.style.setProperty("--prj-soft", data.theme.soft);
    document.documentElement.style.setProperty("--prj-badge", data.theme.badge);

    const blob = document.querySelector(".prj-blob-primary");
    if (blob) {
        blob.style.background = data.theme.accent;
    }

    const root = document.getElementById("project-root");
    if (!root) {
        return;
    }

    const installSection = Array.isArray(data.installationBlocks) && data.installationBlocks.length > 0
        ? `
            <section id="prj-install" class="glass prj-panel reveal delay-2">
                <h2><i class="fa-solid fa-screwdriver-wrench"></i> Installation et demarrage</h2>
                <div class="prj-install-grid">
                    ${data.installationBlocks.map(block => `
                        <article class="prj-install-card">
                            <h3>${block.title}</h3>
                            <ul>
                                ${block.points.map(point => `<li>${point}</li>`).join("")}
                            </ul>
                            ${buildCommandBlock(block.commands)}
                        </article>
                    `).join("")}
                </div>
            </section>
        `
        : "";

    const usageSection = Array.isArray(data.usagePoints) && data.usagePoints.length > 0
        ? `
            <section id="prj-usage" class="glass prj-panel reveal delay-2">
                <h2><i class="fa-solid fa-route"></i> Guide d'utilisation</h2>
                <ul class="prj-check-list">
                    ${data.usagePoints.map(point => `<li>${point}</li>`).join("")}
                </ul>
            </section>
        `
        : "";

    const skillsSection = Array.isArray(data.validatedSkills) && data.validatedSkills.length > 0
        ? `
            <section id="prj-skills" class="glass prj-panel reveal delay-2">
                <h2><i class="fa-solid fa-certificate"></i> Competences validees</h2>
                <ul class="prj-check-list">
                    ${data.validatedSkills.map(skill => `<li>${skill}</li>`).join("")}
                </ul>
            </section>
        `
        : "";

    const linksSection = Array.isArray(data.links) && data.links.length > 0
        ? `
            <section class="glass prj-links reveal delay-3">
                <h2><i class="fa-solid fa-link"></i> Liens utiles</h2>
                <div class="prj-links-grid">
                    ${data.links.map(link => `
                        <a class="prj-link-item" href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>
                    `).join("")}
                </div>
            </section>
        `
        : "";

    const anchorItems = [
        '<a href="#prj-context">Contexte</a>',
        '<a href="#prj-work">Realisations</a>',
        '<a href="#prj-tech">Technologies</a>'
    ];
    if (installSection) anchorItems.push('<a href="#prj-install">Installation</a>');
    if (usageSection) anchorItems.push('<a href="#prj-usage">Usage</a>');
    if (skillsSection) anchorItems.push('<a href="#prj-skills">Competences</a>');

    root.innerHTML = `
        <section class="glass prj-hero reveal">
            <div class="prj-hero-main">
                <p class="prj-overline">${data.code}</p>
                <h1 class="prj-title">${data.title}</h1>
                <p class="prj-subtitle">${data.subtitle}</p>
                <div class="prj-track-row">
                    ${data.tracks.map(track => `<span>${track}</span>`).join("")}
                </div>
            </div>
            <aside class="prj-hero-side">
                <div class="prj-meta-item">
                    <span>Semestre</span>
                    <p>${data.semester}</p>
                </div>
                <div class="prj-meta-item">
                    <span>Encadrant</span>
                    <p>${data.mentor}</p>
                </div>
                <div class="prj-meta-item">
                    <span>Niveau</span>
                    <p>${data.code}</p>
                </div>
            </aside>
        </section>

        <nav class="glass prj-anchor reveal delay-1" aria-label="Navigation interne projet">
            ${anchorItems.join("")}
        </nav>

        <section id="prj-context" class="glass prj-panel reveal">
            <h2><i class="fa-solid fa-compass"></i> Contexte et objectifs</h2>
            <p>${data.context}</p>
            <ul class="prj-check-list">
                ${data.objectivePoints.map(point => `<li>${point}</li>`).join("")}
            </ul>
        </section>

        <section id="prj-work" class="glass prj-panel reveal delay-1">
            <h2><i class="fa-solid fa-gear"></i> Realisations</h2>
            <ul class="prj-check-list">
                ${data.achievements.map(item => `<li>${item}</li>`).join("")}
            </ul>
        </section>

        <section id="prj-tech" class="glass prj-panel reveal delay-1">
            <h2><i class="fa-solid fa-layer-group"></i> Technologies et concepts</h2>
            <div class="prj-tag-grid">
                ${data.technologies.map(tech => `<span>${tech}</span>`).join("")}
            </div>
            <p class="prj-result">${data.resultNote}</p>
        </section>

        ${installSection}
        ${usageSection}
        ${skillsSection}
        ${linksSection}
        ${buildProjectNav(data)}
    `;
}

document.addEventListener("DOMContentLoaded", renderProjectPage);
