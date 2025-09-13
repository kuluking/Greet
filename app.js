
const fortunes = [
    { emoji: "💋", message: "If kisses were coding bugs, I'd never fix them—just keep them coming!" },
    { emoji: "🎬", message: "Let’s make a rom-com tonight: you bring the charm, I’ll bring the popcorn and awkward flirting." },
    { emoji: "💌", message: "Wrote you a love note, but my pen melted from your hotness. Had to switch to emojis." },
    { emoji: "😍", message: "Your smile should come with a warning: may cause butterflies and spontaneous daydreams." },
    { emoji: "🗺️", message: "Planned an adventure—Step 1: Steal your heart. Step 2: Never give it back." },
    { emoji: "🤗", message: "Your hugs are like semicolons in my life—holding everything together." },
    { emoji: "✨", message: "You must be a bug in my system—because every time I see you, my heart crashes." },
    { emoji: "🎁", message: "Surprise! You’ve just won a lifetime supply of my attention and terrible pickup lines." }
  ];
  
  
  function drawWheel(ctx, segments, centerX, centerY, radius, rotation) {
    const colors = ["#ffb6c1", "#e6e6fa", "#87ceeb", "#ffd700", "#ff69b4", "#98fb98", "#f08080", "#dda0dd"];
    const angle = (2 * Math.PI) / segments.length;
    ctx.save();
    ctx.translate(centerX, centerY);
    for(let i = 0; i < segments.length; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, angle * i + rotation, angle * (i + 1) + rotation);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
  
      ctx.save();
      ctx.rotate(angle * i + angle/2 + rotation - Math.PI/2);
      ctx.textAlign = "center";
      ctx.font = "bold 2rem Poppins, sans-serif";
      ctx.fillStyle = "#e75480";
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 4;
      ctx.strokeText(segments[i].emoji, 0, -radius + 50);
      ctx.fillText(segments[i].emoji, 0, -radius + 50);
      ctx.restore();
    }
    ctx.restore();
  
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
    span.innerHTML = `<div style='font-size:5rem;'>${result.emoji}</div><p>${result.message}</p>`;
    modal.classList.remove('hidden');
    explodeEmojis(result.emoji);
  }
  
  function hideFortune() {
    const modal = document.getElementById('fortuneModal');
    if (modal) modal.classList.add('hidden');
  }
  
  function explodeEmojis(emoji) {
    for (let i = 0; i < 30; i++) {
      const el = document.createElement('div');
      el.textContent = emoji;
      el.style.position = 'fixed';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.top = '50vh';
      el.style.fontSize = '2rem';
      el.style.opacity = '1';
      el.style.transition = 'transform 1s ease-out, opacity 1s';
      document.body.appendChild(el);
      setTimeout(() => {
        el.style.transform = `translateY(-${Math.random()*200+100}px) rotate(${Math.random()*360}deg)`;
        el.style.opacity = '0';
      }, 10);
      setTimeout(() => el.remove(), 1500);
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('fortuneWheel');
    if (canvas) {
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
    }
  });
  
  // Typing animation for the poem
const poemLines = [
    "💌Roses are red,",
    "Violets are blue,",
    "The world feels brighter,",
    "Whenever I see you.💌",

    "So... what do you say, Jahnavi? 💖 Will you let me be the reason behind your smile?"
  ];
  
  let lineIndex = 0;
  let charIndex = 0;
  const poemText = document.getElementById("poemText");
  const cursor = document.getElementById("cursor");
  
  function typePoem() {
    if (lineIndex < poemLines.length) {
      if (charIndex < poemLines[lineIndex].length) {
        poemText.innerHTML += poemLines[lineIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typePoem, 100);
      } else {
        poemText.innerHTML += "<br>";
        charIndex = 0;
        lineIndex++;
        setTimeout(typePoem, 500);
      }
    } else {
      cursor.style.display = "none";
    }
  }
  
  document.addEventListener("DOMContentLoaded", typePoem);
  
  // Surprise button logic
  const surpriseBtn = document.getElementById("surpriseBtn");
  const confettiCanvas = document.getElementById("confettiCanvas");
  const loveLetterModal = document.getElementById("loveLetterModal");
  const closeLoveLetter = document.getElementById("closeLoveLetter");
  
  surpriseBtn.addEventListener("click", () => {
    // Show confetti (simple effect)
    confettiCanvas.classList.add("active");
  
    // Show love letter modal
    loveLetterModal.classList.remove("hidden");
  
    // Optional: remove confetti after a few seconds
    setTimeout(() => {
      confettiCanvas.classList.remove("active");
    }, 4000);
  });
  
  closeLoveLetter.addEventListener("click", () => {
    loveLetterModal.classList.add("hidden");
  });
  
  // Add a sweet message asking for her answer
  const closingSection = document.getElementById("closing");
  const answerPrompt = document.createElement("p");
  answerPrompt.className = "answer-prompt";
  closingSection.querySelector(".container").appendChild(answerPrompt);
  const flowerAnimation = document.getElementById("flowerAnimation");

function typePoem() {
  if (lineIndex < poemLines.length) {
    if (charIndex < poemLines[lineIndex].length) {
      poemText.innerHTML += poemLines[lineIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typePoem, 100);
    } else {
      poemText.innerHTML += "<br>";
      charIndex = 0;
      lineIndex++;
      setTimeout(typePoem, 500);
    }
  } else {
    cursor.style.display = "none";

    // Show flower animation with pop-up effect
    flowerAnimation.classList.remove("hidden");
    flowerAnimation.classList.add("show");
  }
}
