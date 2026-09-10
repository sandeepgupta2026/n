
/* FINAL_MOBILE_TEXT_SCALE
   On 300x740 screens, HAPPY/BIRTHDAY use the same large, clear dot-text
   treatment as NEHA. Each word is fitted inside a safe viewport. */
const FINAL_MOBILE_TEXT_SCALE = true;
function fitLargeDotText(points, W, pad = 10) {
    if (!points || !points.length) return points;
    const minX = Math.min(...points.map(p => p.x));
    const maxX = Math.max(...points.map(p => p.x));
    const minY = Math.min(...points.map(p => p.y));
    const maxY = Math.max(...points.map(p => p.y));
    const width = Math.max(1, maxX - minX);
    const available = Math.max(40, W - pad * 2);
    const scale = Math.min(1, available / width);
    const cx = W / 2;
    const cy = (minY + maxY) / 2;
    return points.map(p => ({
        ...p,
        x: cx + (p.x - (minX + maxX) / 2) * scale,
        y: cy + (p.y - cy) * scale
    }));
}

// ==============================
// CANVAS
// ==============================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ==============================
// PAGE ELEMENTS
// ==============================

const openingSection = document.getElementById("openingSection");
const giftSection = document.getElementById("giftSection");
const stars = document.getElementById("stars");
const clouds = document.getElementById("clouds");

// ==============================
// STARS
// ==============================

const STAR_COUNT = 50;
const sharedStars = [];
const sharedFloatingLights = [];

for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement("span");

    const starData = {
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 3 + 1
    };
    sharedStars.push(starData);

    star.className = "star";

    const size = starData.size;
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.left = starData.x * 100 + "vw";
    star.style.top = starData.y * 100 + "vh";

    stars.appendChild(star);
}

// ==============================
// CLOUDS
// ==============================

for (let i = 0; i < 4; i++) {
    const cloud = document.createElement("div");

    cloud.className = "cloud";
    cloud.style.top = 40 + Math.random() * 220 + "px";
    cloud.style.animationDuration = 35 + Math.random() * 25 + "s";
    cloud.style.animationDelay = -Math.random() * 30 + "s";

    clouds.appendChild(cloud);
}

// ==============================
// FLOATING LIGHTS
// ==============================

for (let i = 0; i < 30; i++) {
    const light = document.createElement("span");

    const lightData = {
        x: Math.random(),
        y: Math.random(),
        speed: 22 + Math.random() * 28,
        phase: Math.random()
    };
    sharedFloatingLights.push(lightData);

    light.style.position = "absolute";
    light.style.width = "2px";
    light.style.height = "2px";
    light.style.borderRadius = "50%";
    light.style.background = "gold";
    light.style.boxShadow = "0 0 12px gold";
    light.style.left = lightData.x * 100 + "vw";
    light.style.top = lightData.y * 100 + "vh";

    light.animate(
        [
            { transform: "translateY(0)", opacity: 0.2 },
            { transform: "translateY(-80px)", opacity: 1 },
            { transform: "translateY(-160px)", opacity: 0.2 }
        ],
        {
            duration: 4000 + Math.random() * 4000,
            iterations: Infinity
        }
    );

    stars.appendChild(light);
}

// ==============================
// OPENING
// ==============================

giftSection.style.display = "none";

setTimeout(() => {
    openingSection.classList.add("fadeOut");
}, 3500);

setTimeout(() => {
    openingSection.style.display = "none";
    giftSection.style.display = "flex";
    giftSection.classList.add("fadeIn");
    startGiftFall();
}, 4500);

// ==============================
// GIFT
// ==============================

const gift = document.getElementById("gift");
const openGift = document.getElementById("openGift");
const lid = document.querySelector(".lid");
const magicLight = document.querySelector(".magicLight");
const boom = document.getElementById("boom");

openGift.style.opacity = "0";
openGift.style.pointerEvents = "none";
gift.style.transform = "translateY(-900px) scale(.2) rotate(720deg)";

function startGiftFall() {
    gift.animate(
        [
            { transform: "translateY(-900px) scale(.2) rotate(720deg)" },
            { transform: "translateY(40px) scale(1.05) rotate(20deg)" },
            { transform: "translateY(-25px)" },
            { transform: "translateY(10px)" },
            { transform: "translateY(0)" }
        ],
        {
            duration: 2500,
            easing: "ease-out",
            fill: "forwards"
        }
    );

    setTimeout(showButton, 2600);
}

function showButton() {
    openGift.disabled = false;
    openGift.style.opacity = "1";
    openGift.style.visibility = "visible";
    openGift.style.pointerEvents = "auto";

    openGift.animate(
        [
            { opacity: 0, transform: "translateY(40px)" },
            { opacity: 1, transform: "translateY(0)" }
        ],
        {
            duration: 800,
            fill: "forwards"
        }
    );
}

let giftOpened = false;

function handleGiftButton(e) {
    if (e) e.preventDefault();
    if (giftOpened || openGift.disabled) return;
    giftOpened = true;
    openGift.disabled = true;
    openGift.style.pointerEvents = "none";
    shakeGift();
}

openGift.addEventListener("click", handleGiftButton);
openGift.addEventListener("pointerup", handleGiftButton);

function shakeGift() {
    gift.animate(
        [
            { transform: "translateX(-8px)" },
            { transform: "translateX(8px)" },
            { transform: "translateX(-8px)" },
            { transform: "translateX(8px)" },
            { transform: "translateX(0)" }
        ],
        {
            duration: 120,
            iterations: 12
        }
    );

    setTimeout(openGiftBox, 1500);
}

function openGiftBox() {
    lid.animate(
        [
            { transform: "rotate(0deg)" },
            { transform: "rotate(-35deg) translateY(-20px)" }
        ],
        {
            duration: 800,
            fill: "forwards"
        }
    );

    magicLight.animate(
        [
            { opacity: 0.2, transform: "translateX(-50%) scale(.5)" },
            { opacity: 1, transform: "translateX(-50%) scale(12)" }
        ],
        {
            duration: 1200,
            fill: "forwards"
        }
    );

    boom.currentTime = 0;
    boom.play();

    setTimeout(() => {
        giftSection.style.display = "none";
        launchRockets();
    }, 1500);
}

// ==============================
// ROCKETS + FIREWORKS
// ==============================

const rocketSound = document.getElementById("rocket");
const fireworkSound = document.getElementById("firework");
const rockets = [];
const particles = [];

// Mobile profile: keep every existing animation duration/timeline the same,
// but reduce the amount of fireworks work for small screens (especially 300px wide).
const isSmallMobile = () => window.innerWidth <= 520;
const FIREWORK_ROCKETS_DESKTOP = 10;
const FIREWORK_ROCKETS_MOBILE = 5;
const FIREWORK_PARTICLES_DESKTOP = 120;
const FIREWORK_PARTICLES_MOBILE = 65;
const FIREWORK_INTERVAL_DESKTOP = 400;
const FIREWORK_INTERVAL_MOBILE = 700;


class Rocket {
    constructor(x) {
        this.x = x;
        this.y = canvas.height + 30;
        this.speed = 8 + Math.random() * 3;
        this.target = 100 + Math.random() * 200;
        this.color = `hsl(${Math.random() * 360},100%,60%)`;
        this.dead = false;
    }

    update() {
        this.y -= this.speed;

        if (this.y <= this.target) {
            this.dead = true;
            createExplosion(this.x, this.y, this.color);
        }
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.moveTo(this.x, this.y + 18);
        ctx.lineTo(this.x, this.y + 45);
        ctx.stroke();
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;

        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.size = 2 + Math.random() * 3;
        this.color = color;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        this.vx *= 0.98;
        this.vy *= 0.98;
        this.vy += 0.04;
        this.alpha -= 0.012;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 30;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function createExplosion(x, y, color) {
    const count = isSmallMobile() ? FIREWORK_PARTICLES_MOBILE : FIREWORK_PARTICLES_DESKTOP;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function launchRockets() {
    fireworkSound.currentTime = 0;
    fireworkSound.play();

    rocketSound.currentTime = 0;
    rocketSound.play();

    rockets.length = 0;

    const initialRocketCount = isSmallMobile() ? FIREWORK_ROCKETS_MOBILE : FIREWORK_ROCKETS_DESKTOP;
    for (let i = 0; i < initialRocketCount; i++) {
        rockets.push(
            new Rocket(80 + i * ((canvas.width - 160) / 9))
        );
    }

    const rocketInterval = setInterval(() => {
        rockets.push(
            new Rocket(80 + Math.random() * (canvas.width - 160))
        );
    }, isSmallMobile() ? FIREWORK_INTERVAL_MOBILE : FIREWORK_INTERVAL_DESKTOP);

    // IMPORTANT: keep the original 35-second fireworks duration unchanged.
    setTimeout(() => clearInterval(rocketInterval), 35000);

    animateFireworks();
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].update();
        rockets[i].draw();

        if (rockets[i].dead) {
            rockets.splice(i, 1);
        }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].alpha <= 0) {
            particles.splice(i, 1);
        }
    }

    if (rockets.length || particles.length) {
        requestAnimationFrame(animateFireworks);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        startHeartAnimation();
    }
}

// ==============================
// HEART
// ==============================

const heartSection = document.getElementById("heartSection");
const heartbeat = document.getElementById("heartbeat");
const heartPoints = [];

for (let t = 0; t <= Math.PI * 2; t += 0.04) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)
    );

    heartPoints.push({
        x: x * 18,
        y: y * 18
    });
}

let progress = 0;

function startHeartAnimation() {
    heartSection.style.display = "flex";
    heartbeat.currentTime = 0;
    heartbeat.play();
    progress = 0;
    drawHeart();
}

function drawHeart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2 - 30);
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#ff2d75";
    ctx.shadowColor = "#ff2d75";
    ctx.shadowBlur = 30;

    ctx.moveTo(heartPoints[0].x, heartPoints[0].y);

    const end = Math.floor(progress);

    for (let i = 1; i <= end && i < heartPoints.length; i++) {
        ctx.lineTo(heartPoints[i].x, heartPoints[i].y);
    }

    ctx.stroke();
    ctx.restore();

    progress += 1.4;

    if (progress < heartPoints.length) {
        requestAnimationFrame(drawHeart);
    } else {
        setTimeout(glowHeart, 800);
    }
}

function glowHeart() {
    let glow = 20;

    function pulse() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2 - 30);
        ctx.beginPath();
        ctx.lineWidth = 6;
        ctx.strokeStyle = "#ff4d94";
        ctx.shadowColor = "#ff4d94";
        ctx.shadowBlur = glow;

        ctx.moveTo(heartPoints[0].x, heartPoints[0].y);

        heartPoints.forEach(point => {
            ctx.lineTo(point.x, point.y);
        });

        ctx.stroke();
        ctx.restore();

        glow += 2;

        if (glow < 55) {
            requestAnimationFrame(pulse);
        } else {
            setTimeout(explodeHeart, 600);
        }
    }

    pulse();
}

// ==============================
// NAME PARTICLES
// ==============================

const nameSection = document.getElementById("nameSection");
const nameCanvas = document.getElementById("nameCanvas");
const nctx = nameCanvas.getContext("2d");
const nameParticles = [];

nameCanvas.width = innerWidth;
nameCanvas.height = innerHeight;

class NameParticle {
    constructor(x, y) {
        this.x = Math.random() * innerWidth;
        this.y = Math.random() * innerHeight;
        this.tx = x;
        this.ty = y;
        this.size = 2;
        this.vx = 0;
        this.vy = 0;
    }

    update() {
        this.vx += (this.tx - this.x) * 0.02;
        this.vy += (this.ty - this.y) * 0.02;
        this.vx *= 0.9;
        this.vy *= 0.9;
        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        nctx.beginPath();
        nctx.fillStyle = "#ff4da6";
        nctx.shadowColor = "#ff4da6";
        nctx.shadowBlur = 12;
        nctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        nctx.fill();
    }
}

function explodeHeart() {
    heartSection.style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTimeout(showParticleName, 600);
}

function showParticleName() {
    nameSection.style.display = "flex";

    nctx.clearRect(0, 0, nameCanvas.width, nameCanvas.height);
    nctx.fillStyle = "#fff";
    nctx.textAlign = "center";

    // Keep 11:09:2005 completely inside the viewport on every mobile width.
    const nameText = "11:09:2005";
    const maxNameWidth = nameCanvas.width * 0.88;
    const nameFontSize = Math.min(90, Math.max(34, nameCanvas.width * 0.105));
    nctx.font = `bold ${nameFontSize}px Poppins, sans-serif`;

    // If the selected font still exceeds the safe width, shrink it precisely.
    const measuredWidth = nctx.measureText(nameText).width;
    if (measuredWidth > maxNameWidth) {
        nctx.font = `bold ${Math.max(28, nameFontSize * maxNameWidth / measuredWidth)}px Poppins, sans-serif`;
    }

    nctx.fillText(
        nameText,
        nameCanvas.width / 2,
        nameCanvas.height / 2 + Math.min(50, nameCanvas.height * 0.03)
    );

    const image = nctx.getImageData(
        0,
        0,
        nameCanvas.width,
        nameCanvas.height
    );

    nameParticles.length = 0;

    for (let y = 0; y < image.height; y += 5) {
        for (let x = 0; x < image.width; x += 5) {
            const index = (y * image.width + x) * 4;

            if (image.data[index + 3] > 150) {
                nameParticles.push(new NameParticle(x, y));
            }
        }
    }

    nctx.clearRect(0, 0, nameCanvas.width, nameCanvas.height);

    nameAnimationStart = 0;
    nameAnimationRunning = true;
    requestAnimationFrame(animateName);
}

let nameAnimationStart = 0;
let nameAnimationRunning = false;

function animateName(now) {
    if (!nameAnimationRunning) return;

    if (!nameAnimationStart) nameAnimationStart = now;

    nctx.clearRect(0, 0, nameCanvas.width, nameCanvas.height);

    nameParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Keep the existing particle-name page visible for a short hold,
    // then continue automatically to the final 6000-dot sequence.
    if (now - nameAnimationStart < 5000) {
        requestAnimationFrame(animateName);
    } else {
        nameAnimationRunning = false;
        nameSection.style.display = "none";
        nameSection.style.visibility = "hidden";
        nctx.clearRect(0, 0, nameCanvas.width, nameCanvas.height);

        setTimeout(startFinalDotSequence, 250);
    }
}


// ============================================================
// FINAL 6000-DOT CINEMATIC SEQUENCE
// HAPPY -> BIRTHDAY -> NEHA -> PORTRAIT
// ============================================================

const dotFinalSection = document.getElementById("dotFinalSection");
const dotFinalCanvas = document.getElementById("dotFinalCanvas");
const dctx = dotFinalCanvas.getContext("2d", {
    alpha: true,
    willReadFrequently: true
});

const DOT_TOTAL = 6000;
const DOT_IMAGE_PRIMARY = "portrait.png";
const DOT_IMAGE_FALLBACK = "nehaascii.png";

const DOT_HAPPY_FORMATION = 5000;
const DOT_HAPPY_HOLD = 5000;
const DOT_BIRTHDAY_FORMATION = 5000;
const DOT_BIRTHDAY_HOLD = 5000;
const DOT_NEHA_FORMATION = 5000;
const DOT_NEHA_HOLD = 5000;
const DOT_PHOTO_FORMATION = 7000;
const DOT_PHOTO_HOLD = 5000;

const DOT_STAR_COUNT = 50;
const DOT_FLOATING_COUNT = 30;
const DOT_ENTRY_DISTANCE_MIN = 1.15;
const DOT_ENTRY_DISTANCE_MAX = 2.20;
const DOT_ENTRY_DRIFT = 170;
const DOT_ENTRY_DELAY = 0.55;

let dW = 0;
let dH = 0;
let dDPR = 1;
let dotStars = [];
let dotFloatingParticles = [];
let dotParticles = [];
let dotPortraitPoints = [];
let dotPortraitColors = [];
let dotImageReady = false;
let dotStartTime = 0;
let dotLastTime = 0;
let dotAnimationStarted = false;
let dotActiveImage = DOT_IMAGE_PRIMARY;

// Romantic red particles + tiny hearts for the final scene
let dotRedParticles = [];
let dotHeartParticles = [];
let dotRomanticSeeded = false;

function createRomanticParticles() {
    dotRedParticles = [];
    dotHeartParticles = [];

    // Red particles rise from below with gentle horizontal drift.
    for (let i = 0; i < 52; i++) {
        dotRedParticles.push({
            x: Math.random(),
            y: Math.random() * 1.15 + 0.05,
            speed: 18 + Math.random() * 30,
            drift: 7 + Math.random() * 18,
            phase: Math.random() * Math.PI * 2,
            size: 0.8 + Math.random() * 1.6,
            alpha: 0.22 + Math.random() * 0.42
        });
    }

    // A few very subtle heart-shaped particles.
    for (let i = 0; i < 11; i++) {
        dotHeartParticles.push({
            x: Math.random(),
            y: Math.random() * 1.2,
            speed: 10 + Math.random() * 18,
            drift: 8 + Math.random() * 14,
            phase: Math.random() * Math.PI * 2,
            size: 2.5 + Math.random() * 2.5,
            alpha: 0.20 + Math.random() * 0.28
        });
    }

    dotRomanticSeeded = true;
}

function drawHeartParticle(x, y, size, alpha) {
    dctx.save();
    dctx.globalAlpha = alpha;
    dctx.fillStyle = '#ff3b69';
    dctx.shadowColor = '#ff1744';
    dctx.shadowBlur = 9;
    dctx.beginPath();
    dctx.moveTo(x, y + size * 0.35);
    dctx.bezierCurveTo(x - size * 1.15, y - size * 0.35, x - size * 0.65, y - size * 1.05, x, y - size * 0.45);
    dctx.bezierCurveTo(x + size * 0.65, y - size * 1.05, x + size * 1.15, y - size * 0.35, x, y + size * 0.35);
    dctx.fill();
    dctx.restore();
}

function drawRomanticRedParticles(time) {
    if (!dotRomanticSeeded) createRomanticParticles();

    const seconds = time / 1000;

    for (const p of dotRedParticles) {
        const rawY = dH + 35 - ((seconds * p.speed + p.y * (dH + 250)) % (dH + 100));
        const sway = Math.sin(seconds * 0.8 + p.phase) * p.drift;
        const x = p.x * dW + sway;
        const twinkle = 0.55 + 0.45 * Math.sin(seconds * 2.1 + p.phase);
        const alpha = p.alpha * twinkle;

        dctx.save();
        dctx.globalAlpha = alpha * 0.45;
        dctx.fillStyle = '#ff1744';
        dctx.shadowColor = '#ff1744';
        dctx.shadowBlur = 13;
        dctx.beginPath();
        dctx.arc(x, rawY, p.size * 2.3, 0, Math.PI * 2);
        dctx.fill();
        dctx.restore();

        dctx.save();
        dctx.globalAlpha = alpha;
        dctx.fillStyle = '#ff526f';
        dctx.beginPath();
        dctx.arc(x, rawY, p.size, 0, Math.PI * 2);
        dctx.fill();
        dctx.restore();
    }

    for (const p of dotHeartParticles) {
        const rawY = dH + 45 - ((seconds * p.speed + p.y * (dH + 260)) % (dH + 130));
        const sway = Math.sin(seconds * 0.55 + p.phase) * p.drift;
        const pulse = 0.85 + Math.sin(seconds * 1.6 + p.phase) * 0.12;
        drawHeartParticle(
            p.x * dW + sway,
            rawY,
            p.size * pulse,
            p.alpha * (0.72 + 0.28 * Math.sin(seconds * 1.3 + p.phase))
        );
    }
}

function dClamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
}

function dLerp(a, b, t) {
    return a + (b - a) * t;
}

function dRandom(min, max) {
    return min + Math.random() * (max - min);
}

function dEase(t) {
    t = dClamp(t, 0, 1);
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function dCinematicEase(t) {
    t = dClamp(t, 0, 1);
    return (t * t) /
        (t * t + Math.pow(1 - t, 2.2));
}

function resizeFinalDots() {
    dDPR = window.innerWidth <= 520 ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    dW = window.innerWidth;
    dH = window.innerHeight;

    dotFinalCanvas.width = Math.floor(dW * dDPR);
    dotFinalCanvas.height = Math.floor(dH * dDPR);
    dotFinalCanvas.style.width = dW + "px";
    dotFinalCanvas.style.height = dH + "px";

    dctx.setTransform(dDPR, 0, 0, dDPR, 0, 0);

    createDotStars();

    // Rebuild portrait coordinates when the window changes size.
    if (dotImageReady) {
        createDotPortrait();
        if (dotParticles.length) {
            dotParticles.forEach((p, i) => {
                p.photoX = dotPortraitPoints[i].x;
                p.photoY = dotPortraitPoints[i].y;
                p.color = dotPortraitColors[i];
            });
        }
    }
}

function createDotStars() {
    dotStars = [];

    // Use the exact same star positions as the earlier background.
    for (let i = 0; i < sharedStars.length; i++) {
        const s = sharedStars[i];
        dotStars.push({
            x: s.x * dW,
            y: s.y * dH,
            size: Math.max(0.55, s.size * 0.42),
            phase: i * 0.73,
            speed: 0.4 + (i % 7) * 0.16,
            brightness: 0.8 + (i % 5) * 0.08,
            glow: 5 + (i % 5)
        });
    }

    // Exact same 30 floating lights, but rendered on the final canvas too.
    dotFloatingParticles = [];
    for (let i = 0; i < sharedFloatingLights.length; i++) {
        const f = sharedFloatingLights[i];
        dotFloatingParticles.push({
            x: f.x * dW,
            y: f.y * dH,
            speed: f.speed,
            phase: f.phase * dH,
            size: 1.2 + (i % 3) * 0.35,
            alpha: 0.22 + (i % 5) * 0.08
        });
    }
}

function drawDotStars(time) {
    for (const s of dotStars) {
        const twinkle =
            (Math.sin(time * 0.001 * s.speed + s.phase) + 1) * 0.5;

        const alpha = dClamp(
            (0.42 + twinkle * 0.42) * s.brightness,
            0.28,
            1
        );

        dctx.save();
        dctx.globalAlpha = alpha * 0.65;
        dctx.fillStyle = "#7dbaff";
        dctx.shadowBlur = s.glow;
        dctx.shadowColor = "#318cff";
        dctx.beginPath();
        dctx.arc(s.x, s.y, s.size * 1.8, 0, Math.PI * 2);
        dctx.fill();
        dctx.restore();

        dctx.save();
        dctx.globalAlpha = alpha;
        dctx.fillStyle = "#fff";
        dctx.shadowBlur = 4;
        dctx.shadowColor = "#fff";
        dctx.beginPath();
        dctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        dctx.fill();
        dctx.restore();

        if (s.size > 1 && twinkle > 0.72) {
            dctx.save();
            dctx.globalAlpha = alpha * 0.65;
            dctx.strokeStyle = "#fff";
            dctx.lineWidth = 0.45;
            dctx.beginPath();
            dctx.moveTo(s.x - s.size * 3, s.y);
            dctx.lineTo(s.x + s.size * 3, s.y);
            dctx.moveTo(s.x, s.y - s.size * 3);
            dctx.lineTo(s.x, s.y + s.size * 3);
            dctx.stroke();
            dctx.restore();
        }
    }
}

function drawDotFloatingParticles(time) {
    // Continuous bottom -> top movement, matching the earlier floating-light field.
    const seconds = time / 1000;

    for (const p of dotFloatingParticles) {
        const y = ((p.y - seconds * p.speed - p.phase) % (dH + 80) + (dH + 80)) % (dH + 80) - 40;
        const twinkle = 0.55 + 0.45 * Math.sin(seconds * 1.8 + p.phase);

        dctx.save();
        dctx.globalAlpha = p.alpha * twinkle;
        dctx.fillStyle = "#ffd966";
        dctx.shadowColor = "#ffd966";
        dctx.shadowBlur = 10;
        dctx.beginPath();
        dctx.arc(p.x, y, p.size, 0, Math.PI * 2);
        dctx.fill();
        dctx.restore();
    }
}

function createDotTextPoints(text) {
    const temp = document.createElement("canvas");

    const tw = Math.max(1, Math.floor(dW));
    const th = Math.max(1, Math.floor(dH));
    temp.width = tw;
    temp.height = th;

    const tctx = temp.getContext("2d", { willReadFrequently: true });
    tctx.clearRect(0, 0, tw, th);

    const mobile = dW <= 420;
    const sideMargin = mobile ? Math.max(8, dW * 0.055) : Math.max(20, dW * 0.02);
    const maxTextWidth = Math.max(20, dW - sideMargin * 2);

    let fontSize;

    if (text === "HAPPY" || text === "BIRTHDAY") {
        // Keep the two word stages large on tall phones/tablets while
        // still fitting safely inside the viewport.
        if (dW >= 521 && dW <= 800) {
            fontSize = text === "HAPPY"
                ? Math.min(dW * 0.19, 132)
                : Math.min(dW * 0.115, 92);
        } else {
            fontSize = mobile
                ? (text === "HAPPY" ? Math.min(dW * 0.25, 76) : Math.min(dW * 0.18, 58))
                : (text === "HAPPY" ? Math.min(dW * 0.12, 120) : Math.min(dW * 0.085, 105));
        }
    } else {
        fontSize = dW < 600
            ? Math.min(dW * 0.23, 115)
            : Math.min(dW * 0.19, 230);
    }

    const fontFamily = "Arial Black, Arial, sans-serif";

    while (fontSize > 8) {
        tctx.font = "900 " + fontSize + "px " + fontFamily;
        if (tctx.measureText(text).width <= maxTextWidth) break;
        fontSize -= 1;
    }

    tctx.font = "900 " + fontSize + "px " + fontFamily;
    tctx.textAlign = "center";
    tctx.textBaseline = "middle";
    tctx.fillStyle = "#fff";

    // Every word gets its own full-screen moment.
    // This makes HAPPY and BIRTHDAY as clear as the NEHA stage.
    tctx.fillText(text, dW / 2, dH / 2);

    const data = tctx.getImageData(0, 0, tw, th);
    const candidates = [];
    const step = dW < 600 ? 2.0 : 2.7;

    const safeLeft = sideMargin;
    const safeRight = dW - sideMargin;
    const tallMobile = dW >= 521 && dW <= 800 && dH > dW;
    const safeTop = mobile
        ? Math.max(4, dH * 0.18)
        : (tallMobile ? Math.max(20, dH * 0.28) : 0);
    const safeBottom = mobile
        ? Math.min(dH - 4, dH * 0.82)
        : (tallMobile ? Math.min(dH - 20, dH * 0.72) : dH);

    for (let y = 0; y < th; y += step) {
        for (let x = 0; x < tw; x += step) {
            if (x < safeLeft || x > safeRight || y < safeTop || y > safeBottom) continue;
            const px = Math.floor(x);
            const py = Math.floor(y);
            const index = (py * tw + px) * 4;
            if (data.data[index + 3] > 100) {
                candidates.push({
                    x: Math.max(safeLeft, Math.min(safeRight, x)),
                    y: Math.max(safeTop, Math.min(safeBottom, y))
                });
            }
        }
    }

    if (!candidates.length) {
        return Array.from({ length: DOT_TOTAL }, () => ({ x: dW / 2, y: dH / 2 }));
    }

    const points = [];
    for (let i = 0; i < DOT_TOTAL; i++) {
        const index = Math.floor(i * candidates.length / DOT_TOTAL);
        const pt = candidates[Math.min(index, candidates.length - 1)];
        points.push({
            x: Math.max(0, Math.min(dW, pt.x)),
            y: Math.max(0, Math.min(dH, pt.y))
        });
    }
    return points;
}

function loadDotImage() {
    return new Promise(resolve => {
        const image = new Image();

        image.onload = () => {
            dotActiveImage = image.src;
            resolve(image);
        };

        image.onerror = () => {
            if (dotActiveImage !== DOT_IMAGE_FALLBACK) {
                dotActiveImage = DOT_IMAGE_FALLBACK;
                const fallback = new Image();

                fallback.onload = () => resolve(fallback);
                fallback.onerror = () => resolve(null);
                fallback.src = DOT_IMAGE_FALLBACK;
            } else {
                resolve(null);
            }
        };

        image.src = DOT_IMAGE_PRIMARY;
    });
}

async function createDotPortrait() {
    const image = await loadDotImage();

    if (!image) {
        dotPortraitPoints = Array.from(
            { length: DOT_TOTAL },
            () => ({ x: dW / 2, y: dH / 2 })
        );
        dotPortraitColors = Array.from(
            { length: DOT_TOTAL },
            () => ({ r: 255, g: 255, b: 255 })
        );
        dotImageReady = true;
        return;
    }

    const source = document.createElement("canvas");
    source.width = image.naturalWidth;
    source.height = image.naturalHeight;

    const sctx = source.getContext("2d", {
        willReadFrequently: true
    });

    sctx.drawImage(image, 0, 0);

    const src = sctx.getImageData(
        0, 0,
        source.width,
        source.height
    );

    let minX = source.width;
    let minY = source.height;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < source.height; y++) {
        for (let x = 0; x < source.width; x++) {
            const i = (y * source.width + x) * 4;
            const r = src.data[i];
            const g = src.data[i + 1];
            const b = src.data[i + 2];
            const a = src.data[i + 3];

            if (a > 25 && Math.max(r, g, b) > 15) {
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
                minY = Math.min(minY, y);
                maxY = Math.max(maxY, y);
            }
        }
    }

    if (maxX < 0) {
        dotPortraitPoints = Array.from(
            { length: DOT_TOTAL },
            () => ({ x: dW / 2, y: dH / 2 })
        );
        dotPortraitColors = Array.from(
            { length: DOT_TOTAL },
            () => ({ r: 255, g: 255, b: 255 })
        );
        dotImageReady = true;
        return;
    }

    const padding = Math.max(
        6,
        Math.floor(
            Math.min(source.width, source.height) * 0.015
        )
    );

    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = Math.min(source.width - 1, maxX + padding);
    maxY = Math.min(source.height - 1, maxY + padding);

    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;

    const maxW = dW * 0.90;
    const maxH = dH * 0.88;

    const scale = Math.min(
        maxW / cropW,
        maxH / cropH
    );

    const drawW = cropW * scale;
    const drawH = cropH * scale;

    const offsetX = (dW - drawW) / 2;
    const offsetY = (dH - drawH) / 2;

    const processW = Math.min(
        1000,
        Math.max(600, Math.floor(drawW * 1.5))
    );

    const processScale = processW / cropW;
    const processH = Math.max(
        1,
        Math.floor(cropH * processScale)
    );

    const work = document.createElement("canvas");
    work.width = processW;
    work.height = processH;

    const wctx = work.getContext("2d", {
        willReadFrequently: true
    });

    wctx.drawImage(
        source,
        minX, minY, cropW, cropH,
        0, 0, processW, processH
    );

    const data = wctx.getImageData(
        0, 0, processW, processH
    );

    const candidates = [];
    const grid = dW < 600 ? 3 : 3.5;

    for (let gy = 0; gy < processH; gy += grid) {
        for (let gx = 0; gx < processW; gx += grid) {
            let best = null;
            let bestScore = -1;

            const endX = Math.min(processW, gx + grid);
            const endY = Math.min(processH, gy + grid);

            for (let y = Math.floor(gy); y < endY; y++) {
                for (let x = Math.floor(gx); x < endX; x++) {
                    const i = (y * processW + x) * 4;

                    const r = data.data[i];
                    const g = data.data[i + 1];
                    const b = data.data[i + 2];
                    const a = data.data[i + 3];

                    const brightness = Math.max(r, g, b);

                    if (a < 25 || brightness < 15) continue;

                    const saturation =
                        brightness - Math.min(r, g, b);

                    const score =
                        brightness + saturation * 0.35;

                    if (score > bestScore) {
                        bestScore = score;
                        best = { x, y, r, g, b };
                    }
                }
            }

            if (best) candidates.push(best);
        }
    }

    // Fallback sampling if the image has fewer useful cells.
    if (candidates.length < DOT_TOTAL) {
        for (let y = 0; y < processH; y += 2) {
            for (let x = 0; x < processW; x += 2) {
                const i = (y * processW + x) * 4;
                const r = data.data[i];
                const g = data.data[i + 1];
                const b = data.data[i + 2];
                const a = data.data[i + 3];

                if (
                    a > 25 &&
                    Math.max(r, g, b) > 15
                ) {
                    candidates.push({ x, y, r, g, b });
                }
            }
        }
    }

    if (!candidates.length) {
        candidates.push({
            x: processW / 2,
            y: processH / 2,
            r: 255,
            g: 255,
            b: 255
        });
    }

    dotPortraitPoints = [];
    dotPortraitColors = [];

    for (let i = 0; i < DOT_TOTAL; i++) {
        const index = Math.floor(
            i * candidates.length / DOT_TOTAL
        );
        const p = candidates[
            Math.min(index, candidates.length - 1)
        ];

        dotPortraitPoints.push({
            x: offsetX +
               (p.x / processScale) * scale,
            y: offsetY +
               (p.y / processScale) * scale
        });

        dotPortraitColors.push({
            r: p.r,
            g: p.g,
            b: p.b
        });
    }

    // Shuffle points so the portrait forms organically.
    for (let i = DOT_TOTAL - 1; i > 0; i--) {
        const k = Math.floor(Math.random() * (i + 1));

        [dotPortraitPoints[i], dotPortraitPoints[k]] =
            [dotPortraitPoints[k], dotPortraitPoints[i]];

        [dotPortraitColors[i], dotPortraitColors[k]] =
            [dotPortraitColors[k], dotPortraitColors[i]];
    }

    dotImageReady = true;
}

function createFinalDotParticles() {
    const happy = createDotTextPoints("HAPPY");
    const birthday = createDotTextPoints("BIRTHDAY");
    const neha = createDotTextPoints("NEHA");

    dotParticles = [];

    for (let i = 0; i < DOT_TOTAL; i++) {
        const angle = Math.random() * Math.PI * 2;

        const distance =
            Math.max(dW, dH) *
            dRandom(
                DOT_ENTRY_DISTANCE_MIN,
                DOT_ENTRY_DISTANCE_MAX
            );

        const depth = dRandom(0.7, 1.45);

        const sx =
            dW / 2 +
            Math.cos(angle) * distance * depth;

        const sy =
            dH / 2 +
            Math.sin(angle) * distance * depth;

        const tangent = angle + Math.PI / 2;

        const driftAmount =
            dRandom(-DOT_ENTRY_DRIFT, DOT_ENTRY_DRIFT);

        dotParticles.push({
            x: sx,
            y: sy,
            vx: 0,
            vy: 0,

            startX: sx,
            startY: sy,

            size: dW <= 420
                ? dRandom(1.45, 2.05)
                : dRandom(1.05, 1.75),
            alpha: 0,

            driftX:
                Math.cos(tangent) * driftAmount,

            driftY:
                Math.sin(tangent) * driftAmount,

            entryDelay:
                Math.random() * DOT_ENTRY_DELAY,

            happyX: happy[i].x,
            happyY: happy[i].y,

            birthdayX: birthday[i].x,
            birthdayY: birthday[i].y,

            nehaX: neha[i].x,
            nehaY: neha[i].y,

            photoX: dotPortraitPoints[i]
                ? dotPortraitPoints[i].x
                : dW / 2,

            photoY: dotPortraitPoints[i]
                ? dotPortraitPoints[i].y
                : dH / 2,

            color: dotPortraitColors[i] || {
                r: 255,
                g: 255,
                b: 255
            }
        });
    }
}

function getFinalDotTarget(p, time) {
    const cycle =
        DOT_HAPPY_FORMATION +
        DOT_HAPPY_HOLD +
        DOT_BIRTHDAY_FORMATION +
        DOT_BIRTHDAY_HOLD +
        DOT_NEHA_FORMATION +
        DOT_NEHA_HOLD +
        DOT_PHOTO_FORMATION +
        DOT_PHOTO_HOLD;

    let t = Math.min(time, cycle);

    if (t < DOT_HAPPY_FORMATION) {
        const seconds = t / 1000;

        const local = dClamp(
            (seconds - p.entryDelay) /
            (DOT_HAPPY_FORMATION / 1000 - p.entryDelay),
            0,
            1
        );

        const progress = dCinematicEase(local);

        const driftProgress =
            Math.sin(progress * Math.PI);

        const cinematicX =
            p.startX +
            p.driftX *
            (1 - progress) *
            driftProgress;

        const cinematicY =
            p.startY +
            p.driftY *
            (1 - progress) *
            driftProgress;

        return {
            x: dLerp(cinematicX, p.happyX, progress),
            y: dLerp(cinematicY, p.happyY, progress)
        };
    }

    t -= DOT_HAPPY_FORMATION;

    if (t < DOT_HAPPY_HOLD) {
        return { x: p.happyX, y: p.happyY };
    }

    t -= DOT_HAPPY_HOLD;

    // HAPPY transforms directly into a BIG BIRTHDAY.
    if (t < DOT_BIRTHDAY_FORMATION) {
        const progress = dEase(t / DOT_BIRTHDAY_FORMATION);
        return {
            x: dLerp(p.happyX, p.birthdayX, progress),
            y: dLerp(p.happyY, p.birthdayY, progress)
        };
    }

    t -= DOT_BIRTHDAY_FORMATION;

    if (t < DOT_BIRTHDAY_HOLD) {
        return { x: p.birthdayX, y: p.birthdayY };
    }

    t -= DOT_BIRTHDAY_HOLD;

    if (t < DOT_NEHA_FORMATION) {
        const progress = dEase(t / DOT_NEHA_FORMATION);
        return {
            x: dLerp(p.birthdayX, p.nehaX, progress),
            y: dLerp(p.birthdayY, p.nehaY, progress)
        };
    }

    t -= DOT_NEHA_FORMATION;

    if (t < DOT_NEHA_HOLD) {
        return { x: p.nehaX, y: p.nehaY };
    }

    t -= DOT_NEHA_HOLD;

    if (t < DOT_PHOTO_FORMATION) {
        const progress = dEase(
            t / DOT_PHOTO_FORMATION
        );

        return {
            x: dLerp(p.nehaX, p.photoX, progress),
            y: dLerp(p.nehaY, p.photoY, progress)
        };
    }

    return {
        x: p.photoX,
        y: p.photoY
    };
}

function drawFinalDotParticle(p) {
    const c = p.color;

    dctx.save();
    dctx.globalAlpha = p.alpha * 0.13;
    dctx.fillStyle =
        `rgb(${c.r},${c.g},${c.b})`;
    dctx.shadowBlur = 6;
    dctx.shadowColor =
        `rgb(${c.r},${c.g},${c.b})`;

    dctx.beginPath();
    dctx.arc(
        p.x,
        p.y,
        p.size * 1.6,
        0,
        Math.PI * 2
    );
    dctx.fill();
    dctx.restore();

    dctx.save();
    dctx.globalAlpha = p.alpha;
    dctx.fillStyle =
        `rgb(${c.r},${c.g},${c.b})`;

    dctx.beginPath();
    dctx.arc(
        p.x,
        p.y,
        p.size,
        0,
        Math.PI * 2
    );
    dctx.fill();
    dctx.restore();
}

function animateFinalDots(now) {
    if (!dotAnimationStarted) return;

    const dt = Math.min(
        0.033,
        Math.max(
            0.001,
            (now - dotLastTime) / 1000
        )
    );

    dotLastTime = now;

    const elapsed = now - dotStartTime;

    // Keep the same night-sky background instead of replacing it with a
    // separate black layer. Stars stay in the same positions and the
    // small lights continuously travel upward.
    dctx.clearRect(0, 0, dW, dH);

    // The real #sky remains visible underneath this transparent canvas.
    // Draw only the moving lights here so stars are not duplicated.
    drawDotFloatingParticles(elapsed);
    drawRomanticRedParticles(elapsed);

    for (const p of dotParticles) {
        const target = getFinalDotTarget(
            p,
            elapsed
        );

        const stiffness = 28;
        const damping = 8.5;

        const ax =
            (target.x - p.x) * stiffness;

        const ay =
            (target.y - p.y) * stiffness;

        p.vx += ax * dt;
        p.vy += ay * dt;

        const damp = Math.exp(-damping * dt);

        p.vx *= damp;
        p.vy *= damp;

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const distance = Math.hypot(
            target.x - p.x,
            target.y - p.y
        );

        p.alpha = dClamp(
            0.72 +
            Math.min(distance / 350, 0.28),
            0.72,
            1
        );

        drawFinalDotParticle(p);
    }

    requestAnimationFrame(animateFinalDots);
}

// Start the birthday music track used by the main page when the final scene begins.
function startBirthdayMusic() {
    try {
        if (window.parent && window.parent !== window && window.parent.BirthdayBook?.playBirthdayMusic) {
            window.parent.BirthdayBook.playBirthdayMusic();
        }
    } catch (e) {}
}

async function startFinalDotSequence() {
    if (dotAnimationStarted) return;

    dotFinalSection.style.display = "flex";
    dotFinalSection.style.opacity = "0";

    requestAnimationFrame(() => {
        dotFinalSection.style.transition =
            "opacity 1s ease";
        dotFinalSection.style.opacity = "1";
    });

    resizeFinalDots();

    if (!dotImageReady) {
        await createDotPortrait();
    }

    createFinalDotParticles();

    dotAnimationStarted = true;
    startBirthdayMusic();
    dotStartTime = performance.now();
    dotLastTime = dotStartTime;

    requestAnimationFrame(animateFinalDots);
}

window.addEventListener("resize", resizeFinalDots);

// Prepare final canvas without starting it yet.
resizeFinalDots();


// ==============================
// LETTER "N" RAIN
// ==============================

setInterval(() => {
    if (!nameAnimationRunning || nameSection.style.display === "none") return;

    const letter = document.createElement("div");

    letter.innerText = "n";
    letter.style.position = "fixed";
    letter.style.left = Math.random() * 100 + "vw";
    letter.style.top = "-50px";
    letter.style.fontWeight = "bold";
    letter.style.color = "#ff4da6";
    letter.style.pointerEvents = "none";
    letter.style.userSelect = "none";
    letter.style.zIndex = "9999";

    nameSection.appendChild(letter);

    letter.animate(
        [
            { transform: "translateY(0)", opacity: 1 },
            { transform: "translateY(110vh)", opacity: 1 }
        ],
        {
            duration: 2000 + Math.random() * 1500,
            easing: "linear"
        }
    );

    setTimeout(() => letter.remove(), 3500);
}, 40);
