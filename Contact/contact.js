 document.addEventListener('DOMContentLoaded', function() {
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
            
            // FAQ Accordion
            const faqHeaders = document.querySelectorAll('.faq-header');
            
            faqHeaders.forEach(header => {
                header.addEventListener('click', function() {
                    this.classList.toggle('active');
                    const content = this.nextElementSibling;
                    
                    if (this.classList.contains('active')) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
            
            // Form Validation
            const contactForm = document.getElementById('contactForm');
            const successMessage = document.getElementById('success-message');
            
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;
                
                // Validate name
                const nameInput = document.getElementById('name');
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
                
                // Validate subject
                const subjectSelect = document.getElementById('subject');
                const subjectError = document.getElementById('subject-error');
                if (subjectSelect.value === '') {
                    subjectError.style.display = 'block';
                    isValid = false;
                } else {
                    subjectError.style.display = 'none';
                }
                
                // Validate message
                const messageInput = document.getElementById('message');
                const messageError = document.getElementById('message-error');
                if (messageInput.value.trim().length < 20) {
                    messageError.style.display = 'block';
                    isValid = false;
                } else {
                    messageError.style.display = 'none';
                }
                
                // Validate consent
                const consentCheckbox = document.getElementById('consent');
                const consentError = document.getElementById('consent-error');
                if (!consentCheckbox.checked) {
                    consentError.style.display = 'block';
                    isValid = false;
                } else {
                    consentError.style.display = 'none';
                }
                
                // Check honeypot
                const websiteInput = document.getElementById('website');
                if (websiteInput.value !== '') {
                    // Likely a bot, don't show success message
                    isValid = false;
                }
                
                // If form is valid, show success message
                if (isValid) {
                    // Show loading state
                    const submitBtn = document.getElementById('submit-btn');
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;
                    
                    // Simulate network request
                    setTimeout(() => {
                        successMessage.style.display = 'block';
                        contactForm.reset();
                        
                        // Scroll to success message
                        successMessage.scrollIntoView({ behavior: 'smooth' });
                        
                        // Reset button
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 1500);
                }
            });
            
            // Newsletter form
            const newsletterForm = document.querySelector('.newsletter-form');
            const toast = document.getElementById('toast');
            
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = this.querySelector('input[type="email"]');
                
                if (emailInput.value && emailInput.value.includes('@')) {
                    // Show toast notification
                    toast.style.display = 'block';
                    
                    // Hide after 3 seconds
                    setTimeout(() => {
                        toast.style.display = 'none';
                    }, 3000);
                    
                    // Reset form
                    this.reset();
                }
            });
            
            // Scroll animations
            const animatedElements = document.querySelectorAll('.contact-card, .form-container, .map-container, .social-container');
            
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