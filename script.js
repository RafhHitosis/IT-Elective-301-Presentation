document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const bgImages = document.querySelectorAll(".bg-image");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const progressBar = document.getElementById("progressBar");
  const currentSlideSpan = document.getElementById("currentSlide");
  const totalSlidesSpan = document.getElementById("totalSlides");

  let currentSlideIndex = 0;
  const totalSlides = slides.length;

  // Initialize
  totalSlidesSpan.textContent = totalSlides;
  updatePresentation();

  function updatePresentation() {
    // Update Slides
    slides.forEach((slide, index) => {
      if (index === currentSlideIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    // Update Background
    // Get the requested bg index from the slide
    const neededBgId = slides[currentSlideIndex].getAttribute("data-bg");

    bgImages.forEach((bg) => {
      // Check if this background div matches the needed ID (e.g. "bg-1")
      if (bg.id === `bg-${neededBgId}`) {
        bg.classList.add("active");
      } else {
        bg.classList.remove("active");
      }
    });

    // Update Progress Bar
    const progress = ((currentSlideIndex + 1) / totalSlides) * 100;
    progressBar.style.width = `${progress}%`;

    // Update Counter
    currentSlideSpan.textContent = currentSlideIndex + 1;

    // Button States opacity
    prevBtn.style.opacity = currentSlideIndex === 0 ? "0.3" : "1";
    nextBtn.style.opacity = currentSlideIndex === totalSlides - 1 ? "0.3" : "1";
  }

  function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
      currentSlideIndex++;
      updatePresentation();
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      updatePresentation();
    }
  }

  // Event Listeners for Click
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Keyboard Navigation
  document.addEventListener("keydown", (e) => {
    // Next
    if (
      e.key === "ArrowRight" ||
      e.key === " " ||
      e.key === "Enter" ||
      e.key === "PageDown"
    ) {
      e.preventDefault(); // Prevent scrolling if overflow exists
      nextSlide();
    }
    // Prev
    else if (
      e.key === "ArrowLeft" ||
      e.key === "Backspace" ||
      e.key === "PageUp"
    ) {
      e.preventDefault();
      prevSlide();
    }
    // Home/End
    else if (e.key === "Home") {
      currentSlideIndex = 0;
      updatePresentation();
    } else if (e.key === "End") {
      currentSlideIndex = totalSlides - 1;
      updatePresentation();
    }
  });

  // Touch Support (Swipe)
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    const threshold = 50; // min distance
    if (touchEndX < touchStartX - threshold) nextSlide();
    if (touchEndX > touchStartX + threshold) prevSlide();
  }
});
