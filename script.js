/* -----------------------------------------------------
   SCROLL PROGRESS BAR
------------------------------------------------------ */
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / totalHeight) * 100;
    document.getElementById("scroll-progress").style.width = progress + "%";
});


/* -----------------------------------------------------
   FADE-UP ELEMENTS (Appear on scroll)
------------------------------------------------------ */
const fadeElements = document.querySelectorAll(".fade-up");

function animateFadeUps() {
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (rect < windowHeight - 80) {
            el.style.animationPlayState = "running";
        }
    });
}

window.addEventListener("scroll", animateFadeUps);
window.addEventListener("load", animateFadeUps);


/* -----------------------------------------------------
   COUNTER ANIMATION
------------------------------------------------------ */
let counterStarted = false;

function startCounters() {
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
        counter.innerText = "0";

        const updateCounter = () => {
            const target = +counter.getAttribute("data-target");
            const current = +counter.innerText;

            const increment = target / 80; // smooth speed

            if (current < target) {
                counter.innerText = `${Math.ceil(current + increment)}`;
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    });
}

window.addEventListener("scroll", () => {
    const section = document.querySelector(".counter-row");
    const rect = section.getBoundingClientRect().top;

    if (rect < window.innerHeight - 100 && !counterStarted) {
        counterStarted = true;
        startCounters();
    }
});


/* -----------------------------------------------------
   LIGHTBOX GALLERY
------------------------------------------------------ */
function openLightbox(src) {
    document.getElementById("lightbox-img").src = src;
    document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}


/* -----------------------------------------------------
   GALLERY ENTRY ANIMATION
------------------------------------------------------ */
const galleryImages = document.querySelectorAll(".animated-img");

function animateGallery() {
    galleryImages.forEach((img, index) => {
        setTimeout(() => {
            img.style.opacity = "1";
            img.style.transform = "translateY(0)";
        }, index * 150);
    });
}

window.addEventListener("load", animateGallery);
