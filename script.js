/* ---------------------------------------------------
   PARTICLE BACKGROUND
---------------------------------------------------- */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 1.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = "rgba(200,200,200,0.6)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 60; i++) particlesArray.push(new Particle());
}
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();

/* ---------------------------------------------------
   LOADING SCREEN
---------------------------------------------------- */
window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        loader.style.opacity = 0;
        setTimeout(() => loader.style.display = "none", 800);
    }, 600);
});

/* ---------------------------------------------------
   COUNTERS
---------------------------------------------------- */
let counters = document.querySelectorAll(".count");
let started = false;

function startCounters() {
    if (started) return;
    if (!counters.length) return;

    let first = counters[0].offsetTop;
    if (window.scrollY + window.innerHeight > first) {
        counters.forEach(counter => {
            let target = +counter.dataset.val;
            let current = 0;
            let step = target / 80;

            let interval = setInterval(() => {
                current += step;
                counter.textContent = Math.floor(current);
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(interval);
                }
            }, 20);
        });
        started = true;
    }
}
window.addEventListener("scroll", startCounters);

/* ---------------------------------------------------
   DARK / LIGHT MODE
---------------------------------------------------- */
const themeToggle = document.getElementById("theme-toggle");

themeToggle.onclick = () => {
    document.body.classList.toggle("light");
    themeToggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
};

/* ---------------------------------------------------
   BACK TO TOP BUTTON
---------------------------------------------------- */
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 600);
});
backToTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

/* ---------------------------------------------------
   SECTION INDICATOR
---------------------------------------------------- */
const secDots = document.querySelectorAll(".section-indicator div");
const sections = ["hero", "about", "gallery", "certificates", "experience", "projects", "feedback", "contact"];

window.addEventListener("scroll", () => {
    let pos = window.scrollY + innerHeight / 2;

    sections.forEach((sec, i) => {
        let el = document.getElementById(sec);
        if (!el) return;

        if (pos > el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
            secDots.forEach(dot => dot.classList.remove("active"));
            secDots[i].classList.add("active");
        }
    });
});

/* ---------------------------------------------------
   LIGHTBOX GALLERY
---------------------------------------------------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".lightbox-img").forEach(img => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
    });
});
document.getElementById("lightbox-close").onclick = () => {
    lightbox.style.display = "none";
};

/* ---------------------------------------------------
   CERTIFICATE PDF VIEWER
---------------------------------------------------- */
function openPDF(file) {
    document.getElementById("pdf-viewer").style.display = "flex";
    document.getElementById("pdf-frame").src = file;
}
document.getElementById("pdf-close").onclick = () => {
    document.getElementById("pdf-viewer").style.display = "none";
};

/* ---------------------------------------------------
   PROJECT ACCORDION
---------------------------------------------------- */
document.querySelectorAll(".project-item").forEach(item => {
    item.querySelector(".project-header").addEventListener("click", () => {
        const open = document.querySelector(".project-item.active");
        if (open && open !== item) open.classList.remove("active");
        item.classList.toggle("active");
    });
});

/* ---------------------------------------------------
   POPUP MESSAGE FOR FEEDBACK FORM
---------------------------------------------------- */
const feedbackForm = document.getElementById("feedbackForm");
const popup = document.getElementById("popup");

feedbackForm.addEventListener("submit", () => {
    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 3000);
});

/* ---------------------------------------------------
   FADE-UP SCROLL REVEAL
---------------------------------------------------- */
const fadeItems = document.querySelectorAll(".fade");

function fadeReveal() {
    fadeItems.forEach(el => {
        const rect = el.getBoundingClientRect().top;
        if (rect < window.innerHeight - 60) {
            el.style.animationPlayState = "running";
        }
    });
}
window.addEventListener("scroll", fadeReveal);
window.addEventListener("load", fadeReveal);

/* ---------------------------------------------------
   TYPING ANIMATION
---------------------------------------------------- */
const typingTexts = [
    "Multi-NDT Specialist",
    "PCN Level II Technician",
    "Industrial Inspector",
    "RT • MT • PT • RTFI"
];
let tIndex = 0;
let charIndex = 0;
const typingEl = document.getElementById("typing");

function typeLoop() {
    if (!typingEl) return;

    let current = typingTexts[tIndex];
    typingEl.textContent = current.slice(0, charIndex);

    if (charIndex < current.length) {
        charIndex++;
    } else {
        setTimeout(() => {
            charIndex = 0;
            tIndex = (tIndex + 1) % typingTexts.length;
        }, 1000);
    }
    setTimeout(typeLoop, 80);
}
typeLoop();

/* ---------------------------------------------------
   TELUGU ↔ ENGLISH LANGUAGE SWITCH
---------------------------------------------------- */
const langToggle = document.getElementById("lang-toggle");
let isTelugu = false;

langToggle.addEventListener("click", () => {
    isTelugu = !isTelugu;
    langToggle.textContent = isTelugu ? "English" : "తెలుగు";

    document.querySelectorAll(".lang").forEach(el => {
        el.textContent = isTelugu ? el.dataset.te : el.dataset.en;
    });
});
