// Custom Cursor - Disabled
const cursor = document.getElementById('cursor-glow');

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Button Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Hero CTA Buttons
    const exploreBtn = document.querySelector('.hero-actions .primary');
    const watchBtn = document.querySelector('.hero-actions .secondary');
    const getAccessBtn = document.querySelector('.navbar .cta-btn.small');

    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (watchBtn) {
        watchBtn.addEventListener('click', () => {
            alert('Demo reel coming soon! Stay tuned for our latest aerial cinematography.');
        });
    }

    if (getAccessBtn) {
        getAccessBtn.addEventListener('click', () => {
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Hero Animation Sequence
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

tl.to('.hero-title .line', {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.2
})
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1
    }, "-=0.5")
    .to('.cta-btn', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1
    }, "-=0.8")
    .to('.drone-img', {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "back.out(1.7)"
    }, "-=1");


// Scroll Animations
gsap.registerPlugin(ScrollTrigger);

// Product Showcases
gsap.utils.toArray('.product-showcase').forEach((section, i) => {
    const img = section.querySelector('.product-visual');
    const text = section.querySelector('.product-info');

    // Slide in from sides
    const isLeft = section.classList.contains('left-layout');

    gsap.from(img, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        },
        x: isLeft ? -100 : 100, // Left layout image is on left, so slide from left
        opacity: 0,
        duration: 1.2
    });

    gsap.from(text, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        },
        x: isLeft ? 100 : -100,
        opacity: 0,
        duration: 1.2,
        delay: 0.2
    });
});

// Innovation Cards Stagger
gsap.from('.card', {
    scrollTrigger: {
        trigger: '.innovation-section',
        start: "top 70%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
});

// Founder Section Animation
gsap.from('.founder-img-wrapper', {
    scrollTrigger: {
        trigger: '.founder-section',
        start: "top 75%",
    },
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
});

gsap.from('.founder-info', {
    scrollTrigger: {
        trigger: '.founder-section',
        start: "top 75%",
    },
    x: 50,
    opacity: 0,
    duration: 1,
    delay: 0.2
});

// Canvas Particle Effect for Hero
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('hero-canvas').appendChild(canvas);

let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
        this.color = Math.random() > 0.5 ? 'rgba(0, 242, 255, 0.5)' : 'rgba(255, 42, 109, 0.5)';
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    resize();
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', resize);
initParticles();
animateParticles();
