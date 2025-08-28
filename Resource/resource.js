document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Scroll animations
    const animatedElements = document.querySelectorAll('.resource-card, .highlight-card');

    function checkAnimation() {
        const triggerBottom = window.innerHeight * 0.8;

        animatedElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    }

    // Initial check and then on scroll
    checkAnimation();
    window.addEventListener('scroll', checkAnimation);
});






