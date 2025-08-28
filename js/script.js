/* Carrusel */
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
let currentIndex = 0;

function updateCarousel() {
  const width = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * width}px)`;
}

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

window.addEventListener('resize', updateCarousel);

/* Antes y Después */
const beforeAfterContainers = document.querySelectorAll('.before-after-container');

beforeAfterContainers.forEach(container => {
  const slider = container.querySelector('.slider');
  const overlay = container.querySelector('.before-after-overlay');

  function slide(e) {
    const rect = container.getBoundingClientRect();
    let position = e.clientX - rect.left;
    if(position < 0) position = 0;
    if(position > rect.width) position = rect.width;
    overlay.style.width = position + 'px';
    slider.style.left = position + 'px';
  }

  slider.addEventListener('mousedown', () => {
    window.addEventListener('mousemove', slide);
  });

  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', slide);
  });

  // Soporte táctil
  slider.addEventListener('touchstart', () => {
    window.addEventListener('touchmove', e => {
      slide(e.touches[0]);
    });
  });
  window.addEventListener('touchend', () => {
    window.removeEventListener('touchmove', slide);
  });
});
