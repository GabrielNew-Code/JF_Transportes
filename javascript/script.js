// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMobile.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = menuToggle.querySelector('i');
            if (navMobile.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Gallery filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide gallery items based on filter
                galleryItems.forEach(item => {
                    if (filter === 'todos' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    if (galleryItems.length > 0 && lightbox) {
        galleryItems.forEach(item => {
            const image = item.querySelector('.gallery-image');
            
            image.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                const title = item.querySelector('.gallery-caption h3').textContent;
                const description = item.querySelector('.gallery-caption p').textContent;
                
                lightboxImg.setAttribute('src', imgSrc);
                lightboxTitle.textContent = title;
                lightboxDescription.textContent = description;
                
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
            });
        });
        
        // Close lightbox when clicking the close button
        closeLightbox.addEventListener('click', function() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close lightbox with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Contact form validation and submission
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const messageInput = document.getElementById('message');
            
            // Get error message elements
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const phoneError = document.getElementById('phone-error');
            const messageError = document.getElementById('message-error');
            
            // Reset error messages
            nameError.textContent = '';
            emailError.textContent = '';
            phoneError.textContent = '';
            messageError.textContent = '';
            
            nameError.classList.remove('active');
            emailError.classList.remove('active');
            phoneError.classList.remove('active');
            messageError.classList.remove('active');
            
            // Validate form
            let isValid = true;
            
            if (nameInput.value.trim().length < 2) {
                nameError.textContent = 'O nome deve ter pelo menos 2 caracteres.';
                nameError.classList.add('active');
                isValid = false;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = 'Por favor, insira um e-mail válido.';
                emailError.classList.add('active');
                isValid = false;
            }
            
            if (phoneInput.value.trim().length < 10) {
                phoneError.textContent = 'Por favor, insira um telefone válido.';
                phoneError.classList.add('active');
                isValid = false;
            }
            
            if (messageInput.value.trim().length < 10) {
                messageError.textContent = 'A mensagem deve ter pelo menos 10 caracteres.';
                messageError.classList.add('active');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission (in a real application, you would send data to a server)
                setTimeout(function() {
                    // Show success modal
                    successModal.classList.add('active');
                    
                    // Reset form
                    contactForm.reset();
                }, 1000);
            }
        });
        
        // Close success modal
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                successModal.classList.remove('active');
            });
            
            // Close modal when clicking outside
            successModal.addEventListener('click', function(e) {
                if (e.target === successModal) {
                    successModal.classList.remove('active');
                }
            });
            
            // Close modal with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && successModal.classList.contains('active')) {
                    successModal.classList.remove('active');
                }
            });
        }
    }
});

