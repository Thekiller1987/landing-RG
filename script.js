// ==========================================
// MultirepuestosRG v10.0 — Nueva Identidad
// ==========================================

// ==========================================
// PRELOADER
// ==========================================
(function() {
    // Bloquear scroll mientras carga
    document.documentElement.style.overflow = 'hidden';

    function hidePreloader() {
        const preloader = document.getElementById('preloader');
        const fill = document.getElementById('preloaderFill');
        if (!preloader) return;
        // Completa la barra al 100%
        if (fill) fill.style.width = '100%';
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.documentElement.style.overflow = '';
            // Eliminar del DOM tras la transicion
            setTimeout(() => preloader.remove(), 700);
        }, 400);
    }

    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
        // Fallback por si tarda mas de 4s
        setTimeout(hidePreloader, 4000);
    }
})();

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
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    reveals.forEach(el => revealObserver.observe(el));

    // ==========================================
    // 4. ANIMATED COUNTERS
    // ==========================================
    const counters = document.querySelectorAll('.stat__number[data-target]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current).toLocaleString() + suffix;
        }, duration / steps);
    }

    // ==========================================
    // 5. FLOATING PARTICLES
    // ==========================================
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        for (let i = 0; i < 35; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 3 + 1;
            const isGold = Math.random() > 0.6;
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${isGold
                    ? `rgba(245, 166, 35, ${Math.random() * 0.25 + 0.05})`
                    : `rgba(255, 90, 31, ${Math.random() * 0.25 + 0.05})`
                };
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat${i % 3} ${Math.random() * 10 + 8}s ease-in-out infinite;
                animation-delay: ${Math.random() * 6}s;
            `;
            particleContainer.appendChild(particle);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat0 {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
                33% { transform: translate(60px, -80px) scale(1.4); opacity: 0.6; }
                66% { transform: translate(-40px, -40px) scale(0.8); opacity: 0.15; }
            }
            @keyframes particleFloat1 {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
                33% { transform: translate(-50px, -60px) scale(1.6); opacity: 0.5; }
                66% { transform: translate(30px, 30px) scale(0.7); opacity: 0.1; }
            }
            @keyframes particleFloat2 {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.25; }
                50% { transform: translate(40px, -100px) scale(1.3); opacity: 0.55; }
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

    // ==========================================
    // 9. MARQUEE PAUSE ON HOVER
    // ==========================================
    const marqueeTrack = document.querySelector('.marquee__track');
    if (marqueeTrack) {
        const marqueeEl = marqueeTrack.parentElement;
        marqueeEl.addEventListener('mouseenter', () => {
            marqueeTrack.style.animationPlayState = 'paused';
        });
        marqueeEl.addEventListener('mouseleave', () => {
            marqueeTrack.style.animationPlayState = 'running';
        });
    }

    // ==========================================
    // 10. DIST CARD HOVER GLOW
    // ==========================================
    document.querySelectorAll('.dist-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mx', `${x}%`);
            card.style.setProperty('--my', `${y}%`);
        });
    });

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
