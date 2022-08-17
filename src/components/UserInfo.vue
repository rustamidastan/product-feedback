<template>
  <div class="user">
    <div
      class="user-info__top"
      @click="modal = !modal"
      :class="{ active: modal }"
    >
      <img src="../assets/user30.png" alt="" />
      <div>
        <span class="user-name">{{ user.name }}</span>
        <span class="user-name">@{{ user.username }}</span>
      </div>
    </div>

    <div class="user-info" v-show="modal">
      <router-link class="add-link" to="/create">+ Add Feedback</router-link>
      <router-link to="/">Feedbacks</router-link>
      <button
        type="button"
        @click="logout()"
        v-if="loggedIn"
        class="logout-btn"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      modal: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },

    ...mapGetters(["loggedIn"]),
  },

  methods: {
    logout() {
      this.$store.commit("CLEAR_USER_DATA");
    },
  },
};
</script>

<style>
.user {
  user-select: none;
}
.user-info__top {
  padding: 7px 25px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  color: var(--white);
  text-transform: capitalize;
  font-weight: 600;
  cursor: pointer;
}

.user-info__top span:last-child {
  display: block;
  font-size: 12px;
  text-transform: lowercase;
}
.user img {
  padding: 2px;
  margin-right: 10px;
  border-radius: 30px;
  background-color: var(--white);
}

.user-info {
  width: 220px;
  padding: 20px 10px;
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--white);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.user-info .add-link {
  margin-left: 0 !important;
  margin-bottom: 15px;
}

.user-info__top.active {
  background-color: var(--white);
  color: var(--home-header-bg);
}

.user-info__top.active img {
  background-color: var(--home-header-bg);
}

.user-info a:nth-child(2) {
  text-decoration: none;
  color: var(--home-header-bg);
  font-weight: 600;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.user-info a:nth-child(2):hover {
  text-decoration: underline;
  opacity: 0.9;
}

.logout-btn {
  display: flex;
  align-items: center;
  border: none;
  font-weight: 600;
  background: transparent;
  color: var(--home-header-bg);
  transition: all 0.3s ease;
  cursor: pointer;
}

.logout-btn::after {
  content: "";
  width: 30px;
  height: 30px;
  background-image: url(../assets/logout.png);
  background-repeat: no-repeat;
  background-position: center;
}

.logout-btn:hover {
  opacity: 0.9;
  text-decoration: underline;
}
</style>
