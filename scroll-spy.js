document.addEventListener('DOMContentLoaded', function() {
    // Get all sections that we want to track
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    
    function getCurrentSection() {
        let current = '';
        const scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // Adjust offset for header
            const sectionHeight = section.clientHeight;
            
            // Check if we're within the section
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        return current;
    }
    
    function updateActiveNavItem() {
        const currentSection = getCurrentSection();
        
        // Remove active class from all nav items
        navItems.forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('a');
            if (link) {
                const href = link.getAttribute('href').substring(1); // Remove the #
                if (href === currentSection) {
                    item.classList.add('active');
                }
            }
        });
    }
    
    // Add scroll event listener with throttling
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateActiveNavItem();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Update active nav item on page load
    updateActiveNavItem();
    
    // Update active nav item when clicking nav links
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    // Update active state after scroll
                    setTimeout(updateActiveNavItem, 100);
                }
            });
        }
    });
}); 