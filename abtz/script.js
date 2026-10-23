import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs';

// ==========================================
// 1. INICIALIZAÇÃO DO SWIPER (Produtos)
// ==========================================
const swiperElement = document.querySelector('.swiper');
if (swiperElement) {
  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }
  });
}

// ==========================================
// 2. FUNCIONALIDADE DE PESQUISA (Search Toggle)
// ==========================================
const searchToggle = document.getElementById('search-toggle');
const searchContainer = document.getElementById('search-container');
const searchInput = document.getElementById('search-input');

if (searchToggle && searchContainer && searchInput) {
  searchToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    searchContainer.classList.toggle('active');
    if (searchContainer.classList.contains('active')) {
      searchInput.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target) && e.target !== searchToggle) {
      searchContainer.classList.remove('active');
    }
  });
}

// ==========================================
// 3. CARROSSEL HERO CUSTOMIZADO
// ==========================================
function initHeroCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const carouselContainer = document.querySelector('.carousel-container');

  // Se não houver carrossel nesta página específica, encerra esta função sem erro
  if (!slides.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const autoSlideInterval = 5000; // 5 segundos
  let slideTimer;

  function showSlide(index) {
    if (index >= slides.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = slides.length - 1;
    } else {
      currentIndex = index;
    }

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    slideTimer = setInterval(nextSlide, autoSlideInterval);
  }

  function stopAutoSlide() {
    if (slideTimer) clearInterval(slideTimer);
  }

  nextBtn.addEventListener('click', () => {
    nextSlide();
    startAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    startAutoSlide();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      startAutoSlide();
    });
  });

  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
  }

  startAutoSlide();
}

// Executa o carrossel garantindo compatibilidade com módulos ES
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroCarousel);
} else {
  initHeroCarousel();
}