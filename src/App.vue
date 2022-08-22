<template>
  <div id="app" class="app" :class="{ active: menu }">
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    menu() {
      return this.$store.state.responsiveMenu;
    },
  },

  watch: {
    menu: function (newMenu) {
      if (newMenu == true) {
        document.body.classList.add("body-active");
      } else {
        document.body.classList.remove("body-active");
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.body-active {
  overflow: hidden;
}

.app.active {
  position: relative;
  height: 100vh;
  overflow: hidden !important;
}

.app.active::before {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  content: "";
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
