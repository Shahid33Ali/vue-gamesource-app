<template>
  <div class="signin_container">
    <div class="text-center" v-show="useStore.loading">
      <v-progress-circular intermediate color="blue-grey" />
    </div>
    <Form
      @submit="onSubmit"
      :validation-schema="formScema"
      v-show="!useStore.loading"
    >
      <h1>{{ !type ? "Sign In" : "Register" }}</h1>
      <div class="form-group">
        <Field
          name="email"
          :value="'francis@gmail.com'"
          v-slot="{ field, errors, errorMessage }"
        >
          <input
            type="text"
            class="form-control"
            placeholder="Enter Your Email"
            v-bind="field"
            :class="{ 'is-invalid': errors.length !== 0 }"
          />
          <div class="input_alert" v-if="errors.length !== 0">
            {{ errorMessage }}
          </div>
        </Field>
        <Field
          name="password"
          :value="'password'"
          v-slot="{ field, errors, errorMessage }"
        >
          <input
            type="password"
            class="form-control"
            placeholder="Enter Your Password"
            v-bind="field"
            :class="{ 'is-invalid': errors.length !== 0 }"
          />
          <div class="input_alert" v-if="errors.length !== 0">
            {{ errorMessage }}
          </div>
        </Field>
      </div>
      <button type="sub,it" class="btn mb-3 btn-block">
        {{ !type ? "Sign in" : "Register" }}
      </button>
      <hr />
      <div class="form_swap" @click="type = !type">
        <span v-if="type"> I want to <b>Sign in</b> </span>
        <span v-if="!type"> I want to <b>Register</b> </span>
      </div>
    </Form>
  </div>
</template>
<script setup>
import { Field, Form } from "vee-validate";
import * as yup from "yup";
import { ref } from "vue";
//TOASTS
import { useToast } from "vue-toast-notification";
const $toast = useToast();
//Auth
import { useUserStore } from "@/stores/user";
const useStore = useUserStore();
const type = ref(false);
const formScema = yup.object({
  email: yup.string().required("This is required").email("not an email"),
  password: yup.string().required("Required"),
});
function onSubmit(values, { resetForm }) {
  if (type.value) {
    ///register
    useStore.register(values);
  } else {
    //sign in
    useStore.signin(values);
  }
}

useStore.$onAction(({ after, onError, name }) => {
  if (name === "register" || name === "signin") {
    after(() => {
      $toast.success("You are in!!!!");
    });
    onError((err) => {
      $toast.error(err.message);
    });
  }
});
</script>
