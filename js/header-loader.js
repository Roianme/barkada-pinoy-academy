// header-loader.js
class HeaderLoader {
  constructor() {
    this.headerContainer = null;
    this.headerFile = '/header.html';
  }

  // Load header into the specified container
  loadHeader(containerId = 'header-container') {
    this.headerContainer = document.getElementById(containerId);
    
    if (!this.headerContainer) {
      console.error(`Header container with id '${containerId}' not found`);
      return;
    }

    fetch(this.headerFile)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        this.headerContainer.innerHTML = html;
        this.initializeHeader();
      })
      .catch(error => {
        console.error('Error loading header:', error);
        this.headerContainer.innerHTML = '<p>Error loading navigation</p>';
      });
  }

  // Initialize header functionality
  initializeHeader() {
    // Add active class to current page link
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