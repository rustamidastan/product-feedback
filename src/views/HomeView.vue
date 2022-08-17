<template>
  <div class="home">
    <div class="container home__container">
      <aside>
        <Navbar />
      </aside>
      <div class="home-feedbacks">
        <FeedbackWrapper />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import FeedbackWrapper from "@/components/FeedbackWrapper.vue";
export default {
  name: "HomeView",
  components: { Navbar, FeedbackWrapper },
};
</script>

<style>
.home__container {
  padding-top: 95px !important;
  display: flex;
  justify-content: space-between;
}
</style>
