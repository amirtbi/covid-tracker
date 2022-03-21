import { createRouter, createWebHistory } from "vue-router";

// import views
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Dashboard from "../views/Dashboard.vue";
const routes = [
  { path: "/", redirect: "/home" },
  { path: "/dashboard", component: Dashboard, name: "dashboard-page" },
  { path: "/home", component: Home },
  { path: "/about", component: About, name: "about-page" },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
