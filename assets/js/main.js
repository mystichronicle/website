/**
* Template Name: Personal
* Updated: Jul 27 2023 with Bootstrap v5.3.1
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scroll with offset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function (e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function () {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function () {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  // Button visibility control
  document.addEventListener("DOMContentLoaded", function () {
    const viewCliBtn = document.querySelector('.view-cli-btn');
    
    if (!viewCliBtn) return; 

    // CLI button click handler
    viewCliBtn.addEventListener('click', function() {
      window.open('https://mystichronicle.github.io', '_blank', 'noopener,noreferrer');
    });

    // Hide button when navigating to sections
    const sections = ['#resume', '#projects', '#contact'];

    function hideButton() {
      if (viewCliBtn) {
        viewCliBtn.style.display = 'none';
      }
    }

    function showButton() {
      if (viewCliBtn) {
        viewCliBtn.style.display = 'block';
      }
    }

    // Event listeners to navigation links
    sections.forEach(section => {
      const navLink = document.querySelector(`a[href="${section}"]`);
      if (navLink) {
        navLink.addEventListener('click', hideButton);
      }
    });

    // Event listener for Home button
    const homeLink = document.querySelector('a[href="#header"]');
    if (homeLink) {
      homeLink.addEventListener('click', showButton);
    }
  });

  /**
   * Fetch and display GitHub projects
   */
  async function fetchProjects() {
    const projectContainer = document.getElementById("projects-grid");
    if (!projectContainer) return;

    // Show loading state
    projectContainer.innerHTML = '<p style="text-align: center; color: #aaa;">Loading projects...</p>';

    try {
      const response = await fetch(
        "https://api.github.com/users/mystichronicle/repos?per_page=150&sort=created&direction=desc"
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const repos = await response.json();
      
      if (!repos || repos.length === 0) {
        projectContainer.innerHTML = '<p style="text-align: center; color: #aaa;">No projects found.</p>';
        return;
      }

      displayProjects(repos);
      
      const searchInput = document.getElementById("search");
      if (searchInput) {
        searchInput.addEventListener("input", function () {
          filterProjects(repos, searchInput.value);
        });
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      projectContainer.innerHTML = '<p style="text-align: center; color: #ff6b6b;">Failed to load projects. Please try again later.</p>';
    }
  }

  function displayProjects(repos) {
    const projectContainer = document.getElementById("projects-grid");
    if (!projectContainer) return;
    
    if (!repos || repos.length === 0) {
      projectContainer.innerHTML = '<p style="text-align: center; color: #aaa;">No projects found.</p>';
      return;
    }

    projectContainer.innerHTML = "";
    repos.forEach((repo) => {
      const projectElement = document.createElement("div");
      projectElement.className = "project";
      
      // Escape HTML to prevent XSS
      const escapedName = escapeHtml(repo.name);
      const escapedDescription = escapeHtml(repo.description || "No description available.");
      const escapedUrl = escapeHtml(repo.html_url);
      
      projectElement.innerHTML = `
        <h3>${escapedName}</h3>
        <p>${escapedDescription}</p>
        <a href="${escapedUrl}" target="_blank" rel="noopener noreferrer">
          View Project <i class="fas fa-external-link-alt"></i>
        </a>
      `;
      projectContainer.appendChild(projectElement);
    });
  }

  function filterProjects(repos, query) {
    const filteredRepos = repos.filter((repo) =>
      repo.name.toLowerCase().includes(query.toLowerCase())
    );
    displayProjects(filteredRepos);
  }

  /**
   * Escape HTML to prevent XSS attacks
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Initialize Typed.js for typewriter effect
   */
  document.addEventListener("DOMContentLoaded", () => {
    // Fetch GitHub projects
    fetchProjects();

    // Typed.js initialization for typewriter effect
    if (typeof Typed !== 'undefined' && document.querySelector(".typewriter-name")) {
      new Typed(".typewriter-name", {
        strings: ["Hi, This is Debjit"],
        typeSpeed: 100,
        backSpeed: 50,
        loop: false,
        showCursor: true,
        cursorChar: "|",
        startDelay: 500,
        onComplete: function (self) {
          // Hides the cursor when typing is done
          self.cursor.style.display = "none";
        },
      });
    }
  });

})()
