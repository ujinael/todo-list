import { createApp } from "vue";
import { createPinia } from "pinia";
import "reflect-metadata"
import App from "./App.vue";
import router from "./router";

import { globalComponentsPluggin } from "./components";

const app = createApp(App);
app.use(globalComponentsPluggin)
app.use(createPinia());
app.use(router);
app.mount("#app");
