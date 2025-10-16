// In script.js
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.video-background video');
    
    // Ricarica il video se non si avvia
    video.addEventListener('loadeddata', function() {
        this.play().catch(e => {
            console.log('Autoplay non permesso:', e);
        });
    });
    
    // Pausa il video quando non è visibile
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    });
    
    observer.observe(video);
});
