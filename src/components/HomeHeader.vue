<template>
  <header class="home-header">
    <div class="feedback-container header__feedback-container">
      <div class="header-logo">
        <img
          src="../assets/suggestion-logo.svg"
          alt="header logo"
          width="23"
          height="24"
        />
        <span>{{ suggestions }} Suggestions</span>
      </div>

      <SuggestionsSelect />

      <div class="home-right">
        <div v-if="loggedIn">
          <UserInfo />
        </div>
        <div v-else>
          <Auth />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import SuggestionsSelect from "./SuggestionsSelect.vue";
import Auth from "./Auth.vue";
import UserInfo from "./UserInfo.vue";
import { mapGetters } from "vuex";

export default {
  components: { SuggestionsSelect, UserInfo, Auth },
  props: ["suggestions"],
  computed: {
    ...mapGetters(["loggedIn"]),
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style>
.header__feedback-container {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 72px;
  border-radius: 10px;
  background-color: var(--home-header-bg);
  position: relative;
}

.header-logo {
  display: flex;
  margin-right: 38px;
  color: var(--white);
  font-size: 18px;
  line-height: 26px;
  font-weight: 700;
  letter-spacing: -0.25px;
}

.header-logo img {
  margin-right: 16px;
}

.header__feedback-container .add-link {
  margin-left: auto;
}

.home-right {
  margin-left: auto;
}

@media screen and (max-width: 850px) {
  .feedback-container {
    max-width: 100%;
  }

  .single-feedback {
    max-width: 689px !important;
  }

  .add-reply form textarea {
    width: 380px !important;
  }
}
</style>
