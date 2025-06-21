// FAQ Toggle Function
function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('ion-icon');
    
    // Toggle the content
    content.classList.toggle('hidden');
    
    // Rotate the icon
    if (content.classList.contains('hidden')) {
        icon.style.transform = 'rotate(0deg)';
    } else {
        icon.style.transform = 'rotate(180deg)';
    }
}

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

    // Highlight section based on URL hash
    function highlightSectionFromHash() {
        // Remove any existing highlights
        document.querySelectorAll('.highlighted-section').forEach(el => {
            el.classList.remove('highlighted-section');
            el.style.border = '';
        });

        // Check for hash in URL
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.classList.add('highlighted-section');
                targetElement.style.border = '3px solid #ff9933';
                targetElement.style.borderRadius = '0.5rem';
                targetElement.style.padding = '1rem';
                targetElement.style.transition = 'all 0.3s ease';
                
                // Smooth scroll to the element
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }

    // Run on page load and when hash changes
    highlightSectionFromHash();
    window.addEventListener('hashchange', highlightSectionFromHash);

    // Portfolio filtering functionality - only run if elements exist
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    const allPortfolioItems = document.querySelectorAll('.portfolio-item');

    // Only run portfolio filtering if we have both buttons and items
    if (filterButtons.length > 0 && allPortfolioItems.length > 0) {
        // Filter functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active classes from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-sport-purple', 'bg-sport-orange', 'text-white');
                    btn.classList.add('bg-white', 'text-gray-700');
                });
                
                // Add appropriate active class based on button type
                if (this.getAttribute('data-filter') === 'all') {
                    this.classList.remove('bg-white', 'text-gray-700');
                    this.classList.add('bg-sport-purple', 'text-white');
                } else {
                    this.classList.remove('bg-white', 'text-gray-700');
                    this.classList.add('bg-sport-orange', 'text-white');
                }
                
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
        
        // Initialize portfolio with "all" selected and set initial button colors
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-filter') === 'all') {
                btn.classList.remove('bg-white', 'text-gray-700');
                btn.classList.add('bg-sport-purple', 'text-white');
            } else {
                btn.classList.remove('bg-sport-orange', 'text-white');
                btn.classList.add('bg-white', 'text-gray-700');
            }
        });
        
        // Show all items initially
        portfolioItems.forEach(item => {
            item.style.display = 'block';
        });
        
        // Portfolio item hover effects - using CSS for hover instead
        // This ensures hover works regardless of filter state
        portfolioItems.forEach(item => {
            // Remove any existing mouseenter/mouseleave event listeners
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);
            
            // Add click handler for each portfolio item
            newItem.addEventListener('click', function(e) {
                // Prevent the click from bubbling up to parent elements
                e.stopPropagation();
                
                // Toggle a class to handle the overlay visibility on click
                const overlay = this.querySelector('.portfolio-overlay');
                if (overlay) {
                    overlay.classList.toggle('opacity-0');
                    overlay.classList.toggle('opacity-100');
                    
                    // Close other open overlays
                    portfolioItems.forEach(otherItem => {
                        if (otherItem !== this) {
                            const otherOverlay = otherItem.querySelector('.portfolio-overlay');
                            if (otherOverlay) {
                                otherOverlay.classList.add('opacity-0');
                                otherOverlay.classList.remove('opacity-100');
                            }
                        }
                    });
                }
            });
        });
    }



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