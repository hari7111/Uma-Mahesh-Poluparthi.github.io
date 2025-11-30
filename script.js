/* COUNTER ANIMATION */
let counters = document.querySelectorAll(".count");
let started = false;

function startCounters() {
    if (!started && window.scrollY > 100) {
        counters.forEach(counter => {
            let target = +counter.getAttribute("data-val");
            let current = 0;
            let step = Math.ceil(target / 100);

            let run = setInterval(() => {
                current += step;
                counter.textContent = current;
                if (current >= target) clearInterval(run);
            }, 20);
        });
        started = true;
    }
}

window.addEventListener("scroll", startCounters);

/* SMOOTH FADE-UP ANIMATION */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
    });
});

document.querySelectorAll(".section").forEach(sec => {
    sec.classList.add("hidden");
    observer.observe(sec);
});
