<template>
  <div>
    <HomeHeader :suggestions="sortedFeedbacks.length" />
    <div class="feedbacks" v-if="sortedFeedbacks.length">
      <router-link
        :to="{ name: 'Feedback', params: { id: feedback.id } }"
        v-for="(feedback, index) in sortedFeedbacks"
        :key="index"
      >
        <FeedbackItem :feedback="feedback" @comments="getComments" />
      </router-link>
    </div>
    <div v-else>
      <NoFeedback />
    </div>
  </div>
</template>

<script>
import HomeHeader from "./HomeHeader.vue";
import NoFeedback from "./NoFeedback.vue";
import FeedbackItem from "./FeedbackItem.vue";
import axios from "axios";

export default {
  components: { HomeHeader, NoFeedback, FeedbackItem },
  data() {
    return {
      comments: [],
    };
  },

  methods: {
    getComments(comment) {
      this.comments.push(comment);
    },
  },
  computed: {
    setFeedbacks() {
      return this.$store.state.feedbacks;
    },
    selectItem() {
      return this.$store.state.selectValue;
    },
    activeType() {
      return this.$store.state.activeType;
    },
    feedbacks() {
      let arr = [];
      let defaultArr = [];
      if (this.selectItem == "Most Upvotes") {
        this.setFeedbacks.map((item) => {
          if (!arr.includes(item.votes)) {
            arr.push(item.votes);
          }
        });
        arr.sort(function (a, b) {
          return b - a;
        });
        arr.map((item) => {
          this.setFeedbacks.map((index) => {
            if (index.votes === item) {
              defaultArr.push(index);
            }
          });
        });
      }

      if (this.selectItem == "Least Upvotes") {
        this.setFeedbacks.map((item) => {
          if (!arr.includes(item.votes)) {
            arr.push(item.votes);
          }
        });
        arr.sort(function (a, b) {
          return a - b;
        });
        arr.map((item) => {
          this.setFeedbacks.map((index) => {
            if (index.votes === item) {
              defaultArr.push(index);
            }
          });
        });
      }

      return defaultArr;
    },

    sortedFeedbacks() {
      if (this.activeType === "All") {
        return this.feedbacks;
      } else {
        let p = this.feedbacks.filter((item) => {
          if (item.feedback_type === this.activeType) {
            return item;
          }
        });

        return p;
      }
    },
  },
};
</script>

<style>
.feedback-container {
  width: 825px;
}

.feedbacks a {
  text-decoration: none;
  color: var(--text-color);
}
</style>
