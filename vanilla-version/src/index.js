class ProjectCarousel {
    constructor() {
      this.currentIndex = 0;
      this.projects = [];
      this.cardsPerView = 3;
      this.projectImages = {};
      this.isLoading = true;
      this.hasError = false;
    }
  
    async init() {
      try {
        // First load the image mappings
        await this.loadProjectImages();
        // Then fetch GitHub projects
        await this.fetchGitHubProjects();
      } catch (error) {
        this.showError();
      }
    }
  
    async loadProjectImages() {
      try {
        const response = await fetch('/projectImages.json');
        this.projectImages = await response.json();
      } catch (error) {
        console.error('Error loading project images:', error);
        // Use default images if image mapping fails
        this.projectImages = {};
      }
    }
  
    showLoading() {
      this.isLoading = true;
      document.querySelector('.loading-state').classList.remove('hidden');
      document.querySelector('.error-state').classList.add('hidden');
      document.querySelector('.project-carousel').classList.add('hidden');
    }
  
    hideLoading() {
      this.isLoading = false;
      document.querySelector('.loading-state').classList.add('hidden');
      document.querySelector('.project-carousel').classList.remove('hidden');
    }
  
    showError() {
      this.hasError = true;
      document.querySelector('.loading-state').classList.add('hidden');
      document.querySelector('.error-state').classList.remove('hidden');
      document.querySelector('.project-carousel').classList.add('hidden');
    }
  
    async fetchGitHubProjects() {
      this.showLoading();
  
      try {
        const response = await fetch('https://api.github.com/users/YOUR_USERNAME/repos');
        if (!response.ok) {
          throw new Error('GitHub API request failed');
        }
  
        const repos = await response.json();
        
        this.projects = repos.map(repo => ({
          name: repo.name,
          description: repo.description || 'No description available',
          repoUrl: repo.html_url,
          homepage: repo.homepage,
          topics: repo.topics || [],
          image: this.projectImages[repo.name]?.image || '/images/projects/default.jpg',
          alt: this.projectImages[repo.name]?.alt || repo.name
        }));
  
        this.hideLoading();
        this.renderProjects();
        this.updateNavigationButtons();
      } catch (error) {
        console.error('Error fetching projects:', error);
        this.showError();
      }
    }
  
    renderProjects() {
      const carousel = document.querySelector('.project-carousel');
      carousel.innerHTML = '';
  
      this.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <div class="project-image">
            <img src="${project.image}" 
                 alt="${project.alt}"
                 onerror="this.src='/images/projects/default.jpg'">
            <div class="project-overlay">
              <a href="${project.repoUrl}" class="repo-link" target="_blank">View Repository</a>
              ${project.homepage ? `<a href="${project.homepage}" class="launch-link" target="_blank">Launch Project</a>` : ''}
            </div>
          </div>
          <div class="project-content">
            <h3 class="project-title">${project.name}</h3>
            <p class="project-description">${project.description}</p>
            <div class="tech-stack">
              ${project.topics.map(topic => `<span>${topic}</span>`).join('')}
            </div>
          </div>
        `;
        carousel.appendChild(card);
      });
    }
  
    updateNavigationButtons() {
      const prevButton = document.querySelector('.carousel-button.prev');
      const nextButton = document.querySelector('.carousel-button.next');
      
      prevButton.disabled = this.currentIndex === 0;
      nextButton.disabled = this.currentIndex >= this.projects.length - this.cardsPerView;
    }
  
    navigate(direction) {
      if (this.isLoading || this.hasError) return;
  
      const carousel = document.querySelector('.project-carousel');
      const cardWidth = carousel.querySelector('.project-card').offsetWidth + 30;
      
      if (direction === 'next') {
        this.currentIndex = Math.min(this.currentIndex + this.cardsPerView, this.projects.length - this.cardsPerView);
      } else {
        this.currentIndex = Math.max(this.currentIndex - this.cardsPerView, 0);
      }
  
      carousel.scrollTo({
        left: this.currentIndex * cardWidth,
        behavior: 'smooth'
      });
  
      this.updateNavigationButtons();
    }
  }
  
  // Initialize
  const carousel = new ProjectCarousel();
  carousel.init();
  
  // Event Listeners
  document.querySelector('.prev').addEventListener('click', () => carousel.navigate('prev'));
  document.querySelector('.next').addEventListener('click', () => carousel.navigate('next'));
  document.querySelector('.retry-button').addEventListener('click', () => carousel.init());