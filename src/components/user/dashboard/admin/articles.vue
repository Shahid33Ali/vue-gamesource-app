<template>
  <div class="text-center m-3" v-show="loading">
    <v-progress-circular indeterminate color="primary" />
  </div>
  <div v-show="!loading">
    <v-table theme="dark">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Owner</th>
          <th class="text-left">Rating</th>
          <th class="text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articleStore.adminArticles" :key="article.id">
          <td>{{ article.game }}</td>
          <td>{{ article.owner.uid }}</td>
          <td>{{ article.rating }}</td>
          <td>{{ article.timestamp.toDate().toDateString() }}</td>
          <td>
            <v-btn
              variant="outlined"
              color="red"
              size="small"
              @click="remove(article.id)"
              >Remove</v-btn
            >
          </td>
          <td>
            <v-btn
              variant="outlined"
              color="yellow"
              size="small"
              @click="
                router.push({ name: 'admin_edit', params: { id: article.id } })
              "
              >Edit</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>
    <div class="text-center m-3" v-if="btnLoad">
      <v-progress-circular indeterminate color="primary" />
    </div>
    <v-btn v-else variant="outlined" class="mt-3" @click="loadMoreHnadler">
      Get More Articles
    </v-btn>
  </div>
</template>
<script setup>
import { useArticleStore } from "@/stores/stores";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const articleStore = useArticleStore();
const loading = ref(false);
const btnLoad = ref(false);
//Get Articles FIrst
if (!articleStore.adminArticles || route.query.reload) {
  loading.value = true;
  articleStore.adminGetArticles(3).finally(() => {
    loading.value = false;
  });
}
const loadMoreHnadler = () => {
  btnLoad.value = true;
  articleStore.adminGetMoreArticles(3).finally(() => {
    btnLoad.value = false;
  });
};

//remove ny id
const remove = (id) => {
  loading.value = true;
  articleStore.removeById(id).finally(() => {
    loading.value = false;
  });
};
</script>
