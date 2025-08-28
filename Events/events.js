// Events Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 15); // 15 days from now
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the results
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // If the countdown is finished
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }
    
    // Update countdown every second
    const countdownTimer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
    
    // Calendar tooltips
    const eventDays = document.querySelectorAll('.event-day');
    
    eventDays.forEach(day => {
        day.addEventListener('mouseenter', function() {
            // Tooltip is created via CSS
        });
        
        day.addEventListener('mouseleave', function() {
            // Tooltip is removed via CSS
        });
    });
    
    // Animation on scroll
    const animatedElements = document.querySelectorAll('.event-card, .calendar-container, .countdown-content');
    
    function checkAnimation() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animatedElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                // Stagger the animation with a delay based on index
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }
    
    // Set initial state for animation
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Initial check and then on scroll
    checkAnimation();
    window.addEventListener('scroll', checkAnimation);
});