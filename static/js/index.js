// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Sample course data
    const courses = [
        {
            id: 1,
            title: 'Complete Web Development Bootcamp',
            instructor: 'John Smith',
            rating: 4.8,
            reviews: 12453,
            price: 84.99,
            image: "static\images\webdev.png",
            category: 'Development'
        },
        {
            id: 2,
            title: 'Python for Data Science and ML',
            instructor: 'Sarah Johnson',
            rating: 4.9,
            reviews: 8762,
            price: 94.99,
            image: '/api/placeholder/280/160',
            category: 'Data Science'
        },
        {
            id: 3,
            title: 'Digital Marketing Masterclass',
            instructor: 'Mike Wilson',
            rating: 4.7,
            reviews: 6234,
            price: 79.99,
            image: '/api/placeholder/280/160',
            category: 'Marketing'
        },
        {
            id: 4,
            title: 'UI/UX Design Fundamentals',
            instructor: 'Emma Davis',
            rating: 4.8,
            reviews: 5421,
            price: 89.99,
            image: '/api/placeholder/280/160',
            category: 'Design'
        }
    ];

    // Sample testimonial data
    const testimonials = [
        {
            id: 1,
            name: 'David Chen',
            role: 'Software Developer',
            content: 'The courses here completely changed my career path. I went from knowing nothing about coding to landing my dream job in just 6 months.',
            image: '/api/placeholder/60/60'
        },
        {
            id: 2,
            name: 'Lisa Anderson',
            role: 'Digital Marketer',
            content: 'The quality of instruction is outstanding. I\'ve taken several marketing courses and each one has provided immense value.',
            image: '/api/placeholder/60/60'
        },
        {
            id: 3,
            name: 'James Wilson',
            role: 'Entrepreneur',
            content: 'As a business owner, these courses helped me understand crucial aspects of digital transformation. Highly recommended!',
            image: '/api/placeholder/60/60'
        }
    ];

    // Render featured courses
    function renderCourses(coursesToRender = courses) {
        const courseGrid = document.getElementById('courseGrid');
        if (!courseGrid) return;

        courseGrid.innerHTML = coursesToRender.map(course => `
            <div class="course-card" data-course-id="${course.id}">
                <img src="${course.image}" alt="${course.title}" class="course-image">
                <div class="course-content">
                    <h3 class="course-title">${course.title}</h3>
                    <p class="instructor">${course.instructor}</p>
                    <div class="rating">
                        <span class="stars">${generateStars(course.rating)}</span>
                        <span class="rating-number">${course.rating}</span>
                        <span class="reviews">(${formatNumber(course.reviews)} reviews)</span>
                    </div>
                    <div class="price">$${course.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${course.id})">Add to Cart</button>
                </div>
            </div>
        `).join('');
    }

    // Render testimonials
    function renderTestimonials() {
        const testimonialGrid = document.getElementById('testimonialGrid');
        if (!testimonialGrid) return;

        testimonialGrid.innerHTML = testimonials.map(testimonial => `
            <div class="testimonial-card">
                <div class="testimonial-content">
                    <p>${testimonial.content}</p>
                </div>
                <div class="testimonial-author">
                    <img src="${testimonial.image}" alt="${testimonial.name}" class="author-image">
                    <div class="author-info">
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.role}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Generate star rating
    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    // Format numbers with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filteredCourses = courses.filter(course => 
                course.title.toLowerCase().includes(searchTerm) ||
                course.instructor.toLowerCase().includes(searchTerm) ||
                course.category.toLowerCase().includes(searchTerm)
            );
            renderCourses(filteredCourses);
        }, 300));
    }

    // Debounce function for search
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Shopping cart functionality
    let cart = [];

    window.addToCart = function(courseId) {
        const course = courses.find(c => c.id === courseId);
        if (course && !cart.includes(courseId)) {
            cart.push(courseId);
            updateCartIcon();
            showNotification('Course added to cart!');
        }
    };

    function updateCartIcon() {
        const cartIcon = document.querySelector('.nav-links a[href="#cart"]');
        if (cartIcon) {
            cartIcon.innerHTML = `<i class="fas fa-shopping-cart"></i> ${cart.length}`;
        }
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 2000);
        }, 100);
    }

    // Scroll animations
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.category-card, .course-card, .testimonial-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    // Login/Signup Modal
    function initAuthModals() {
        const loginBtn = document.querySelector('.login-btn');
        const signupBtn = document.querySelector('.signup-btn');

        if (loginBtn) {
            loginBtn.addEventListener('click', () => showAuthModal('login'));
        }
        if (signupBtn) {
            signupBtn.addEventListener('click', () => showAuthModal('signup'));
        }
    }

    function showAuthModal(type) {
        const modal = document.createElement('div');
        modal.className = 'auth-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>${type === 'login' ? 'Log In' : 'Sign Up'}</h2>
                <form class="auth-form">
                    <input type="email" placeholder="Email" required>
                    <input type="password" placeholder="Password" required>
                    ${type === 'signup' ? '<input type="password" placeholder="Confirm Password" required>' : ''}
                    <button type="submit">${type === 'login' ? 'Log In' : 'Sign Up'}</button>
                </form>
                <button class="close-modal">&times;</button>
            </div>
        `;

        document.body.appendChild(modal);
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            // Add authentication logic here
            modal.remove();
            showNotification(`${type === 'login' ? 'Logged in' : 'Signed up'} successfully!`);
        });
    }

    // Initialize everything
    function init() {
        renderCourses();
        renderTestimonials();
        initScrollAnimations();
        initAuthModals();
        updateCartIcon();
    }

    // Run initialization
    init();
});