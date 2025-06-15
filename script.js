document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = menuButton?.querySelector('ion-icon');
    let isMenuOpen = false;

    // Function to close the menu
    function closeMenu() {
        isMenuOpen = false;
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            mobileMenu.style.opacity = '0';
            mobileMenu.style.visibility = 'hidden';
        }
        if (menuIcon) {
            menuIcon.setAttribute('name', 'menu-outline');
        }
        document.removeEventListener('click', handleClickOutside);
    }

    // Function to open the menu
    function openMenu() {
        isMenuOpen = true;
        if (mobileMenu) {
            mobileMenu.classList.add('active');
            mobileMenu.style.opacity = '1';
            mobileMenu.style.visibility = 'visible';
        }
        if (menuIcon) {
            menuIcon.setAttribute('name', 'close-outline');
        }
        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 10);
    }

    // Handle clicks outside the menu
    function handleClickOutside(e) {
        if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMenu();
        }
    }

    // Toggle menu on button click
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when clicking on menu links
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
    }


    // Close menu when window is resized to desktop
    function handleResize() {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    }

    window.addEventListener('resize', handleResize);

    // Portfolio filtering functionality - only run if elements exist
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Only run portfolio filtering if we have both buttons and items
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        // Filter functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('bg-sport-purple', 'text-white'));
                // Add active class to clicked button
                this.classList.add('bg-sport-purple', 'text-white');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    const categories = item.getAttribute('data-categories').split(' ');
                    
                    if (filterValue === 'all' || categories.includes(filterValue)) {
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
        const allFilterButton = document.querySelector('[data-filter="all"]');
        if (allFilterButton) {
            allFilterButton.click();
        }
        
        // Portfolio item hover effects
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
    }

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