import Devices from "pages/Devices.vue";
import Users from "pages/Users.vue";
import ESP from "pages/ESP.vue";
import Index from "pages/Index.vue";
import Login from "../pages/Login.vue";
import LoginLayout from "../layouts/LoginLayout.vue";

const authPage = {
  path: "",
  name: "LoginLayout",
  component: LoginLayout,
  children: [
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
};

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: Index,
        name: "INDEX",
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "users",
        component: Users,
        name: "Users",
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "devices",
        component: Devices,
        name: "Devices",
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "esp",
        component: ESP,
        name: "ESP",
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  },
  authPage
];

export default routes;
