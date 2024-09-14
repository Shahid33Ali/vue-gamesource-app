import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import App from "./App.vue";
import router from "./router";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import { VueMasonryPlugin } from "vue-masonry";
const vuetify = createVuetify({
  components,
  directives,
});
import { AUTH } from "./utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
let app;
onAuthStateChanged(AUTH, () => {
  if (!app) {
    app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.use(vuetify);
    app.use(ToastPlugin);
    app.use(VueMasonryPlugin);
    app.mount("#app");
  }
});
