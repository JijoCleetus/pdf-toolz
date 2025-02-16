import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import PDFDashboard from "./pages/PDFDashboard.vue";

const env = import.meta.env;

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "LoadPDF",
    component: PDFDashboard,
  },
  {
    path: "/convert",
    name: "Convert",
    component: PDFDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(env.BASE_URL),
  routes,
});

export default router;
