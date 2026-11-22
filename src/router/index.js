import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { title: "PostIt - Recent posts" },
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignupView.vue"),
      meta: { title: "PostIt - Signup" },
    },
    {
      path: "/add-post",
      name: "add-post",
      component: () => import("../views/AddPostView.vue"),
      meta: { title: "PostIt - Add post" },
    },
    { path: "/login", redirect: { name: "signup" } },
    { path: "/index.html", redirect: { name: "home" } },
    { path: "/login.html", redirect: { name: "signup" } },
    { path: "/addPost.html", redirect: { name: "add-post" } },

    { path: "/:pathMatch(.*)*", redirect: { name: "home" } },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.afterEach((to) => {
  document.title = to.meta.title ?? "PostIt";
});

export default router;
