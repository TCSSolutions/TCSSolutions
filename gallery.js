// Gallery functionality
document.addEventListener("DOMContentLoaded", function () {
  initGallery();
  initLightbox();
});

function initGallery() {
  const galleryGrid = document.getElementById("gallery-grid");

  // Gallery items data with actual image paths
  const galleryItems = [];

  // Generate 16 gallery items with your image paths
  for (let i = 1; i <= 32; i++) {
    galleryItems.push({
      id: i,
      imagePath: `pictures/gallery_page/gallery-image-${i}.webp`,
      title: `Gallery Image ${i}`,
    });
  }

  // Create gallery items
  galleryItems.forEach((item) => {
    const galleryItem = createGalleryItem(item);
    galleryGrid.appendChild(galleryItem);
  });
}

function createGalleryItem(item) {
  const div = document.createElement("div");
  div.className = "gallery-item fade-in";
  div.dataset.imagePath = item.imagePath;
  div.dataset.imageIndex = item.id - 1; // 0-based index for navigation

  div.innerHTML = `
    <img src="${item.imagePath}" alt="${item.title}" class="gallery-thumbnail" loading="lazy">
  `;

  return div;
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  let currentImageIndex = 0;
  let totalImages = 32;

  // Create navigation arrows
  const prevArrow = document.createElement("button");
  prevArrow.className = "lightbox-nav lightbox-prev";
  prevArrow.innerHTML = "&#8249;";
  prevArrow.setAttribute("aria-label", "Previous image");

  const nextArrow = document.createElement("button");
  nextArrow.className = "lightbox-nav lightbox-next";
  nextArrow.innerHTML = "&#8250;";
  nextArrow.setAttribute("aria-label", "Next image");

  // Add arrows to lightbox content
  const lightboxContent = document.querySelector(".lightbox-content");
  lightboxContent.appendChild(prevArrow);
  lightboxContent.appendChild(nextArrow);

  // Function to show image at specific index
  function showImage(index) {
    currentImageIndex = index;
    const imagePath = `pictures/gallery_page/gallery-image-${index + 1}.webp`;
    lightboxImage.src = imagePath;
    lightboxImage.alt = `Gallery Image ${index + 1}`;

    // Remove caption since you don't want descriptions
    lightboxCaption.style.display = "none";

    // Update navigation button states
    prevArrow.style.opacity = index === 0 ? "0.5" : "1";
    nextArrow.style.opacity = index === totalImages - 1 ? "0.5" : "1";
  }

  // Add click event to gallery items
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      showImage(index);
      lightbox.style.display = "block";
    });
  });

  // Navigation arrow events
  prevArrow.addEventListener("click", function (e) {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      showImage(currentImageIndex - 1);
    }
  });

  nextArrow.addEventListener("click", function (e) {
    e.stopPropagation();
    if (currentImageIndex < totalImages - 1) {
      showImage(currentImageIndex + 1);
    }
  });

  // Close lightbox
  lightboxClose.addEventListener("click", function () {
    lightbox.style.display = "none";
  });

  // Close lightbox when clicking outside image
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (lightbox.style.display === "block") {
      switch (e.key) {
        case "Escape":
          lightbox.style.display = "none";
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (currentImageIndex > 0) {
            showImage(currentImageIndex - 1);
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          if (currentImageIndex < totalImages - 1) {
            showImage(currentImageIndex + 1);
          }
          break;
      }
    }
  });
}
