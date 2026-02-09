document.addEventListener('DOMContentLoaded', () => {
    const getNavbar = () => document.querySelector('.navbar');
    const getSecondaryBars = () => Array.from(document.querySelectorAll('.uex-anchor-nav, .prj-anchor'));
    const getTopBars = () => {
        const navbar = getNavbar();
        const secondaryBars = getSecondaryBars();
        return navbar ? [navbar, ...secondaryBars] : secondaryBars;
    };

    // --- Burger Menu ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (burger && nav) {
        burger.setAttribute('role', 'button');
        burger.setAttribute('tabindex', '0');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Ouvrir ou fermer le menu');

        const closeMenu = () => {
            nav.classList.remove('active');
            burger.classList.remove('toggle');
            burger.setAttribute('aria-expanded', 'false');
        };

        const toggleMenu = () => {
            const isOpen = nav.classList.toggle('active');
            burger.classList.toggle('toggle', isOpen);
            burger.setAttribute('aria-expanded', String(isOpen));
        };

        burger.addEventListener('click', toggleMenu);
        burger.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleMenu();
            }
        });

        links.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // --- Auto-hide top bars on downward scroll ---
    if (getTopBars().length > 0) {
        let lastScrollY = window.scrollY;
        let ticking = false;
        let secondaryHideTimer = null;
        const revealOffset = 90;
        const scrollDelta = 6;
        const secondaryHideDelay = 110;

        const clearSecondaryHideTimer = () => {
            if (secondaryHideTimer !== null) {
                window.clearTimeout(secondaryHideTimer);
                secondaryHideTimer = null;
            }
        };

        const showTopBars = () => {
            clearSecondaryHideTimer();
            getTopBars().forEach(bar => {
                bar.classList.remove('scroll-hidden');
            });
        };

        const hideTopBars = () => {
            const navbar = getNavbar();
            const secondaryBars = getSecondaryBars();

            if (navbar) {
                navbar.classList.add('scroll-hidden');
            }

            clearSecondaryHideTimer();
            if (secondaryBars.length > 0) {
                secondaryHideTimer = window.setTimeout(() => {
                    getSecondaryBars().forEach(bar => {
                        bar.classList.add('scroll-hidden');
                    });
                    secondaryHideTimer = null;
                }, secondaryHideDelay);
            }
        };

        const updateTopBarsVisibility = () => {
            const currentScrollY = window.scrollY;
            const menuIsOpen = Boolean(nav && nav.classList.contains('active'));

            if (menuIsOpen || currentScrollY <= revealOffset) {
                showTopBars();
            } else if (currentScrollY > lastScrollY + scrollDelta) {
                hideTopBars();
            } else if (currentScrollY < lastScrollY - scrollDelta) {
                showTopBars();
            }

            lastScrollY = currentScrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateTopBarsVisibility);
                ticking = true;
            }
        }, { passive: true });
    }

    // --- Section spy for better navigation context ---
    const navItems = Array.from(document.querySelectorAll('.nav-item[href^="#"]'));
    const sectionTargets = navItems
        .map(link => ({
            link,
            section: document.querySelector(link.getAttribute('href'))
        }))
        .filter(item => item.section);

    if (sectionTargets.length > 0) {
        const setActiveLink = (activeLink) => {
            navItems.forEach(link => {
                const isActive = link === activeLink;
                link.classList.toggle('is-active', isActive);
                if (isActive) {
                    link.setAttribute('aria-current', 'page');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        };

        if ('IntersectionObserver' in window) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const match = sectionTargets.find(item => item.section === entry.target);
                        if (match) setActiveLink(match.link);
                    }
                });
            }, { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 });

            sectionTargets.forEach(item => sectionObserver.observe(item.section));
        } else {
            setActiveLink(sectionTargets[0].link);
        }
    }

    // --- Keyboard/Screen-reader friendly cards ---
    document.querySelectorAll('[data-href][role="link"]').forEach(card => {
        const goTo = () => {
            const href = card.getAttribute('data-href');
            if (href) window.location.href = href;
        };

        card.addEventListener('click', goTo);
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                goTo();
            }
        });
    });

    // --- Typing Effect ---
    const txtElement = document.querySelector('.txt-type');
    if (txtElement) {
        let words = [];

        try {
            words = JSON.parse(txtElement.getAttribute('data-words') || '[]');
        } catch (error) {
            words = [];
        }

        const wait = txtElement.getAttribute('data-wait');

        if (Array.isArray(words) && words.length > 0) {
            class TypeWriter {
                constructor(txtElement, words, wait = 3000) {
                    this.txtElement = txtElement;
                    this.words = words;
                    this.txt = '';
                    this.wordIndex = 0;
                    this.wait = parseInt(wait, 10);
                    this.type();
                    this.isDeleting = false;
                }

                type() {
                    const current = this.wordIndex % this.words.length;
                    const fullTxt = this.words[current];
                    let typeSpeed = 100;

                    if (this.isDeleting) {
                        this.txt = fullTxt.substring(0, this.txt.length - 1);
                        typeSpeed /= 2;
                    } else {
                        this.txt = fullTxt.substring(0, this.txt.length + 1);
                    }

                    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

                    if (!this.isDeleting && this.txt === fullTxt) {
                        typeSpeed = this.wait;
                        this.isDeleting = true;
                    } else if (this.isDeleting && this.txt === '') {
                        this.isDeleting = false;
                        this.wordIndex++;
                        typeSpeed = 500;
                    }
                    setTimeout(() => this.type(), typeSpeed);
                }
            }
            new TypeWriter(txtElement, words, wait);
        }
    }

    // --- Scroll Reveal ---
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }

});
