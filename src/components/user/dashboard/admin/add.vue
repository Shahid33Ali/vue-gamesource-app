<template>
  <h1>Add Article</h1>
  <hr />
  <div class="text-center m3" v-show="loading">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>

  <Form
    class="mb-5"
    @submit="onSubmit"
    :validation-schema="articleSchema"
    v-show="!loading"
  >
    <div class="mb-4">
      <Field name="game" v-slot="{ field, errors, errorMessage }">
        <input
          type="text"
          class="form-control"
          placeholder="Name of the game"
          v-bind="field"
          :class="{ 'is-invalid': errors.length !== 0 }"
        />
        <div class="input_alert" v-if="errors.length !== 0">
          {{ errorMessage }}
        </div>
      </Field>
    </div>
    <div class="mb-4">
      <Field name="title" v-slot="{ field, errors, errorMessage }">
        <input
          type="text"
          class="form-control"
          placeholder="Title of the article"
          v-bind="field"
          :class="{ 'is-invalid': errors.length !== 0 }"
        />
        <div class="input_alert" v-if="errors.length !== 0">
          {{ errorMessage }}
        </div>
      </Field>
    </div>
    <div class="mb-4">
      <Field name="excrept" v-slot="{ field, errors, errorMessage }">
        <textarea
          rows="3"
          placeholder="Add excrept"
          v-bind="field"
          class="form-control"
          :class="{ 'is-invalid': errors.length !== 0 }"
        />
        <div class="input_alert" v-if="errors.length !== 0">
          {{ errorMessage }}
        </div>
      </Field>
    </div>
    <div class="mb-4">
      <Wysisyg @update="updateForm" />
      <Field
        name="editor"
        v-model="veditor"
        v-slot="{ field, errors, errorMessage }"
      >
        <input type="hidden" id="veditor" v-bind="field" />
        <div class="input_alert" v-if="errors.length !== 0">
          {{ errorMessage }}
        </div>
      </Field>
    </div>
    <div class="mb-4">
      <Field name="rating" v-slot="{ field, errors, errorMessage }">
        <select class="form-select" v-bind="field">
          <option value="Select a string">Select a rating</option>
          <option v-for="rating in ratingArray" :value="rating" :key="rating">
            {{ rating }}
          </option>
        </select>
        <div class="input_alert" v-if="errors.length !== 0">
          {{ errorMessage }}
        </div>
      </Field>
    </div>
    <div class="mb-4">
      <Field name="src" v-slot="{ field, errors, errorMessage }">
        <input
          type="text"
          class="form-control"
          placeholder="Add the source of the image"
          v-bind="field"
          :class="{ 'is-invalid': errors.length !== 0 }"
        />
        <div class="input_alert" v-if="errors.length !== 0">
          {{ errorMessage }}
        </div>
      </Field>
    </div>
    <v-btn type="submit" variant="outlined"> Add Article </v-btn>
  </Form>
</template>
<script setup>
import { ref } from "vue";
import articleSchema from "./schema";
import Wysisyg from "@/utils/wysisyg.vue";
import { useArticleStore } from "@/stores/stores";
import { Field, Form } from "vee-validate";
import { useToast } from "vue-toast-notification";
const $toast = useToast();
const loading = ref(false);
const useArticle = useArticleStore();
function onSubmit(values, { resetForm }) {
  loading.value = true;
  useArticle
    .addArticle(values)
    .then(() => {
      $toast.success("Article Added!!!");
    })
    .catch((err) => {
      $toast.error(err.message);
    })
    .finally(() => {
      loading.value = false;
    });
}
const ratingArray = [0, 1, 2, 3, 4, 5];
const veditor = ref("");
const updateForm = (value) => {
  veditor.value = value;
};
</script>
