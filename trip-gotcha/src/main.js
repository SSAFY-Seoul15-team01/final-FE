import "./assets/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createPersistedState } from 'pinia-plugin-persistedstate'

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia()
pinia.use(createPersistedState({
    storage: localStorage,
    auto: true,
}))
app.use(pinia);
app.use(router);

app.mount("#app");
