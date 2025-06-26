
// Add hover effect for interactive elements
const interactiveElements = document.querySelectorAll(
    'a, button, .project-card, .expertise-card, .info-card, .testimonial-card, .form-group input, .form-group textarea'
);

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });
});

// Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Scroll effect for navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.glass-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Animated counter for stats
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Initialize counter animation when section is in view
const aboutSection = document.querySelector('.about');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(aboutSection);

// Projects filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Testimonial slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Initialize first testimonial
showTestimonial(0);

// Form validation
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Here you would typically send the data to a server
    console.log({ name, email, subject, message });
    
    // Show success message
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent';
    submitBtn.style.backgroundColor = 'var(--success-color)';
    
    // Reset form after delay
    setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        submitBtn.style.backgroundColor = 'var(--primary-color)';
    }, 3000);
});

// Back to top button
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero animations
gsap.from('.badge', {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.hero h1', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.3,
    ease: 'power3.out'
});

gsap.from('.hero-subtitle', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.6,
    ease: 'power3.out'
});

gsap.from('.hero-cta', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.9,
    ease: 'power3.out'
});

gsap.from('.hero-social', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 1.2,
    ease: 'power3.out'
});

gsap.from('.profile-image', {
    duration: 1.5,
    scale: 0.8,
    opacity: 0,
    delay: 0.5,
    ease: 'elastic.out(1, 0.5)'
});

gsap.from('.tech-item', {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.1,
    delay: 1,
    ease: 'power3.out'
});

// Section animations
const sections = document.querySelectorAll('section');

sections.forEach(section => {
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

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-progress');

skillBars.forEach(bar => {
    const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
    bar.style.width = '0';
    
    ScrollTrigger.create({
        trigger: bar,
        start: 'top 80%',
        onEnter: () => {
            gsap.to(bar, {
                width: width,
                duration: 1.5,
                ease: 'power3.out'
            });
        }
    });
});

// Project card animations
const projects = document.querySelectorAll('.project-card');

projects.forEach((project, i) => {
    gsap.from(project, {
        scrollTrigger: {
            trigger: project,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out'
    });
});

// Initialize particles.js
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#6c63ff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.3,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6c63ff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
});