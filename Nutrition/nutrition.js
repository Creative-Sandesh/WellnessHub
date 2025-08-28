// Nutrition Page Specific JavaScript
(function() {

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

// Recipe Data
const recipes = {
    salad: {
        title: "Fresh Garden Salad",
        time: "15 minutes",
        difficulty: "Easy",
        servings: "2 servings",
        ingredients: [
            "4 cups mixed greens (spinach, arugula, romaine)",
            "1 cup cherry tomatoes, halved",
            "1 cucumber, sliced",
            "1 avocado, diced",
            "1/4 cup almonds, chopped",
            "1/4 cup red onion, thinly sliced",
            "2 tbsp olive oil",
            "1 tbsp balsamic vinegar",
            "1 tsp Dijon mustard",
            "Salt and pepper to taste"
        ],
        instructions: [
            "Wash and prepare all vegetables",
            "In a large bowl, combine mixed greens, tomatoes, cucumber, avocado, and red onion",
            "In a small bowl, whisk together olive oil, balsamic vinegar, Dijon mustard, salt, and pepper",
            "Pour dressing over salad and toss gently",
            "Sprinkle chopped almonds on top",
            "Serve immediately and enjoy!"
        ],
        nutrition: {
            calories: 180,
            protein: "8g",
            carbs: "12g",
            fat: "14g",
            fiber: "12g"
        }
    },
    bowl: {
        title: "Protein Power Bowl",
        time: "25 minutes",
        difficulty: "Medium",
        servings: "2 servings",
        ingredients: [
            "1 cup quinoa, rinsed",
            "1 sweet potato, cubed",
            "1 can chickpeas, drained and rinsed",
            "2 cups kale, chopped",
            "1/4 cup tahini",
            "2 tbsp lemon juice",
            "2 tbsp olive oil",
            "2 cloves garlic, minced",
            "1 tsp cumin",
            "Salt and pepper to taste"
        ],
        instructions: [
            "Preheat oven to 400°F (200°C)",
            "Cook quinoa according to package instructions",
            "Toss sweet potato cubes with olive oil, cumin, salt, and pepper. Roast for 20-25 minutes",
            "In a bowl, combine tahini, lemon juice, garlic, and water to make dressing",
            "In a large bowl, combine quinoa, roasted sweet potato, chickpeas, and kale",
            "Pour tahini dressing over the bowl and toss gently",
            "Serve warm and enjoy!"
        ],
        nutrition: {
            calories: 320,
            protein: "15g",
            carbs: "45g",
            fat: "12g",
            fiber: "18g"
        }
    },
    smoothie: {
        title: "Berry Blast Smoothie",
        time: "5 minutes",
        difficulty: "Easy",
        servings: "1 serving",
        ingredients: [
            "1 cup mixed berries (strawberries, blueberries, raspberries)",
            "1 banana, frozen",
            "1/2 cup Greek yogurt",
            "1/2 cup almond milk",
            "1 tbsp chia seeds",
            "1 tbsp honey (optional)",
            "Ice cubes (if needed)"
        ],
        instructions: [
            "Add all ingredients to a high-powered blender",
            "Blend on high speed until smooth and creamy",
            "If the smoothie is too thick, add more almond milk",
            "If it's too thin, add more frozen fruit or ice",
            "Pour into a glass and enjoy immediately!"
        ],
        nutrition: {
            calories: 220,
            protein: "6g",
            carbs: "35g",
            fat: "8g",
            fiber: "8g"
        }
    }
};

// Recipe Modal System
function showRecipeModal(recipeType) {
    const recipe = recipes[recipeType];
    if (!recipe) return;

    // Remove existing modal
    const existingModal = document.querySelector('.recipe-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'recipe-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${recipe.title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="recipe-meta">
                        <span><i class="fas fa-clock"></i> ${recipe.time}</span>
                        <span><i class="fas fa-star"></i> ${recipe.difficulty}</span>
                        <span><i class="fas fa-users"></i> ${recipe.servings}</span>
                    </div>
                    
                    <div class="recipe-nutrition">
                        <h4>Nutrition Facts (per serving)</h4>
                        <div class="nutrition-grid">
                            <div class="nutrition-item">
                                <span class="nutrition-value">${recipe.nutrition.calories}</span>
                                <span class="nutrition-label">Calories</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-value">${recipe.nutrition.protein}</span>
                                <span class="nutrition-label">Protein</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-value">${recipe.nutrition.carbs}</span>
                                <span class="nutrition-label">Carbs</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-value">${recipe.nutrition.fat}</span>
                                <span class="nutrition-label">Fat</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-value">${recipe.nutrition.fiber}</span>
                                <span class="nutrition-label">Fiber</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="recipe-ingredients">
                        <h4>Ingredients</h4>
                        <ul>
                            ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="recipe-instructions">
                        <h4>Instructions</h4>
                        <ol>
                            ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                        </ol>
                    </div>
                    
                    <div class="recipe-actions">
                        <button class="btn btn-secondary modal-close">Close</button>
                        <button class="btn btn-primary" onclick="printRecipe('${recipeType}')">
                            <i class="fas fa-print"></i> Print Recipe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .recipe-modal {
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
            max-width: 600px;
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
            font-size: 1.8rem;
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
        
        .recipe-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        
        .recipe-meta span {
            background: #f8f9fa;
            color: #666;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .recipe-nutrition {
            background: #e8f5e8;
            padding: 1.5rem;
            border-radius: 15px;
            margin-bottom: 2rem;
        }
        
        .recipe-nutrition h4 {
            color: #1b5e20;
            margin-bottom: 1rem;
        }
        
        .nutrition-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 1rem;
        }
        
        .nutrition-item {
            text-align: center;
        }
        
        .nutrition-value {
            display: block;
            font-size: 1.2rem;
            font-weight: 700;
            color: #1b5e20;
        }
        
        .nutrition-label {
            display: block;
            font-size: 0.8rem;
            color: #666;
            margin-top: 2px;
        }
        
        .recipe-ingredients,
        .recipe-instructions {
            margin-bottom: 2rem;
        }
        
        .recipe-ingredients h4,
        .recipe-instructions h4 {
            color: #1b5e20;
            margin-bottom: 1rem;
        }
        
        .recipe-ingredients ul {
            list-style: none;
            padding: 0;
        }
        
        .recipe-ingredients li {
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;
            position: relative;
            padding-left: 20px;
        }
        
        .recipe-ingredients li::before {
            content: '•';
            color: #4caf50;
            position: absolute;
            left: 0;
            font-weight: bold;
        }
        
        .recipe-instructions ol {
            padding-left: 1.5rem;
        }
        
        .recipe-instructions li {
            padding: 8px 0;
            line-height: 1.6;
        }
        
        .recipe-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #f0f0f0;
        }
        
        @media (max-width: 768px) {
            .modal-content {
                padding: 1.5rem;
                margin: 1rem;
            }
            
            .recipe-meta {
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .nutrition-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .recipe-actions {
                flex-direction: column;
            }
        }
    `;

    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);

    // Modal functionality
    const closeBtns = modal.querySelectorAll('.modal-close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => modal.remove());
    });

    // Close modal when clicking overlay
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            modal.remove();
        }
    });
}

// Print Recipe Function
function printRecipe(recipeType) {
    const recipe = recipes[recipeType];
    if (!recipe) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>${recipe.title}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { color: #1b5e20; }
                    .recipe-meta { margin: 20px 0; }
                    .recipe-meta span { margin-right: 20px; }
                    .nutrition-facts { background: #f8f9fa; padding: 15px; margin: 20px 0; }
                    .nutrition-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
                    .nutrition-item { text-align: center; }
                    .nutrition-value { font-weight: bold; color: #1b5e20; }
                    ul, ol { line-height: 1.6; }
                    @media print { body { margin: 0; } }
                </style>
            </head>
            <body>
                <h1>${recipe.title}</h1>
                <div class="recipe-meta">
                    <span>⏱️ ${recipe.time}</span>
                    <span>⭐ ${recipe.difficulty}</span>
                    <span>👥 ${recipe.servings}</span>
                </div>
                <div class="nutrition-facts">
                    <h3>Nutrition Facts (per serving)</h3>
                    <div class="nutrition-grid">
                        <div class="nutrition-item">
                            <div class="nutrition-value">${recipe.nutrition.calories}</div>
                            <div>Calories</div>
                        </div>
                        <div class="nutrition-item">
                            <div class="nutrition-value">${recipe.nutrition.protein}</div>
                            <div>Protein</div>
                        </div>
                        <div class="nutrition-item">
                            <div class="nutrition-value">${recipe.nutrition.carbs}</div>
                            <div>Carbs</div>
                        </div>
                        <div class="nutrition-item">
                            <div class="nutrition-value">${recipe.nutrition.fat}</div>
                            <div>Fat</div>
                        </div>
                        <div class="nutrition-item">
                            <div class="nutrition-value">${recipe.nutrition.fiber}</div>
                            <div>Fiber</div>
                        </div>
                    </div>
                </div>
                <h3>Ingredients</h3>
                <ul>
                    ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <h3>Instructions</h3>
                <ol>
                    ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                </ol>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Nutrition Calculator
function calculateNutrition() {
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);

    // Validate inputs
    if (!age || !weight || !height || !activity) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (age < 16 || age > 100) {
        showNotification('Please enter a valid age (16-100)', 'error');
        return;
    }

    if (weight < 30 || weight > 200) {
        showNotification('Please enter a valid weight (30-200 kg)', 'error');
        return;
    }

    if (height < 100 || height > 250) {
        showNotification('Please enter a valid height (100-250 cm)', 'error');
        return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (age >= 18) {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5; // Male
    } else {
        // For younger individuals, use a simplified calculation
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    }

    // Calculate Total Daily Energy Expenditure (TDEE)
    const tdee = bmr * activity;

    // Calculate macronutrients
    const protein = weight * 1.6; // 1.6g per kg body weight
    const fat = (tdee * 0.25) / 9; // 25% of calories from fat
    const carbs = (tdee - (protein * 4) - (fat * 9)) / 4; // Remaining calories from carbs

    // Display results
    document.getElementById('calories').textContent = Math.round(tdee);
    document.getElementById('protein').textContent = Math.round(protein) + 'g';
    document.getElementById('carbs').textContent = Math.round(carbs) + 'g';
    document.getElementById('fat').textContent = Math.round(fat) + 'g';

    // Show results section
    document.getElementById('calculatorResults').style.display = 'block';
    
    showNotification('Nutrition calculation completed!', 'success');
}

// Notification System
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

// Scroll Animation
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.recipe-card, .tip-card, .video-container, .calculator-container').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
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

// Initialize all nutrition functionality
document.addEventListener('DOMContentLoaded', () => {
    // Page fade-in effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Initialize recipe buttons
    document.querySelectorAll('.recipe-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const recipeType = this.getAttribute('data-recipe');
            showRecipeModal(recipeType);
        });
    });

    // Initialize nutrition calculator
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            calculateNutrition();
        });
    }

    // Initialize scroll animations
    initializeScrollAnimations();

    // Add active state to current page in navigation
    const nutritionLink = document.querySelector('.nav-link[href="nutrition.html"]');
    if (nutritionLink) {
        nutritionLink.classList.add('active');
    }

    // Hide calculator results initially
    const calculatorResults = document.getElementById('calculatorResults');
    if (calculatorResults) {
        calculatorResults.style.display = 'none';
    }
});

// Add hover effects to recipe cards
document.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effects to tip cards
document.querySelectorAll('.tip-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Expose functions needed globally
window.printRecipe = printRecipe;

})();
