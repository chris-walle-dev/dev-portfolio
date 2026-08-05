document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================
       STEP 3: Basic Interactivity (Menu Toggle & Smooth Scroll)
       ========================================================== */
    
    // Note: If you add a hamburger button to your HTML header later, 
    // this function will handle toggling its active state and the navigation menu.
    window.toggleMenu = function() {
        const navMenu = document.querySelector('nav ul');
        const hamburgerBtn = document.querySelector('.hamburger-btn'); // Optional element if added
        
        if (navMenu) {
            navMenu.classList.toggle('show');
        }
        if (hamburgerBtn) {
            hamburgerBtn.classList.toggle('active');
        }
    };

    // Implement smooth scrolling for internal anchor links
    const internalLinks = document.querySelectorAll('nav a[href^="#"], .skip-link');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('nav ul');
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
            }
        });
    });


    /* ==========================================================
       STEP 4: Section Interactivity (Project Filtering & Lightbox)
       ========================================================== */

    // Project filtering function (e.g., calling filterProjects('all') or filterProjects('web'))
    window.filterProjects = function(category) {
        const projectArticles = document.querySelectorAll('#projects article');
        
        projectArticles.forEach(article => {
            const articleCategory = article.getAttribute('data-category');
            if (category === 'all' || !articleCategory || articleCategory === category) {
                article.style.display = 'flex';
            } else {
                article.style.display = 'none';
            }
        });
    };

    // Lightbox Effect Implementation
    const projectImages = document.querySelectorAll('#projects img');
    
    // Create modal elements dynamically
    const modal = document.createElement('div');
    modal.id = 'image-lightbox-modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.85);
        justify-content: center;
        align-items: center;
        padding: 2rem;
    `;
    
    const modalImg = document.createElement('img');
    modalImg.style.cssText = `
        max-width: 90%;
        max-height: 85vh;
        border-radius: 6px;
        box-shadow: 0 5px 25px rgba(0,0,0,0.5);
    `;
    
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 35px;
        color: #f1f1f1;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
    `;
    
    modal.appendChild(closeBtn);
    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    // Open lightbox when clicking project images
    projectImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImg.src = img.src;
            modalImg.alt = img.alt;
        });
    });

    // Close lightbox functions
    const closeModal = () => {
        modal.style.display = 'none';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });


    /* ==========================================================
       STEP 5: Contact Form Real-Time Validation & Feedback
       ========================================================== */

    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        const nameInput = document.querySelector('#name');
        const emailInput = document.querySelector('#email');
        const messageInput = document.querySelector('#message');

        // Helper element to show status messages
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'form-feedback';
        feedbackDiv.style.cssText = 'margin-top: 1rem; font-size: 0.9rem; font-weight: 500;';
        contactForm.appendChild(feedbackDiv);

        // Real-time validation helper
        const validateField = (input, condition, message) => {
            let errorSpan = input.nextElementSibling;
            if (!errorSpan || !errorSpan.classList.contains('error-text')) {
                errorSpan = document.createElement('span');
                errorSpan.className = 'error-text';
                errorSpan.style.cssText = 'color: #ef4444; font-size: 0.8rem; margin-top: 0.25rem; display: block;';
                input.parentNode.appendChild(errorSpan);
            }

            if (!condition && input.value.trim() !== '') {
                errorSpan.textContent = message;
                input.style.borderColor = '#ef4444';
            } else {
                errorSpan.textContent = '';
                input.style.borderColor = '';
            }
        };

        nameInput.addEventListener('input', () => {
            validateField(nameInput, nameInput.value.trim().length >= 2, 'Name must be at least 2 characters long.');
        });

        emailInput.addEventListener('input', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            validateField(emailInput, emailRegex.test(emailInput.value.trim()), 'Please enter a valid email address.');
        });

        messageInput.addEventListener('input', () => {
            validateField(messageInput, messageInput.value.trim().length >= 10, 'Message must be at least 10 characters long.');
        });

        // Form submission handling
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameVal = nameInput.value.trim();
            const emailVal = emailInput.value.trim();
            const messageVal = messageInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!nameVal || !emailVal || !messageVal) {
                feedbackDiv.style.color = '#ef4444';
                feedbackDiv.textContent = 'Please fill out all required fields before submitting.';
                return;
            }

            if (!emailRegex.test(emailVal)) {
                feedbackDiv.style.color = '#ef4444';
                feedbackDiv.textContent = 'Please provide a valid email address format.';
                return;
            }

            // Successful validation feedback simulation
            feedbackDiv.style.color = '#10b981';
            feedbackDiv.textContent = 'Thank you! Your message has been sent successfully.';
            contactForm.reset();

            // Clear success message after a few seconds
            setTimeout(() => {
                feedbackDiv.textContent = '';
            }, 5000);
        });
    }

});