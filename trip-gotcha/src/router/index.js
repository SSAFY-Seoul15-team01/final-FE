import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/main.vue";
import MyPageView from "@/views/MyPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home', // '/' 경로로 가면 '/home'으로 리다이렉트
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/members",
      name: "MyPage",
      component: MyPageView,
    },
  ],
});

export default router;
