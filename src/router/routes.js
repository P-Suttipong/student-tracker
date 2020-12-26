import Devices from "pages/Devices.vue";
import Students from "pages/Students.vue";
import Index from "pages/Index.vue";
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: Index, name: "INDEX" },
      { path: "students", component: Students, name: "Students" },
      { path: "devices", component: Devices, name: "Devices" }
    ]
  },
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
