document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Navbar scroll effect
    // ==========================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ==========================================
    // 2. Mobile hamburger menu
    // ==========================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close menu on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 3. Scroll animations (Intersection Observer)
    // ==========================================
    const animElements = document.querySelectorAll('.anim-up, .anim-left, .anim-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    animElements.forEach(el => observer.observe(el));

    // ==========================================
    // 4. Smooth scrolling for anchor links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 5. Year update in footer
    // ==========================================
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ==========================================
    // 6. Lightbox - close on click outside image
    // ==========================================
    const lightbox = document.getElementById('lightboxModal');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Close lightbox on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
});

// ==========================================
// GLOBAL: Lightbox functions
// ==========================================
function openLightbox(card) {
    const img = card.querySelector('img');
    if (!img) return;
    
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImg');
    
    if (modal && modalImg) {
        modalImg.src = img.src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}
