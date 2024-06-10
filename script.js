const carousel = document.querySelector('.carousel');
          const images = document.querySelectorAll('.carousel img');
          let currentIndex = 0;
          let startX = 0;
          let isDragging = false;
          let autoSlideInterval;
      
          const updateCarousel = () => {
            carousel.style.transform = `translateX(${-currentIndex * 100}%)`;
          };
      
          const startAutoSlide = () => {
            autoSlideInterval = setInterval(() => {
              currentIndex = (currentIndex + 1) % images.length;
              updateCarousel();
            }, 3000);
          };
      
          const stopAutoSlide = () => {
            clearInterval(autoSlideInterval);
          };
      
          const handleNext = () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
            stopAutoSlide();
            startAutoSlide();
          };
      
          const handlePrev = () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateCarousel();
            stopAutoSlide();
            startAutoSlide();
          };
      
          document.getElementById('nextBtn').addEventListener('click', handleNext);
          document.getElementById('prevBtn').addEventListener('click', handlePrev);
      
          const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoSlide();
          };
      
          const handleTouchMove = (e) => {
            if (!isDragging) return;
            const currentX = e.touches[0].clientX;
            const diffX = startX - currentX;
            carousel.style.transform = `translateX(${-currentIndex * 100 - diffX / window.innerWidth * 100}%)`;
          };
      
          const handleTouchEnd = (e) => {
            if (!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            if (diffX > 50) {
              handleNext();
            } else if (diffX < -50) {
              handlePrev();
            } else {
              updateCarousel();
            }
            isDragging = false;
          };
      
          carousel.addEventListener('touchstart', handleTouchStart);
          carousel.addEventListener('touchmove', handleTouchMove);
          carousel.addEventListener('touchend', handleTouchEnd);
      
          document.addEventListener('DOMContentLoaded', () => {
            startAutoSlide();
          });