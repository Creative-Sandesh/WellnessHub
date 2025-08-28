 // Form Validation
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('workshop-registration');
            const successMessage = document.getElementById('success-message');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;
                
                // Validate name
                const nameInput = document.getElementById('fullname');
                const nameError = document.getElementById('name-error');
                if (nameInput.value.trim() === '') {
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
                
                // Validate workshop selection
                const workshopSelect = document.getElementById('workshop');
                const workshopError = document.getElementById('workshop-error');
                if (workshopSelect.value === '') {
                    workshopError.style.display = 'block';
                    isValid = false;
                } else {
                    workshopError.style.display = 'none';
                }
                
                // If form is valid, show success message
                if (isValid) {
                    successMessage.style.display = 'block';
                    form.reset();
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                }
            });
            
            // Timeline animation on scroll
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            function checkTimelineAnimation() {
                const triggerBottom = window.innerHeight * 0.8;
                
                timelineItems.forEach((item, index) => {
                    const itemTop = item.getBoundingClientRect().top;
                    
                    if (itemTop < triggerBottom) {
                        // Stagger the animation with a delay based on index
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 200);
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
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Initial check and then on scroll
            checkTimelineAnimation();
            window.addEventListener('scroll', checkTimelineAnimation);
        });