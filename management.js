// Current slide tracking
let currentSlide = {
  ceo: 0,
  coo: 0,
};

function changeSlide(position, direction) {
  const slides = document.querySelectorAll(`.${position}-slides .slide-image`);
  const totalSlides = slides.length;

  // Hide current slide
  slides[currentSlide[position]].classList.remove("active");

  // Calculate new slide index with looping
  currentSlide[position] =
    (currentSlide[position] + direction + totalSlides) % totalSlides;

  // Show new slide
  slides[currentSlide[position]].classList.add("active");
}

// Auto-advance slides every 3 seconds
function startAutoSlide() {
  setInterval(() => {
    changeSlide("ceo", 1);
    changeSlide("coo", 1);
  }, 4000);
}

// Initialize slideshow on page load
document.addEventListener("DOMContentLoaded", function () {
  // Set first slide as active for both slideshows
  const ceoSlides = document.querySelectorAll(".ceo-slides .slide-image");
  const cooSlides = document.querySelectorAll(".coo-slides .slide-image");

  if (ceoSlides.length > 0) ceoSlides[0].classList.add("active");
  if (cooSlides.length > 0) cooSlides[0].classList.add("active");

  // Start the auto-advance
  startAutoSlide();
});
