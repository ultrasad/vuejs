import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
// import Login from "../views/Login.vue";
import DashBoard from "../layouts/DashBoard.vue";
import positionRoutes from "./position/position-route";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  {
    path: "/",
    name: "DashBoard",
    component: DashBoard,
    meta: { requireAuth: true }, //custom check with custom parameter 'requireAuth'
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
      },
      ...positionRoutes, //split operator with ...route1, route2
    ],
  },
  {
    path: "/login",
    name: "Login",
    // component: Login, // รวมไปในไฟล์หลัก จะทำให้มีขนาดใหญ่
    component: () =>
      // lazy load
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    const token = localStorage.getItem("token");
    if (!token) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
