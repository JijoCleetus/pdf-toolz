import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import PDFDashboard from "./pages/PDFDashboard.vue";
import ConvertToPDF from "./pages/ConvertToPDF.vue";

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
    component: ConvertToPDF,
  },
];

const router = createRouter({
  history: createWebHistory(env.BASE_URL),
  routes,
});

export default router;
