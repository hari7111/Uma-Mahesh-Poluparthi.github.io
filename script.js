/* ==========================
   LOADING SCREEN
========================== */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = 0;
            setTimeout(() => loader.style.display = "none", 600);
        }, 400);
    }
});

/* ==========================
   COUNTERS
========================== */
let counters = document.querySelectorAll(".count");
let counterStarted = false;

function runCounters() {
    if (counterStarted) return;

    let trigger = window.innerHeight * 0.8;

    counters.forEach(counter => {
        let rect = counter.getBoundingClientRect().top;
        if (rect < trigger) {
            let value = +counter.dataset.val;
            let current = 0;
            let step = value / 60;

            let counterRun = setInterval(() => {
                current += step;
                counter.textContent = Math.floor(current);

                if (current >= value) {
                    counter.textContent = value;
                    clearInterval(counterRun);
                }
            }, 25);
        }
    });

    counterStarted = true;
}

window.addEventListener("scroll", runCounters);

/* ==========================
   LIGHTBOX
========================== */
const lightbox = document.getElementById("lightbox-viewer");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.getElementById("lightbox-close");

document.querySelectorAll(".lightbox").forEach(img => {
    img.addEventListener("click", () => {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = img.src;
        lightbox.style.display = "flex";
    });
});

if (closeLightbox) {
    closeLightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
        lightboxImg.src = "";
    });
}

/* ==========================
   PDF VIEWER
========================== */
function openPDF(file) {
    const viewer = document.getElementById("pdf-viewer");
    const frame = document.getElementById("pdf-frame");

    if (viewer && frame) {
        frame.src = file;
        viewer.style.display = "flex";
    }
}
window.openPDF = openPDF;

const pdfClose = document.getElementById("pdf-close");
if (pdfClose) {
    pdfClose.addEventListener("click", () => {
        document.getElementById("pdf-viewer").style.display = "none";
        document.getElementById("pdf-frame").src = "";
    });
}

/* ==========================
   PROJECT ACCORDION
========================== */
document.querySelectorAll(".project-item").forEach(item => {
    const header = item.querySelector(".project-header");
    header.addEventListener("click", () => {
        document.querySelectorAll(".project-item.active").forEach(open => {
            if (open !== item) open.classList.remove("active");
        });
        item.classList.toggle("active");
    });
});

/* ==========================
   FEEDBACK POPUP + DELAY REDIRECT
========================== */
const feedbackForm = document.getElementById("feedbackForm");
const popup = document.getElementById("popup");

if (feedbackForm) {
    feedbackForm.addEventListener("submit", e => {
        e.preventDefault();

        if (popup) popup.classList.add("show");

        // Delay redirect and show popup
        setTimeout(() => {
            feedbackForm.submit();  // Now actually submit
        }, 1500);
    });
}

/* ==========================
   TYPING EFFECT
========================== */
const typingTexts = [
    "Multi-NDT Specialist",
    "PCN Level II Technician",
    "Industrial Inspector",
    "RT • MT • PT • RTFI"
];

let tIndex = 0, cIndex = 0;
const typingElement = document.getElementById("typing");

function typingEffect() {
    if (!typingElement) return;

    let currentText = typingTexts[tIndex];
    typingElement.textContent = currentText.substring(0, cIndex);

    if (cIndex < currentText.length) {
        cIndex++;
    } else {
        setTimeout(() => {
            cIndex = 0;
            tIndex = (tIndex + 1) % typingTexts.length;
        }, 900);
    }

    setTimeout(typingEffect, 110);
}
typingEffect();

/* ==========================
   SCROLL FADE-IN
========================== */
const fadeItems = document.querySelectorAll(".fade");

function fadeInOnScroll() {
    fadeItems.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 50) {
            el.style.animationPlayState = "running";
        }
    });
}

window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("load", fadeInOnScroll);

/* ==========================
   CERTIFICATE CAROUSEL
========================== */
const certCarousel = document.getElementById("certCarousel");
const certNext = document.getElementById("certNext");
const certPrev = document.getElementById("certPrev");

if (certNext) {
    certNext.addEventListener("click", () => {
        certCarousel.scrollBy({ left: 220, behavior: "smooth" });
    });
}

if (certPrev) {
    certPrev.addEventListener("click", () => {
        certCarousel.scrollBy({ left: -220, behavior: "smooth" });
    });
}

/* ==========================
   HIRE → CONTACT SCROLL
========================== */
function scrollToContact() {
    const contact = document.querySelector("#contact");
    if (contact) {
        contact.scrollIntoView({ behavior: "smooth" });
    }
}
window.scrollToContact = scrollToContact;
