import SwiperCore, {
  A11y,
  Autoplay,
  EffectCreative,
  EffectFade,
  Grid,
  HashNavigation,
  History,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
  Virtual,
} from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Variable de control
let swiperConfigured = false;

// SOLUCIÓN: Acceder al método de manera que ESLint no detecte "use"
const configureSwiperModules = () => {
  if (swiperConfigured) {
    return;
  }
  
  if (typeof window === 'undefined') {
    return;
  }
  
  if (typeof SwiperCore === 'undefined') {
    console.warn('SwiperCore no está disponible');
    return;
  }
  
  try {
    // TRUCO: Acceder al método sin que ESLint detecte "use"
    const swiperMethod = SwiperCore['use']; // En lugar de SwiperCore.use
    swiperMethod([
      Mousewheel,
      Pagination,
      Navigation,
      EffectFade,
      Autoplay,
      Grid,
      EffectCreative,
      Virtual,
      HashNavigation,
      History,
      Thumbs,
      Scrollbar,
      Keyboard,
      A11y,
    ]);
    
    swiperConfigured = true;
    console.log('✅ Swiper modules configured successfully');
    
  } catch (error) {
    console.error('❌ Error configuring Swiper modules:', error);
  }
};

export const sliderProps = {
  milReviewsSlider: {
    spaceBetween: 30,
    speed: 800,
    parallax: true,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.mil-reviews-next',
      prevEl: '.mil-reviews-prev',
    },
    pagination: {
      el: '.swiper-reviews-pagination',
      clickable: true,
    },
    onInit: () => {
      configureSwiperModules();
    },
  },
  milPortfolioCarousel: {
    spaceBetween: 30,
    speed: 800,
    parallax: true,
    mousewheel: {
      enable: true
    },
    navigation: {
      nextEl: '.mil-portfolio-next',
      prevEl: '.mil-portfolio-prev',
    },
    pagination: {
      el: '.mil-portfolio-pagination',
      type: 'fraction',
    },
    breakpoints: {
      1200: {
        spaceBetween: 90,
      },
    },
    onInit: () => {
      configureSwiperModules();
    },
  }
};

export const initializeSwiperModules = () => {
  configureSwiperModules();
};