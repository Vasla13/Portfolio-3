document.addEventListener('DOMContentLoaded', () => {
    
    // --- Burger Menu Mobile ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Fermeture du menu au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });

    // --- Scroll Reveal (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animation des barres de progression
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    const width = progressBar.getAttribute('data-width');
                    progressBar.style.width = width;
                }
                
                // On arrête d'observer une fois l'élément révélé
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Navbar Glass Effect au scroll ---
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(11, 14, 20, 0.9)';
            navbar.style.padding = '0.8rem 5%';
        } else {
            navbar.style.background = 'rgba(21, 25, 34, 0.6)'; // Retour au glass initial
            navbar.style.padding = '1rem 5%';
        }
    });
});