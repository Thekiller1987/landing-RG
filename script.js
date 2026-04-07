document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. NAVBAR SCROLL
    // ==========================================
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ==========================================
    // 2. MOBILE MENU
    // ==========================================
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
        menu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => menu.classList.remove('active'));
        });
    }

    // ==========================================
    // 3. SCROLL REVEAL ANIMATIONS
    // ==========================================
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => revealObserver.observe(el));

    // ==========================================
    // 4. ANIMATED COUNTERS
    // ==========================================
    const counters = document.querySelectorAll('.counter__num[data-target]');
    let countersDone = false;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersDone) {
                countersDone = true;
                counters.forEach(counter => {
                    const target = +counter.dataset.target;
                    const duration = 2000;
                    const startTime = performance.now();
                    
                    function update(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        counter.textContent = Math.floor(eased * target);
                        if (progress < 1) {
                            requestAnimationFrame(update);
                        } else {
                            counter.textContent = target;
                        }
                    }
                    requestAnimationFrame(update);
                });
            }
        });
    }, { threshold: 0.5 });
    
    if (counters.length > 0) {
        counterObserver.observe(counters[0].closest('.hero__counters'));
    }

    // ==========================================
    // 5. FLOATING PARTICLES
    // ==========================================
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(255, 90, 31, ${Math.random() * 0.3 + 0.05});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 8 + 6}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particleContainer.appendChild(particle);
        }

        // Add the particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
                25% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random()*60+20}px, -${Math.random()*60+20}px) scale(1.5); opacity: 0.7; }
                50% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random()*40+10}px, ${Math.random()*40+10}px) scale(0.8); opacity: 0.2; }
                75% { transform: translate(-${Math.random()*50+15}px, -${Math.random()*30+10}px) scale(1.2); opacity: 0.5; }
            }
        `;
        document.head.appendChild(style);
    }

    // ==========================================
    // 6. SMOOTH SCROLL
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // 7. YEAR
    // ==========================================
    const yr = document.getElementById('currentYear');
    if (yr) yr.textContent = new Date().getFullYear();

    // ==========================================
    // 8. LIGHTBOX EVENTS
    // ==========================================
    const lb = document.getElementById('lightbox');
    if (lb) {
        lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
    }
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

});

// ==========================================
// GLOBAL LIGHTBOX
// ==========================================
function openLightbox(card) {
    const img = card.querySelector('img');
    if (!img) return;
    const modal = document.getElementById('lightbox');
    const modalImg = document.getElementById('lightboxImg');
    if (modal && modalImg) {
        modalImg.src = img.src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightbox');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}
