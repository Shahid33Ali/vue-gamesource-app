<template>
  <h1>User Profile</h1>
  <hr />
  <Form @submit="onSubmit" :validation-schema="formSchema" class="mb-5">
    <div class="mb-4">
      <Field
        name="firstname"
        v-model="firstname"
        v-slot="{ field, errors, errorMessage }"
      >
        <input
          type="text"
          class="form-control"
          placeholder="Enter Your First name"
          v-bind="field"
          :class="{ 'is-invalid': errors.length !== 0 }"
        />
        <div class="input_alert" v-if="errors.length !== 0">
          {{ errorMessage }}
        </div>
      </Field>
      <Field
        name="lastname"
        v-model="lastname"
        v-slot="{ field, errors, errorMessage }"
      >
        <input
          type="text"
          class="form-control"
          placeholder="Enter Your Last name"
          v-bind="field"
          :class="{ 'is-invalid': errors.length !== 0 }"
        />
        <div class="input_alert" v-if="errors.length !== 0">
          {{ errorMessage }}
        </div>
      </Field>
    </div>
    <v-btn
      type="sunmit"
      variant="outlined"
      :disabled="loading"
      :loading="loading"
    >
      Update Profile
    </v-btn>
  </Form>
</template>
<script setup>
import { updateProfile } from "@/composobles/user";
import { Form, Field } from "vee-validate";

const { loading, formSchema, onSubmit, lastname, firstname } = updateProfile();
</script>
