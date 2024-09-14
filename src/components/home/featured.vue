<template>
  <v-row v-masonry transition-duration="'0.3s'">
    <v-col
      v-masonry-tile
      v-for="article in articleStore.getHomeArticles"
      :key="article.id"
      sm="4"
    >
      <v-card>
        <v-img height="200" :src="article.src" cover class="text-white" />
        <v-card-item>
          <v-card-title>
            {{ article.title }}
          </v-card-title>
          <v-card-subtitle>
            {{ article.game }}
          </v-card-subtitle>
        </v-card-item>
        <v-card-text>
          {{ article.excrept }}
        </v-card-text>
        <v-card-actions>
          <router-link :to="{ name: 'article', params: { id: article.id } }">
            <v-btn> Read Article </v-btn>
          </router-link>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
import { useArticleStore } from "@/stores/stores";
const articleStore = useArticleStore();
</script>
