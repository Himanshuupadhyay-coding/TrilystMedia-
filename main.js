document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        });
    }

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            navbar.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navbar.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                navbar.classList.remove('active');
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navbar.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    navbar.classList.remove('active');
                }
            }
        });
    });

    // Portfolio Slider - Fixed
    const portfolioSlider = document.querySelector('.portfolio-slider');
    if (portfolioSlider) {
        const sliderContainer = portfolioSlider.querySelector('.slider-container');
        const prevBtn = portfolioSlider.querySelector('.slider-prev');
        const nextBtn = portfolioSlider.querySelector('.slider-next');
        const items = Array.from(portfolioSlider.querySelectorAll('.portfolio-item'));
        let currentIndex = 0;

        function updateSlider() {
            sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function goToSlide(index) {
            currentIndex = (index + items.length) % items.length;
            updateSlider();
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                goToSlide(currentIndex + 1);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                goToSlide(currentIndex - 1);
            });
        }

        // Initialize slider
        updateSlider();

        // Auto-rotate slider
        let sliderInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);

        // Pause on hover
        portfolioSlider.addEventListener('mouseenter', () => {
            clearInterval(sliderInterval);
        });

        portfolioSlider.addEventListener('mouseleave', () => {
            sliderInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000);
        });
    }

    // Testimonials Slider - Fixed
    const testimonialsSection = document.querySelector('.testimonials-section');
    if (testimonialsSection) {
        const testimonialItems = Array.from(document.querySelectorAll('.testimonial-item'));
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        let currentTestimonialIndex = 0;

        function showTestimonial(index) {
            // Hide all testimonials
            testimonialItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Show the selected testimonial
            currentTestimonialIndex = (index + testimonialItems.length) % testimonialItems.length;
            testimonialItems[currentTestimonialIndex].classList.add('active');
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                showTestimonial(currentTestimonialIndex + 1);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                showTestimonial(currentTestimonialIndex - 1);
            });
        }

        // Initialize by showing the first testimonial
        showTestimonial(0);

        // Auto-advance testimonials
        setInterval(() => {
            showTestimonial(currentTestimonialIndex + 1);
        }, 8000);
    }

    // Video Controls
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(item => {
        const video = item.querySelector('video');
        const playPauseBtn = item.querySelector('.play-pause');
        const muteUnmuteBtn = item.querySelector('.mute-unmute');
        const timeDisplay = item.querySelector('.video-time');

        if (video && playPauseBtn) {
            playPauseBtn.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    this.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    video.pause();
                    this.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
        }

        if (video && muteUnmuteBtn) {
            muteUnmuteBtn.addEventListener('click', function() {
                if (video.muted) {
                    video.muted = false;
                    this.innerHTML = '<i class="fas fa-volume-up"></i>';
                } else {
                    video.muted = true;
                    this.innerHTML = '<i class="fas fa-volume-mute"></i>';
                }
            });
        }

        if (video && timeDisplay) {
            video.addEventListener('timeupdate', function() {
                const minutes = Math.floor(video.currentTime / 60);
                const seconds = Math.floor(video.currentTime % 60);
                const totalMinutes = Math.floor(video.duration / 60);
                const totalSeconds = Math.floor(video.duration % 60);
                
                timeDisplay.textContent = 
                    `${minutes}:${seconds < 10 ? '0' : ''}${seconds} / ${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
            });
        }
    });

    // Marquee Animation - Duplicate items for seamless looping
    const marqueeTracks = document.querySelectorAll('.marquee-track');
    marqueeTracks.forEach(track => {
        const items = track.querySelectorAll('.marquee-item');
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });
    });

    // Portfolio item hover effect
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const overlay = item.querySelector('.portfolio-overlay');
            overlay.style.transform = 'translateY(0)';
            overlay.style.opacity = '1';
        });

        item.addEventListener('mouseleave', () => {
            const overlay = item.querySelector('.portfolio-overlay');
            overlay.style.transform = 'translateY(20px)';
            overlay.style.opacity = '0';
        });
    });
});