// In script.js
// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Carosello progetti in evidenza: usa TUTTI i progetti del portfolio
    const featuredCarousel = document.querySelector('.featured-carousel');
    if (featuredCarousel && featuredCarousel.dataset.initialized !== 'true') {
        featuredCarousel.dataset.initialized = 'true';
        const portfolioItems = Array.from(document.querySelectorAll('#portfolio .portfolio-item'));
        const carouselTrack = featuredCarousel.querySelector('.carousel-track');
        const projectGalleryImages = {
            'osculo-avviso.html': [
                'assets/gallery/osculo-d-amoregallery/osculo-d-amore1.png'
            ],
            'projects/eburnea-teatro.html': [
                'assets/gallery/eburnea-teatrogallery/FiatVoluntasTua1.jpeg',
                'assets/gallery/eburnea-teatrogallery/FiatVoluntasTua2.png',
                'assets/gallery/eburnea-teatrogallery/Eburneo1.jpeg',
                'assets/gallery/eburnea-teatrogallery/eburneo2.png',
                'assets/gallery/eburnea-teatrogallery/altrove1.png',
                'assets/gallery/eburnea-teatrogallery/bergman.jpeg',
                'assets/gallery/eburnea-teatrogallery/Marchio.png',
                'assets/gallery/eburnea-teatrogallery/memoria1.png'
            ],
            'projects/eburnea.html': [
                'assets/gallery/eburneagallery/eburnea1.png',
                'assets/gallery/eburneagallery/eburnea2.png',
                'assets/gallery/eburneagallery/eburnea3.png',
                'assets/gallery/eburneagallery/eburnea4.png'
            ],
            'projects/libro-dolori.html': [
                'assets/gallery/libro-dolorigallery/libro-dolori1.png',
                'assets/gallery/libro-dolorigallery/libro-dolori2.png',
                'assets/gallery/libro-dolorigallery/libro-dolori3.png',
                'assets/gallery/libro-dolorigallery/libro-dolori4.png',
                'assets/gallery/libro-dolorigallery/libro-dolori5.png',
                'assets/gallery/libro-dolorigallery/libro-dolori6.png'
            ],
            'projects/shinel.html': [
                'assets/gallery/shinelgallery/shinel1.jpg'
            ],
            'projects/matto-pesca.html': [
                'assets/gallery/matto-pescagallery/matto-pesca1.jpg'
            ],
            'projects/stabat-mater.html': [
                'assets/gallery/stabat-matergallery/Stabatmater1.png',
                'assets/gallery/stabat-matergallery/Stabatmater2.png',
                'assets/gallery/stabat-matergallery/Stabatmater3.png',
                'assets/gallery/stabat-matergallery/Stabatmater4.png',
                'assets/gallery/stabat-matergallery/Stabatmater5.png',
                'assets/gallery/stabat-matergallery/Stabatmater6.png',
                'assets/gallery/stabat-matergallery/Stabatmater7.png',
                'assets/gallery/stabat-matergallery/Stabatmater8.png',
                'assets/gallery/stabat-matergallery/Stabatmater9.png',
                'assets/gallery/stabat-matergallery/Stabatmater10.png',
                'assets/gallery/stabat-matergallery/Stabatmater11.png',
                'assets/gallery/stabat-matergallery/Stabatmater12.png',
                'assets/gallery/stabat-matergallery/Stabatmater13.png'
            ],
            'projects/rasi-suolo.html': [
                'assets/gallery/rasi-suologallery/rasi-suolo1.jpg'
            ],
            'projects/compagnia-giro.html': [
                'assets/gallery/compagnia-girogallery/giro1.jpg',
                'assets/gallery/compagnia-girogallery/giro2.jpg',
                'assets/gallery/compagnia-girogallery/giro3.jpg'
            ],
            'projects/cavalleria-rusticana.html': [
                'assets/gallery/cavalleria-rusticanagallery/Cavalleria1.jpg',
                'assets/gallery/cavalleria-rusticanagallery/Cavalleria2.jpg',
                'assets/gallery/cavalleria-rusticanagallery/Cavalleria3.jpg',
                'assets/gallery/cavalleria-rusticanagallery/Cavalleria4.jpg',
                'assets/gallery/cavalleria-rusticanagallery/Cavalleria5.jpg',
                'assets/gallery/cavalleria-rusticanagallery/Cavalleria6.png'
            ],
            'projects/gianni-schicchi.html': [
                'assets/gallery/gianni-schicchigallery/giannischicchi1.JPG',
                'assets/gallery/gianni-schicchigallery/giannischicchi.JPG',
                'assets/gallery/gianni-schicchigallery/giannischicchi3.jpg'
            ],
            'projects/tosca-classica.html': [
                'assets/gallery/tosca-classicagallery/toscaclassica2.jpg',
                'assets/gallery/tosca-classicagallery/toscaclassica3.jpg',
                'assets/gallery/tosca-classicagallery/toscaclassica4.jpg',
                'assets/gallery/tosca-classicagallery/toscaclassica5.jpg',
                'assets/gallery/tosca-classicagallery/toscaclassica6.jpg'
            ],
            'projects/tosca-dessai.html': [
                'assets/gallery/tosca-dessaigallery/tosca1.png',
                'assets/gallery/tosca-dessaigallery/tosca2.png',
                'assets/gallery/tosca-dessaigallery/tosca3.png',
                'assets/gallery/tosca-dessaigallery/tosca4.png',
                'assets/gallery/tosca-dessaigallery/tosca5.png',
                'assets/gallery/tosca-dessaigallery/tosca6.png'
            ],
            'projects/boheme.html': [
                'assets/gallery/bohemegallery/boheme1.jpg',
                'assets/gallery/bohemegallery/boheme2.jpg',
                'assets/gallery/bohemegallery/boheme3.jpg',
                'assets/gallery/bohemegallery/boheme4.jpg',
                'assets/gallery/bohemegallery/boheme5.jpg'
            ],
            'projects/elisir-d-amore.html': [
                'assets/gallery/elisir-damoregallery/elisir1.png',
                'assets/gallery/elisir-damoregallery/elisir2.png'
            ]
        };

        function pickRandomGalleryImage(projectHref, fallbackSrc, currentSrc) {
            const images = projectGalleryImages[projectHref];
            if (!images || !images.length) {
                return fallbackSrc;
            }

            if (images.length === 1) {
                return images[0];
            }

            let nextImage = currentSrc || fallbackSrc;
            while (nextImage === currentSrc) {
                nextImage = images[Math.floor(Math.random() * images.length)];
            }

            return nextImage;
        }

        function updateSlideImage(slide) {
            const image = slide.querySelector('.carousel-link img');
            const projectHref = slide.dataset.projectHref;
            const fallbackSrc = slide.dataset.fallbackSrc;

            if (!image || !projectHref || !fallbackSrc) {
                return;
            }

            const nextImage = pickRandomGalleryImage(projectHref, fallbackSrc, image.getAttribute('src'));
            image.setAttribute('src', nextImage);
        }

        if (carouselTrack && portfolioItems.length) {
            const slides = [];
            carouselTrack.innerHTML = '';

            portfolioItems.forEach((item, index) => {
                const link = item.closest('a');
                const img = item.querySelector('.portfolio-image');
                const title = item.querySelector('.portfolio-title')?.textContent?.trim() || 'Project';
                const kicker = item.querySelector('.portfolio-kicker')?.textContent?.trim() || '';
                const projectHref = link?.getAttribute('href');

                if (!link || !img) return;

                const randomImageSrc = pickRandomGalleryImage(projectHref, img.getAttribute('src'));

                const slide = document.createElement('article');
                slide.className = `carousel-slide${index === 0 ? ' is-active' : ''}`;
                slide.dataset.projectHref = projectHref || '';
                slide.dataset.fallbackSrc = img.getAttribute('src') || '';
                slide.innerHTML = `
                    <a href="${link.href}" class="carousel-link">
                        <img src="${randomImageSrc}" alt="${title}" style="aspect-ratio: 16 / 9; object-fit: cover;">
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
            let carouselInterval = null;
            const autoplayDelay = 4500;

            function showSlide(index) {
                activeIndex = (index + slides.length) % slides.length;
                slides.forEach((slide, i) => {
                    slide.classList.toggle('is-active', i === activeIndex);
                    if (i === activeIndex) {
                        updateSlideImage(slide);
                    }
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

            function stopAutoCycle() {
                if (carouselInterval !== null) {
                    window.clearInterval(carouselInterval);
                    carouselInterval = null;
                }
            }

            function startAutoCycle() {
                stopAutoCycle();
                resetProgress();
                carouselInterval = window.setInterval(() => {
                    showSlide(activeIndex + 1);
                    resetProgress();
                }, autoplayDelay);
            }

            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    stopAutoCycle();
                    return;
                }
                startAutoCycle();
            });

            showSlide(0);
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

    // --- Intersection Observer Scroll Reveal ---
    function scrollRevealInit() {
        const revealEls = document.querySelectorAll('.reveal-on-scroll, .project-container, .project-header, .project-description-full, .project-gallery, .project-navigation');
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

    animatePortfolioItems();
    addPortfolioHoverEffects();
});