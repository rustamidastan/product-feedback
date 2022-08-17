<template>
  <div class="navbar-links">
    <button
      v-for="router in routerLinks"
      :key="router"
      @click="addActive(router)"
      :class="{ active: activeType == router }"
    >
      {{ router }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routerLinks: ["All", "UI", "UX", "Enhancement", "Bug", "Feature"],
    };
  },

  computed: {
    activeType() {
      return this.$store.state.activeType;
    },
  },

  methods: {
    addActive(type) {
      this.$store.commit("CHANGE_TYPE", type);
    },
  },
};
</script>

<style>
.navbar-links {
  width: 255px;
  height: 166px;
  margin: 24px 0;
  padding: 24px;
  border-radius: 10px;
  background-color: var(--white);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.navbar-links button {
  padding: 5px 16px;
  margin-right: 8px;
  font-size: 13px;
  line-height: 18.7px;
  font-weight: 600;
  color: var(--nav-links-color);
  border-radius: 10px;
  background-color: var(--body-bg);
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.navbar-links button:hover {
  background-color: var(--nav-links-hover-color);
}

.navbar-links button.active {
  background-color: var(--nav-links-active-color);
  color: var(--white);
}
</style>
