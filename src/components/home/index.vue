<template>
  <div class="container">
    <Carousel />
    <Featured />
  </div>
</template>
<script setup>
import { useArticleStore } from "@/stores/stores";
import Carousel from "@/utils/carousel.vue";
import Featured from "./featured.vue";
const articleStore = useArticleStore();
if (!articleStore.homeArticles) {
  articleStore.getArticles(6);
}
</script>
