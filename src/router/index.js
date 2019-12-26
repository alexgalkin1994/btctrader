import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/details",
    name: "details",
    component: () => import("../views/Details.vue")
  },
  {
    path: "/converter",
    name: "converter",
    component: () => import("../views/Converter.vue")
  },
  {
    path: "/diagram",
    name: "diagram",
    component: () => import("../views/Diagram.vue"),
    props: true
  },
  {
    path: "/mybitcoin",
    name: "mybitcoin",
    component: () => import("../views/MyBitcoin.vue")
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/Profile.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
