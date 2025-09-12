// Poem data
const poemLines = [
    "In a world of ordinary days,",
    "You bring the sunshine in so many ways,",
    "With your laughter, your smile so bright,",
    "You make everything feel just right.",
    "Jahnavi, you're one of a kind,",
    "With the sweetest heart and brilliant mind!"
];

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupIntersectionObserver();
    setupSurpriseButton();
    startPoemAnimation();
});

// Initialize all animations
function initializeAnimations() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
    });
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
                if (section.id === 'poem') {
                    setTimeout(() => {
                        startTypewriterEffect();
                    }, 500);
                }
                if (section.id === 'reasons') {
                    const cards = section.querySelectorAll('.reason-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
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

    const sections = document.querySelectorAll('section:not(#hero)');
    sections.forEach(section => {
        observer.observe(section);
    });

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
    const poemText = document.getElementById('poemText');
    if (poemText) {
        poemText.innerHTML = '';
    }
}
function startTypewriterEffect() {
    if (poemStarted) return;
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
                setTimeout(typeNextChar, 50);
            } else {
                lineIndex++;
                charIndex = 0;
                currentLine = '';
                setTimeout(typeNextChar, 500);
            }
        } else {
            setTimeout(() => {
                cursor.style.display = 'none';
            }, 2000);
        }
    }
    function getPoemHTML(completedLines, currentLine) {
        let html = '';
        for (let i = 0; i < completedLines; i++) {
            html += `<div class="poem-line">${poemLines[i]}</div>`;
        }
        if (currentLine) {
            html += `<div class="poem-line">${currentLine}</div>`;
        }
        return html;
    }
    setTimeout(typeNextChar, 1000);
}

// Surprise button confetti effect
function setupSurpriseButton() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    if (!surpriseBtn) return;
    surpriseBtn.addEventListener('click', function() {
        createConfettiExplosion();
        const originalText = surpriseBtn.textContent;
        surpriseBtn.textContent = 'Surprise! 🎊';
        surpriseBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            surpriseBtn.textContent = originalText;
            surpriseBtn.style.transform = 'scale(1)';
        }, 2000);
    });
}
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
    setTimeout(() => {
        confettiCanvas.innerHTML = '';
    }, 4000);
}
function createConfettiPiece(container, colors) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
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
    confetti.style.animation = `confettiFall ${duration}ms linear forwards`;
    container.appendChild(confetti);
    setTimeout(() => {
        if (confetti && confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, duration);
}

// Gallery item sparkles
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        const placeholder = item.querySelector('.image-placeholder');
        item.addEventListener('mouseenter', function() {
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
const style = document.createElement('style');
style.textContent = sparkleKeyframes;
document.head.appendChild(style);

// Smooth scroll for any internal links
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

// Random floating emoji
function addRandomFloatingEmojis() {
    const emojis = ['💖', '✨', '🌟', '💫', '🌈', '🎈', '🌸', '💝'];
    const container = document.querySelector('.floating-elements');
    setInterval(() => {
        if (Math.random() > 0.7) {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.className = 'floating-extra';
            emoji.style.position = 'absolute';
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.fontSize = '2rem';
            emoji.style.animation = `float ${Math.random() * 3 + 6}s linear forwards`;
            emoji.style.opacity = '0.6';
            container.appendChild(emoji);
            setTimeout(() => {
                if (emoji && emoji.parentNode) {
                    emoji.parentNode.removeChild(emoji);
                }
            }, 9000);
        }
    }, 2000);
}
setTimeout(addRandomFloatingEmojis, 3000);

// Reason cards bounce in
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
const cardBounceKeyframes = `
    @keyframes cardBounceIn {
        0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
        50% { transform: scale(1.05) rotate(2deg); }
        70% { transform: scale(0.9) rotate(-1deg); }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
`;
const cardStyle = document.createElement('style');
cardStyle.textContent = cardBounceKeyframes;
document.head.appendChild(cardStyle);

// --- LOVE FORTUNE WHEEL GAME ---
const fortunes = [
  "You get a forehead kiss! 💋",
  "Tonight, you pick the movie for our romantic night in. 🎬",
  "A love note is coming your way soon. 💌",
  "Your smile melts my heart every time. 😍",
  "Let's plan a fun adventure together soon! 🗺️",
  "You get a big, warm hug! 🤗",
  "You make my world magical. ✨",
  "A surprise is coming for you... stay tuned! 🎁",
];
function drawWheel(ctx, segments, centerX, centerY, radius, rotation) {
  const colors = ["#ffb6c1", "#e6e6fa", "#87ceeb", "#ffd700", "#ff69b4", "#98fb98", "#f08080", "#dda0dd"];
  const angle = (2 * Math.PI) / segments.length;
  for(let i=0; i<segments.length; i++){
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, angle * i + rotation, angle * (i+1) + rotation);
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle * (i + 0.5) + rotation);
    ctx.textAlign = "right";
    ctx.font = "bold 1rem Poppins, sans-serif";
    ctx.fillStyle = "#4a4a4a";
    ctx.fillText("💖 " + segments[i], radius - 24, 8);
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(centerX, centerY, 48, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.save();
  ctx.translate(centerX, centerY - radius + 12);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-18, -16);
  ctx.lineTo(18, -16);
  ctx.closePath();
  ctx.fillStyle = "#e75480";
  ctx.shadowColor = "#e75480";
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.restore();
}
function showFortune(result) {
  const modal = document.getElementById('fortuneModal');
  const span = document.getElementById('fortuneResult');
  if (!modal || !span) return;
  span.innerText = result;
  modal.classList.remove('hidden');
}
function hideFortune() {
  const modal = document.getElementById('fortuneModal');
  if (modal) modal.classList.add('hidden');
}
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('fortuneWheel');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let currentRotation = 0;
  let spinning = false;
  function renderWheel(rot = 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWheel(ctx, fortunes, canvas.width/2, canvas.height/2, 130, rot);
  }
  renderWheel(currentRotation);
  const spinBtn = document.getElementById('spinBtn');
  if (spinBtn) {
    spinBtn.addEventListener('click', function() {
      if(spinning) return;
      spinning = true;
      let spins = Math.floor(Math.random()*2)+5;
      let fortuneIndex = Math.floor(Math.random()*fortunes.length);
      let anglePer = (2*Math.PI) / fortunes.length;
      let targetAngle = (2*Math.PI*spins) + (2*Math.PI - anglePer*fortuneIndex - anglePer/2);
      let start = currentRotation;
      let startTime = null;
      function animateSpin(ts) {
        if (!startTime) startTime = ts;
        let elapsed = ts - startTime;
        let duration = 2600;
        let t = Math.min(elapsed/duration,1);
        let ease = 1- Math.pow(1-t,3);
        currentRotation = start + (targetAngle-start)*ease;
        renderWheel(currentRotation);
        if (t < 1) {
          requestAnimationFrame(animateSpin);
        } else {
          currentRotation = targetAngle % (2*Math.PI);
          renderWheel(currentRotation);
          setTimeout(() => {
            showFortune(fortunes[fortuneIndex]);
            spinning = false;
          }, 500);
        }
      }
      requestAnimationFrame(animateSpin);
    });
  }
  const closeBtn = document.getElementById('closeFortune');
  if (closeBtn) closeBtn.addEventListener('click', hideFortune);
  const fortuneModal = document.getElementById('fortuneModal');
  if (fortuneModal) {
    fortuneModal.addEventListener('click', function(e){
      if(e.target === fortuneModal) hideFortune();
    });
  }
});
