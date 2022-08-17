<template>
  <div class="add-comment">
    <h3 class="title">Add Comment</h3>

    <form @submit.prevent="postComment">
      <textarea
        maxlength="250"
        placeholder="Type your comment here"
        v-model="text"
      ></textarea>
      <div>
        <span>{{ amount }} Characters left</span>
        <button class="add-link">Post Comment</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      text: "",
    };
  },
  computed: {
    amount() {
      return 250 - this.text.length;
    },
  },

  methods: {
    postComment() {
      if (this.$store.state.user) {
        const comment = {
          user_id: this.$store.state.user.id,
          body: this.text,
          feedback_id: this.id,
        };

        axios.post(
          "https://productfeedback-app-api.herokuapp.com/api/comments",
          comment
        );
        this.$emit("comment", comment);
        this.text = "";
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style>
.add-comment {
  padding: 24px 34px;
  border-radius: 10px;
  background-color: var(--white);
}

.add-comment h3 {
  margin-bottom: 28px;
  font-size: 18px;
  line-height: 26px;
  font-weight: 700;
  letter-spacing: -0.25px;
  color: var(--heading-color);
}

.add-comment textarea {
  width: 100%;
  height: 80px;
  margin-bottom: 16px;
  padding: 16px 24px;
  border-radius: 5px;
  border: 1px solid transparent;
  background-color: var(--body-bg);
  font-family: Jost;
  outline: none;
  resize: none;
}

.add-comment form div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
}

.add-comment textarea:focus {
  border-color: var(--nav-links-color);
}

.add-comment .add-link {
  border: none;
  cursor: pointer;
}
</style>
