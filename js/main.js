// Initialize AOS
$(document).ready(function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

// Document Ready
$(document).ready(function() {
    // Before/After Slider
    initComparisonSlider();
    
    // Smooth Scrolling
    initSmoothScroll();
    
    // Navbar Scroll Effect
    initNavbarScroll();
    
    // Testimonial Carousel
    initTestimonialCarousel();
    
    // Gallery Filter
    initGalleryFilter();
    
    // Form Validation
    initFormValidation();
    
    // WhatsApp Button
    initWhatsAppButton();
    
    // Loading Animation
    initLoadingAnimation();
});

// Before/After Comparison Slider
function initComparisonSlider() {
    const slider = $('.comparison-slider');
    if (slider.length === 0) return;
    
    let isDragging = false;
    let currentX;
    let initialX;
    let xOffset = 0;
    
    const sliderHandle = $('.slider-handle');
    const afterImage = $('.after-image');
    const sliderWidth = slider.width();
    
    function setTranslate(xPos, el) {
        el.style.transform = `translateX(${xPos}px)`;
    }
    
    function dragStart(e) {
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
        } else {
            initialX = e.clientX - xOffset;
        }
        
        if (e.target === sliderHandle[0] || e.target.closest('.slider-handle')) {
            isDragging = true;
        }
    }
    
    function dragEnd(e) {
        initialX = currentX;
        isDragging = false;
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
            } else {
                currentX = e.clientX - initialX;
            }
            
            xOffset = currentX;
            
            // Limit movement within slider bounds
            const maxTranslate = sliderWidth / 2;
            const minTranslate = 0;
            
            if (currentX > maxTranslate) {
                currentX = maxTranslate;
                xOffset = maxTranslate;
            } else if (currentX < minTranslate) {
                currentX = minTranslate;
                xOffset = minTranslate;
            }
            
            const percentage = (currentX / sliderWidth) * 100;
            afterImage.css('width', percentage + '%');
            setTranslate(currentX, sliderHandle[0]);
        }
    }
    
    slider.on('mousedown touchstart', dragStart);
    $(document).on('mouseup touchend', dragEnd);
    $(document).on('mousemove touchmove', drag);
}

// Smooth Scrolling
function initSmoothScroll() {
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    $(window).scroll(function() {
        const navbar = $('.navbar');
        if ($(this).scrollTop() > 50) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }
    });
}

// Testimonial Carousel
function initTestimonialCarousel() {
    const testimonials = [
        {
            text: "The restoration of my grandmother's Victorian chair exceeded all expectations. The attention to detail and craftsmanship is absolutely remarkable.",
            author: "Sarah Mitchell",
            role: "Vintage Collector",
            image: "https://picsum.photos/seed/client1/60/60"
        },
        {
            text: "Professional service from start to finish. They transformed my antique dining table into a stunning centerpiece for our home.",
            author: "Robert Chen",
            role: "Interior Designer",
            image: "https://picsum.photos/seed/client2/60/60"
        },
        {
            text: "I entrusted them with my family's 200-year-old clock. The restoration was done with such care and expertise. Highly recommended!",
            author: "Elizabeth Thompson",
            role: "Antique Enthusiast",
            image: "https://picsum.photos/seed/client3/60/60"
        }
    ];
    
    let currentIndex = 0;
    const testimonialItem = $('.testimonial-item');
    
    function updateTestimonial() {
        const testimonial = testimonials[currentIndex];
        
        testimonialItem.fadeOut(500, function() {
            $(this).html(`
                <div class="mb-3">
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                </div>
                <p class="lead fst-italic text-vintage-brown">
                    "${testimonial.text}"
                </p>
                <div class="mt-4">
                    <img src="${testimonial.image}" alt="${testimonial.author}" class="rounded-circle mb-2">
                    <h6 class="font-playfair">${testimonial.author}</h6>
                    <small class="text-muted">${testimonial.role}</small>
                </div>
            `).fadeIn(500);
        });
        
        currentIndex = (currentIndex + 1) % testimonials.length;
    }
    
    // Auto-rotate testimonials
    setInterval(updateTestimonial, 5000);
}

// Gallery Filter
function initGalleryFilter() {
    $('.filter-btn').on('click', function() {
        const filter = $(this).data('filter');
        
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        if (filter === 'all') {
            $('.gallery-item').fadeIn(300);
        } else {
            $('.gallery-item').hide();
            $(`.gallery-item[data-category="${filter}"]`).fadeIn(300);
        }
    });
}

// Form Validation
function initFormValidation() {
    const forms = $('.needs-validation');
    
    forms.on('submit', function(e) {
        if (!this.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        $(this).addClass('was-validated');
    });
    
    // File upload preview
    $('.file-upload').on('change', function() {
        const file = this.files[0];
        const preview = $(this).siblings('.file-preview');
        
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                preview.html(`<img src="${e.target.result}" class="img-thumbnail mt-2" style="max-height: 200px;">`);
            };
            
            reader.readAsDataURL(file);
        }
    });
}

// WhatsApp Button
function initWhatsAppButton() {
    const whatsappBtn = `
        <a href="https://wa.me/15551234567?text=Hi! I'm interested in your antique restoration services." 
           class="whatsapp-float" target="_blank">
            <i class="fab fa-whatsapp"></i>
        </a>
    `;
    
    $('body').append(whatsappBtn);
}

// Loading Animation
function initLoadingAnimation() {
    $(window).on('load', function() {
        $('.loading-spinner').fadeOut(500);
    });
}

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.text(target);
            clearInterval(timer);
        } else {
            element.text(Math.floor(start));
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate counters if present
            const counter = entry.target.querySelector('.counter');
            if (counter && !counter.classList.contains('animated')) {
                const target = parseInt(counter.dataset.target);
                animateCounter($(counter), target);
                counter.classList.add('animated');
            }
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
});

// Parallax Effect
function initParallax() {
    $(window).scroll(function() {
        const scrolled = $(this).scrollTop();
        $('.parallax-element').css('transform', `translateY(${scrolled * 0.5}px)`);
    });
}

// Initialize parallax if elements exist
if ($('.parallax-element').length > 0) {
    initParallax();
}

// Modern 2026 Micro-interactions
function initMicroInteractions() {
    // Button ripple effect
    $('.btn').on('click', function(e) {
        const button = $(this);
        const ripple = $('<span class="ripple"></span>');
        
        const x = e.pageX - button.offset().left;
        const y = e.pageY - button.offset().top;
        
        ripple.css({
            left: x,
            top: y
        });
        
        button.append(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    
    // Card tilt effect
    $('.hover-lift').on('mousemove', function(e) {
        const card = $(this);
        const rect = card[0].getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`);
    });
    
    $('.hover-lift').on('mouseleave', function() {
        $(this).css('transform', 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)');
    });
}

// Initialize micro-interactions
initMicroInteractions();

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();
