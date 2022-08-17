<template>
  <div class="feedback-container no-feedback">
    <div class="no-feedback__content">
      <img src="../assets/no-feedback-icon.svg" alt="no feedback" />
      <h2>There is no feedback yet.</h2>
      <p>
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <router-link class="add-link" to="/create">+ Add Feedback</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.no-feedback {
  background-color: var(--white);
  height: 600px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-feedback__content {
  max-width: 410px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.no-feedback__content img {
  margin-bottom: 53px;
}

.no-feedback__content h2 {
  margin-bottom: 16px;
}

.no-feedback__content p {
  margin-bottom: 48px;
  text-align: center;
}
</style>
