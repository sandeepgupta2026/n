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

for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement("span");

    star.className = "star";

    const size = Math.random() * 3 + 1;
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";

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

    light.style.position = "absolute";
    light.style.width = "2px";
    light.style.height = "2px";
    light.style.borderRadius = "50%";
    light.style.background = "gold";
    light.style.boxShadow = "0 0 12px gold";
    light.style.left = Math.random() * 100 + "vw";
    light.style.top = Math.random() * 100 + "vh";

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

openGift.addEventListener("click", () => {
    openGift.disabled = true;
    shakeGift();
});

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
    for (let i = 0; i < 120; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function launchRockets() {
    fireworkSound.currentTime = 0;
    fireworkSound.play();

    rocketSound.currentTime = 0;
    rocketSound.play();

    rockets.length = 0;

    for (let i = 0; i < 10; i++) {
        rockets.push(
            new Rocket(80 + i * ((canvas.width - 160) / 9))
        );
    }

    const rocketInterval = setInterval(() => {
        rockets.push(
            new Rocket(80 + Math.random() * (canvas.width - 160))
        );
    }, 400);

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
    nctx.font = "bold 90px Poppins";
    nctx.textAlign = "center";

    nctx.fillText(
        "HAPPY BIRTHDAY NEHA ❤️",
        nameCanvas.width / 2,
        nameCanvas.height / 2 + 50
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
    animateName();
}

function animateName() {
    nctx.clearRect(0, 0, nameCanvas.width, nameCanvas.height);

    nameParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateName);
}

// ==============================
// LETTER "N" RAIN
// ==============================

setInterval(() => {
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
