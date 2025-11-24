document.addEventListener('DOMContentLoaded', () => {
    initDate();
    initScrollReveal();
});

// 1. Set Current Date dynamically
function initDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
}

// 2. Scroll Reveal Animation
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    // Initial check
    revealOnScroll();

    // Listen to scroll
    window.addEventListener('scroll', revealOnScroll);
}