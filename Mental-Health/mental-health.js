 // Mobile navigation toggle
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");
        const body = document.querySelector("body");

        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            body.classList.toggle("no-scroll");
        });

        // Close mobile menu when clicking on a nav link
        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            body.classList.remove("no-scroll");
        }));

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Accordion functionality
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                // Toggle current accordion item
                this.classList.toggle('active');
                const content = this.nextElementSibling;
                
                if (this.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = null;
                }
                
                // Close other accordion items
                accordionHeaders.forEach(otherHeader => {
                    if (otherHeader !== header && otherHeader.classList.contains('active')) {
                        otherHeader.classList.remove('active');
                        otherHeader.nextElementSibling.style.maxHeight = null;
                    }
                });
            });
        });
        
        // Carousel functionality
        const carousel = document.querySelector('.carousel');
        const inner = document.querySelector('.carousel-inner');
        const items = document.querySelectorAll('.carousel-item');
        const prevBtn = document.querySelector('.carousel-control.prev');
        const nextBtn = document.querySelector('.carousel-control.next');
        const indicators = document.querySelectorAll('.indicator');
        
        let currentIndex = 0;
        let intervalId;
        let startX = 0;
        let endX = 0;
        
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
            intervalId = setInterval(nextSlide, 6000);
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
        
        // Touch events for swipe
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            stopAutoRotation();
        });
        
        carousel.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', () => {
            if (startX - endX > 50) {
                // Swipe left
                nextSlide();
            } else if (endX - startX > 50) {
                // Swipe right
                prevSlide();
            }
            startAutoRotation();
        });
        
        // Pause auto rotation when hovering over carousel
        carousel.addEventListener('mouseenter', stopAutoRotation);
        carousel.addEventListener('mouseleave', startAutoRotation);
        
        // Start auto rotation
        startAutoRotation();

        // Scroll to top functionality
        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Animate elements on scroll
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.counseling-card, .accordion-item, .section-title');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.style.animation = 'fadeIn 1s forwards';
                }
            });
        };
        
        window.addEventListener('scroll', animateOnScroll);
        // Initial call to check elements in view
        animateOnScroll();