<template>
  <div v-if="articleStore.getFeaturedSlides">
    <carousel :items-to-show="1" class="p_top" :wrap-around="true">
      <slide v-for="slide in articleStore.getFeaturedSlides" :key="slide.id">
        <div class="slider_bck" :style="{ background: `url(${slide.src})` }">
          <div class="slide_content">
            <div class="item">
              <div>{{ slide.title }}</div>
              <div>{{ slide.excrept }}</div>
            </div>
          </div>
        </div>
      </slide>
      <template #addons>
        <Pagination />
      </template>
    </carousel>
  </div>
</template>
<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

import { useArticleStore } from "@/stores/stores";
const articleStore = useArticleStore();
</script>
