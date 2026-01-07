document.addEventListener('DOMContentLoaded', () => {
    
    // --- Burger Menu ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if(burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('toggle');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            });
        });
    }

    // --- Typing Effect ---
    const txtElement = document.querySelector('.txt-type');
    if(txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        
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

                if(this.isDeleting) {
                    this.txt = fullTxt.substring(0, this.txt.length - 1);
                    typeSpeed /= 2;
                } else {
                    this.txt = fullTxt.substring(0, this.txt.length + 1);
                }

                this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

                if(!this.isDeleting && this.txt === fullTxt) {
                    typeSpeed = this.wait;
                    this.isDeleting = true;
                } else if(this.isDeleting && this.txt === '') {
                    this.isDeleting = false;
                    this.wordIndex++;
                    typeSpeed = 500;
                }
                setTimeout(() => this.type(), typeSpeed);
            }
        }
        new TypeWriter(txtElement, words, wait);
    }

    // --- Scroll Reveal ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// --- Modal Logic (Accessible globalement) ---
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.showModal(); // Utilisation de l'API native <dialog>
        document.body.style.overflow = 'hidden'; // Empêche le scroll derrière
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.close();
        document.body.style.overflow = ''; // Réactive le scroll
    }
}

// Fermer en cliquant en dehors (sur le backdrop)
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.close();
        document.body.style.overflow = '';
    }
});