document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Burger Menu ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

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

    // --- Typing Effect (Machine à écrire) ---
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

    const txtElement = document.querySelector('.txt-type');
    if(txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        new TypeWriter(txtElement, words, wait);
    }

    // --- Scroll Reveal Animation ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger Progress Bars
                const progressBar = entry.target.querySelector('.progress-fill');
                if(progressBar) {
                    const targetWidth = progressBar.style.getPropertyValue('--w');
                    progressBar.style.width = targetWidth;
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});