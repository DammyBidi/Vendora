<template>
  <section class="relative overflow-hidden py-10">
    <Swiper
      :modules="[Navigation, Autoplay]"
      :slides-per-view="defaultSlidesPerView"
      :centered-slides="true"
      :loop="isLoopEnabled"
      :loop-additional-slides="loopAdditionalSlides"
      :loop-fill-group-with-blank="true"
      :watch-slides-progress="true"
      :space-between="190"
      :speed="1000"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :grab-cursor="true"
      navigation
      class="lezada-hero"
      :breakpoints="breakpointsParam"
    >
      <SwiperSlide v-for="(slide, i) in renderSlides" :key="i">
        <div
          class="h-[320px] md:h-[360px] text-left flex items-center  relative"
          :class="slide.bg"
        >
          <!-- TEXT -->
          <div class="max-w-[420px] z-10">
            <p
              class="text-[12px] tracking-[0.3em] uppercase mb-4 font-medium"
              :class="slide.labelColor"
            >
              Accessories
            </p>

            <h2 class="text-[38px] leading-tight font-medium mb-8">
              {{ slide.title }}
            </h2>

            <button
              class="px-10 py-3 bg-[#2f2f2f] text-white text-xs tracking-widest uppercase hover:bg-black transition"
            >
              Shop Now
            </button>
          </div>

          <!-- IMAGE -->
          <img
            :src="slide.image"
            class="absolute right-14 bottom-0 h-[95%] object-contain"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const slides = [
  {
    title: "Bottle Grinder,\nSmall, 2-Piece",
    image:
      "https://lezada-demo.myshopify.com/cdn/shop/files/banner-carousel-1_1170x.jpg?v=1613746686",

    labelColor: "text-[#6da7df]",
  },
  {
    title: "Decorative\nWood Accessories",
    image:
      "https://lezada-demo.myshopify.com/cdn/shop/files/banner-carousel-2_1170x.jpg?v=1613746686",

    labelColor: "text-[#d1b29a]",
  },
  {
    title: "Minimal\nModern Lighting",
    image:
      "https://lezada-demo.myshopify.com/cdn/shop/files/banner-carousel-3_1170x.jpg?v=1613746686",

    labelColor: "text-[#7da08c]",
  },
  {
    title: "Bottle Grinder,\nSmall, 2-Piece",
    image:
      "https://lezada-demo.myshopify.com/cdn/shop/files/banner-carousel-4_1170x.jpg?v=1613746686",

    labelColor: "text-[#7da08c]", 
  },
];

const defaultSlidesPerView = 1.4;
const breakpointsParam = {
  768: { slidesPerView: 1.8 },
  1280: { slidesPerView: 2.3 },
};

const maxSlidesPerView = Math.max(
  defaultSlidesPerView,
  ...Object.values(breakpointsParam).map((b) => b.slidesPerView)
);

const requiredSlidesForLoop = Math.ceil(maxSlidesPerView) + 1;
const isLoopEnabled = slides.length >= requiredSlidesForLoop;

// duplicate all slides when loop is enabled to avoid blank gaps
const loopAdditionalSlides = isLoopEnabled ? slides.length : 0;

// when looping, duplicate slides in the render array so navigation never
// reaches a real end and shows blank space
const renderSlides = isLoopEnabled
  ? slides.concat(slides.map((s) => ({ ...s })))
  : slides;
</script>

<style>
/* === EXACT LEZADA ARROWS === */
.lezada-hero .swiper-button-prev,
.lezada-hero .swiper-button-next {
  width: 46px;
  height: 46px;
  /* background: white; */
  /* border: 1px solid #e5e5e5; */
  color: #000;
  top: 50%;
  transform: translateY(-50%);
}

.lezada-hero .swiper-button-prev {
  left: 250px;
}

.lezada-hero .swiper-button-next {
  right: 350px;
}

.lezada-hero .swiper-button-prev::after,
.lezada-hero .swiper-button-next::after {
  font-size: 14px;
  font-weight: bold;
}
</style>
