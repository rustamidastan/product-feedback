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
    responsiveMenu: false,
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

    EDIT_FEEDBACKS(state, feedback) {
      state.feedbacks = state.feedbacks.filter((item) => {
        if (item.id != feedback.id) {
          return item;
        } else {
          return feedback;
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

    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },

    CHANGE_MENU(state, value) {
      state.responsiveMenu = value;
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

    changeMenu({ commit }, value) {
      commit("CHANGE_MENU", value);
    },
  },
  modules: {},

  getters: {
    loggedIn(state) {
      return !!state.user;
    },
  },
});
