// Fitness Page Specific JavaScript

// Mobile Navigation Toggle (inherited from main script.js)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fitness-specific functionality

// Class Booking System
function initializeClassBooking() {
    const workoutCells = document.querySelectorAll('.schedule-table td:not(:first-child)');
    
    workoutCells.forEach(cell => {
        if (cell.querySelector('.workout-type')) {
            cell.style.cursor = 'pointer';
            cell.addEventListener('click', function() {
                const workoutType = this.querySelector('.workout-type').textContent;
                const instructor = this.querySelector('.instructor').textContent;
                const timeSlot = this.parentElement.querySelector('.time-slot').textContent;
                const day = this.parentElement.parentElement.querySelector('thead th:nth-child(' + (this.cellIndex + 1) + ')').textContent;
                
                showBookingModal(workoutType, instructor, timeSlot, day);
            });
            
            // Add hover effect
            cell.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'transform 0.2s ease';
            });
            
            cell.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
    });
}

// Booking Modal
function showBookingModal(workoutType, instructor, timeSlot, day) {
    // Remove existing modal
    const existingModal = document.querySelector('.booking-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Book Class</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="class-details">
                        <h4>${workoutType}</h4>
                        <p><strong>Day:</strong> ${day}</p>
                        <p><strong>Time:</strong> ${timeSlot}</p>
                        <p><strong>Instructor:</strong> ${instructor}</p>
                    </div>
                    <form class="booking-form">
                        <div class="form-group">
                            <label for="studentName">Full Name</label>
                            <input type="text" id="studentName" required>
                        </div>
                        <div class="form-group">
                            <label for="studentEmail">Email</label>
                            <input type="email" id="studentEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="studentId">Student ID</label>
                            <input type="text" id="studentId" required>
                        </div>
                        <div class="form-group">
                            <label for="experience">Experience Level</label>
                            <select id="experience" required>
                                <option value="">Select level</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary modal-cancel">Cancel</button>
                            <button type="submit" class="btn btn-primary">Book Class</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .booking-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            animation: modalSlideIn 0.3s ease-out;
        }
        
        @keyframes modalSlideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .modal-header h3 {
            color: #1b5e20;
            margin: 0;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.3s ease;
        }
        
        .modal-close:hover {
            background: #f0f0f0;
        }
        
        .class-details {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 10px;
            margin-bottom: 1.5rem;
        }
        
        .class-details h4 {
            color: #1b5e20;
            margin: 0 0 1rem 0;
        }
        
        .class-details p {
            margin: 0.5rem 0;
            color: #666;
        }
        
        .booking-form .form-group {
            margin-bottom: 1rem;
        }
        
        .booking-form label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #333;
        }
        
        .booking-form input,
        .booking-form select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }
        
        .booking-form input:focus,
        .booking-form select:focus {
            outline: none;
            border-color: #4caf50;
        }
        
        .form-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .form-actions .btn {
            flex: 1;
        }
    `;
    
    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);
    
    // Modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const cancelBtn = modal.querySelector('.modal-cancel');
    const bookingForm = modal.querySelector('.booking-form');
    
    closeBtn.addEventListener('click', () => modal.remove());
    cancelBtn.addEventListener('click', () => modal.remove());
    
    // Close modal when clicking overlay
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            modal.remove();
        }
    });
    
    // Handle form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            workoutType,
            instructor,
            timeSlot,
            day,
            studentName: document.getElementById('studentName').value,
            studentEmail: document.getElementById('studentEmail').value,
            studentId: document.getElementById('studentId').value,
            experience: document.getElementById('experience').value
        };
        
        // Simulate booking process
        showNotification('Booking your class...', 'info');
        
        setTimeout(() => {
            modal.remove();
            showNotification(`Successfully booked ${workoutType} with ${instructor}! Check your email for confirmation.`, 'success');
        }, 2000);
    });
}

// Schedule Filter System
function initializeScheduleFilters() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'schedule-filters';
    filterContainer.innerHTML = `
        <div class="filter-section">
            <h4>Filter by:</h4>
            <div class="filter-buttons">
                <button class="filter-btn active" data-filter="all">All Classes</button>
                <button class="filter-btn" data-filter="yoga">Yoga</button>
                <button class="filter-btn" data-filter="gym">Gym</button>
                <button class="filter-btn" data-filter="group">Group</button>
                <button class="filter-btn" data-filter="cardio">Cardio</button>
            </div>
        </div>
        <div class="filter-section">
            <h4>Difficulty:</h4>
            <div class="filter-buttons">
                <button class="filter-btn active" data-difficulty="all">All Levels</button>
                <button class="filter-btn" data-difficulty="beginner">Beginner</button>
                <button class="filter-btn" data-difficulty="intermediate">Intermediate</button>
                <button class="filter-btn" data-difficulty="advanced">Advanced</button>
            </div>
        </div>
    `;
    
    // Insert filters before the schedule table
    const scheduleSection = document.querySelector('.workout-schedule .container');
    const scheduleTable = document.querySelector('.schedule-table');
    scheduleSection.insertBefore(filterContainer, scheduleTable);
    
    // Add filter styles
    const filterStyles = document.createElement('style');
    filterStyles.textContent = `
        .schedule-filters {
            display: flex;
            gap: 2rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        
        .filter-section h4 {
            margin: 0 0 0.5rem 0;
            color: #1b5e20;
            font-size: 1rem;
        }
        
        .filter-buttons {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        
        .filter-btn {
            padding: 8px 16px;
            border: 2px solid #e0e0e0;
            background: white;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }
        
        .filter-btn:hover {
            border-color: #4caf50;
            color: #4caf50;
        }
        
        .filter-btn.active {
            background: #4caf50;
            color: white;
            border-color: #4caf50;
        }
        
        @media (max-width: 768px) {
            .schedule-filters {
                flex-direction: column;
                gap: 1rem;
            }
        }
    `;
    document.head.appendChild(filterStyles);
    
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterType = this.dataset.filter || this.dataset.difficulty;
            const filterCategory = this.dataset.filter ? 'filter' : 'difficulty';
            
            // Update active button
            const parentSection = this.closest('.filter-section');
            parentSection.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Apply filters
            applyScheduleFilters();
        });
    });
}

function applyScheduleFilters() {
    const activeFilter = document.querySelector('.filter-btn[data-filter].active').dataset.filter;
    const activeDifficulty = document.querySelector('.filter-btn[data-difficulty].active').dataset.difficulty;
    
    const cells = document.querySelectorAll('.schedule-table td:not(:first-child)');
    
    cells.forEach(cell => {
        const workoutType = cell.querySelector('.workout-type');
        const difficulty = cell.querySelector('.difficulty');
        
        if (workoutType && difficulty) {
            const typeClass = workoutType.className.includes('yoga') ? 'yoga' :
                             workoutType.className.includes('gym') ? 'gym' :
                             workoutType.className.includes('group') ? 'group' :
                             workoutType.className.includes('cardio') ? 'cardio' : '';
            
            const difficultyClass = difficulty.className.includes('beginner') ? 'beginner' :
                                   difficulty.className.includes('intermediate') ? 'intermediate' :
                                   difficulty.className.includes('advanced') ? 'advanced' : '';
            
            const showByType = activeFilter === 'all' || typeClass === activeFilter;
            const showByDifficulty = activeDifficulty === 'all' || difficultyClass === activeDifficulty;
            
            if (showByType && showByDifficulty) {
                cell.style.display = 'table-cell';
                cell.style.opacity = '1';
            } else {
                cell.style.display = 'none';
                cell.style.opacity = '0.3';
            }
        }
    });
}

// Notification System (enhanced for fitness)
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Fitness Card Animations
function initializeFitnessCards() {
    const fitnessCards = document.querySelectorAll('.fitness-card');
    
    fitnessCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Initialize all fitness functionality
document.addEventListener('DOMContentLoaded', () => {
    // Page fade-in effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize fitness-specific features
    initializeClassBooking();
    initializeScheduleFilters();
    initializeFitnessCards();
    
    // Add active state to current page in navigation
    const fitnessLink = document.querySelector('.nav-link[href="fitness.html"]');
    if (fitnessLink) {
        fitnessLink.classList.add('active');
    }
});

// Add scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.fitness-card, .schedule-table').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    scrollObserver.observe(el);
});

   // Program selection functionality
        const selectButtons = document.querySelectorAll('.select-program');
        const programSelect = document.getElementById('program');
        const programForm = document.getElementById('program-form');

        // Add event listeners to program buttons
        selectButtons.forEach(button => {
            button.addEventListener('click', () => {
                const program = button.getAttribute('data-program');
                programSelect.value = program;
                
                // Scroll to form
                programForm.scrollIntoView({ behavior: 'smooth' });
                
                // Highlight the form
                programForm.parentElement.style.boxShadow = '0 0 0 3px rgba(39, 174, 96, 0.3)';
                setTimeout(() => {
                    programForm.parentElement.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                }, 1500);
            });
        });

        // Form submission
        programForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const program = document.getElementById('program').value;
            
            // Show success message
            alert(`Thank you ${firstName} ${lastName}! Your application for ${program} has been submitted. We'll contact you at ${email} soon.`);
            
            // Reset form
            programForm.reset();
        });