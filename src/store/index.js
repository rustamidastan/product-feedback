import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    feedbacks: [],
    selectValue: "Most Upvotes",
    activeType: "All",
    roadmap: {},
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData.user;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
    },

    SET_FEEDBACKS(state, feedbacks) {
      state.feedbacks = feedbacks;
    },

    CHANGE_FEEDBACKS(state, feedbackId) {
      state.feedbacks = state.feedbacks.filter((item) => {
        if (item.id != feedbackId) {
          return item;
        }
      });
    },

    CLEAR_USER_DATA() {
      localStorage.removeItem("user");
      location.reload();
    },

    CHANGE_TYPE(state, type) {
      state.activeType = type;
    },

    CHANGE_SELECT_VALUE(state, value) {
      state.selectValue = value;
    },

    SET_ROADMAP(state, roadmap) {
      state.roadmap = roadmap;
    },
  },
  actions: {
    setFeedbacks({ commit }) {
      axios
        .get("https://productfeedback-app-api.herokuapp.com/api/feedbacks")
        .then(({ data }) => {
          commit("SET_FEEDBACKS", data);
        });
    },

    setRoadmap({ commit, state }) {
      let roadmap = {
        suggestion: [],
        planed: [],
        inProgress: [],
        live: [],
      };

      state.feedbacks.filter((item) => {
        if (item.roadmap_status == "Suggestion") {
          roadmap.suggestion.push(item);
        }
        if (item.roadmap_status == "Planed") {
          roadmap.planed.push(item);
        }
        if (item.roadmap_status == "In-Progress") {
          roadmap.inProgress.push(item);
        }
        if (item.roadmap_status == "Live") {
          roadmap.live.push(item);
        }
      });

      // console.log(state.feedbacks);
      commit("SET_ROADMAP", roadmap);
    },
  },
  modules: {},

  getters: {
    loggedIn(state) {
      return !!state.user;
    },
  },
});
