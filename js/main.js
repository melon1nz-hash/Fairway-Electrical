document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const header = document.getElementById('header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Load CMS content and render Services, Portfolio, Testimonials
    fetch('/content.json')
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((data) => {
            if (data.services && data.services.length) renderServices(data.services);
            if (data.portfolio && data.portfolio.length) renderPortfolio(data.portfolio);
            if (data.testimonials && data.testimonials.length) renderTestimonials(data.testimonials);
            if (typeof lucide !== 'undefined') lucide.createIcons();
            observeNewCards();
        })
        .catch(() => {});

    function renderServices(items) {
        const grid = document.getElementById('services-grid');
        if (!grid) return;
        grid.innerHTML = '';
        items.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'service-card';
            const iconName = item.icon === 'shield' ? 'shield-check' : (item.icon || 'zap');
            card.innerHTML = `<div class="service-icon"><i data-lucide="${escapeAttr(iconName)}"></i></div><h3>${escapeHtml(item.title || '')}</h3><p>${escapeHtml(item.description || '')}</p>`;
            grid.appendChild(card);
        });
    }

    function renderPortfolio(items) {
        const grid = document.getElementById('portfolio-grid');
        if (!grid) return;
        grid.innerHTML = '';
        items.forEach((item) => {
            const div = document.createElement('div');
            div.className = 'portfolio-item';
            const imgSrc = item.image || '/images/portfolio-1.jpg';
            const alt = escapeAttr(item.title || 'Project');
            div.innerHTML = `<img src="${escapeAttr(imgSrc)}" alt="${alt}"><div class="portfolio-overlay"><h3>${escapeHtml(item.title || '')}</h3><p>${escapeHtml(item.category || '')}</p></div>`;
            grid.appendChild(div);
        });
    }

    function renderTestimonials(items) {
        const grid = document.getElementById('testimonials-grid');
        if (!grid) return;
        grid.innerHTML = '';
        items.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            const stars = '★'.repeat(Math.min(5, Math.max(0, Number(item.rating) || 5)));
            const initial = (item.name || '?').trim().charAt(0).toUpperCase();
            card.innerHTML = `<div class="stars">${stars}</div><p class="testimonial-text">"${escapeHtml(item.quote || '')}"</p><div class="testimonial-author"><div class="author-avatar">${escapeHtml(initial)}</div><div class="author-info"><h5>${escapeHtml(item.name || '')}</h5><span>${escapeHtml(item.location || '')}</span></div></div>`;
            grid.appendChild(card);
        });
    }

    function escapeHtml(s) {
        const div = document.createElement('div');
        div.textContent = s;
        return div.innerHTML;
    }
    function escapeAttr(s) {
        return String(s).replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function observeNewCards() {
        const cards = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card');
        cards.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.6s ease, transform 0.6s ease ${(index % 3) * 0.1}s`;
            observer.observe(el);
        });
    }

    // Sticky Header Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    mobileToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        
        // Optional: Change icon (using Lucide methods if available, or just simple logic)
        // Since we are using an icon font/svg replacer, simple class toggling is safer
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
        });
    });

    // Smooth scroll for anchor links (polyfill support basically built-in to modern browsers but good for control)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation to sections
    // First set initial state
    const animatedElements = document.querySelectorAll('.service-card, .section-title, .portfolio-item, .testimonial-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index % 3 * 0.1}s`; // Staggered delay
        observer.observe(el);
    });
});
