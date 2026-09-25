import { A11y, Autoplay, Keyboard, Navigation, Pagination, Parallax } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const modules = [A11y, Autoplay, Keyboard, Navigation, Pagination, Parallax];

export const sliderProps = {
  milReviewsSlider: {
    modules,
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
  },
};
