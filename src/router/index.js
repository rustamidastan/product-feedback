import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Edit from "../views/Edit.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Feedback from "../views/Feedback.vue";
import AddFeedback from "../views/AddFeedback.vue";
import Roadmap from "../views/Roadmap.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },

  {
    path: "/login",
    name: "login",
    component: Login,
  },

  {
    path: "/create",
    name: "AddFeedback",
    component: AddFeedback,
  },

  {
    path: "/feedbacks/:id",
    name: "Feedback",
    component: Feedback,
    props: true,
  },

  {
    path: "/feedbacks/:id/edit",
    name: "Edit",
    component: Edit,
    props: true,
  },

  {
    path: "/roadmap",
    name: Roadmap,
    component: Roadmap,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
