        document.addEventListener('DOMContentLoaded', function() {
            // Form Validation
            const form = document.getElementById('community-form');
            const successMessage = document.getElementById('success-message');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;
                
                // Validate name
                const nameInput = document.getElementById('name');
                const nameError = document.getElementById('name-error');
                if (nameInput.value.trim().length < 3) {
                    nameError.style.display = 'block';
                    isValid = false;
                } else {
                    nameError.style.display = 'none';
                }
                
                // Validate email
                const emailInput = document.getElementById('email');
                const emailError = document.getElementById('email-error');
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    emailError.style.display = 'block';
                    isValid = false;
                } else {
                    emailError.style.display = 'none';
                }
                
                // Validate group selection
                const groupSelect = document.getElementById('group');
                const groupError = document.getElementById('group-error');
                if (groupSelect.value === '') {
                    groupError.style.display = 'block';
                    isValid = false;
                } else {
                    groupError.style.display = 'none';
                }
                
                // If form is valid, show success message
                if (isValid) {
                    successMessage.style.display = 'block';
                    form.reset();
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                }
            });
            
            // Testimonial Carousel
            const carousel = document.querySelector('.testimonial-carousel');
            const inner = document.querySelector('.carousel-inner');
            const items = document.querySelectorAll('.carousel-item');
            const prevBtn = document.querySelector('.carousel-control.prev');
            const nextBtn = document.querySelector('.carousel-control.next');
            const indicators = document.querySelectorAll('.indicator');
            
            let currentIndex = 0;
            let intervalId;
            
            // Function to update carousel
            function updateCarousel() {
                inner.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Update indicators
                indicators.forEach((indicator, index) => {
                    if (index === currentIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }
            
            // Function to move to next slide
            function nextSlide() {
                currentIndex = (currentIndex + 1) % items.length;
                updateCarousel();
            }
            
            // Function to move to previous slide
            function prevSlide() {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                updateCarousel();
            }
            
            // Function to start auto rotation
            function startAutoRotation() {
                intervalId = setInterval(nextSlide, 5000);
            }
            
            // Function to stop auto rotation
            function stopAutoRotation() {
                clearInterval(intervalId);
            }
            
            // Event listeners for buttons
            nextBtn.addEventListener('click', function() {
                stopAutoRotation();
                nextSlide();
                startAutoRotation();
            });
            
            prevBtn.addEventListener('click', function() {
                stopAutoRotation();
                prevSlide();
                startAutoRotation();
            });
            
            // Event listeners for indicators
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', function() {
                    stopAutoRotation();
                    currentIndex = index;
                    updateCarousel();
                    startAutoRotation();
                });
            });
            
            // Pause auto rotation when hovering over carousel
            carousel.addEventListener('mouseenter', stopAutoRotation);
            carousel.addEventListener('mouseleave', startAutoRotation);
            
            // Start auto rotation
            startAutoRotation();
            
            // Scroll animations
            const animatedElements = document.querySelectorAll('.group-card, .form-container');
            
            function checkAnimation() {
                const triggerBottom = window.innerHeight * 0.8;
                
                animatedElements.forEach((element, index) => {
                    const elementTop = element.getBoundingClientRect().top;
                    
                    if (elementTop < triggerBottom) {
                        element.classList.add('visible');
                    }
                });
            }
            
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
            
            // Initial check and then on scroll
            checkAnimation();
            window.addEventListener('scroll', checkAnimation);
        });