<template>
  <div class="navbar-title">
    <div class="navbar-title_text">
      <h2>Frontend Mentor</h2>
      <p>Feedback Board</p>
    </div>

    <div class="navbar-title_btns">
      <button class="menu-icon" v-if="menu" @click="change(false)">
        <img src="../assets/icon-close.svg" />
      </button>
      <button class="menu-icon" v-else @click="change(true)">
        <img src="../assets/icon-menu.svg" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    menu() {
      return this.$store.state.responsiveMenu;
    },
  },

  methods: {
    change(value) {
      this.$store.dispatch("changeMenu", value);
    },
  },
};
</script>

<style>
.navbar-title {
  width: 255px;
  height: 137px;
  padding: 24px;
  padding-top: 67px;
  border-radius: 10px;
  background: var(--nav-title-bg);
  color: var(--white);
}

.navbar-title h2 {
  font-size: 20px;
  line-height: 29px;
  font-weight: 700;
  letter-spacing: -0.25px;
}

.navbar-title p {
  font-weight: 600;
  line-height: 21.68px;
}
</style>
