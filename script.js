/*====================================================
  SHAYMA'S PAGE - Script
  Made with love by Cleophas
====================================================*/

console.log('script is running');


// =============================================
// 1. STARS  (declared first so everything below can use starsContainer)
// =============================================

const starsContainer = document.getElementById('stars-container');

function createStars() {
  const star = document.createElement('div');
  star.classList.add('star');
  star.innerHTML = '&#9733;';
  star.style.left = Math.random() * 100 + '%';
  star.style.top  = Math.random() * 100 + '%';
  star.style.fontSize = Math.floor(Math.random() * 10 + 5) + 'px';
  star.style.animationDuration = (Math.random() * 3 + 2) + 's';
  star.style.animationDelay    = (Math.random() * 5) + 's';
  starsContainer.appendChild(star);
}

function createSmallStars() {
  const small = document.createElement('div');
  small.classList.add('star-small');
  small.style.left = Math.random() * 100 + '%';
  small.style.top  = Math.random() * 100 + '%';
  small.style.animationDuration = (Math.random() * 4 + 2) + 's';
  small.style.animationDelay    = (Math.random() * 6) + 's';
  starsContainer.appendChild(small);
}

for (let i = 0; i < 20;  i++) createStars();
for (let i = 0; i < 50; i++) createSmallStars();


// =============================================
// 2. TIME OF DAY
// =============================================

const hour  = new Date().getHours();
const isDay = hour >= 6 && hour <18;

const moon           = document.getElementById('moon');
const sun            = document.getElementById('sun');
const cloudsContainer = document.getElementById('clouds-container');

if (isDay) {
  document.body.classList.add('daytime');

  // Hide night elements
  moon.style.display = 'none';
  starsContainer.style.display = 'none';

  // Show sun
  sun.style.display = 'block';

  // Sun rays — 12 spokes radiating from sun center
  const sunCenterX = window.innerWidth - 15 - 45;   // right:15px + half of 90px
  const sunCenterY = 10 + 45;                         // top:10px + half of 90px

  for (let r = 0; r < 12; r++) {
    const ray    = document.createElement('div');
    ray.classList.add('sun-ray');
    const angle  = (r * 360) / 12;
    const length = Math.random() * 40 + 50;

    ray.style.height          = length + 'px';
    ray.style.left            = sunCenterX + 'px';
    ray.style.top             = (sunCenterY - length) + 'px';
    ray.style.transform       = `rotate(${angle}deg)`;
    ray.style.animationDelay  = (r * 0.2) + 's';

    document.body.appendChild(ray);
  }
  // Fluffy clouds
  const cloudSizes = [0.75, 1.1, 0.85, 1.25, 0.95, 1.05, 0.7];
  const cloudTops  = [5, 15, 10, 22, 8, 30, 18];

  for (let c = 0; c < 7; c++) {
    const cloud     = document.createElement('div');
    cloud.classList.add('cloud');

    const cloudBody = document.createElement('div');
    cloudBody.classList.add('cloud-body');
    cloudBody.style.transform       = `scale(${cloudSizes[c]})`;
    cloudBody.style.transformOrigin = 'left center';

    cloud.appendChild(cloudBody);

    const duration = Math.random() * 50 + 40;
    const delay    = -(Math.random() * duration); // start mid-screen immediately

    cloud.style.top               = cloudTops[c] + '%';
    cloud.style.left              = '0';
    cloud.style.animationDuration = duration + 's';
    cloud.style.animationDelay    = delay + 's';

    cloudsContainer.appendChild(cloud);
  }

} else {
  // Nighttime — hide sun, show moon + stars (already visible by default)
  sun.style.display = 'none';
}


// =============================================
// 3. REASONS CARDS (date-based reveal)
// =============================================

const reasons = [
  { emoji: "✨", title: "Your Beauty",  text: "There's a kind of beauty that stops you mid-thought — and that's yours." },
  { emoji: "🤍", title: "Your Skin",    text: "The way you glow, even without trying — it's effortlessly radiant." },
  { emoji: "👁️", title: "Your Eyes",    text: "Your eyes speak before you even say a word. I could get lost in them." },
  { emoji: "🌸", title: "Your Smile",   text: "Your smile has this quiet power — it makes everything feel lighter." },
  { emoji: "💛", title: "Your Heart",   text: "Respectful, genuine, caring, loving — you're rare in the best way." },
  { emoji: "🌙", title: "Your Hair",    text: "I've only seen a little of it — but even that small glimpse told me something beautiful hides there." },
  { emoji: "🌟", title: "Your Company", text: "When I'm with you, I feel complete. Like the missing piece finally found its place." },
];

const cardsContainer = document.getElementById('cards-container');

// ⚠️ Change this to the date you send her the link
const startDate   = new Date('2026-05-25');
const today       = new Date();
const msPerDay    = 1000 * 60 * 60 * 24;
const daysPassed  = Math.floor((today - startDate) / msPerDay);
const cardsToShow = Math.min(Math.max(daysPassed + 1, 1), reasons.length);

if (cardsToShow === 0) {
  cardsContainer.innerHTML = `<p style="color:#d4b8ff;font-style:italic;">Come back tomorrow for your first surprise... 🌙</p>`;
} else {
  reasons.slice(0, cardsToShow).forEach((reason, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.animationDelay = (index * 0.2) + 's';
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <span class="card-emoji">${reason.emoji}</span>
          <span class="card-day">Day ${index + 1}</span>
        </div>
        <div class="card-back">
          <h3>${reason.title}</h3>
          <p>${reason.text}</p>
        </div>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}


// =============================================
// 4. CONFESSION TYPEWRITER
// =============================================

const confessionText = document.getElementById('confession-text');
const message = "Shayma... I like you. ♥";
let charIndex = 0;

function typeWriter() {
  if (charIndex < message.length) {
    confessionText.textContent += message[charIndex];
    charIndex++;
    setTimeout(typeWriter, 120);
  }
}


// =============================================
// 5. SHOOTING STARS (canvas)
// =============================================

const canvas = document.getElementById('shooting-star-canvas');
const ctx    = canvas.getContext('2d');

// Size canvas to its CSS size
function resizeCanvas() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();

let meteorList  = [];  // renamed from 'stars' to avoid conflict with star elements
let starCount   = 0;
const maxStars  = 5;
let shootingAnimActive = false;

function shootingStar() {
  meteorList.push({
    x:       Math.random() * canvas.width  * 0.5,
    y:       Math.random() * canvas.height * 0.3,
    len:     Math.random() * 250 + 150,
    speed:   Math.random() * 8 + 6,
    opacity: 1,
    width:   Math.random() * 3 + 2
  });
}

function drawMeteors() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  meteorList.forEach((star, index) => {
    const tailX = star.x - star.len;
    const tailY = star.y - star.len * 0.5;

    // Outer glow trail
    const outerGrad = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
    outerGrad.addColorStop(0,   `rgba(100, 200, 255, ${star.opacity * 0.4})`);
    outerGrad.addColorStop(0.4, `rgba(80,  170, 255, ${star.opacity * 0.15})`);
    outerGrad.addColorStop(1,   `rgba(50,  100, 255, 0)`);

    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(tailX, tailY);
    ctx.strokeStyle = outerGrad;
    ctx.lineWidth   = star.width * 6;
    ctx.lineCap     = 'round';
    ctx.stroke();

    // Core bright trail
    const coreGrad = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
    coreGrad.addColorStop(0,   `rgba(220, 240, 255, ${star.opacity})`);
    coreGrad.addColorStop(0.2, `rgba(120, 210, 255, ${star.opacity * 0.8})`);
    coreGrad.addColorStop(0.6, `rgba(60,  150, 255, ${star.opacity * 0.3})`);
    coreGrad.addColorStop(1,   `rgba(30,   80, 255, 0)`);

    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(tailX, tailY);
    ctx.strokeStyle = coreGrad;
    ctx.lineWidth   = star.width;
    ctx.lineCap     = 'round';
    ctx.stroke();

    // Glowing head
    const headGlow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 20);
    headGlow.addColorStop(0,   `rgba(255, 255, 255, ${star.opacity})`);
    headGlow.addColorStop(0.2, `rgba(180, 230, 255, ${star.opacity * 0.9})`);
    headGlow.addColorStop(0.5, `rgba(80,  180, 255, ${star.opacity * 0.5})`);
    headGlow.addColorStop(1,   `rgba(30,  100, 255, 0)`);

    ctx.beginPath();
    ctx.arc(star.x, star.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = headGlow;
    ctx.fill();

    star.x       += star.speed;
    star.y       += star.speed * 0.5;
    star.opacity -= 0.01;

    if (star.opacity <= 0) meteorList.splice(index, 1);
  });

  requestAnimationFrame(drawMeteors);
}

function launchNextStar() {
  if (starCount < maxStars) {
    shootingStar();
    starCount++;
    setTimeout(launchNextStar, 800);
  } else {
    setTimeout(() => {
      starCount = 0;
      launchNextStar();
    }, 3000);
  }
}

function startShootingStars() {
  meteorList  = [];
  starCount   = 0;
  resizeCanvas();
  if (!shootingAnimActive) {
    shootingAnimActive = true;
    drawMeteors();
  }
  launchNextStar();
}



// =============================================
// 7. SECTION AUDIO
// =============================================
const currentAudio = {
  intro:      isDay ? 'audio/day-intro.mp3'      : 'audio/night-intro.mp3',
}

const sectionSounds = {
  intro:      isDay ? 'audio/day-intro.mp3'      : 'audio/night-intro.mp3',
  birthday:   isDay ? 'audio/day-birthday.mp3'   : 'audio/night-birthday.mp3',
  reasons:    isDay ? 'audio/day-reasons.mp3'    : 'audio/night-reasons.mp3',
  confession: isDay ? 'audio/day-confession.mp3' : 'audio/night-confession.mp3',
  ending:     isDay ? 'audio/day-ending.mp3'     : 'audio/night-ending.mp3',
};

// Pre-load all audio objects so they can resume where they left off
const audioPlayers = {};
Object.keys(sectionSounds).forEach(section => {
  const audio = new Audio(sectionSounds[section]);
  audio.loop = true;        // loops automatically
  audio.volume = 0;
  audioPlayers[section] = audio;
});

let currentSection = null;

function fadeOut(audio, callback) {
  clearInterval(audio._fadeInterval);
  audio._fadeInterval = setInterval(() => {
    if (audio.volume > 0.05) {
      audio.volume -= 0.05;
    } else {
      audio.volume = 0;
      audio.pause();
      clearInterval(audio._fadeInterval);
      if (callback) callback();
    }
  }, 80);
}

function fadeIn(audio) {
  clearInterval(audio._fadeInterval);
  audio.volume = 0;
  audio.play().catch(() => {});
  audio._fadeInterval = setInterval(() => {
    if (audio.volume < 0.5) {
      audio.volume = Math.min(audio.volume + 0.05, 0.5);
    } else {
      clearInterval(audio._fadeInterval);
    }
  }, 80);
}

function playSectionSound(sectionId) {
  const nextAudio = audioPlayers[sectionId];
  if (!nextAudio) return;

  // Stop ALL players instantly before fading in the new one
  Object.keys(audioPlayers).forEach(key => {
    const audio = audioPlayers[key];
    clearInterval(audio._fadeInterval);
    if (key !== sectionId) {
      audio.volume = 0;
      audio.pause();
    }
  });

  currentSection = sectionId;
  fadeIn(nextAudio);
}


// =============================================
// 8. ENDING INTERACTION
// =============================================

const endingText     = document.getElementById('ending-text');
const endingChoices  = document.getElementById('ending-choices');
const convinceText   = document.getElementById('convince-text');
const endingWrapper  = document.getElementById('ending-heart-wrapper');
const yesCheck       = document.getElementById('yes-check');
const thinkCheck     = document.getElementById('think-check');

const endingMessage  = "Can I be your star? ⭐";
let endingCharIndex  = 0;
let endingTyping     = false;

const convinceMessages = [
  "Hey dee, it's me asking this. Please, consider my request. I do love you and I am sure you know that, so if you would just say yes, I promise to make every single day feel as special as this one.",
  "Hey dee, it's me asking this. Please, consider my request. I do love you and I am sure you know that, so if you would give me a chance, I will spend every day proving you made the right choice.",
  "Hey dee, it's me asking this. Please, consider my request. I do love you and I am sure you know that, so if you would let me, I want to be the reason you smile every day.",
];

function getConvinceMessage() {
  const rand = Math.random();
  if (rand < 0.6) return convinceMessages[0];
  if (rand < 0.8) return convinceMessages[1];
  return convinceMessages[2];
}

function typeEndingText() {
  if (endingCharIndex < endingMessage.length) {
    endingText.textContent += endingMessage[endingCharIndex];
    endingCharIndex++;
    setTimeout(typeEndingText, 120);
  } else {
    // Typing done — show checkboxes
    endingChoices.style.display = 'flex';
  }
}

function startEndingSequence() {
  // Reset everything
  endingCharIndex = 0;
  endingText.textContent = '';
  endingChoices.style.display = 'none';
  convinceText.style.display = 'none';
  endingWrapper.style.display = 'none';
  yesCheck.checked = false;
  thinkCheck.checked = false;

  document.getElementById('choice-yes').classList.remove('checked');
  document.getElementById('choice-think').classList.remove('checked');

  setTimeout(typeEndingText, 600);
}

yesCheck.addEventListener('change', () => {
  if (yesCheck.checked) {
    // Uncheck the other
    thinkCheck.checked = false;
    document.getElementById('choice-think').classList.remove('checked');
    document.getElementById('choice-yes').classList.add('checked');

    // Hide convince message, show heart
    convinceText.style.display = 'none';
    endingWrapper.style.display = 'flex';
  } else {
    document.getElementById('choice-yes').classList.remove('checked');
    endingWrapper.style.display = 'none';
  }
});

thinkCheck.addEventListener('change', () => {
  if (thinkCheck.checked) {
    // Uncheck the other
    yesCheck.checked = false;
    document.getElementById('choice-yes').classList.remove('checked');
    document.getElementById('choice-think').classList.add('checked');

    // Hide heart, show convince message
    endingWrapper.style.display = 'none';
    convinceText.style.display = 'block';
    convinceText.textContent = getConvinceMessage();
  } else {
    document.getElementById('choice-think').classList.remove('checked');
    convinceText.style.display = 'none';
  }
});


// =============================================
// 6. SLIDE NAVIGATION  (always last)
// =============================================

const slides      = document.querySelectorAll('.slide');
const prevBtn     = document.getElementById('prev-btn');
const nextBtn     = document.getElementById('next-btn');
let currentSlide  = 0;

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  currentSlide = n;
  slides[currentSlide].classList.add('active');

  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;

  // Confession: reset and retype each time she arrives
  if (slides[currentSlide].id === 'confession') {
    charIndex = 0;
    confessionText.textContent = '';
    setTimeout(typeWriter, 400); // small delay feels more intentional
  }

  // Ending: restart shooting stars each time she arrives
  if (slides[currentSlide].id === 'ending') {
    startShootingStars();
    startEndingSequence();
  }


  playSectionSound(slides[currentSlide].id);
}

prevBtn.addEventListener('click', () => {
  if (currentSlide > 0) goToSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
  if (currentSlide < slides.length - 1) goToSlide(currentSlide + 1);
});

// Initialise — hide back arrow on first slide
prevBtn.disabled = true;


// Play intro sound on first interaction (browser requires this)
document.addEventListener('click', () => {
  if (!currentAudio) {
    playSectionSound('intro');
  }
}, { once: true });
