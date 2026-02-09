function buildResourceCards(resources, badgeText) {
    return resources.map(group => {
        const items = group.items.map(item =>
            `<li><span>${item.code}</span>${item.text}</li>`
        ).join("");

        const badge = group.active
            ? `<div class="uex-badge"><i class="fa-solid fa-check"></i> ${badgeText}</div>`
            : "";

        const classes = group.active ? "glass uex-card uex-card-active reveal delay-2" : "glass uex-card reveal delay-1";

        return `
            <article class="${classes}">
                <header class="uex-card-header">
                    <h3>${group.label}</h3>
                    <span class="uex-pill">${group.items.length} ressources</span>
                </header>
                <ul class="uex-resource-list">${items}</ul>
                ${badge}
            </article>
        `;
    }).join("");
}

function buildSaeList(items) {
    return items.map(item => {
        const itemClass = item.highlight ? "uex-check-item is-highlight" : "uex-check-item";
        return `<li class="${itemClass}">${item.text}</li>`;
    }).join("");
}

function buildNavigation(current) {
    const all = Object.values(window.UE_CONTENT).sort((a, b) => a.id - b.id);
    const currentIndex = all.findIndex(item => item.id === current.id);
    const prev = currentIndex > 0 ? all[currentIndex - 1] : null;
    const next = currentIndex < all.length - 1 ? all[currentIndex + 1] : null;

    const prevLink = prev
        ? `<a href="${prev.path}" class="btn-neon"><i class="fa-solid fa-arrow-left"></i> ${prev.code}</a>`
        : `<span class="uex-nav-disabled">Debut du parcours</span>`;

    const nextLink = next
        ? `<a href="${next.path}" class="btn-neon">${next.code} <i class="fa-solid fa-arrow-right"></i></a>`
        : `<span class="uex-nav-disabled">Derniere competence</span>`;

    return `
        <section class="glass uex-journey reveal delay-3" aria-label="Navigation entre les UE">
            <div class="uex-journey-links">
                ${prevLink}
                <a href="index.html#skills" class="btn-neon"><i class="fa-solid fa-table-cells-large"></i> Toutes les UE</a>
                ${nextLink}
            </div>
        </section>
    `;
}

function renderUEPage() {
    const pageKey = document.body.getAttribute("data-ue");
    const data = window.UE_CONTENT && window.UE_CONTENT[pageKey];

    if (!data) {
        return;
    }

    document.documentElement.style.setProperty("--ue-accent", data.theme.accent);
    document.documentElement.style.setProperty("--ue-accent-soft", data.theme.soft);
    document.documentElement.style.setProperty("--ue-accent-badge", data.theme.badge);

    const blob = document.querySelector(".uex-blob-primary");
    if (blob) {
        blob.style.background = data.theme.accent;
    }

    const root = document.getElementById("ue-root");
    if (!root) {
        return;
    }

    const resourcesCount = data.resources.reduce((sum, group) => sum + group.items.length, 0);
    const averageKpi = data.average
        ? `
            <article class="uex-kpi">
                <p class="uex-kpi-label">Moyenne</p>
                <p class="uex-kpi-value">${data.average}</p>
                <p class="uex-kpi-meta">${data.gradeLabel || ""}</p>
            </article>
        `
        : "";

    root.innerHTML = `
        <section class="glass uex-hero reveal">
            <div>
                <p class="uex-overline">${data.pageTag}</p>
                <h1 class="uex-title">${data.title}</h1>
                <p class="uex-preamble">${data.preamble}</p>
            </div>
            <div class="uex-kpi-grid">
                <article class="uex-kpi">
                    <p class="uex-kpi-label">Ressources</p>
                    <p class="uex-kpi-value">${resourcesCount}</p>
                </article>
                <article class="uex-kpi">
                    <p class="uex-kpi-label">SAE</p>
                    <p class="uex-kpi-value">${data.saeItems.length}</p>
                </article>
                <article class="uex-kpi">
                    <p class="uex-kpi-label">Niveau</p>
                    <p class="uex-kpi-value">${data.code}</p>
                </article>
                ${averageKpi}
            </div>
        </section>

        <section id="ue-resources" class="uex-section">
            <header class="section-header uex-section-header">
                <span class="section-tag">Programme national</span>
                <h2 class="section-title">Ressources validees</h2>
                <div class="title-underline"></div>
            </header>
            <div class="uex-grid">
                ${buildResourceCards(data.resources, data.resourceBadge)}
            </div>
        </section>

        <section id="ue-practice" class="uex-section uex-split">
            <article class="glass uex-panel reveal">
                <h2><i class="fa-solid fa-briefcase"></i> ${data.saeTitle}</h2>
                <ul class="uex-check-list">
                    ${buildSaeList(data.saeItems)}
                </ul>
            </article>
            <article class="glass uex-panel reveal delay-1">
                <h2><i class="fa-solid fa-bullseye"></i> ${data.objectivesTitle}</h2>
                <p>${data.objectives}</p>
            </article>
        </section>

        <section id="ue-reflection" class="glass uex-reflection reveal delay-2">
            <h2><i class="fa-solid fa-brain"></i> ${data.reflectionTitle}</h2>
            ${data.reflectionParagraphs.map(text => `<p>${text}</p>`).join("")}
        </section>

        <section class="glass uex-conclusion reveal delay-2">
            <p>${data.conclusion}</p>
        </section>

        ${buildNavigation(data)}
    `;
}

document.addEventListener("DOMContentLoaded", renderUEPage);
