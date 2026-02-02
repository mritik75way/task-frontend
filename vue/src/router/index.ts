import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import Tasks from "../pages/Tasks.vue";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/tasks", component: Tasks }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
