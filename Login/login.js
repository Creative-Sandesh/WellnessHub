        // User data management
        let userData = {
            profile: {
                name: "Sarah Johnson",
                role: "Wellness Enthusiast",
                bio: "Passionate about mental health, nutrition, and fitness. On a journey to become the best version of myself!",
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                stats: {
                    progress: 85,
                    workouts: 42,
                    goals: 3
                }
            },
            progress: {
                fitness: 75,
                nutrition: 90,
                mentalHealth: 65,
                sleep: 80
            },
            activities: [
                {
                    title: "Completed Morning Run",
                    time: "Today, 7:30 AM • 5.2 km • 32 mins",
                    icon: "running"
                },
                {
                    title: "Logged Breakfast",
                    time: "Today, 8:45 AM • 420 calories",
                    icon: "apple-alt"
                },
                {
                    title: "Completed Meditation",
                    time: "Yesterday, 8:00 PM • 15 mins",
                    icon: "meditation"
                },
                {
                    title: "Strength Training",
                    time: "Yesterday, 6:30 PM • 45 mins",
                    icon: "dumbbell"
                }
            ],
            goals: [
                {
                    title: "Daily Steps",
                    value: "8,542/10,000",
                    icon: "walking"
                },
                {
                    title: "Water Intake",
                    value: "5/8 glasses",
                    icon: "glass-whiskey"
                },
                {
                    title: "Sleep Hours",
                    value: "7.5/8 hours",
                    icon: "bed"
                }
            ]
        };

        // Check if user is logged in
        function checkLoginStatus() {
            const isLoggedIn = localStorage.getItem('wellnessHubLoggedIn') === 'true';
            const userProfile = JSON.parse(localStorage.getItem('wellnessHubUser') || '{}');

            if (isLoggedIn && userProfile.name) {
                showHomePage();
                updateAuthSection(userProfile);
            } else {
                showLoginPage();
            }
        }

        // Show login page
        function showLoginPage() {
            document.getElementById('loginPage').classList.remove('hidden');
            document.getElementById('homePage').classList.add('hidden');
            document.getElementById('profileContent').classList.add('hidden');

            // Show login button in header
            document.getElementById('authSection').innerHTML = `
                <button class="login-btn" onclick="showLoginPage()">
                    <i class="fas fa-sign-in-alt"></i> Login
                </button>
            `;
        }

        // Show homepage
        function showHomePage() {
            document.getElementById('loginPage').classList.add('hidden');
            document.getElementById('homePage').classList.remove('hidden');
            document.getElementById('profileContent').classList.add('hidden');
        }

        // Show profile page
        function showProfile() {
            document.getElementById('loginPage').classList.add('hidden');
            document.getElementById('homePage').classList.add('hidden');
            document.getElementById('profileContent').classList.remove('hidden');
            

            const userProfile = JSON.parse(localStorage.getItem('wellnessHubUser') || '{}');
            updateProfileUI(userProfile);
        }

        // Update auth section with user info
        function updateAuthSection(userData) {
            document.getElementById('authSection').innerHTML = `
                <div class="user-info" onclick="toggleUserMenu()">
                    <img src="${userData.image}" alt="User Avatar" class="user-avatar">
                    <span>${userData.name}</span>
                    <div class="user-menu" id="userMenu">
                        <div class="user-menu-item" onclick="showProfile()">
                            <i class="fas fa-user"></i> Profile
                        </div>
                        <div class="user-menu-item" onclick="signOut()">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </div>
                    </div>
                </div>
            `;
        }

        // Toggle user menu
        function toggleUserMenu() {
            const userMenu = document.getElementById('userMenu');
            userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
        }

        // Close user menu when clicking outside
        document.addEventListener('click', function (event) {
            const userMenu = document.getElementById('userMenu');
            const userInfo = document.querySelector('.user-info');

            if (userMenu && userInfo && !userInfo.contains(event.target)) {
                userMenu.style.display = 'none';
            }
        });

        // Update profile UI with user data
        function updateProfileUI(user) {
          
            document.getElementById('profileImage').src = user.image;
            document.getElementById('profileUserName').textContent = user.name;
            document.getElementById('profileRole').textContent = user.role;
            document.getElementById('profileBio').textContent = user.bio;

            // Update stats
            document.getElementById('statProgress').textContent = user.stats.progress + '%';
            document.getElementById('statWorkouts').textContent = user.stats.workouts;
            document.getElementById('statGoals').textContent = user.stats.goals;

            // Update progress bars
            updateProgressBars();
        }

        // Update progress bars
        function updateProgressBars() {
            const progressData = JSON.parse(localStorage.getItem('wellnessHubProgress')) || userData.progress;

            document.getElementById('fitnessProgress').textContent = progressData.fitness + '%';
            document.getElementById('nutritionProgress').textContent = progressData.nutrition + '%';
            document.getElementById('mentalHealthProgress').textContent = progressData.mentalHealth + '%';
            document.getElementById('sleepProgress').textContent = progressData.sleep + '%';

            document.getElementById('fitnessBar').style.width = progressData.fitness + '%';
            document.getElementById('nutritionBar').style.width = progressData.nutrition + '%';
            document.getElementById('mentalHealthBar').style.width = progressData.mentalHealth + '%';
            document.getElementById('sleepBar').style.width = progressData.sleep + '%';
        }

        // Handle form submission
        document.getElementById('loginForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (email && password) {
                // Simulate successful login
                const userProfile = {
                    name: "Sarah Johnson",
                    email: email,
                    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                    role: "Wellness Enthusiast",
                    bio: "Passionate about mental health, nutrition, and fitness. On a journey to become the best version of myself!",
                    stats: {
                        progress: 85,
                        workouts: 42,
                        goals: 3
                    }
                };

                // Save to localStorage
                localStorage.setItem('wellnessHubLoggedIn', 'true');
                localStorage.setItem('wellnessHubUser', JSON.stringify(userProfile));

                // Update UI
                showHomePage();
                updateAuthSection(userProfile);
            }
        });

        // Handle Google Sign-In
        function handleGoogleSignIn(response) {
            // Decode the JWT response to get user data
            const payload = parseJwt(response.credential);

            // Create user profile from Google data
            const userProfile = {
                name: payload.name,
                email: payload.email,
                image: payload.picture,
                role: "Wellness Enthusiast",
                bio: "Welcome to WellnessHub! Update your bio to share your wellness journey.",
                stats: {
                    progress: 65,
                    workouts: 0,
                    goals: 0
                }
            };

            // Save to localStorage
            localStorage.setItem('wellnessHubLoggedIn', 'true');
            localStorage.setItem('wellnessHubUser', JSON.stringify(userProfile));

            // Update UI
            showHomePage();
            updateAuthSection(userProfile);
            
        }

        // Parse JWT token
        function parseJwt(token) {
            try {
                return JSON.parse(atob(token.split('.')[1]));
            } catch (e) {
                return null;
            }
        }

        // Sign out function
        function signOut() {
            localStorage.removeItem('wellnessHubLoggedIn');
            localStorage.removeItem('wellnessHubUser');

            // Google Sign Out
            google.accounts.id.disableAutoSelect();

            // Reload to show login page
            showLoginPage();
        }

        // Modal functions
        function openEditProfileModal() {
            document.getElementById('editProfileModal').style.display = 'flex';
        }

        function openProgressModal() {
            document.getElementById('progressModal').style.display = 'flex';
        }

        function openAddActivityModal() {
            document.getElementById('addActivityModal').style.display = 'flex';
        }

        function openAddGoalModal() {
            document.getElementById('addGoalModal').style.display = 'flex';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        // Close modal when clicking outside the content
        window.onclick = function (event) {
            const modals = document.getElementsByClassName('modal');
            for (let i = 0; i < modals.length; i++) {
                if (event.target === modals[i]) {
                    modals[i].style.display = 'none';
                }
            }
        }

        // Save profile changes
        function saveProfileChanges() {
            const name = document.getElementById('profileName').value;
            const role = document.getElementById('profileRoleInput').value;
            const bio = document.getElementById('profileBioInput').value;
            const imageUrl = document.getElementById('profileImageInput').value;

            document.getElementById('profileUserName').textContent = name;
            document.getElementById('profileRole').textContent = role;
            document.getElementById('profileBio').textContent = bio;
            // document.getElementById('profileImage').src = imageUrl;
            // document.querySelector('.user-avatar').src = imageUrl;
            document.getElementById('profileImage').src = imageUrl || "images/default-avatar.png";

            document.querySelector('.user-info span').textContent = name;

            closeModal('editProfileModal');

            // Show success message
            showNotification('Profile updated successfully!');
        }

        // Save progress changes
        function saveProgressChanges() {
            const fitness = document.getElementById('fitnessProgressInput').value;
            const nutrition = document.getElementById('nutritionProgressInput').value;
            const mentalHealth = document.getElementById('mentalHealthProgressInput').value;
            const sleep = document.getElementById('sleepProgressInput').value;

            document.getElementById('fitnessProgress').textContent = fitness + '%';
            document.getElementById('nutritionProgress').textContent = nutrition + '%';
            document.getElementById('mentalHealthProgress').textContent = mentalHealth + '%';
            document.getElementById('sleepProgress').textContent = sleep + '%';

            document.getElementById('fitnessBar').style.width = fitness + '%';
            document.getElementById('nutritionBar').style.width = nutrition + '%';
            document.getElementById('mentalHealthBar').style.width = mentalHealth + '%';
            document.getElementById('sleepBar').style.width = sleep + '%';

            // Update overall progress
            const overallProgress = Math.round((parseInt(fitness) + parseInt(nutrition) + parseInt(mentalHealth) + parseInt(sleep)) / 4);
            document.getElementById('statProgress').textContent = overallProgress + '%';

            closeModal('progressModal');

            // Show success message
            showNotification('Progress updated successfully!');
        }

        // Add new activity
        function addNewActivity() {
            const type = document.getElementById('activityType').value;
            const title = document.getElementById('activityTitle').value;
            const details = document.getElementById('activityDetails').value;

            if (!title || !details) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            const activityList = document.getElementById('activityList');
            const iconClass = getIconClassForActivityType(type);

            const now = new Date();
            const timeString = now.toLocaleDateString('en-US', { weekday: 'long', hour: 'numeric', minute: 'numeric' });

            const newActivity = document.createElement('li');
            newActivity.className = 'activity-item';
            newActivity.innerHTML = `
                <div class="activity-icon">
                    <i class="fas fa-${iconClass}"></i>
                </div>
                <div class="activity-content">
                    <h4 class="activity-title">${title}</h4>
                    <p class="activity-time">${timeString} • ${details}</p>
                </div>
            `;

            activityList.prepend(newActivity);

            // Update stats
            const workoutCount = document.getElementById('statWorkouts');
            if (type !== 'meal') {
                workoutCount.textContent = parseInt(workoutCount.textContent) + 1;
            }

            closeModal('addActivityModal');

            // Reset form
            document.getElementById('activityForm').reset();

            // Show success message
            showNotification('Activity added successfully!');
        }

        // Add new goal
        function addNewGoal() {
            const type = document.getElementById('goalType').value;
            const title = document.getElementById('goalTitle').value;
            const target = document.getElementById('goalTarget').value;
            const current = document.getElementById('goalCurrent').value;

            if (!title || !target || !current) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            const goalsGrid = document.getElementById('goalsGrid');
            const iconClass = getIconClassForGoalType(type);

            const newGoal = document.createElement('div');
            newGoal.className = 'goal-card';
            newGoal.innerHTML = `
                <div class="goal-icon">
                    <i class="fas fa-${iconClass}"></i>
                </div>
                <h4 class="goal-title">${title}</h4>
                <div class="goal-value">${current}/${target}</div>
            `;

            goalsGrid.appendChild(newGoal);

            // Update stats
            const goalCount = document.getElementById('statGoals');
            goalCount.textContent = parseInt(goalCount.textContent) + 1;

            closeModal('addGoalModal');

            // Reset form
            document.getElementById('goalForm').reset();

            // Show success message
            showNotification('Goal added successfully!');
        }

        // Helper function to get icon class for activity type
        function getIconClassForActivityType(type) {
            const icons = {
                'running': 'running',
                'walking': 'walking',
                'cycling': 'bicycle',
                'swimming': 'swimmer',
                'yoga': 'spa',
                'meditation': 'meditation',
                'weightlifting': 'dumbbell',
                'meal': 'apple-alt'
            };
            return icons[type] || 'running';
        }

        // Helper function to get icon class for goal type
        function getIconClassForGoalType(type) {
            const icons = {
                'steps': 'walking',
                'water': 'glass-whiskey',
                'sleep': 'bed',
                'meditation': 'meditation',
                'workout': 'dumbbell'
            };
            return icons[type] || 'target';
        }

        // Show notification function
        function showNotification(message, type = 'success') {
            // Create notification element
            const notification = document.createElement('div');
            notification.textContent = message;
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.padding = '10px 20px';
            notification.style.borderRadius = '5px';
            notification.style.color = 'white';
            notification.style.zIndex = '1000';
            notification.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';

            if (type === 'success') {
                notification.style.background = 'var(--primary-green)';
            } else {
                notification.style.background = '#e74c3c';
            }

            document.body.appendChild(notification);

            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transition = 'opacity 0.5s';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 3000);
        }

        // Initialize progress bar animations
        document.addEventListener('DOMContentLoaded', function () {
            const progressBars = document.querySelectorAll('.progress-value');

            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';

                setTimeout(() => {
                    bar.style.transition = 'width 1s ease-in-out';
                    bar.style.width = width;
                }, 300);
            });
        });