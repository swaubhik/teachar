import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      requiresAuth: false,
    },
  },
  {
    path: "/lessons",
    name: "Lessons",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Lessons.vue"),
    meta: {
      title: "Lessons",
      requiresAuth: false,
    },
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   component: () => import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  //   meta: {
  //     title: "Login",
  //     requiresAuth: false,
  //   },
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   component: () => import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  //   meta: {
  //     title: "Register",
  //     requiresAuth: false,
  //   },
  // },
  // {
  //   path: "/forgot-password",
  //   name: "ForgotPassword",
  //   component: () => import(/* webpackChunkName: "about" */ "../views/ForgotPassword.vue"),
  //   meta: {
  //     title: "Forgot Password",
  //     requiresAuth: false,
  //   },
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | TeachAR`;
  next();
});

export default router;
