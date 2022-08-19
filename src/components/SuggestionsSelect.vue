<template>
  <div class="suggestion-select">
    <div class="feedback-sort">
      <div class="current-select" @click="categorySelect = true">
        <span
          >Sort by: <span class="current-option">{{ sortBy }}</span></span
        >
        <img
          src="../assets/bottom-white-icon.png"
          :class="{ active: categorySelect }"
        />
      </div>
      <div class="option-select" v-if="categorySelect">
        <div
          class="option"
          v-for="option in options"
          :key="option"
          @click="changeOption(option)"
          :class="{ active: option == sortBy }"
        >
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // sortBy: "Most Upvotes",
      options: [
        "Most Upvotes",
        "Least Upvotes",
        "Most Comments",
        "Least Comments",
      ],
      categorySelect: false,
    };
  },
  computed: {
    sortBy() {
      return this.$store.state.selectValue;
    },
  },

  methods: {
    changeOption(option) {
      this.$store.commit("CHANGE_SELECT_VALUE", option);
      this.categorySelect = false;
    },
  },
};
</script>

<style>
.feedback-sort {
  position: relative;
}

.current-select {
  cursor: pointer;
}
.current-select span {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #f2f4fe;
}

.current-option {
  font-weight: 700 !important;
  color: #f2f4fe;
}

.current-select img {
  margin-left: 9px;
}

.current-select img.active {
  transform: rotateX(180deg);
}

.option-select {
  position: absolute;
  top: 52px;
  width: 255px;
  background: #ffffff;
  box-shadow: 0px 10px 40px -7px rgba(55, 63, 104, 0.350492);
  border-radius: 10px;
}

.option {
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
  color: #647196;
}

.option:hover {
  color: #ad1fea;
}

.option.active::after {
  content: "";
  width: 12px;
  height: 8px;
  background-image: url(../assets/current-icon.png);
  background-position: center;
  background-size: cover;
}

.option:not(:last-child) {
  border-bottom: 1px solid rgba(58, 67, 116, 0.15);
}
</style>
