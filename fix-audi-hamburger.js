const fs = require('fs');
const files = ['audi-a4.html', 'audi-a6.html', 'audi-a8.html', 'audi-q3.html', 'audi-q5.html', 'audi-q7.html', 'bmw-320d.html', 'bmw-520.html', 'bmw-mz-convertible.html', 'bmw-x1.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add hamburger CSS
    content = content.replace(
        '.nav-links a:hover { color: var(--primary); }',
        `.nav-links a:hover { color: var(--primary); }
        .nav-toggle { display: none; flex-direction: column; cursor: pointer; }
        .nav-toggle .bar { width: 25px; height: 3px; background: var(--primary); margin: 3px 0; transition: 0.3s; }
        .nav-toggle.active .bar:nth-child(1) { transform: rotate(-45deg) translate(-5px, 6px); }
        .nav-toggle.active .bar:nth-child(2) { opacity: 0; }
        .nav-toggle.active .bar:nth-child(3) { transform: rotate(45deg) translate(-5px, -6px); }`
    );
    
    // Update media query
    content = content.replace(
        '@media (max-width: 768px) { .hero-grid, .specs-grid, .pricing-cards, .features-grid, .footer-content { grid-template-columns: 1fr; } .hero h1 { font-size: 2rem; } .nav-links { display: none; } }',
        `@media (max-width: 768px) { .hero-grid, .specs-grid, .pricing-cards, .features-grid, .footer-content { grid-template-columns: 1fr; } .hero h1 { font-size: 2rem; } .nav-toggle { display: flex; } .nav-links { position: fixed; left: -100%; top: 70px; flex-direction: column; background: var(--dark); width: 200px; padding: 1rem; transition: 0.3s; box-shadow: 0 5px 15px rgba(0,0,0,0.3); z-index: 999; } .nav-links.active { left: 0; } .nav-links a { padding: 0.8rem; border-bottom: 1px solid var(--grey); } }`
    );
    
    // Add hamburger HTML
    content = content.replace(
        `                <div class="nav-links">
                    <a href="index.html">Home</a>
                    <a href="car-rental.html">Car Rental</a>
                    <a href="wedding.html">Wedding Cars</a>
                    <a href="contact.html">Contact</a>
                </div>`,
        `                <div class="nav-links" id="nav-menu">
                    <a href="index.html">Home</a>
                    <a href="car-rental.html">Car Rental</a>
                    <a href="wedding.html">Wedding Cars</a>
                    <a href="contact.html">Contact</a>
                </div>
                <div class="nav-toggle" id="mobile-menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>`
    );
    
    // Add JavaScript
    content = content.replace(
        `        document.addEventListener('DOMContentLoaded', function() {
            const fadeElements = document.querySelectorAll('.scroll-fade');
            fadeElements.forEach(el => observer.observe(el));
        });`,
        `        document.addEventListener('DOMContentLoaded', function() {
            const fadeElements = document.querySelectorAll('.scroll-fade');
            fadeElements.forEach(el => observer.observe(el));
            const mobileMenu = document.getElementById('mobile-menu');
            const navMenu = document.getElementById('nav-menu');
            if (mobileMenu && navMenu) {
                mobileMenu.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.classList.toggle('active');
                    navMenu.classList.toggle('active');
                });
                document.addEventListener('click', function(e) {
                    if (!navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
                        navMenu.classList.remove('active');
                        mobileMenu.classList.remove('active');
                    }
                });
            }
        });`
    );
    
    fs.writeFileSync(file, content);
    console.log(`Fixed: ${file}`);
});
