// Poem data
const poemLines = [
    "In a world of ordinary days,",
    "You bring the sunshine in so many ways,",
    "With your laughter, your smile so bright,",
    "You make everything feel just right.",
    "Jahnavi, you're one of a kind,",
    "With the sweetest heart and brilliant mind!"
];

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupIntersectionObserver();
    setupSurpriseButton();
    startPoemAnimation();
});

// Initialize all animations
function initializeAnimations() {
    // Add entrance animations to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
    });
    
    // Hero section should be visible immediately
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
}

// Setup Intersection Observer for entrance animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                section.style.transition = 'all 1s ease-out';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
                
                // Trigger specific animations for different sections
                if (section.id === 'poem') {
                    setTimeout(() => {
                        startTypewriterEffect();
                    }, 500);
                }
                
                // Animate reason cards with stagger effect
                if (section.id === 'reasons') {
                    const cards = section.querySelectorAll('.reason-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
                
                // Animate gallery items with stagger effect
                if (section.id === 'gallery') {
                    const items = section.querySelectorAll('.gallery-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0) scale(1)';
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all sections except hero
    const sections = document.querySelectorAll('section:not(#hero)');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Initially hide reason cards and gallery items
    const reasonCards = document.querySelectorAll('.reason-card');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    reasonCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
    });
    
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.9)';
        item.style.transition = 'all 0.6s ease-out';
    });
}

// Typewriter effect for poem
let poemStarted = false;

function startPoemAnimation() {
    // This will be triggered by the intersection observer
    // Just ensuring the poem text is empty initially
    const poemText = document.getElementById('poemText');
    if (poemText) {
        poemText.innerHTML = '';
    }
}

function startTypewriterEffect() {
    if (poemStarted) return; // Prevent multiple starts
    poemStarted = true;
    
    const poemText = document.getElementById('poemText');
    const cursor = document.getElementById('cursor');
    
    if (!poemText || !cursor) return;
    
    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = '';
    
    function typeNextChar() {
        if (lineIndex < poemLines.length) {
            const line = poemLines[lineIndex];
            
            if (charIndex < line.length) {
                currentLine += line[charIndex];
                poemText.innerHTML = getPoemHTML(lineIndex, currentLine);
                charIndex++;
                setTimeout(typeNextChar, 50); // Typing speed
            } else {
                // Line completed, move to next line
                lineIndex++;
                charIndex = 0;
                currentLine = '';
                setTimeout(typeNextChar, 500); // Pause between lines
            }
        } else {
            // Poem completed, hide cursor after a delay
            setTimeout(() => {
                cursor.style.display = 'none';
            }, 2000);
        }
    }
    
    function getPoemHTML(completedLines, currentLine) {
        let html = '';
        
        // Add completed lines
        for (let i = 0; i < completedLines; i++) {
            html += `<div class="poem-line">${poemLines[i]}</div>`;
        }
        
        // Add current line being typed
        if (currentLine) {
            html += `<div class="poem-line">${currentLine}</div>`;
        }
        
        return html;
    }
    
    // Start typing
    setTimeout(typeNextChar, 1000);
}

// Surprise button confetti effect
function setupSurpriseButton() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    if (!surpriseBtn) return;
    
    surpriseBtn.addEventListener('click', function() {
        createConfettiExplosion();
        
        // Change button text temporarily
        const originalText = surpriseBtn.textContent;
        surpriseBtn.textContent = 'Surprise! 🎊';
        surpriseBtn.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
            surpriseBtn.textContent = originalText;
            surpriseBtn.style.transform = 'scale(1)';
        }, 2000);
    });
}

// Create confetti explosion
function createConfettiExplosion() {
    const confettiCanvas = document.getElementById('confettiCanvas');
    if (!confettiCanvas) return;
    
    const colors = ['#E6E6FA', '#FFB6C1', '#87CEEB', '#FFD700', '#FF69B4', '#98FB98'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            createConfettiPiece(confettiCanvas, colors);
        }, i * 50);
    }
    
    // Clear confetti after animation
    setTimeout(() => {
        confettiCanvas.innerHTML = '';
    }, 4000);
}

function createConfettiPiece(container, colors) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    
    // Random properties
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 8 + 6;
    const startX = Math.random() * window.innerWidth;
    const endX = startX + (Math.random() - 0.5) * 200;
    const rotation = Math.random() * 360;
    const duration = Math.random() * 1000 + 2000;
    
    confetti.style.backgroundColor = color;
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    confetti.style.left = startX + 'px';
    confetti.style.top = '-10px';
    confetti.style.transform = `rotate(${rotation}deg)`;
    confetti.style.animationDuration = duration + 'ms';
    confetti.style.animationTimingFunction = 'ease-out';
    
    // Add physics-like movement
    confetti.style.animation = `confettiFall ${duration}ms linear forwards`;
    
    container.appendChild(confetti);
    
    // Remove confetti piece after animation
    setTimeout(() => {
        if (confetti && confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, duration);
}

// Add extra hover effects for gallery items
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const placeholder = item.querySelector('.image-placeholder');
        
        item.addEventListener('mouseenter', function() {
            // Add sparkle effect
            createSparkles(placeholder);
        });
    });
});

function createSparkles(container) {
    const sparkleCount = 6;
    const sparkles = [];
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '10';
        sparkle.style.left = Math.random() * 80 + '%';
        sparkle.style.top = Math.random() * 80 + '%';
        sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
        
        container.appendChild(sparkle);
        sparkles.push(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle && sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
}

// Add sparkle animation to CSS dynamically
const sparkleKeyframes = `
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 1;
        }
        50% {
            transform: translateY(-20px) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-40px) scale(0);
            opacity: 0;
        }
    }
`;

// Add the keyframes to the document
const style = document.createElement('style');
style.textContent = sparkleKeyframes;
document.head.appendChild(style);

// Smooth scroll for any internal links (if added later)
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add random floating emoji animations
function addRandomFloatingEmojis() {
    const emojis = ['💖', '✨', '🌟', '💫', '🌈', '🎈', '🌸', '💝'];
    const container = document.querySelector('.floating-elements');
    
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every interval
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.className = 'floating-extra';
            emoji.style.position = 'absolute';
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.fontSize = '2rem';
            emoji.style.animation = `float ${Math.random() * 3 + 6}s linear forwards`;
            emoji.style.opacity = '0.6';
            
            container.appendChild(emoji);
            
            // Remove after animation
            setTimeout(() => {
                if (emoji && emoji.parentNode) {
                    emoji.parentNode.removeChild(emoji);
                }
            }, 9000);
        }
    }, 2000);
}

// Start random floating emojis
setTimeout(addRandomFloatingEmojis, 3000);

// Add bounce effect to reason cards on load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const cards = document.querySelectorAll('.reason-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'cardBounceIn 0.6s ease-out forwards';
            }, index * 100);
        });
    }, 1000);
});

// Add card bounce in animation to CSS
const cardBounceKeyframes = `
    @keyframes cardBounceIn {
        0% {
            transform: scale(0.3) rotate(-10deg);
            opacity: 0;
        }
        50% {
            transform: scale(1.05) rotate(2deg);
        }
        70% {
            transform: scale(0.9) rotate(-1deg);
        }
        100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
    }
`;

const cardStyle = document.createElement('style');
cardStyle.textContent = cardBounceKeyframes;
document.head.appendChild(cardStyle);