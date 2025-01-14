document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyLoadScript = document.createElement('script');
        lazyLoadScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(lazyLoadScript);
    }

    // Mobile menu functionality
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const menuSpans = menuBtn.querySelectorAll('span');

    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger to X
        menuSpans[0].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(45deg) translate(5px, 5px)' 
            : 'none';
        menuSpans[1].style.opacity = navMenu.classList.contains('active') 
            ? '0' 
            : '1';
        menuSpans[2].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(-45deg) translate(7px, -7px)' 
            : 'none';
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}); 