import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import LoadPDF from "./pages/pdf/LoadPDF.vue";
import MergePDF from "./pages/pdf/MergePDF.vue";
import ConvertToPDF from "./pages/pdf/ConvertToPDF.vue";

const env = import.meta.env;

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "LoadPDF",
    component: LoadPDF,
  },
  {
    path: "/convert",
    name: "Convert",
    component: ConvertToPDF,
  },
  {
    path: "/merge",
    name: "Merge",
    component: MergePDF,
  },
];

const router = createRouter({
  history: createWebHistory(env.BASE_URL),
  routes,
});

export default router;
