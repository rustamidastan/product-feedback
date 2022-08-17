import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/main.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit("SET_USER_DATA", userData);
    }
    this.$store.dispatch("setFeedbacks");
    this.$store.dispatch("setRoadmap");
  },
  render: (h) => h(App),
}).$mount("#app");
