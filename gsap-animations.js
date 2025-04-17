document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero text animation
    gsap.from('.hero-content h1', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.hero-content p', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        delay: 0.3,
        ease: 'power3.out'
    });

    gsap.from('.hero-buttons', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        delay: 0.6,
        ease: 'power3.out'
    });

    // Section header animations
    gsap.utils.toArray('.section-header').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Portfolio items animation
    gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    // Service items animation
    gsap.utils.toArray('.service-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            x: i % 2 === 0 ? 100 : -100,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    // Testimonial items animation
    gsap.utils.toArray('.testimonial-item').forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            scale: 0.9,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Footer animation
    gsap.from('.footer', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // CTA section animation
    gsap.from('.cta-section', {
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // 3D object animation
    const object3D = document.querySelector('.object-3d');
    if (object3D) {
        gsap.to(object3D, {
            rotationY: 360,
            duration: 20,
            repeat: -1,
            ease: 'none'
        });
    }
});