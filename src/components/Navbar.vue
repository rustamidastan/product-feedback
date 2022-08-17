<template>
  <nav class="navbar">
    <NavbarTitle />
    <NavbarLinks />
    <NavbarRoadmap />
  </nav>
</template>

<script>
import NavbarTitle from "./NavbarTitle.vue";
import NavbarLinks from "./NavbarLinks.vue";
import NavbarRoadmap from "./NavbarRoadmap.vue";

export default {
  components: { NavbarTitle, NavbarLinks, NavbarRoadmap },
};
</script>

<style></style>
