// Partnership data - Add your partners here
const partnerships = [
  {
    name: "The Montalbán Theatre - Hollywood",
    logo: "pictures/home_page/partnership-logos/themontalban.webp",
    website: "https://www.themontalban.com",
  },
  // Add more partnerships as needed:
  // {
  //   name: "Partner Company 2",
  //   logo: "pictures/home_page/partnership-logos/partner2.webp",
  //   website: "link"
  // }
];

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavigation();
  initHeroSlideshow();
  initCurrentYear();
  initActiveNavigation();
  initIOSDetection();
  initPartnerships();
});

// Detect iOS devices and add class
function initIOSDetection() {
  function detectIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  if (detectIOS()) {
    document.body.classList.add("ios-device");
  }
}

// Hero background slideshow functionality
function initHeroSlideshow() {
  const slides = document.querySelectorAll(".hero-slide");
  const heroSection = document.querySelector(".hero");

  if (slides.length === 0 || !heroSection) return; // Exit if no slides found

  let currentSlide = 0;
  let slideshowInterval;

  function showSlide(index) {
    // Remove active class from all slides
    slides.forEach((slide) => slide.classList.remove("active"));

    // Add active class to current slide
    slides[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function startSlideshow() {
    // Only start slideshow on larger screens
    if (window.innerWidth > 768) {
      showSlide(0);
      slideshowInterval = setInterval(nextSlide, 4000);
      // Remove mobile background when slideshow is active
      heroSection.style.backgroundImage = "";
    } else {
      // Set static background for mobile
      setMobileBackground();
    }
  }

  function stopSlideshow() {
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      slideshowInterval = null;
    }
  }

  function setMobileBackground() {
    // Set the mobile background image
    heroSection.style.backgroundImage =
      "url('pictures/phone_home_page/phone-home-page-1.webp')";
    heroSection.style.backgroundSize = "cover";
    heroSection.style.backgroundPosition = "center";
    heroSection.style.backgroundRepeat = "no-repeat";
  }

  // Check screen size and start/stop slideshow accordingly
  function handleResize() {
    if (window.innerWidth <= 768) {
      stopSlideshow();
      setMobileBackground();
    } else {
      heroSection.style.backgroundImage = ""; // Clear mobile background
      if (!slideshowInterval) {
        startSlideshow();
      }
    }
  }

  // Initial setup
  startSlideshow();

  // Listen for window resize
  window.addEventListener("resize", handleResize);
}

// Navigation functionality
function initNavigation() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");

      // Animate hamburger
      const bars = navToggle.querySelectorAll(".bar");
      bars.forEach((bar, index) => {
        if (navMenu.classList.contains("active")) {
          if (index === 0)
            bar.style.transform = "rotate(45deg) translate(6.5px, 6.5px)";
          if (index === 1) bar.style.opacity = "0";
          if (index === 2)
            bar.style.transform = "rotate(-45deg) translate(7px, -6px)";
        } else {
          bar.style.transform = "none";
          bar.style.opacity = "1";
        }
      });
    });

    // Close menu when clicking on links
    const navLinks = navMenu.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        const bars = navToggle.querySelectorAll(".bar");
        bars.forEach((bar) => {
          bar.style.transform = "none";
          bar.style.opacity = "1";
        });
      });
    });
  }
}

// Initialize partnerships section
function initPartnerships() {
  const partnershipsGrid = document.getElementById("partnerships-grid");

  if (!partnershipsGrid || partnerships.length === 0) {
    // Hide the entire partnerships section if no partners
    const partnershipsSection = document.querySelector(".partnerships");
    if (partnershipsSection) {
      partnershipsSection.style.display = "none";
    }
    return;
  }

  // Clear existing content
  partnershipsGrid.innerHTML = "";

  // Generate partnership items
  partnerships.forEach((partner) => {
    const partnershipItem = document.createElement("a");
    partnershipItem.href = partner.website;
    partnershipItem.target = "_blank";
    partnershipItem.rel = "noopener noreferrer";
    partnershipItem.className = "partnership-item";
    partnershipItem.setAttribute("aria-label", `Visit ${partner.name} website`);

    const img = document.createElement("img");
    img.src = partner.logo;
    img.alt = partner.name;
    img.loading = "lazy";

    // Handle image loading errors
    img.onerror = function () {
      console.warn(`Failed to load partnership logo: ${partner.logo}`);
      this.style.display = "none";
      partnershipItem.style.display = "none";
    };

    partnershipItem.appendChild(img);
    partnershipsGrid.appendChild(partnershipItem);
  });
}

// Animation on scroll (commented out from original)
//function initAnimations() {
//  const observerOptions = {
//    threshold: 0.1,
//    rootMargin: "0px 0px -50px 0px",
//  };

//  const observer = new IntersectionObserver(function (entries) {
//    entries.forEach((entry) => {
//      if (entry.isIntersecting) {
//        entry.target.classList.add("animate");
//      }
//    });
//  }, observerOptions);

// Observe all elements with fade-in class
//  const animatedElements = document.querySelectorAll(".fade-in");
//  animatedElements.forEach((el) => observer.observe(el));

// Add fade-in class to sections on page load
//  const sections = document.querySelectorAll("section");
//  sections.forEach((section) => {
//    section.classList.add("fade-in");
//  });
//}

// Set current year in footer
function initCurrentYear() {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// This was in your original code as a standalone call - keeping it for safety
// but it's also handled in initCurrentYear() function
document.addEventListener("DOMContentLoaded", function () {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// Set active navigation link
function initActiveNavigation() {
  // Get current page filename
  let currentPage = window.location.pathname.split("/").pop();

  // Handle empty or root cases
  if (currentPage === "" || currentPage === "/") {
    currentPage = "index.html";
  }

  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    // Remove active class from all links first
    link.classList.remove("active");

    const linkHref = link.getAttribute("href");

    // Check if this link matches the current page
    if (linkHref === currentPage) {
      link.classList.add("active");
    }
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = "rgba(10, 10, 10, 0.98)";
    } else {
      navbar.style.backgroundColor = "rgba(10, 10, 10, 0.95)";
    }
  }
});

// Form validation utilities (for contact page)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[\+]?[1-9][\d]{0,15}$/;
  return re.test(phone);
}

// Utility functions for other pages
window.TCSUtils = {
  validateEmail,
  validatePhone,
  initSmoothScrolling,
};
