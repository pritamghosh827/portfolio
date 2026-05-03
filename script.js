// Matrix Rain Effect
class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.characters = '01ABCDEF<>{}[]()';
        this.fontSize = 14;
        this.columns = [];
        this.drops = [];

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }

    init() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    animate() {
        this.ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ffff';
        this.ctx.font = this.fontSize + 'px monospace';

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            this.ctx.fillText(text, x, y);

            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Advanced Typing Animation
class CyberTypewriter {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.typeSpeed = options.typeSpeed || 80;
        this.deleteSpeed = options.deleteSpeed || 40;
        this.pauseTime = options.pauseTime || 2000;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;

        this.start();
    }

    start() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        typeSpeed += Math.random() * 50 - 25;

        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Navigation System
class CyberNavigation {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.navToggle = document.getElementById('nav-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.sections = document.querySelectorAll('section[id]');
        this.navItems = document.querySelectorAll('.nav-link');

        this.init();
    }

    init() {
        this.navItems.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        window.addEventListener('scroll', () => this.updateActiveLink());

        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                this.navLinks.classList.toggle('active');
            });
        }

        window.addEventListener('scroll', () => this.updateNavBackground());
    }

    updateActiveLink() {
        let currentSection = '';

        this.sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 100) {
                currentSection = section.getAttribute('id');
            }
        });

        this.navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    updateNavBackground() {
        if (window.scrollY > 100) {
            this.nav.style.background = 'rgba(10, 10, 10, 0.98)';
            this.nav.style.backdropFilter = 'blur(25px)';
        } else {
            this.nav.style.background = 'rgba(10, 10, 10, 0.95)';
            this.nav.style.backdropFilter = 'blur(20px)';
        }
    }
}

// Skills Animation
class CyberSkills {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.glowBars = document.querySelectorAll('.progress-glow');
        this.animated = false;
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateSkills();
                    this.animated = true;
                }
            });
        }, { threshold: 0.3 });

        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    animateSkills() {
        this.skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const progress = bar.getAttribute('data-progress');
                const glowBar = this.glowBars[index];

                bar.style.width = progress + '%';

                if (glowBar) {
                    setTimeout(() => {
                        glowBar.style.width = progress + '%';
                    }, 500);
                }

                setTimeout(() => {
                    bar.style.boxShadow = '0 0 20px var(--cyber-primary)';
                    setTimeout(() => {
                        bar.style.boxShadow = 'none';
                    }, 300);
                }, 1500);

            }, index * 200);
        });
    }
}

// Contact Form Handler
class CyberContactForm {
    constructor() {
        this.form = document.querySelector('.cyber-form');
        this.inputs = document.querySelectorAll('.cyber-form input, .cyber-form textarea');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        this.inputs.forEach(input => {
            input.addEventListener('focus', (e) => this.handleInputFocus(e));
            input.addEventListener('blur', (e) => this.handleInputBlur(e));
        });
    }

    handleInputFocus(e) {
        const inputGroup = e.target.closest('.input-group');
        inputGroup.classList.add('cyber-focus');
        e.target.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.3)';
    }

    handleInputBlur(e) {
        const inputGroup = e.target.closest('.input-group');
        inputGroup.classList.remove('cyber-focus');
        e.target.style.boxShadow = 'none';
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        if (!data.name || !data.email || !data.message) {
            this.showCyberAlert('Error: All fields required for transmission.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showCyberAlert('Error: Invalid email format detected.', 'error');
            return;
        }

        this.showCyberAlert('Message transmitted successfully. Awaiting response...', 'success');
        this.form.reset();
        this.animateTransmission();
    }

    showCyberAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `cyber-alert ${type}`;
        alert.innerHTML = `
            <div class="alert-icon">${type === 'success' ? '✓' : '⚠'}</div>
            <div class="alert-message">${message}</div>
        `;

        alert.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? 'rgba(57, 255, 20, 0.1)' : 'rgba(255, 0, 64, 0.1)'};
            border: 1px solid ${type === 'success' ? '#39ff14' : '#ff0040'};
            color: ${type === 'success' ? '#39ff14' : '#ff0040'};
            font-weight: 600;
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 1rem;
            animation: cyber-alert-in 0.5s ease;
        `;

        document.body.appendChild(alert);

        setTimeout(() => {
            alert.style.animation = 'cyber-alert-out 0.5s ease';
            setTimeout(() => {
                document.body.removeChild(alert);
            }, 500);
        }, 4000);
    }

    animateTransmission() {
        const btn = document.querySelector('.submit-btn');
        if (btn) {
            btn.style.animation = 'transmission-pulse 1s ease';
            btn.innerHTML = '<span>Transmitting...</span>';

            setTimeout(() => {
                btn.innerHTML = '<span>Transmit Message</span><div class="btn-particles"></div>';
                btn.style.animation = '';
            }, 2000);
        }
    }
}

// Initialize all systems
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Cyber Portfolio Systems Initializing...');

    const matrixCanvas = document.getElementById('matrix-canvas');
    if (matrixCanvas) {
        new MatrixRain(matrixCanvas);
        console.log('✓ Matrix Rain System Online');
    }

    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        new CyberTypewriter(typingElement, [
            'Computer Science Student',
            'Future Software Developer',
            'Algorithm Optimizer',
            'Full-Stack Developer',
            'Code Architect',
            'Problem Solver',
            'Tech Innovator'
        ]);
        console.log('✓ Cyber Typewriter Activated');
    }

    new CyberNavigation();
    new CyberSkills();
    new CyberContactForm();

    console.log('✓ All Cyber Systems Online');
    console.log('🎯 Portfolio Ready for Deployment');

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cyber-alert-in {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }

        @keyframes cyber-alert-out {
            0% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(100%); opacity: 0; }
        }

        @keyframes transmission-pulse {
            0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
            50% { box-shadow: 0 0 40px rgba(0, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.4); }
        }

        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                background: rgba(10, 10, 10, 0.98);
                backdrop-filter: blur(25px);
                flex-direction: column;
                padding: 2rem;
                transform: translateX(-100%);
                transition: transform 0.3s ease;
                border-bottom: 1px solid var(--border-cyber);
            }

            .nav-links.active {
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
});