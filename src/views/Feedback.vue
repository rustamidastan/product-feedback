<template>
  <div class="single-feedback">
    <div class="feedback-show_top">
      <router-link to="/" class="go-back">Go Back</router-link>
      <router-link :to="{ name: 'Edit', params: { id: id } }" class="add-link"
        >Edit Feedback</router-link
      >
    </div>
    <FeedbackItem :feedback="feedback" />
    <Comments :comments="comments" />
    <AddComment :id="id" @comment="addComment" />
  </div>
</template>

<script>
import FeedbackItem from "@/components/FeedbackItem.vue";
import Comments from "../components/Comments.vue";
import AddComment from "@/components/AddComment.vue";
import axios from "axios";
export default {
  components: { FeedbackItem, Comments, AddComment },
  props: ["id"],
  data() {
    return {
      comments: [],
      uri: "https://productfeedback-app-api.herokuapp.com/api/",
      feedback: null,
    };
  },
  mounted() {
    axios
      .get(this.uri + "feedbacks/" + this.id)
      .then((response) => {
        this.feedback = response.data;
      })
      .catch((err) => console.log(err));
    axios
      .get(this.uri + "comments")
      .then(
        (response) =>
          (this.comments = response.data.filter((item) => {
            if (item.feedback_id == this.id) {
              return item;
            }
          }))
      )
      .catch((err) => console.log(err));
  },

  methods: {
    addComment(comment) {
      this.comments.push(comment);
    },
  },
};
</script>

<style>
.single-feedback {
  max-width: 825px;
  margin: 0 auto;
  padding-top: 80px;
}

.feedback-show_top {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.feedback-show_top .go-back {
  margin-bottom: 0;
}

.feedback-show_top .add-link {
  background-color: #4661e6;
}

.feedback-show_top .add-link:hover {
  background-color: #7c91f9;
}
</style>
