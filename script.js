/* ============================================================
   PAGE TRANSITION — FADE IN EFFECT
============================================================ */
window.addEventListener("load", () => {
    document.body.classList.add("fade-in");
    applySavedTheme(); // ensure theme & icon correct on load
});

/* ============================================================
   NAVBAR MOBILE TOGGLE
============================================================ */
function toggleNav() {
    document.getElementById("navMenu").classList.toggle("show");
}

/* ============================================================
   THEME SYSTEM (LIGHT / DARK MODE)
============================================================ */
function applySavedTheme() {
    const saved = localStorage.getItem("theme");
    const toggleBtn = document.querySelector(".theme-toggle");

    if (!toggleBtn) return;

    if (saved === "light") {
        document.body.classList.add("light-mode");
        toggleBtn.textContent = "☀️";
    } else {
        document.body.classList.remove("light-mode");
        toggleBtn.textContent = "🌙";
    }
}

function toggleTheme() {
    const toggleBtn = document.querySelector(".theme-toggle");
    if (!toggleBtn) return;

    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");

    toggleBtn.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
}

/* ============================================================
   ACTIVE NAV HIGHLIGHT ON SCROLL
============================================================ */
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(sec => {
        const secTop = sec.offsetTop;
        if (scrollY >= secTop - 120) current = sec.id;
    });

    navLinks.forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute("href") === `#${current}`) {
            a.classList.add("active");
        }
    });
});

/* ============================================================
   CERTIFICATE CAROUSEL
============================================================ */
function slideCerts(direction) {
    const slider = document.getElementById("certCarousel");
    if (!slider) return;

    slider.scrollBy({
        left: direction * 350,
        behavior: "smooth"
    });
}

/* ============================================================
   PDF VIEWER
============================================================ */
function openPDF(path) {
    const overlay = document.getElementById("pdfOverlay");
    const frame = document.getElementById("pdfFrame");
    if (!overlay || !frame) return;

    overlay.style.display = "flex";
    frame.src = path;
}

function closePDF() {
    const overlay = document.getElementById("pdfOverlay");
    const frame = document.getElementById("pdfFrame");
    if (!overlay || !frame) return;

    overlay.style.display = "none";
    frame.src = "";
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closePDF();
        closeProject();
        closeZoom();
    }
});

/* ============================================================
   FEEDBACK SUBMISSION MESSAGE
============================================================ */
function feedbackSubmit(event) {
    event.preventDefault();

    const msg = document.getElementById("feedbackMsg");
    if (msg) {
        msg.classList.add("show");
    }

    // Minimal delay, feels snappy
    setTimeout(() => {
        if (msg) msg.classList.remove("show");
        event.target.submit();
    }, 800);
}

/* ============================================================
   TYPING ANIMATION
============================================================ */
const typingText = [
    "Multi-NDT Technician",
    "RTFI Level II",
    "MT Level II",
    "PT Level II",
    "Quality Inspection Specialist"
];

let tIndex = 0;
let cIndex = 0;
let isDeleting = false;

function typeEffect() {
    const el = document.getElementById("typing");
    if (!el) return;

    const text = typingText[tIndex];

    if (!isDeleting) {
        el.textContent = text.substring(0, cIndex++);
        if (cIndex > text.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1100);
            return;
        }
    } else {
        el.textContent = text.substring(0, cIndex--);
        if (cIndex < 0) {
            isDeleting = false;
            tIndex = (tIndex + 1) % typingText.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 60 : 90);
}

window.addEventListener("load", typeEffect);

/* ============================================================
   SCROLL REVEAL ANIMATIONS
============================================================ */
const revealSections = document.querySelectorAll(".section");

function reveal() {
    revealSections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) {
            sec.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

/* ============================================================
   HORIZONTAL SCROLL FOR GALLERY
============================================================ */
const galleryScroll = document.querySelector(".gallery-scroll");
if (galleryScroll) {
    galleryScroll.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        galleryScroll.scrollLeft += evt.deltaY * 1.2;
    }, { passive: false });
}

/* ============================================================
   AUTO-SCROLL CERTIFICATION SLIDER
============================================================ */
let certInterval;
const certCarousel = document.getElementById("certCarousel");

function autoSlideCerts() {
    if (!certCarousel) return;

    certInterval = setInterval(() => {
        certCarousel.scrollBy({ left: 300, behavior: "smooth" });

        if (certCarousel.scrollLeft + certCarousel.clientWidth >= certCarousel.scrollWidth - 5) {
            certCarousel.scrollTo({ left: 0, behavior: "smooth" });
        }
    }, 7000); // 7 seconds
}

if (certCarousel) {
    autoSlideCerts();

    certCarousel.addEventListener("mouseenter", () => clearInterval(certInterval));
    certCarousel.addEventListener("mouseleave", autoSlideCerts);
}

/* ============================================================
   ADVANCED HERO INTERACTION (SUBTLE TILT)
============================================================ */
const heroImgContainer = document.querySelector(".profile-glow");

document.addEventListener("mousemove", (e) => {
    if (!heroImgContainer) return;

    const x = (window.innerWidth / 2 - e.clientX) / 60;
    const y = (window.innerHeight / 2 - e.clientY) / 60;

    heroImgContainer.style.transform = `translateY(0px) rotateY(${x}deg) rotateX(${y}deg)`;
});

document.addEventListener("mouseleave", () => {
    if (heroImgContainer) {
        heroImgContainer.style.transform = "translateY(0px) rotateY(0deg) rotateX(0deg)";
    }
});

/* ============================================================
   FULLSCREEN IMAGE ZOOM VIEWER
============================================================ */
const zoomOverlay = document.getElementById("imageZoom");
const zoomImage = document.getElementById("zoomImage");

if (zoomOverlay && zoomImage) {
    document.querySelectorAll(".zoomable").forEach(img => {
        img.addEventListener("click", () => {
            zoomImage.src = img.src;
            zoomOverlay.style.display = "flex";
        });
    });

    zoomOverlay.addEventListener("click", (e) => {
        if (e.target.id === "imageZoom") closeZoom();
    });

    zoomOverlay.addEventListener("touchend", () => {
        zoomImage.style.transform = "scale(1)";
    });
}

function closeZoom() {
    if (!zoomOverlay || !zoomImage) return;
    zoomOverlay.style.display = "none";
    zoomImage.src = "";
}

/* ============================================================
   NEON PARTICLES BACKGROUND ENGINE (LIGHTER)
============================================================ */
const canvas = document.getElementById("particleCanvas");
let ctx = null;
if (canvas) {
    ctx = canvas.getContext("2d");
}

let particles = [];

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
});

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.glow = Math.random() * 10 + 6;
    }

    update() {
        if (!canvas) return;

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width ||
            this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        if (!ctx) return;

        ctx.beginPath();
        ctx.fillStyle = "rgba(0,255,180,0.78)";
        ctx.shadowBlur = this.glow;
        ctx.shadowColor = "#00ffb3";
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    if (!canvas) return;

    particles = [];
    // Reduced density for minimal / better performance
    const count = Math.floor((canvas.width * canvas.height) / 16000);

    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateParticles);
}

if (canvas) {
    initParticles();
    animateParticles();
}

/* ============================================================
   PROJECT MODAL SYSTEM
============================================================ */
const projectData = {
    1: {
        title: "Pressure Vessel Radiographic Inspection",
        description: `
            Performed complete RT inspection of weld joints on industrial pressure vessels.
            Responsibilities:
            • Film interpretation (RTFI Level II)
            • Identification of internal discontinuities
            • Preparing inspection reports
            • Client communication & safety compliance
        `
    },
    2: {
        title: "MT & PT Surface Crack Inspection",
        description: `
            Executed MT and PT inspections on structural components.
            • Surface crack detection
            • Indication classification
            • Written reports and documentation
            • Work performed in live industrial sites
        `
    },
    3: {
        title: "Structural Steel Radiographic Testing",
        description: `
            Performed radiographic testing on multi-story steel structures.
            • RT exposure setup
            • Film development & evaluation
            • Reporting weld acceptance as per ASME standards
        `
    }
};

function openProject(id) {
    const modal = document.getElementById("projectModal");
    const title = document.getElementById("projectTitle");
    const desc = document.getElementById("projectDescription");

    if (!modal || !title || !desc || !projectData[id]) return;

    title.textContent = projectData[id].title;
    desc.innerHTML = projectData[id].description.replace(/\n/g, "<br>");

    modal.style.display = "flex";
}

function closeProject() {
    const modal = document.getElementById("projectModal");
    if (!modal) return;
    modal.style.display = "none";
}

const projectModal = document.getElementById("projectModal");
if (projectModal) {
    projectModal.addEventListener("click", (e) => {
        if (e.target.id === "projectModal") {
            closeProject();
        }
    });
}
