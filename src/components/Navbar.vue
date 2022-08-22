<template>
  <nav class="navbar">
    <NavbarTitle />
    <div class="navbar-desc">
      <NavbarLinks />
      <NavbarRoadmap />
    </div>
    <div class="navbar-res" v-if="menu">
      <NavbarLinks />
      <NavbarRoadmap />
    </div>
  </nav>
</template>

<script>
import NavbarTitle from "./NavbarTitle.vue";
import NavbarLinks from "./NavbarLinks.vue";
import NavbarRoadmap from "./NavbarRoadmap.vue";

export default {
  components: { NavbarTitle, NavbarLinks, NavbarRoadmap },
  computed: {
    menu() {
      return this.$store.state.responsiveMenu;
    },
  },
};
</script>

<style>
.navbar-res,
.menu-icon {
  display: none;
}
</style>
