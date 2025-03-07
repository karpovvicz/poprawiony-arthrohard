let currentPage = 1;
let pageSize = 50;
let isLoading = false;
let hasMoreProducts = true; // Flag to track if more products are available

// Add scroll event listener
window.addEventListener('scroll', debounce(handleScroll, 200));

// Debounce function to limit scroll event firing
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

// Handle scroll event
function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    // Check if user has scrolled to bottom (with 200px threshold)
    if (scrollTop + clientHeight >= scrollHeight - 200) {
        if (!isLoading && hasMoreProducts) {
            currentPage++;
            fetchProducts();
        }
    }
}

document.getElementById('itemsPerPage').addEventListener('change', (e) => {
    pageSize = parseInt(e.target.value, 10);
    currentPage = 1;
    document.getElementById('productList').innerHTML = '';
    fetchProducts(true);
});

function fetchProducts(reset = false) {
    if (isLoading) return;
    isLoading = true;

    // Add loading indicator
    const productList = document.getElementById('productList');
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.innerHTML = 'Ładowanie...';
    productList.appendChild(loadingIndicator);

    fetch(`https://brandstestowy.smallhost.pl/api/random?pageNumber=${currentPage}&pageSize=${pageSize}`)
        .then(response => response.json())
        .then(data => {
            isLoading = false;
            loadingIndicator.remove();

            if (reset) {
                productList.innerHTML = '';
                currentPage = 1;
            }

            if (data && Array.isArray(data.data)) {
                if (data.data.length < pageSize) {
                    hasMoreProducts = false; // No more products to load
                }
                renderProducts(data.data, reset);
            } else {
                console.error('Unexpected API response format:', data);
                hasMoreProducts = false;
            }
        })
        .catch(err => {
            console.error('Error fetching products:', err);
            isLoading = false;
            loadingIndicator.remove();
            
            // Add error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.innerHTML = 'Nie udało się załadować produktów. Spróbuj ponownie później.';
            productList.appendChild(errorMessage);
        });
}

function renderProducts(products, reset = false) {
    const productList = document.getElementById('productList');
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerText = `ID: ${product.id}`;
        productElement.addEventListener('click', () => openPopup(product));
        productList.appendChild(productElement);
    });
}

function openPopup(product) {
    document.getElementById('popupId').innerText = product.id || 'ID';
    document.getElementById('popupName').innerText = product.name || 'ID';
    document.getElementById('popupPrice').innerText = product.price ? `$${product.price}` : 'Wartość:';
    document.getElementById('popupOverlay').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
}

fetchProducts(true);

// Create a base Component class
class Component {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        // Base initialization
    }

    render() {
        // Base render method
    }
}

// Feature Card Component
class FeatureCard extends Component {
    constructor(element, data) {
        super(element);
        this.data = data;
    }

    render() {
        return `
            <div class="feature-card-content">
                <h3>${this.data.title}</h3>
                <p>${this.data.description}</p>
            </div>
            <img src="${this.data.image}" alt="${this.data.title}">
        `;
    }
}

// Navigation Component
class Navigation extends Component {
    constructor(element) {
        super(element);
        this.bindEvents();
    }

    bindEvents() {
        // Handle navigation events
    }
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    const nav = new Navigation(document.querySelector('.main-nav'));
    
    // Hamburger menu functionality
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', toggleMenu);
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Close menu when clicking a link
        const navLinks = navMenu.getElementsByTagName('a');
        Array.from(navLinks).forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
                // Small delay to allow the animation to complete
                setTimeout(() => {
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 300);
            });
        });

        // Close menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });
    }
    
    function toggleMenu() {
        const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
        hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Prevent body scroll when menu is open
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    }
    
    function closeMenu() {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
        // Restore body scroll
        document.body.style.overflow = '';
    }

    // Feature cards data
    const featureCardsData = [
        {
            title: 'Innowacyjny dodatek - Czarciego Pazura',
            description: 'Zapewnia dodatkowe wsparcie w zwalczaniu stanów bólowych...',
            image: '/assets/images/photography/shutterstock_1770486131 1.png'
        },
        // Add other feature cards data
    ];

    // Initialize feature cards
    const featureCards = featureCardsData.map(data => 
        new FeatureCard(document.createElement('div'), data)
    );
});

// Add some CSS for loading indicator
const style = document.createElement('style');
style.textContent = `
    .loading-indicator {
        text-align: center;
        padding: 20px;
        width: 100%;
        color: #666;
    }

    .error-message {
        text-align: center;
        padding: 20px;
        color: #ff0000;
        width: 100%;
    }
`;
document.head.appendChild(style);
