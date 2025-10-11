// header-loader.js
class HeaderLoader {
  constructor() {
    this.headerContainer = null;
    this.headerFile = '/barkada-pinoy-academy/header.html';
  }
  
  // Load header into the specified container
  loadHeader(containerId = 'header-container') {
    this.headerContainer = document.getElementById(containerId);
    
    if (!this.headerContainer) {
      console.error(`Header container with id '${containerId}' not found`);
      return;
    }

    // Hide the header container until loaded to prevent flash
    this.headerContainer.style.opacity = '0';
    this.headerContainer.style.transition = 'opacity 0.3s ease';

    fetch(this.headerFile, { cache: 'no-cache' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        // Inject header HTML
        this.headerContainer.innerHTML = html;
        
        // Initialize header logic
        this.initializeHeader();

        // Fade in smoothly after content is ready
        requestAnimationFrame(() => {
          this.headerContainer.style.opacity = '1';
        });
      })
      .catch(error => {
        console.error('Error loading header:', error);
        this.headerContainer.innerHTML = '<p>Error loading navigation</p>';
        this.headerContainer.style.opacity = '1'; // ensure visibility even if error
      });
  }

  // Initialize header functionality
  initializeHeader() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = this.headerContainer.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPage || 
          (currentPage === 'index.html' && linkHref === '/index')) {
        link.classList.add('active');
      }
    });
  }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const headerLoader = new HeaderLoader();
  headerLoader.loadHeader();
});
