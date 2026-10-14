// In script.js
// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Carosello progetti in evidenza: usa TUTTI i progetti del portfolio
    const featuredCarousel = document.querySelector('.featured-carousel');
    if (featuredCarousel) {
        const portfolioItems = Array.from(document.querySelectorAll('#portfolio .portfolio-item'));
        const carouselTrack = featuredCarousel.querySelector('.carousel-track');
        const prevBtn = featuredCarousel.querySelector('.carousel-arrow.prev');
        const nextBtn = featuredCarousel.querySelector('.carousel-arrow.next');

        if (carouselTrack && portfolioItems.length) {
            const slides = [];

            portfolioItems.forEach((item, index) => {
                const link = item.closest('a');
                const img = item.querySelector('.portfolio-image');
                const title = item.querySelector('.portfolio-title')?.textContent?.trim() || 'Project';
                const kicker = item.querySelector('.portfolio-kicker')?.textContent?.trim() || '';

                if (!link || !img) return;

                const slide = document.createElement('article');
                slide.className = `carousel-slide${index === 0 ? ' is-active' : ''}`;
                slide.innerHTML = `
                    <a href="${link.href}" class="carousel-link">
                        <img src="${img.src}" alt="${title}">
                        <div class="carousel-caption">
                            <span>${kicker}</span>
                            <h3>${title}</h3>
                        </div>
                    </a>
                `;
                slides.push(slide);
                carouselTrack.appendChild(slide);

            });

            const progressBar = featuredCarousel.querySelector('.carousel-progress-bar');
            let activeIndex = 0;
            let carouselTimer = null;
            const autoplayDelay = 4500;

            function showSlide(index) {
                activeIndex = (index + slides.length) % slides.length;
                slides.forEach((slide, i) => {
                    slide.classList.toggle('is-active', i === activeIndex);
                });
                featuredCarousel.classList.toggle('is-ending', activeIndex >= Math.max(slides.length - 2, 0));
            }

            function resetProgress() {
                if (!progressBar) return;
                progressBar.style.transition = 'none';
                progressBar.style.width = '0%';
                void progressBar.offsetWidth;
                progressBar.style.transition = `width ${autoplayDelay}ms linear`;
                progressBar.style.width = '100%';
            }

            function startAutoCycle() {
                clearTimeout(carouselTimer);
                resetProgress();
                carouselTimer = setTimeout(() => {
                    showSlide(activeIndex + 1);
                    startAutoCycle();
                }, autoplayDelay);
            }

            prevBtn?.addEventListener('click', () => {
                showSlide(activeIndex - 1);
                startAutoCycle();
            });

            nextBtn?.addEventListener('click', () => {
                showSlide(activeIndex + 1);
                startAutoCycle();
            });

            featuredCarousel.addEventListener('mouseenter', () => clearTimeout(carouselTimer));
            featuredCarousel.addEventListener('mouseleave', () => {
                startAutoCycle();
            });

            startAutoCycle();
        }
    }

    // Funzione per i video del portfolio
    const projectVideos = document.querySelectorAll('.project-media video');
    
    projectVideos.forEach(video => {
        const projectCard = video.closest('.project-card');
        
        projectCard.addEventListener('mouseenter', function() {
            video.play().catch(e => {
                console.log('Autoplay non permesso per:', video);
            });
        });
        
        projectCard.addEventListener('mouseleave', function() {
            video.pause();
            video.currentTime = 0;
        });
    });
    
    // Smooth scroll per i link di navigazione
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Gestione del form di contatto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Qui andrebbe la logica per inviare il form
            // Per ora mostriamo un alert
            alert('Grazie per il tuo messaggio! Ti risponderò al più presto.');
            contactForm.reset();
        });
    }
    
    // Cambio lingua (placeholder)
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // Qui andrebbe la logica per cambiare lingua
        });
    });

    // Menu mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active', isOpen);
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Gestione dello scroll per la navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scroll down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scroll up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;

        // Navbar: aggiungi classe .scrolled su scroll > 10px
        if (navbar) {
            if (currentScroll > 10) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // Aggiungi classe active alla sezione corrente
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        let scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Animazione per i progetti della lista
    const projectListItems = document.querySelectorAll('.projects-list li');
    projectListItems.forEach(item => {
        item.addEventListener('click', function() {
            // Qui andrebbe la logica per aprire il dettaglio del progetto
            alert('Dettaglio progetto - Pagina in sviluppo');
        });
    });

    // Espansione/chiusura altri progetti
    const expandBtn = document.getElementById('expandProjectsBtn');
    const expandableGrid = document.getElementById('expandableProjectsGrid');
    if (expandBtn && expandableGrid) {
        expandBtn.addEventListener('click', function() {
            const isOpen = expandableGrid.style.display === 'grid';
            expandableGrid.style.display = isOpen ? 'none' : 'grid';
            expandBtn.classList.toggle('active', !isOpen);
            expandBtn.textContent = isOpen ? 'Clicca per visualizzare gli altri progetti;' : 'Nascondi altri progetti;';
        });
    }

    // Animazione sezione progetti e immagini gallery
    function animateOnScroll() {
        var elements = document.querySelectorAll('.project-container, .project-header, .project-description-full, .project-gallery, .project-navigation');
        var images = document.querySelectorAll('.project-gallery img');
        var windowHeight = window.innerHeight;
        elements.forEach(function(el) {
            var position = el.getBoundingClientRect().top;
            if(position < windowHeight - 60) {
                el.classList.add('visible');
            }
        });
        images.forEach(function(img) {
            var position = img.getBoundingClientRect().top;
            if(position < windowHeight - 40) {
                img.classList.add('visible');
            }
        });
    }

    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Reveal on scroll per le sezioni della homepage
    function revealSectionsOnScroll() {
        var sections = document.querySelectorAll('.reveal-on-scroll, .project-card');
        var windowHeight = window.innerHeight;
        sections.forEach(function(section) {
            var position = section.getBoundingClientRect().top;
            if(position < windowHeight - 60) {
                section.classList.add('visible');
            }
        });
    }
    revealSectionsOnScroll();
    window.addEventListener('scroll', revealSectionsOnScroll);

    
    // --- Intersection Observer Scroll Reveal ---
    function scrollRevealInit() {
        const revealEls = document.querySelectorAll('.reveal-on-scroll');
        if (!('IntersectionObserver' in window)) {
            // fallback: show all
            revealEls.forEach(el => el.classList.add('visible'));
            return;
        }
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.18
        });
        revealEls.forEach(el => {
            observer.observe(el);
        });
    }

    // --- Smooth scroll con offset per navbar fissa ---
    function smoothScrollInit() {
        const navbar = document.querySelector('.navbar');
        const offset = navbar ? navbar.offsetHeight : 80;
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (!targetId || targetId === '#') return;
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({
                        top,
                        behavior: 'smooth'
                    });
                    // Transizione fade per la sezione
                    target.style.transition = 'opacity 0.7s cubic-bezier(.77,0,.18,1)';
                    target.style.opacity = 0.2;
                    setTimeout(() => {
                        target.style.opacity = 1;
                    }, 200);
                }
            });
        });
    }

    scrollRevealInit();
    smoothScrollInit();
    
    // ANIMAZIONE ON SCROLL PER LE CARD
    function animatePortfolioItems() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        portfolioItems.forEach(item => {
            observer.observe(item);
        });
    }

    // EFFETTO PARALLAX LEGGERO SU HOVER
    function addPortfolioHoverEffects() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = item.getBoundingClientRect();
                const x = (e.clientX - left) / width - 0.5;
                const y = (e.clientY - top) / height - 0.5;
                const image = item.querySelector('.portfolio-image');
                image.style.transform = `scale(1.05) translate(${x * 10}px, ${y * 10}px)`;
            });
            item.addEventListener('mouseleave', () => {
                const image = item.querySelector('.portfolio-image');
                image.style.transform = 'scale(1.05)';
            });
        });
    }

    // INIZIALIZZARE AL CARICAMENTO
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            animatePortfolioItems();
            addPortfolioHoverEffects();
        });
    } else {
        animatePortfolioItems();
        addPortfolioHoverEffects();
    }
});