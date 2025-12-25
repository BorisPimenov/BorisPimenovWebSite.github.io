// In script.js
// script.js
document.addEventListener('DOMContentLoaded', function() {
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
});
