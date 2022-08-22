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

@media screen and (max-width: 850px) {
  .home__container {
    flex-direction: column;
    padding-top: 56px !important;
  }
  .navbar {
    display: flex;
    margin-bottom: 40px;
  }

  .navbar-links {
    margin: 0;
  }

  .navbar-title,
  .navbar-links,
  .navbar-roadmap {
    width: 233px;
    height: 178px;
  }

  .navbar-title {
    padding-top: 103px;
  }

  .navbar-desc {
    width: 67%;
    display: flex;
    justify-content: space-between;
  }

  .navbar-desc .navbar-links {
    margin: 0 auto;
  }
}
</style>
