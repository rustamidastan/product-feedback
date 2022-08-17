<template>
  <div class="comments" v-if="comments">
    <h3>{{ comments.length }} Comments</h3>
    <div v-if="comments">
      <SingleComment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script>
import SingleComment from "./SingleComment.vue";
export default {
  components: { SingleComment },
  props: ["comments"],
};
</script>

<style>
.comments {
  padding: 24px 34px;
  margin-bottom: 24px;
  border-radius: 10px;
  background-color: var(--white);
}

.comments h3 {
  margin-bottom: 28px;
  font-size: 18px;
  line-height: 26px;
  font-weight: 700;
  letter-spacing: -0.25px;
  color: var(--heading-color);
}
</style>
