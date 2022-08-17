<template>
  <div class="add-comment add-reply">
    <form @submit.prevent="postComment">
      <textarea
        maxlength="250"
        placeholder="Type your comment here"
        v-model="text"
      ></textarea>
      <button class="add-link">Post Reply</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id", "replied"],
  data() {
    return {
      text: "",
    };
  },

  methods: {
    postComment() {
      if (this.$store.state.user) {
        const subcomment = {
          user_id: this.$store.state.user.id,
          body: this.text,
          comment_id: this.id,
          replied: this.replied,
        };

        axios.post(
          "https://productfeedback-app-api.herokuapp.com/api/subcomments",
          subcomment
        );
        this.$emit("subcomment", subcomment);
        this.text = "";
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style>
.add-reply {
  padding-left: 70px !important;
}

.add-reply form {
  display: flex;
  justify-content: space-between;
}

.add-reply form textarea {
  width: 461px;
  height: 80px;
}

.add-reply form button {
  /* width: 117px; */
  height: 44px;
}
</style>
