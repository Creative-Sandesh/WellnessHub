        // DOM Elements
        const newsGrid = document.getElementById('newsGrid');
        const timeline = document.getElementById('timeline');
        const newsForm = document.getElementById('newsForm');
        const formTitle = document.getElementById('formTitle');
        const cancelEditBtn = document.getElementById('cancelEdit');
        const toast = document.getElementById('toast');

        // Sample initial news data
        const initialNews = [
            {
                id: 1,
                title: "New Yoga Classes Starting Next Week",
                date: "2024-05-10",
                description: "We're excited to announce new yoga classes focused on stress relief and flexibility. All skill levels welcome!"
            },
            {
                id: 2,
                title: "Nutrition Workshop: Eating for Energy",
                date: "2024-05-05",
                description: "Join us for a workshop on how to optimize your diet for sustained energy throughout the day."
            },
            {
                id: 3,
                title: "Annual Wellness Fair Registration Open",
                date: "2024-04-28",
                description: "Registration for our annual Wellness Fair is now open. Vendors and participants can sign up now."
            }
        ];

        // Initialize news from localStorage or use sample data
        let news = JSON.parse(localStorage.getItem('wellnessNews')) || initialNews;

        // Save news to localStorage
        function saveNewsToStorage() {
            localStorage.setItem('wellnessNews', JSON.stringify(news));
        }

        // Show toast notification
        function showToast(message, isSuccess = true) {
            toast.textContent = message;
            toast.style.background = isSuccess ? 'var(--primary-green)' : '#e74c3c';
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Format date to readable format
        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }

        // Render news cards
        function renderNews() {
            newsGrid.innerHTML = '';
            
            news.forEach(item => {
                const newsCard = document.createElement('article');
                newsCard.className = 'news-card';
                newsCard.setAttribute('data-id', item.id);
                
                // Calculate if news is older than 30 days for archiving
                const newsDate = new Date(item.date);
                const currentDate = new Date();
                const diffTime = Math.abs(currentDate - newsDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays > 30) {
                    return; // Skip rendering if older than 30 days
                }
                
                newsCard.innerHTML = `
                    <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80" alt="${item.title}" class="news-img">
                    <div class="news-content">
                        <h3 class="news-title">${item.title}</h3>
                        <span class="news-date">${formatDate(item.date)}</span>
                        <p class="news-desc">${item.description}</p>
                       
                        <div class="news-actions">
                            <button class="btn btn-outline edit-btn">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-danger delete-btn">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                `;
                
                newsGrid.appendChild(newsCard);
                
                // Add event listeners for edit and delete buttons
                const editBtn = newsCard.querySelector('.edit-btn');
                const deleteBtn = newsCard.querySelector('.delete-btn');
                
                editBtn.addEventListener('click', () => editNews(item.id));
                deleteBtn.addEventListener('click', () => deleteNews(item.id));
            });
            
            renderTimeline();
        }

        // Render timeline for archived news
        function renderTimeline() {
            timeline.innerHTML = '';
            
            // Group news by year and month
            const archivedNews = news.filter(item => {
                const newsDate = new Date(item.date);
                const currentDate = new Date();
                const diffTime = Math.abs(currentDate - newsDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays > 30;
            });
            
            // Sort by date descending
            archivedNews.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            let currentYear = null;
            let currentMonth = null;
            
            archivedNews.forEach(item => {
                const itemDate = new Date(item.date);
                const itemYear = itemDate.getFullYear();
                const itemMonth = itemDate.toLocaleString('default', { month: 'long' });
                
                // Add year heading if changed
                if (itemYear !== currentYear) {
                    currentYear = itemYear;
                    currentMonth = null; // Reset month when year changes
                    
                    const yearHeading = document.createElement('div');
                    yearHeading.className = 'timeline-item';
                    yearHeading.innerHTML = `
                        <div class="timeline-content">
                            <h3 style="color: var(--primary-green); margin: 0;">${currentYear}</h3>
                        </div>
                    `;
                    timeline.appendChild(yearHeading);
                }
                
                // Add month heading if changed
                if (itemMonth !== currentMonth) {
                    currentMonth = itemMonth;
                    
                    const monthHeading = document.createElement('div');
                    monthHeading.className = 'timeline-item';
                    monthHeading.innerHTML = `
                        <div class="timeline-content">
                            <h4 style="color: var(--primary-blue); margin: 0;">${currentMonth}</h4>
                        </div>
                    `;
                    timeline.appendChild(monthHeading);
                }
                
                // Add news item to timeline
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';
                timelineItem.innerHTML = `
                    <div class="timeline-content">
                        <div class="timeline-date">${formatDate(item.date)}</div>
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        <div class="news-actions">
                            <button class="btn btn-outline edit-btn">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-danger delete-btn">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                `;
                
                timeline.appendChild(timelineItem);
                
                // Add event listeners for edit and delete buttons
                const editBtn = timelineItem.querySelector('.edit-btn');
                const deleteBtn = timelineItem.querySelector('.delete-btn');
                
                editBtn.addEventListener('click', () => editNews(item.id));
                deleteBtn.addEventListener('click', () => deleteNews(item.id));
            });
        }

        // Add new news item
        function addNews(event) {
            event.preventDefault();
            
            const title = document.getElementById('newsTitle').value;
            const date = document.getElementById('newsDate').value;
            const description = document.getElementById('newsDescription').value;
            const id = document.getElementById('newsId').value;
            
            if (!title || !date || !description) {
                showToast('Please fill in all fields', false);
                return;
            }
            
            if (id) {
                // Edit existing news
                const index = news.findIndex(item => item.id == id);
                if (index !== -1) {
                    news[index] = { id: parseInt(id), title, date, description };
                    showToast('News item updated successfully');
                }
            } else {
                // Add new news
                const newId = news.length > 0 ? Math.max(...news.map(item => item.id)) + 1 : 1;
                news.push({ id: newId, title, date, description });
                showToast('News item added successfully');
            }
            
            saveNewsToStorage();
            renderNews();
            newsForm.reset();
            document.getElementById('newsId').value = '';
            formTitle.textContent = 'Add New News Item';
            cancelEditBtn.style.display = 'none';
        }

        // Edit news item
        function editNews(id) {
            const newsItem = news.find(item => item.id == id);
            
            if (newsItem) {
                document.getElementById('newsId').value = newsItem.id;
                document.getElementById('newsTitle').value = newsItem.title;
                document.getElementById('newsDate').value = newsItem.date;
                document.getElementById('newsDescription').value = newsItem.description;
                
                formTitle.textContent = 'Edit News Item';
                cancelEditBtn.style.display = 'inline-block';
                
                // Scroll to form
                document.querySelector('.news-form-container').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        }

        // Delete news item
        function deleteNews(id) {
            if (confirm('Are you sure you want to delete this news item?')) {
                news = news.filter(item => item.id != id);
                saveNewsToStorage();
                renderNews();
                showToast('News item deleted successfully');
            }
        }

        // Cancel edit
        function cancelEdit() {
            newsForm.reset();
            document.getElementById('newsId').value = '';
            formTitle.textContent = 'Add New News Item';
            cancelEditBtn.style.display = 'none';
        }

        // Initialize page
        document.addEventListener('DOMContentLoaded', () => {
            // Set today's date as default for the date picker
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('newsDate').value = today;
            
            // Render initial news
            renderNews();
            
            // Add event listeners
            newsForm.addEventListener('submit', addNews);
            cancelEditBtn.addEventListener('click', cancelEdit);
            
            // Animate news cards on scroll
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}ms`;
                        entry.target.classList.add('fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            document.querySelectorAll('.news-card, .timeline-item').forEach((card, index) => {
                card.style.animationDelay = `${index * 100}ms`;
                observer.observe(card);
            });
        });