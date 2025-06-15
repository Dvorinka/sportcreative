document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuButton = document.querySelector('.md\\:hidden button');
    const mobileMenu = document.querySelector('.mobile-menu');
    let isMenuOpen = false;
    
    if (menuButton && mobileMenu) {
        // Initialize menu state
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('block', 'slide-in', 'slide-out');
        
        menuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                // Opening menu
                mobileMenu.classList.remove('hidden', 'slide-out');
                mobileMenu.classList.add('block', 'slide-in');
                // Add click outside listener
                document.addEventListener('click', closeMenuOnClickOutside);
            } else {
                // Closing menu
                mobileMenu.classList.remove('slide-in');
                mobileMenu.classList.add('slide-out');
                // Remove click outside listener
                document.removeEventListener('click', closeMenuOnClickOutside);
                // Hide after animation
                setTimeout(() => {
                    if (!isMenuOpen) {  // Check again in case state changed
                        mobileMenu.classList.add('hidden');
                        mobileMenu.classList.remove('block');
                    }
                }, 300);
            }
        });
        
        // Close menu when clicking outside
        function closeMenuOnClickOutside(e) {
            if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
                isMenuOpen = false;
                mobileMenu.classList.remove('slide-in');
                mobileMenu.classList.add('slide-out');
                document.removeEventListener('click', closeMenuOnClickOutside);
                // Hide after animation
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('block');
                }, 300);
            }
        }
    }

    // Get all filter buttons and portfolio items
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Add click event to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-sport-purple', 'text-white');
                btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
            });
            
            // Add active class to clicked button
            this.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');
            this.classList.add('bg-sport-purple', 'text-white');
            
            // Get selected filter category
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide portfolio items based on filter
            portfolioItems.forEach(item => {
                // If "all" is selected or item has the selected category
                if (filterValue === 'all' || item.getAttribute('data-categories').includes(filterValue)) {
                    item.style.display = 'block';
                    // Add animation class
                    item.classList.add('animate-fade-in');
                    setTimeout(() => {
                        item.classList.remove('animate-fade-in');
                    }, 500);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Initialize portfolio with "all" selected
    document.querySelector('[data-filter="all"]').click();
    
    // Additional functionality: Portfolio item hover effects
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.classList.remove('opacity-0');
                overlay.classList.add('opacity-100');
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.classList.remove('opacity-100');
                overlay.classList.add('opacity-0');
            }
        });
    });

    // Enhanced button hover effects - limited to actual buttons
    const buttons = document.querySelectorAll('button:not(.portfolio-filter-btn), .btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const x = e.pageX - this.offsetLeft;
            const y = e.pageY - this.offsetTop;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 1000);
        });
    });

    // Back to top functionality with smooth show/hide
    const backToTop = document.getElementById('backToTop');
    let lastScrollPosition = 0;
    let ticking = false;

    window.addEventListener('scroll', function() {
        lastScrollPosition = window.pageYOffset;

        if (!ticking) {
            window.requestAnimationFrame(function() {
                if (lastScrollPosition > 300) {
                    backToTop.classList.remove('opacity-0', 'invisible');
                    backToTop.classList.add('opacity-100', 'visible');
                } else {
                    backToTop.classList.add('opacity-0', 'invisible');
                    backToTop.classList.remove('opacity-100', 'visible');
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});