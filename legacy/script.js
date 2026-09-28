// Mobile Navigation Toggle - Fixed
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const mobileMenuSticky = document.getElementById('mobile-menu-sticky');
const navMenuSticky = document.getElementById('nav-menu-sticky');

// Main carousel navigation toggle
if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Sticky navigation toggle
if (mobileMenuSticky && navMenuSticky) {
    mobileMenuSticky.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mobileMenuSticky.classList.toggle('active');
        navMenuSticky.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    // Close main nav menu
    if (navMenu && !navMenu.contains(e.target) && !mobileMenu?.contains(e.target)) {
        navMenu.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
    }
    // Close sticky nav menu
    if (navMenuSticky && !navMenuSticky.contains(e.target) && !mobileMenuSticky?.contains(e.target)) {
        navMenuSticky.classList.remove('active');
        if (mobileMenuSticky) mobileMenuSticky.classList.remove('active');
    }
});

// Prevent menu from closing when clicking inside
if (navMenu) {
    navMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

if (navMenuSticky) {
    navMenuSticky.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Smooth Scrolling for Navigation Links
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
        // Close mobile menu after clicking
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Sticky Navigation on Scroll
window.addEventListener('scroll', () => {
    const stickyNav = document.getElementById('sticky-nav');
    const carouselSection = document.querySelector('.carousel-section');
    
    if (stickyNav && carouselSection) {
        const carouselHeight = carouselSection.offsetHeight;
        
        if (window.scrollY > carouselHeight - 100) {
            stickyNav.classList.add('show');
        } else {
            stickyNav.classList.remove('show');
        }
    }
});

// Mobile menu for sticky nav - REMOVED (already handled above)

// Close sticky mobile menu when clicking outside - REMOVED (already handled above)

// Form Submission Handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.nav-dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// Auto slide every 4 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 4000);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Trip Type Toggle
document.querySelectorAll('.trip-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.trip-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Booking Form Handler - Hero Section
const heroBookingBtn = document.querySelector('.hero-form .booking-form .btn-primary');
if (heroBookingBtn) {
    heroBookingBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const pickupInput = document.querySelector('.hero-form .booking-form input[placeholder="Pickup Location"]');
        const dropInput = document.querySelector('.hero-form .booking-form input[placeholder="Drop Location"]');
        const datetimeInput = document.querySelector('.hero-form .booking-form input[type="datetime-local"]');
        const carTypeSelect = document.querySelector('.hero-form .booking-form select');
        
        if (pickupInput && dropInput && datetimeInput && carTypeSelect) {
            const from = pickupInput.value;
            const to = dropInput.value;
            const datetime = datetimeInput.value;
            const carType = carTypeSelect.value;
            
            if (from && to && datetime && carType !== 'Select Car Type') {
                alert(`Fare Quote Request!\nFrom: ${from}\nTo: ${to}\nDate & Time: ${new Date(datetime).toLocaleString()}\nCar Type: ${carType}\n\nEstimated fare will be sent via SMS/WhatsApp`);
            } else {
                alert('Please fill in all booking details.');
            }
        }
    });
}

// Quick Booking Form Handler - Rent Section
const quickBookingForm = document.querySelector('.rent-section .booking-form');
if (quickBookingForm) {
    quickBookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const pickup = this.querySelector('input[placeholder="Pickup Location"]').value;
        const drop = this.querySelector('input[placeholder="Drop Location"]').value;
        const date = this.querySelector('input[type="date"]').value;
        const time = this.querySelector('input[type="time"]').value;
        const carType = this.querySelector('select').value;
        
        if (pickup && drop && date && time && carType) {
            const message = `New Booking Request:\nPickup: ${pickup}\nDrop: ${drop}\nDate: ${date}\nTime: ${time}\nCar Type: ${carType}`;
            const whatsappUrl = `https://wa.me/918576000083?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            this.reset();
        } else {
            alert('Please fill all fields!');
        }
    });
}

// Scroll Animation for Service Cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Auto-update current year in footer
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.innerHTML = `&copy; ${currentYear} Taxiverz. All rights reserved.`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});


// Chatbot Functionality
document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    if (!chatbotToggle || !chatbotWindow) return;

// Toggle chatbot
chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
});

// Send message
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
        addMessage(message, 'user');
        chatbotInput.value = '';
        
        // Bot response
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }
}

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Bot responses
function getBotResponse(message) {
    const msg = message.toLowerCase();
    
    if (msg.includes('hello') || msg.includes('hi')) {
        return 'Hello! Welcome to Taxiverz. How can I help you today?';
    } else if (msg.includes('booking') || msg.includes('book')) {
        return 'To book a taxi, please call us at +91-8576000083 or use our booking form on the website.';
    } else if (msg.includes('price') || msg.includes('fare')) {
        return 'Our fares start from ₹8/km for local rides and ₹12/km for outstation trips. Contact us for exact quotes.';
    } else if (msg.includes('contact') || msg.includes('phone')) {
        return 'You can reach us at +91-8576000083 or email cabtaxiverz@gmail.com';
    } else if (msg.includes('service') || msg.includes('area')) {
        return 'We provide services in 500+ cities across India including local taxi, outstation, airport transfers, and car rentals.';
    } else if (msg.includes('thank')) {
        return 'You\'re welcome! Is there anything else I can help you with?';
    } else {
        return 'Thank you for your message. For detailed assistance, please call us at +91-8576000083 or email cabtaxiverz@gmail.com';
    }
}

});
// Simple Booking Modal Function
function openBookingModal(carName, carPrice) {
    const modal = document.getElementById('bookingModal');
    const modalTitle = document.querySelector('.modal-header h2');
    
    if (modal && modalTitle) {
        modalTitle.textContent = `Book ${carName} - ${carPrice}`;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.close');
    const bookingForm = document.querySelector('.booking-modal-form');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Prevent modal content clicks from closing modal
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = bookingForm.querySelector('input[placeholder="Your Name"]').value;
            const phone = bookingForm.querySelector('input[placeholder="Phone Number"]').value;
            
            if (name && phone) {
                alert(`Booking Request Submitted!\nName: ${name}\nPhone: ${phone}\n\nWe will contact you shortly.`);
                bookingForm.reset();
                closeModal();
            }
        });
    }
});