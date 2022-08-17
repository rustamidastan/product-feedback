<template>
  <div class="suggestion-select">
    <span class="select-title">Sort by</span>
    <select v-model="paymentMethod">
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortBy: "Most Upvotes",
      options: [
        "Most Upvotes",
        "Least Upvotes",
        "Most Comments",
        "Least Comments",
      ],
    };
  },
  computed: {
    paymentMethod: {
      get() {
        return this.$store.state.selectValue;
      },
      set(value) {
        this.$store.commit("CHANGE_SELECT_VALUE", value);
      },
    },
  },
};
</script>

<style>
.suggestion-select {
  color: var(--secondary-white);
  font-size: 14px;
  line-height: 20.23px;
  font-weight: 700;
}

.suggestion-select span {
  font-weight: 400;
}
</style>
