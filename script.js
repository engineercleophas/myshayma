/*====================================================
  SHAYMA'S PAGE - Script
  Made with love by Cleophas
====================================================*/


// =============================================
// 0. LOADING SCREEN
// =============================================

const loadingScreen = document.getElementById('loading-screen');
const loadingBar    = document.getElementById('loading-bar');

// Start filling the bar shortly after it appears
setTimeout(() => { loadingBar.style.width = '100%'; }, 2200);

// Fade out loading screen after bar fills
setTimeout(() => {
  loadingScreen.classList.add('fade-out');
  setTimeout(() => {
    loadingScreen.style.display = 'none';
    // Trigger intro voice after loading screen disappears
    playSectionSound('intro');
  }, 1000);
}, 7000);

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

for (let i = 0; i < 40;  i++) createStars();
for (let i = 0; i < 70; i++) createSmallStars();


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
const startDate   = new Date('2026-06-01');
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
// VOICE SYNC
// =============================================

const introSync = [
  { t: 1.141, word: "Shayma," },
  { t: 2.826, word: "I" },
  { t: 3.599, word: "have" },
  { t: 3.901, word: "been" },
  { t: 4.359, word: "thinking" },
  { t: 4.804, word: "about" },
  { t: 5.332, word: "this" },
  { t: 5.689, word: "for" },
  { t: 6.096, word: "a" },
  { t: 6.414, word: "while" },
  { t: 6.774, word: "now," },
  { t: 7.618, word: "and" },
  { t: 7.92, word: "I" },
  { t: 8.159, word: "finally" },
  { t: 8.469, word: "decided" },
  { t: 8.86, word: "that" },
  { t: 9.758, word: "you" },
  { t: 11.585, word: "deserve" },
  { t: 11.934, word: "to" },
  { t: 12.178, word: "know" },
  { t: 12.522, word: "how" },
  { t: 12.876, word: "I" },
  { t: 13.237, word: "truly" },
  { t: 13.737, word: "feel" },
  { t: 14.186, word: "about" },
  { t: 14.771, word: "you." },
];

const birthdaySync = [
  { t: 0.818, word: "I" },
  { t: 1.9, word: "know" },
  { t: 2.13, word: "your" },
  { t: 2.419, word: "birthday" },
  { t: 2.734, word: "has" },
  { t: 3.07, word: "already" },
  { t: 3.229, word: "passed," },
  { t: 4.879, word: "but" },
  { t: 6.044, word: "I" },
  { t: 6.263, word: "did" },
  { t: 6.425, word: "not" },
  { t: 6.704, word: "want" },
  { t: 7.291, word: "to" },
  { t: 7.574, word: "let" },
  { t: 7.819, word: "more" },
  { t: 8.117, word: "time" },
  { t: 8.333, word: "go" },
  { t: 8.445, word: "by" },
  { t: 9.206, word: "without" },
  { t: 9.583, word: "doing" },
  { t: 9.913, word: "something" },
  { t: 10.28, word: "special" },
  { t: 10.637, word: "for" },
  { t: 10.858, word: "you," },
  { t: 11.643, word: "because" },
  { t: 12.701, word: "you" },
  { t: 12.996, word: "deserve" },
  { t: 13.191, word: "to" },
  { t: 13.54, word: "be" },
  { t: 13.798, word: "celebrated" },
  { t: 14.041, word: "every" },
  { t: 15.161, word: "single" },
  { t: 15.495, word: "day." },
];

const reasonsSync = [
  { t: 1.749, word: "There" },
  { t: 2, word: "are" },
  { t: 2.331, word: "so" },
  { t: 2.649, word: "many" },
  { t: 2.761, word: "things" },
  { t: 3.703, word: "about" },
  { t: 4.006, word: "you" },
  { t: 4.331, word: "that" },
  { t: 4.499, word: "I" },
  { t: 4.683, word: "adore." },
  { t: 5.945, word: "Your" },
  { t: 6.444, word: "beauty" },
  { t: 6.874, word: "is" },
  { t: 7.783, word: "the" },
  { t: 7.99, word: "kind" },
  { t: 8.263, word: "that" },
  { t: 8.538, word: "stops" },
  { t: 8.762, word: "you" },
  { t: 8.961, word: "mid" },
  { t: 9.123, word: "thought." },
  { t: 10.261, word: "The" },
  { t: 10.472, word: "way" },
  { t: 10.644, word: "your" },
  { t: 10.843, word: "skin" },
  { t: 11.063, word: "glows" },
  { t: 12.049, word: "so" },
  { t: 12.298, word: "effortlessly" },
  { t: 12.755, word: "and" },
  { t: 14.066, word: "radiantly" },
  { t: 15.224, word: "is" },
  { t: 15.44, word: "something" },
  { t: 15.799, word: "I" },
  { t: 16.03, word: "genuinely" },
  { t: 16.254, word: "admire." },
  { t: 18.058, word: "Your" },
  { t: 18.242, word: "eyes" },
  { t: 18.534, word: "speak" },
  { t: 19.809, word: "volumes" },
  { t: 20.413, word: "before" },
  { t: 21.47, word: "you" },
  { t: 21.73, word: "even" },
  { t: 21.981, word: "say" },
  { t: 22.344, word: "a" },
  { t: 22.609, word: "single" },
  { t: 22.864, word: "word." },
  { t: 24.066, word: "Your" },
  { t: 24.49, word: "smile" },
  { t: 24.873, word: "has" },
  { t: 25.491, word: "this" },
  { t: 25.786, word: "quiet" },
  { t: 26.093, word: "power" },
  { t: 26.462, word: "that" },
  { t: 27.532, word: "makes" },
  { t: 27.869, word: "everything" },
  { t: 28.399, word: "around" },
  { t: 28.859, word: "you" },
  { t: 29.3, word: "feel" },
  { t: 29.621, word: "lighter" },
  { t: 30.004, word: "and" },
  { t: 30.669, word: "warmer." },
  { t: 32.314, word: "You" },
  { t: 32.598, word: "are" },
  { t: 32.912, word: "one" },
  { t: 33.121, word: "of" },
  { t: 33.594, word: "the" },
  { t: 33.75, word: "most" },
  { t: 33.864, word: "respectful," },
  { t: 34.159, word: "genuine," },
  { t: 35.913, word: "caring" },
  { t: 36.525, word: "and" },
  { t: 36.879, word: "loving" },
  { t: 37.186, word: "people" },
  { t: 37.578, word: "I" },
  { t: 38.451, word: "have" },
  { t: 38.75, word: "ever" },
  { t: 39.123, word: "met," },
  { t: 40.1, word: "and" },
  { t: 40.384, word: "that" },
  { t: 40.639, word: "is" },
  { t: 41.175, word: "truly" },
  { t: 41.939, word: "rare." },
  { t: 43.074, word: "I" },
  { t: 43.565, word: "have" },
  { t: 44.139, word: "only" },
  { t: 44.578, word: "ever" },
  { t: 45.171, word: "seen" },
  { t: 45.6, word: "a" },
  { t: 46.34, word: "little" },
  { t: 46.873, word: "of" },
  { t: 47.234, word: "your" },
  { t: 47.555, word: "hair," },
  { t: 49.336, word: "but" },
  { t: 49.767, word: "even" },
  { t: 50.333, word: "that" },
  { t: 51.126, word: "small" },
  { t: 53.211, word: "glimpse" },
  { t: 53.957, word: "told" },
  { t: 54.16, word: "me" },
  { t: 54.446, word: "that" },
  { t: 55.249, word: "something" },
  { t: 55.813, word: "beautiful" },
  { t: 56.587, word: "hides" },
  { t: 56.893, word: "there." },
  { t: 57.755, word: "And" },
  { t: 59.442, word: "your" },
  { t: 59.74, word: "company," },
  { t: 61.228, word: "being" },
  { t: 61.575, word: "around" },
  { t: 61.844, word: "you" },
  { t: 63.095, word: "makes" },
  { t: 63.313, word: "me" },
  { t: 63.494, word: "feel" },
  { t: 63.81, word: "complete," },
  { t: 65.293, word: "like" },
  { t: 65.546, word: "the" },
  { t: 65.746, word: "missing" },
  { t: 65.942, word: "piece" },
  { t: 66.128, word: "has" },
  { t: 67.868, word: "finally" },
  { t: 68.212, word: "found" },
  { t: 68.466, word: "its" },
  { t: 68.756, word: "place." },
];

const confessionSync = [
  { t: 1.504, word: "Shayma," },
  { t: 3.078, word: "I" },
  { t: 4.126, word: "have" },
  { t: 4.696, word: "kept" },
  { t: 5.055, word: "this" },
  { t: 5.281, word: "to" },
  { t: 5.931, word: "myself" },
  { t: 6.339, word: "for" },
  { t: 7.385, word: "long" },
  { t: 7.755, word: "enough," },
  { t: 8.984, word: "and" },
  { t: 9.183, word: "I" },
  { t: 9.486, word: "want" },
  { t: 9.657, word: "you" },
  { t: 9.919, word: "to" },
  { t: 10.215, word: "know" },
  { t: 10.541, word: "from" },
  { t: 10.743, word: "the" },
  { t: 11.023, word: "bottom" },
  { t: 11.357, word: "of" },
  { t: 11.544, word: "my" },
  { t: 12.081, word: "heart" },
  { t: 12.272, word: "that" },
  { t: 12.379, word: "I" },
  { t: 12.587, word: "genuinely" },
  { t: 12.773, word: "like" },
  { t: 13.154, word: "you," },
  { t: 14.214, word: "and" },
  { t: 14.797, word: "I" },
  { t: 15.106, word: "mean" },
  { t: 15.338, word: "that" },
  { t: 15.868, word: "with" },
  { t: 16.829, word: "everything" },
  { t: 17.56, word: "in" },
  { t: 17.792, word: "me." },
];

const endingSync = [
  { t: 1.791, word: "After" },
  { t: 2.152, word: "everything" },
  { t: 2.421, word: "I" },
  { t: 2.74, word: "have" },
  { t: 3.093, word: "shared" },
  { t: 3.472, word: "with" },
  { t: 3.689, word: "you" },
  { t: 3.961, word: "today," },
  { t: 5.37, word: "there" },
  { t: 5.704, word: "is" },
  { t: 6.018, word: "just" },
  { t: 6.211, word: "one" },
  { t: 6.398, word: "question" },
  { t: 7.116, word: "I" },
  { t: 7.709, word: "want" },
  { t: 7.988, word: "to" },
  { t: 8.174, word: "leave" },
  { t: 8.335, word: "you" },
  { t: 8.687, word: "with," },
  { t: 9.113, word: "can" },
  { t: 10.318, word: "I" },
  { t: 10.911, word: "be" },
  { t: 11.379, word: "your" },
  { t: 11.562, word: "star?" },
];

// Map each section to its sync data and voice file
const voiceSyncs = {
  intro:      { data: introSync,      file: 'audio/voice-intro.aac' },
  birthday:   { data: birthdaySync,   file: 'audio/voice-birthday.aac' },
  reasons:    { data: reasonsSync,    file: 'audio/voice-reason.aac' },
  confession: { data: confessionSync, file: 'audio/voice-confession.aac' },
  ending:     { data: endingSync,     file: 'audio/voice-ending_mp3.aac' },
};

// Voice players — pre-loaded
const voicePlayers = {};
Object.keys(voiceSyncs).forEach(section => {
  const v = new Audio(voiceSyncs[section].file);
  v.volume = 1;
  voicePlayers[section] = v;
});

let voiceInterval = null;
let activeVoiceSection = null;

function stopVoice() {
  if (voiceInterval) { clearInterval(voiceInterval); voiceInterval = null; }
  if (activeVoiceSection) {
    const v = voicePlayers[activeVoiceSection];
    v.pause();
    v.currentTime = 0;
  }
  activeVoiceSection = null;
}

function playVoiceSync(sectionId, textElementId) {
  stopVoice();
  const sync = voiceSyncs[sectionId];
  if (!sync) return;

  const el = document.getElementById(textElementId);
  if (!el) return;

  // Lower background music while voice plays
  const bgAudio = audioPlayers[sectionId];
  if (bgAudio) bgAudio.volume = 0.12;

  const voice = voicePlayers[sectionId];
  voice.currentTime = 0;
  voice.play().catch(() => {});
  activeVoiceSection = sectionId;

  let wordIdx = 0;
  el.textContent = '';

  voiceInterval = setInterval(() => {
    const currentTime = voice.currentTime;

    // Add all words whose timestamp has passed
    while (wordIdx < sync.data.length && currentTime >= sync.data[wordIdx].t) {
      el.textContent += (wordIdx === 0 ? '' : ' ') + sync.data[wordIdx].word;
      wordIdx++;
    }

    // When voice ends, restore background music volume
    if (voice.ended || wordIdx >= sync.data.length) {
      clearInterval(voiceInterval);
      voiceInterval = null;
      if (bgAudio) {
        const restore = setInterval(() => {
          if (bgAudio.volume < 0.5) {
            bgAudio.volume = Math.min(bgAudio.volume + 0.02, 0.5);
          } else {
            clearInterval(restore);
          }
        }, 80);
      }
    }
  }, 50);
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
  document.getElementById('action-buttons').style.display = 'none';

  hideAllSchedulers();

  setTimeout(typeEndingText, 600);
}

function burstHearts() {
  const emojis = ['♥', '💛', '🌸', '⭐', '✨'];
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  for (let i = 0; i < 24; i++) {
    const heart = document.createElement('div');
    heart.classList.add('burst-heart');
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    // Random direction for each heart
    const angle   = Math.random() * 360;
    const distance = Math.random() * 180 + 60;
    const dx = Math.cos(angle * Math.PI / 180) * distance;
    const dy = Math.sin(angle * Math.PI / 180) * distance;

    heart.style.left = cx + 'px';
    heart.style.top  = cy + 'px';
    heart.style.setProperty('--dx', dx + 'px');
    heart.style.setProperty('--dy', dy + 'px');
    heart.style.animationDelay = (Math.random() * 0.3) + 's';
    heart.style.fontSize = (Math.random() * 16 + 14) + 'px';

    document.body.appendChild(heart);

    // Remove from DOM after animation finishes
    setTimeout(() => heart.remove(), 2000);
  }
}

yesCheck.addEventListener('change', () => {
  if (yesCheck.checked) {
    burstHearts();
    // Uncheck the other
    thinkCheck.checked = false;
    document.getElementById('choice-think').classList.remove('checked');
    document.getElementById('choice-yes').classList.add('checked');

    

    // Hide convince message, show heart
    convinceText.style.display = 'none';
    endingWrapper.style.display = 'flex';

    // Show action buttons after heart appears
    setTimeout(() => {
    document.getElementById('action-buttons').style.display = 'flex';
    }, 800);
  } else {
    document.getElementById('choice-yes').classList.remove('checked');
    endingWrapper.style.display = 'none';

    document.getElementById('action-buttons').style.display = 'none';

  hideAllSchedulers();

  }
});

thinkCheck.addEventListener('change', () => {
  if (thinkCheck.checked) {
    // Uncheck the other
    yesCheck.checked = false;
    document.getElementById('choice-yes').classList.remove('checked');
    document.getElementById('choice-think').classList.add('checked');

    document.getElementById('action-buttons').style.display = 'none';

  hideAllSchedulers();


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
// 9. ACTION BUTTONS & SCHEDULERS
// =============================================

const waNumber = '254757038863';

function buildMeetMessage(date, time, location, personal) {
  return `Hey Cleophas, I said yes! I think we should meet at ${location} on ${date} at ${time}. ${personal} -- Shayma`;
}

function buildVirtualMessage(personal) {
  return `Hey Cleophas, I said yes! ${personal} -- Shayma`;
}

function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${waNumber}?text=${encoded}`, '_blank');
}

function hideAllSchedulers() {
  document.getElementById('meet-scheduler').style.display = 'none';
  document.getElementById('virtual-scheduler').style.display = 'none';
  document.getElementById('both-scheduler').style.display = 'none';
  document.querySelectorAll('.action-btn').forEach(b => b.classList.remove('selected'));
}

function showSentConfirmation() {
  const el = document.getElementById('sent-confirmation');
  el.classList.add('visible');
  setTimeout(() => el.classList.remove('visible'), 4000);
}

// Button 1 — Meet
document.getElementById('btn-meet').addEventListener('click', () => {
  hideAllSchedulers();
  document.getElementById('btn-meet').classList.add('selected');
  document.getElementById('meet-scheduler').style.display = 'block';
});

// Button 2 — Virtual
document.getElementById('btn-virtual').addEventListener('click', () => {
  hideAllSchedulers();
  document.getElementById('btn-virtual').classList.add('selected');
  document.getElementById('virtual-scheduler').style.display = 'block';
});

// Button 3 — Both
document.getElementById('btn-both').addEventListener('click', () => {
  hideAllSchedulers();
  document.getElementById('btn-both').classList.add('selected');
  document.getElementById('both-scheduler').style.display = 'block';
});

// Send — Meet
document.getElementById('meet-send-btn').addEventListener('click', () => {
  const date     = document.getElementById('meet-date').value || 'a date TBD';
  const time     = document.getElementById('meet-time').value || 'a time TBD';
  const location = document.getElementById('meet-location').value || 'a place TBD';
  const personal = document.getElementById('meet-message').value || '';
  openWhatsApp(buildMeetMessage(date, time, location, personal));
  showSentConfirmation(); 
});

// Send — Virtual
document.getElementById('virtual-send-btn').addEventListener('click', () => {
  const personal = document.getElementById('virtual-message').value || '';
  openWhatsApp(buildVirtualMessage(personal));
  showSentConfirmation(); 
});

// Send — Both virtual first
document.getElementById('both-virtual-send-btn').addEventListener('click', () => {
  const personal = document.getElementById('both-virtual-message').value || '';
  openWhatsApp(buildVirtualMessage(personal));
  // Reveal physical scheduler after virtual message sent
  document.getElementById('both-meet-section').style.display = 'block';
  showSentConfirmation(); 
});

// Send — Both physical
document.getElementById('both-meet-send-btn').addEventListener('click', () => {
  const date     = document.getElementById('both-meet-date').value || 'a date TBD';
  const time     = document.getElementById('both-meet-time').value || 'a time TBD';
  const location = document.getElementById('both-meet-location').value || 'a place TBD';
  const personal = document.getElementById('both-meet-message').value || '';
  openWhatsApp(buildMeetMessage(date, time, location, personal));
  showSentConfirmation(); 
});


// =============================================
// 6. SLIDE NAVIGATION  (always last)
// =============================================

const slides      = document.querySelectorAll('.slide');
const prevBtn     = document.getElementById('prev-btn');
const nextBtn     = document.getElementById('next-btn');
let currentSlide  = 0;

// Word ranges for each reason card in reasonsSync
const reasonWordRanges = [
  { start: 0,   end: 9  },  // Day 1 — Your Beauty (There are...adore.)
  { start: 10,  end: 19 },  // Day 2 — Your Skin (Your beauty...thought.)
  { start: 20,  end: 33 },  // Day 3 — Your Eyes (The way...admire.)
  { start: 34,  end: 44 },  // Day 4 — Your Smile (Your eyes...word.)
  { start: 45,  end: 60 },  // Day 5 — Your Heart (Your smile...rare.)
  { start: 61,  end: 96 },  // Day 6 — Your Hair (I have...there.)
  { start: 97,  end: 120 }, // Day 7 — Your Company (And your...place.)
];

function playReasonVoice() {
  const cardIndex = Math.min(cardsToShow - 1, reasons.length - 1);
  const range = reasonWordRanges[cardIndex];
  if (!range) return;

  const sync = voiceSyncs['reasons'];
  const el = document.getElementById('reasons-voice-text');
  if (!el) return;

  const slice = sync.data.slice(range.start, range.end + 1);
  const startTime = slice[0].t;

  const bgAudio = audioPlayers['reasons'];
  if (bgAudio) bgAudio.volume = 0.12;

  const voice = voicePlayers['reasons'];
  voice.currentTime = startTime;
  voice.play().catch(() => {});
  activeVoiceSection = 'reasons';

  el.textContent = '';
  let wordIdx = 0;

  voiceInterval = setInterval(() => {
    const currentTime = voice.currentTime;

    while (wordIdx < slice.length && currentTime >= slice[wordIdx].t) {
      el.textContent += (wordIdx === 0 ? '' : ' ') + slice[wordIdx].word;
      wordIdx++;
    }

    if (wordIdx >= slice.length) {
      clearInterval(voiceInterval);
      voiceInterval = null;
      voice.pause();
      if (bgAudio) {
        const restore = setInterval(() => {
          if (bgAudio.volume < 0.5) {
            bgAudio.volume = Math.min(bgAudio.volume + 0.02, 0.5);
          } else clearInterval(restore);
        }, 80);
      }
    }
  }, 50);
}

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');

  // Stop voice when leaving a slide
  stopVoice();

  currentSlide = n;
  slides[currentSlide].classList.add('active');

  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;

  const id = slides[currentSlide].id;

  // Update page title per section
const pageTitles = {
  intro:      'For Shayma ✨',
  birthday:   'For Shayma ✨ — Happy Birthday 🎂',
  reasons:    'For Shayma ✨ — Why You Mean So Much',
  confession: 'For Shayma ✨ — I Have Something to Tell You',
  ending:     'For Shayma ✨ — Can I Be Your Star? ⭐',
};
document.title = pageTitles[id] || 'For Shayma ✨';
  // Hide nav hint once she navigates for the first time
  const navHint = document.getElementById('nav-hint');
  if (navHint) navHint.style.display = 'none';

  if (id === 'intro') {
    document.getElementById('her-subtitle').textContent = '';
    setTimeout(() => playVoiceSync('intro', 'her-subtitle'), 600);
  }

  if (id === 'birthday') {
    document.querySelector('#birthday p').textContent = '';
    setTimeout(() => playVoiceSync('birthday', 'birthday-text'), 600);
  }

  if (id === 'reasons') {
    setTimeout(() => playReasonVoice(), 600);
  }

  if (id === 'confession') {
    charIndex = 0;
    confessionText.textContent = '';
    setTimeout(() => playVoiceSync('confession', 'confession-text'), 400);
  }

  if (id === 'ending') {
  startShootingStars();
  startEndingSequence();
  setTimeout(() => {
    const voice = voicePlayers['ending'];
    const bgAudio = audioPlayers['ending'];
    if (bgAudio) bgAudio.volume = 0.12;
    voice.currentTime = 0;
    voice.play().catch(() => {});
    voice.addEventListener('ended', () => {
      if (bgAudio) {
        const restore = setInterval(() => {
          if (bgAudio.volume < 0.5) {
            bgAudio.volume = Math.min(bgAudio.volume + 0.02, 0.5);
          } else clearInterval(restore);
        }, 80);
      }
    }, { once: true });
  }, 600);
}

  playSectionSound(id);
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
  if (!currentSection) {
    playSectionSound('intro');
  }
}, { once: true });
