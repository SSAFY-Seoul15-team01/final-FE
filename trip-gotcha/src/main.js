import "./assets/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useKakao } from 'vue3-kakao-maps/@utils';

useKakao('1bfec481ed252d91654275b3f2c42c7a');
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
