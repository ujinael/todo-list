import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import VTodoListPage from "@/pages/todo/VTodoListPage.vue"
export const routes:RouteRecordRaw[] = [
    {
      path: "/",
      name: "home",
      component: VTodoListPage,
      meta:{
        layout:"main"
      }
    },
  ]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
routes
});

export default router;
