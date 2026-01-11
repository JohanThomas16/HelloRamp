/* ==========================================
   HelloRamp.ai Clone - JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initNavigation();
    initProductsDropdown();
    initPhotoboothTabs();
    initSpinTabs();
    initDemoSection();
    initTestimonialsCarousel();
    initScrollAnimations();
});

/* ==========================================
   MOBILE NAVIGATION
   ========================================== */
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navOverlay = document.getElementById('navOverlay');

    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    navOverlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ==========================================
   PRODUCTS DROPDOWN (Desktop)
   ========================================== */
function initProductsDropdown() {
    const productsToggle = document.getElementById('productsToggle');
    const productsMenu = document.getElementById('productsMenu');

    if (!productsToggle || !productsMenu) return;

    // Toggle dropdown on click
    productsToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        productsToggle.classList.toggle('active');
        productsMenu.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!productsToggle.contains(e.target) && !productsMenu.contains(e.target)) {
            productsToggle.classList.remove('active');
            productsMenu.classList.remove('show');
        }
    });

    // Close dropdown when pressing Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            productsToggle.classList.remove('active');
            productsMenu.classList.remove('show');
        }
    });
}

/* ==========================================
   PHOTOBOOTH TABS
   ========================================== */
function initPhotoboothTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const optionBtns = document.querySelectorAll('.option-btn');
    const mainImage = document.getElementById('mainShowcaseImg');

    // Image mappings
    const tabImages = {
        exterior: 'images/car-studio.png',
        interior: 'images/car-interior.png',
        closeups: 'images/hero-bg.png'
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked tab
            this.classList.add('active');

            // Update image with fade effect
            const tab = this.dataset.tab;
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.src = tabImages[tab];
                mainImage.style.opacity = '1';
            }, 200);
        });
    });

    // Option buttons
    optionBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            optionBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Add transition to main image
    if (mainImage) {
        mainImage.style.transition = 'opacity 0.3s ease';
    }
}

/* ==========================================
   360 SPIN TABS
   ========================================== */
function initSpinTabs() {
    const spinTabs = document.querySelectorAll('.spin-tab');
    const exteriorView = document.getElementById('spinExterior');
    const interiorView = document.getElementById('spinInterior');

    spinTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            spinTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const spinType = this.dataset.spin;

            if (spinType === 'exterior') {
                exteriorView.classList.remove('hidden');
                interiorView.classList.add('hidden');
            } else {
                exteriorView.classList.add('hidden');
                interiorView.classList.remove('hidden');
            }
        });
    });
}

/* ==========================================
   DEMO SECTION
   ========================================== */
function initDemoSection() {
    const vehicleCards = document.querySelectorAll('.vehicle-card:not(.add-vehicle)');
    const productCards = document.querySelectorAll('.product-card');
    const steps = document.querySelectorAll('.step');
    let selectedVehicle = null;
    let selectedProduct = null;

    // Vehicle selection
    vehicleCards.forEach(card => {
        card.addEventListener('click', function () {
            vehicleCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedVehicle = this.dataset.vehicle;

            // Activate step 2
            setTimeout(() => {
                document.getElementById('step2').classList.add('active');
                document.getElementById('step2').scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });

    // Product selection
    productCards.forEach(card => {
        card.addEventListener('click', function () {
            productCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedProduct = this.dataset.product;

            // Activate step 3
            setTimeout(() => {
                document.getElementById('step3').classList.add('active');
                document.getElementById('step3').scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });
}

/* ==========================================
   TESTIMONIALS CAROUSEL
   ========================================== */
function initTestimonialsCarousel() {
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!track || !prevBtn || !nextBtn) return;

    const cardWidth = 404; // card width + gap
    let scrollPosition = 0;

    prevBtn.addEventListener('click', function () {
        scrollPosition = Math.max(0, scrollPosition - cardWidth);
        track.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', function () {
        const maxScroll = track.scrollWidth - track.clientWidth;
        scrollPosition = Math.min(maxScroll, scrollPosition + cardWidth);
        track.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    });

    // Update scroll position on manual scroll
    track.addEventListener('scroll', function () {
        scrollPosition = track.scrollLeft;
    });

    // Enable auto-scroll
    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            const maxScroll = track.scrollWidth - track.clientWidth;
            if (scrollPosition >= maxScroll - 10) {
                scrollPosition = 0;
            } else {
                scrollPosition += cardWidth;
            }
            track.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }, 5000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Start auto-scroll
    startAutoScroll();

    // Pause on hover
    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('mouseleave', startAutoScroll);
}

/* ==========================================
   SCROLL ANIMATIONS
   ========================================== */
function initScrollAnimations() {
    // Add animation class to elements
    const animateElements = document.querySelectorAll(
        '.suite-card, .trust-card, .section-header, .testimonial-card, .integration-logo'
    );

    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animate elements
    animateElements.forEach(el => observer.observe(el));
}

/* ==========================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ========================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ==========================================
   PARALLAX EFFECT ON HERO
   ========================================== */
window.addEventListener('scroll', function () {
    const hero = document.querySelector('.hero-background');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

/* ==========================================
   HOVER EFFECTS ENHANCEMENT
   ========================================== */
// Add subtle mouse tracking effect to cards
document.querySelectorAll('.suite-card, .trust-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});

/* ==========================================
   BUTTON RIPPLE EFFECT
   ========================================== */
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();

        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${e.clientX - rect.left}px;
            top: ${e.clientY - rect.top}px;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ==========================================
   LAZY LOADING IMAGES
   ========================================== */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('HelloRamp.ai Clone - All scripts loaded successfully!');
