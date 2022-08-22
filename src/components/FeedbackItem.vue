<template>
  <div class="feedback-wrapper feedback-item" v-if="feedback">
    <div class="feedback-item__top">
      <img src="../assets/top-icon.svg" alt="top icon" width="12" height="6" />
      <span>{{ feedback.votes }}</span>
    </div>
    <div class="feedback-item__info">
      <h2 class="title">{{ feedback.title }}</h2>
      <p>{{ feedback.body }}</p>
      <span class="feedback-type">{{ feedback.feedback_type }}</span>
    </div>

    <div class="feedback-comments">
      <img
        src="../assets/comment-icon.svg"
        alt="comment"
        width="18"
        height="16"
      />
      <span v-if="comments">{{ comments.length }}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["feedback"],
  data() {
    return {
      comments: [],
    };
  },

  created() {
    axios
      .get("https://productfeedback-app-api.herokuapp.com/api/comments")
      .then((response) => {
        this.comments = response.data.filter((item) => {
          if (item.feedback_id == this.feedback.id) {
            return item;
          }
        });
        const comment = {
          id: this.feedback.id,
          commentLength: this.comments.length,
        };
        this.$emit("comments", comment);
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style>
.feedback-item {
  padding: 28px 32px;
  border-radius: 10px;
  background-color: var(--white);
  margin-bottom: 20px;
  display: flex;
}

.feedback-item__top {
  width: 40px;
  height: 53px;
  margin-right: 40px;
  border-radius: 10px;
  background-color: var(--secondary-white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  line-height: 18.79px;
  letter-spacing: -0.18px;
  font-weight: 700;
  color: var(--heading-color);
}

.feedback-item__top img {
  margin-bottom: 6px;
}

.feedback-item__info h2 {
  font-size: 18px;
  line-height: 26px;
  font-weight: 700;
  letter-spacing: -0.25px;
  color: var(--heading-color);
  margin-bottom: 4px;
}

.feedback-item__info p {
  margin-bottom: 12px;
}

.feedback-item__info .feedback-type {
  padding: 5px 16px;
  border-radius: 10px;
  background-color: var(--secondary-white);
  color: var(--nav-links-color);
  font-size: 13px;
  line-height: 18.79px;
  font-weight: 600;
}

.feedback-comments {
  margin: auto 0;
  margin-left: auto;
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 23px;
  font-weight: 700;
  letter-spacing: -0.22px;
  color: var(--heading-color);
}

.feedback-comments img {
  display: block;
  margin-right: 8px;
}
</style>
