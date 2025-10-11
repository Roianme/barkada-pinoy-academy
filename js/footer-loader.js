// footer-loader.js
class FooterLoader {
  constructor() {
    this.footerContainer = null;
    this.footerFile = 'footer.html';
  }

  // Load footer into the specified container
  loadfooter(containerId = 'footer-container') {
    this.footerContainer = document.getElementById(containerId);
    
    if (!this.footerContainer) {
      console.error(`footer container with id '${containerId}' not found`);
      return;
    }

    // Hide the footer container until loaded to prevent flash
    this.footerContainer.style.opacity = '0';
    this.footerContainer.style.transition = 'opacity 0.3s ease';

    fetch(this.footerFile, { cache: 'no-cache' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        // Inject footer HTML
        this.footerContainer.innerHTML = html;
        
        // Initialize footer logic
        this.initializefooter();

        // Fade in smoothly after content is ready
        requestAnimationFrame(() => {
          this.footerContainer.style.opacity = '1';
        });
      })
      .catch(error => {
        console.error('Error loading footer:', error);
        this.footerContainer.innerHTML = '<p>Error loading navigation</p>';
        this.footerContainer.style.opacity = '1'; // ensure visibility even if error
      });
  }

  // Initialize footer functionality
  initializefooter() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = this.footerContainer.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPage || 
          (currentPage === 'index.html' && linkHref === 'index')) {
        link.classList.add('active');
      }
    });
  }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const footerLoader = new FooterLoader();
  footerLoader.loadfooter();
});
