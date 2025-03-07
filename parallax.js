document.addEventListener('DOMContentLoaded', function() {
    // Elements that will have parallax effect
    const heroImage = document.querySelector('.hero-image');
    const featureImages = document.querySelectorAll('.feature-card img');
    const dogShowcase = document.querySelector('.dog-image');
    const ingredientsImage = document.querySelector('.product-image img');

    // Drastically reduced speed multipliers for very subtle effect
    const HERO_SPEED = 0.03;
    const FEATURES_SPEED = 0.02;
    const DOG_SPEED = 0.025;
    const INGREDIENTS_SPEED = 0.015;

    // Handle scroll event with throttling for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;

                // Parallax effect for hero section
                if (heroImage) {
                    const heroOffset = scrolled * HERO_SPEED;
                    heroImage.style.transform = `translateY(${heroOffset}px)`;
                }

                // Parallax effect for feature images
                featureImages.forEach(img => {
                    const rect = img.getBoundingClientRect();
                    const elemTop = rect.top + scrolled;
                    const elemInView = scrolled >= elemTop - window.innerHeight;
                    
                    if (elemInView) {
                        const featureOffset = (scrolled - elemTop + window.innerHeight) * FEATURES_SPEED;
                        img.style.transform = `translateY(${featureOffset}px)`;
                    }
                });

                // Parallax effect for dog showcase
                if (dogShowcase) {
                    const rect = dogShowcase.getBoundingClientRect();
                    const elemTop = rect.top + scrolled;
                    const elemInView = scrolled >= elemTop - window.innerHeight;
                    
                    if (elemInView) {
                        const dogOffset = (scrolled - elemTop + window.innerHeight) * DOG_SPEED;
                        dogShowcase.style.transform = `translateY(${dogOffset}px)`;
                    }
                }

                // Parallax effect for ingredients product image
                if (ingredientsImage) {
                    const rect = ingredientsImage.getBoundingClientRect();
                    const elemTop = rect.top + scrolled;
                    const elemInView = scrolled >= elemTop - window.innerHeight;
                    
                    if (elemInView) {
                        const ingredientsOffset = (scrolled - elemTop + window.innerHeight) * INGREDIENTS_SPEED;
                        ingredientsImage.style.transform = `translateY(${ingredientsOffset}px)`;
                    }
                }

                ticking = false;
            });

            ticking = true;
        }
    });

    // Add smoother transitions to elements
    const parallaxElements = [heroImage, ...featureImages, dogShowcase, ingredientsImage];
    parallaxElements.forEach(elem => {
        if (elem) {
            elem.style.transition = 'transform 0.4s cubic-bezier(0.33, 1, 0.68, 1)';
        }
    });
}); 