document.addEventListener('DOMContentLoaded', () => {
    const getNavbar = () => document.querySelector('.navbar');
    const getSecondaryBars = () => Array.from(document.querySelectorAll('.uex-anchor-nav, .prj-anchor'));
    const getTopBars = () => {
        const navbar = getNavbar();
        const secondaryBars = getSecondaryBars();
        return navbar ? [navbar, ...secondaryBars] : secondaryBars;
    };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // --- Preloader ---
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        const hideDelay = prefersReducedMotion ? 220 : 760;
        window.setTimeout(() => {
            preloader.classList.add('is-hidden');
            document.body.classList.remove('is-preloading');
        }, hideDelay);
        window.setTimeout(() => preloader.remove(), hideDelay + 520);
    } else {
        document.body.classList.remove('is-preloading');
    }

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
        const setBodyTone = (sectionId) => {
            if (sectionId) {
                document.body.setAttribute('data-tone', sectionId);
            }
        };

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

        const setActiveSection = (target) => {
            setActiveLink(target.link);
            if (target.section && target.section.id) {
                setBodyTone(target.section.id);
            }
        };

        if ('IntersectionObserver' in window) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const match = sectionTargets.find(item => item.section === entry.target);
                        if (match) {
                            setActiveSection(match);
                        }
                    }
                });
            }, { rootMargin: '-42% 0px -42% 0px', threshold: 0.01 });

            sectionTargets.forEach(item => sectionObserver.observe(item.section));
        } else {
            setActiveSection(sectionTargets[0]);
        }

        setBodyTone(sectionTargets[0].section.id);
    }

    // --- Scroll progression indicator ---
    const scrollMeterFill = document.querySelector('.scroll-meter-fill');
    if (scrollMeterFill) {
        let meterTicking = false;
        const updateScrollMeter = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const ratio = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
            scrollMeterFill.style.transform = `scaleY(${ratio})`;
            meterTicking = false;
        };

        updateScrollMeter();

        window.addEventListener('scroll', () => {
            if (!meterTicking) {
                window.requestAnimationFrame(updateScrollMeter);
                meterTicking = true;
            }
        }, { passive: true });

        window.addEventListener('resize', updateScrollMeter);
    }

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
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }

    // --- Hero spotlight ---
    const hero = document.querySelector('.hero');
    if (hero && !prefersReducedMotion && hasFinePointer) {
        let spotlightTicking = false;
        let targetX = 50;
        let targetY = 32;

        const applySpotlight = () => {
            hero.style.setProperty('--spot-x', `${targetX.toFixed(2)}%`);
            hero.style.setProperty('--spot-y', `${targetY.toFixed(2)}%`);
            spotlightTicking = false;
        };

        const moveSpotlight = (event) => {
            if (event.pointerType && event.pointerType !== 'mouse') {
                return;
            }
            const rect = hero.getBoundingClientRect();
            if (rect.width <= 0 || rect.height <= 0) {
                return;
            }

            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;

            targetX = Math.max(8, Math.min(92, x));
            targetY = Math.max(8, Math.min(92, y));

            if (!spotlightTicking) {
                window.requestAnimationFrame(applySpotlight);
                spotlightTicking = true;
            }
        };

        const resetSpotlight = () => {
            targetX = 50;
            targetY = 32;
            if (!spotlightTicking) {
                window.requestAnimationFrame(applySpotlight);
                spotlightTicking = true;
            }
        };

        hero.addEventListener('pointermove', moveSpotlight);
        hero.addEventListener('pointerleave', resetSpotlight);
    }

    // --- Cinematic section transitions ---
    const cinematicSections = Array.from(document.querySelectorAll('.cinematic-section'));
    if (cinematicSections.length > 0) {
        if (!prefersReducedMotion && 'IntersectionObserver' in window) {
            document.body.classList.add('cinematic-ready');

            const cinematicObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '-8% 0px -14% 0px', threshold: 0.12 });

            cinematicSections.forEach(section => cinematicObserver.observe(section));
        } else {
            cinematicSections.forEach(section => section.classList.add('is-visible'));
        }
    }

    // --- Proofs count-up animation ---
    const proofMetrics = Array.from(document.querySelectorAll('.proof-metric[data-countup]'));
    if (proofMetrics.length > 0) {
        const countUpMetric = (element) => {
            if (element.dataset.counted === 'true') {
                return;
            }

            const target = Number(element.dataset.countup);
            if (!Number.isFinite(target)) {
                return;
            }

            const decimals = Number.parseInt(
                element.dataset.decimals || (String(target).includes('.') ? String(target).split('.')[1].length : '0'),
                10
            );
            const suffix = element.dataset.suffix || '';
            const prefix = element.dataset.prefix || '';
            const duration = prefersReducedMotion ? 0 : 1250;

            const render = (value) => {
                const formatted = decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
                element.textContent = `${prefix}${formatted}${suffix}`;
            };

            if (duration === 0) {
                render(target);
                element.dataset.counted = 'true';
                return;
            }

            const start = performance.now();
            const animate = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - ((1 - progress) ** 3);
                render(target * eased);

                if (progress < 1) {
                    window.requestAnimationFrame(animate);
                    return;
                }

                render(target);
                element.dataset.counted = 'true';
            };

            window.requestAnimationFrame(animate);
        };

        if ('IntersectionObserver' in window && !prefersReducedMotion) {
            const metricObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        countUpMetric(entry.target);
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.48 });

            proofMetrics.forEach(metric => metricObserver.observe(metric));
        } else {
            proofMetrics.forEach(countUpMetric);
        }
    }

    // --- Timeline progression + active dots ---
    const timeline = document.querySelector('.timeline-cyber');
    if (timeline) {
        const timelineLine = timeline.querySelector('.timeline-line');
        const timelineRows = Array.from(timeline.querySelectorAll('.timeline-row'));
        let timelineTicking = false;

        const updateTimeline = () => {
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            const rect = timeline.getBoundingClientRect();
            const drawStart = viewportHeight * 0.78;
            const drawableDistance = rect.height + viewportHeight * 0.65;
            const progress = Math.max(0, Math.min((drawStart - rect.top) / drawableDistance, 1));

            if (timelineLine) {
                timelineLine.style.setProperty('--line-progress', progress.toFixed(3));
            }

            timelineRows.forEach(row => {
                const dot = row.querySelector('.timeline-dot');
                if (!dot) {
                    return;
                }
                const rowRect = row.getBoundingClientRect();
                const rowCenter = rowRect.top + (rowRect.height / 2);
                const isActive = rowCenter <= viewportHeight * 0.72;
                dot.classList.toggle('is-active', isActive);
            });

            timelineTicking = false;
        };

        if (prefersReducedMotion) {
            if (timelineLine) {
                timelineLine.style.setProperty('--line-progress', '1');
            }
            timelineRows.forEach(row => {
                const dot = row.querySelector('.timeline-dot');
                if (dot) {
                    dot.classList.add('is-active');
                }
            });
        } else {
            updateTimeline();
            const onTimelineScroll = () => {
                if (!timelineTicking) {
                    window.requestAnimationFrame(updateTimeline);
                    timelineTicking = true;
                }
            };
            window.addEventListener('scroll', onTimelineScroll, { passive: true });
            window.addEventListener('resize', onTimelineScroll);
        }
    }

    // --- 3D tilt cards ---
    const tiltCards = Array.from(document.querySelectorAll('.proof-card, .project-card'));
    if (tiltCards.length > 0 && !prefersReducedMotion && hasFinePointer) {
        tiltCards.forEach(card => {
            const maxTilt = 6;
            let tiltTicking = false;
            let clientX = 0;
            let clientY = 0;

            const applyTilt = () => {
                const rect = card.getBoundingClientRect();
                if (rect.width <= 0 || rect.height <= 0) {
                    tiltTicking = false;
                    return;
                }

                const relativeX = (clientX - rect.left) / rect.width;
                const relativeY = (clientY - rect.top) / rect.height;
                const clampedX = Math.max(0, Math.min(1, relativeX));
                const clampedY = Math.max(0, Math.min(1, relativeY));

                const tiltY = (clampedX - 0.5) * (maxTilt * 2);
                const tiltX = (0.5 - clampedY) * (maxTilt * 2);

                card.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
                card.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
                card.style.setProperty('--shine-x', `${(clampedX * 100).toFixed(1)}%`);
                card.style.setProperty('--shine-y', `${(clampedY * 100).toFixed(1)}%`);

                tiltTicking = false;
            };

            const onPointerMove = (event) => {
                if (event.pointerType && event.pointerType !== 'mouse') {
                    return;
                }
                clientX = event.clientX;
                clientY = event.clientY;
                if (!tiltTicking) {
                    window.requestAnimationFrame(applyTilt);
                    tiltTicking = true;
                }
            };

            const resetTilt = () => {
                card.style.setProperty('--tilt-x', '0deg');
                card.style.setProperty('--tilt-y', '0deg');
                card.style.setProperty('--shine-x', '50%');
                card.style.setProperty('--shine-y', '50%');
            };

            card.addEventListener('pointermove', onPointerMove);
            card.addEventListener('pointerleave', resetTilt);
            card.addEventListener('pointerup', resetTilt);
            card.addEventListener('blur', resetTilt, true);
        });
    }

    // --- Magnetic buttons ---
    const magneticElements = Array.from(document.querySelectorAll('.magnetic'));
    if (magneticElements.length > 0 && !prefersReducedMotion && hasFinePointer) {
        magneticElements.forEach(element => {
            const maxDistance = Number.parseFloat(element.dataset.magneticMax || '12');
            const intensity = 0.34;
            let magTicking = false;
            let pointerX = 0;
            let pointerY = 0;

            const updateMagnetic = () => {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + (rect.width / 2);
                const centerY = rect.top + (rect.height / 2);
                const offsetX = (pointerX - centerX) * intensity;
                const offsetY = (pointerY - centerY) * intensity;
                const boundedX = Math.max(-maxDistance, Math.min(maxDistance, offsetX));
                const boundedY = Math.max(-maxDistance, Math.min(maxDistance, offsetY));

                element.style.setProperty('--mag-x', `${boundedX.toFixed(2)}px`);
                element.style.setProperty('--mag-y', `${boundedY.toFixed(2)}px`);
                magTicking = false;
            };

            const onMove = (event) => {
                if (event.pointerType && event.pointerType !== 'mouse') {
                    return;
                }
                pointerX = event.clientX;
                pointerY = event.clientY;
                if (!magTicking) {
                    window.requestAnimationFrame(updateMagnetic);
                    magTicking = true;
                }
            };

            const resetMagnetic = () => {
                element.style.setProperty('--mag-x', '0px');
                element.style.setProperty('--mag-y', '0px');
            };

            element.addEventListener('pointermove', onMove);
            element.addEventListener('pointerleave', resetMagnetic);
            element.addEventListener('pointerup', resetMagnetic);
            element.addEventListener('blur', resetMagnetic, true);
        });
    }

});
