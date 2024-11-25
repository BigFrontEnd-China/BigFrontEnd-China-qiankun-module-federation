import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    redirect: { name: "home" },
  },
  {
    path: "/micro-app-a",
    name: "home",
    component: HomeView,
  },
  {
    path: "/micro-app-a/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

export default routes;
