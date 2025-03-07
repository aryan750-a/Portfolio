// Project data
const projects = [
    {
        title: "Project Neptune",
        description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB",
        tags: ["React", "Node.js", "MongoDB", "Redux"],
        link: "#"
    },
    {
        title: "Cyber Quest",
        description: "An immersive browser-based RPG game using Three.js and WebGL",
        tags: ["Three.js", "JavaScript", "WebGL", "Game Development"],
        link: "#"
    },
    {
        title: "Neural Net Visualizer",
        description: "Interactive visualization of neural networks using D3.js and TensorFlow.js",
        tags: ["D3.js", "TensorFlow.js", "Machine Learning"],
        link: "#"
    }
];

// Skills data
const skills = [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 85 },
    { name: "Three.js", level: 75 },
    { name: "MongoDB", level: 80 },
    { name: "SQL", level: 85 },
    { name: "WebGL", level: 70 },
    { name: "TypeScript", level: 80 },
    { name: "Docker", level: 75 }
];

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeProjects();
    initializeSkills();
    initializeGlitchEffect();
    initializeScrollAnimation();
});

// Initialize project cards
function initializeProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="${project.link}" class="project-link">View Project</a>
        `;
        
        projectsGrid.appendChild(card);
    });
}

// Initialize skills section
function initializeSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    
    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        
        skillItem.innerHTML = `
            <div class="skill-name">${skill.name}</div>
            <div class="skill-level" style="--level: ${skill.level}%"></div>
        `;
        
        skillsContainer.appendChild(skillItem);
    });
}

// Glitch effect for main title
function initializeGlitchEffect() {
    const glitchText = document.querySelector('.glitch');
    if (!glitchText) return;

    setInterval(() => {
        glitchText.style.animation = 'glitch 0.3s infinite';
        setTimeout(() => {
            glitchText.style.animation = 'none';
        }, 300);
    }, 3000);
}

// Smooth scroll animation
function initializeScrollAnimation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Handle navigation menu for mobile
const setupMobileNav = () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        const menuButton = document.createElement('button');
        menuButton.className = 'menu-toggle';
        menuButton.innerHTML = '<span></span><span></span><span></span>';
        
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
        
        if (!nav.querySelector('.menu-toggle')) {
            nav.appendChild(menuButton);
        }
    }
};

window.addEventListener('resize', setupMobileNav);
setupMobileNav();
