import { createRouter, createWebHistory } from "vue-router";

// import views
import Dashboard from "../views/Dashboard.vue";
const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/dashboard", component: Dashboard, name: "dashboard-page" },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
