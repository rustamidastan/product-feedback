<template>
  <div class="create">
    <div class="create__container">
      <router-link to="/" class="go-back">Go Back</router-link>

      <div class="create-form__wrapper">
        <h2 class="title">Create New Feedback</h2>

        <form class="create-form" @submit.prevent="handleForm">
          <div>
            <h4 class="form-title">Feedback Title</h4>
            <p class="form-def">Add a short, descriptive headline</p>
            <input type="text" v-model="title" />
          </div>

          <div>
            <h4 class="form-title">Category</h4>
            <p class="form-def">Choose a category for your feedback</p>
            <div class="form-category">
              <div class="current-category" @click="categorySelect = true">
                <span>{{ currentCategory }}</span>
                <img
                  src="../assets/bottom-icon.png"
                  :class="{ active: categorySelect }"
                />
              </div>
              <div class="category-select" v-if="categorySelect">
                <div
                  class="category-option"
                  v-for="category in categoryList"
                  :key="category"
                  @click="changeCategory(category)"
                  :class="{ active: category == currentCategory }"
                >
                  {{ category }}
                </div>
              </div>
            </div>

            <div>
              <h4 class="form-title">Feedback Detail</h4>
              <p class="form-def">
                Include any specific comments on what should be improved, added,
                etc.
              </p>
              <textarea v-model="body"></textarea>
            </div>

            <div class="create-form__btns">
              <router-link to="/">Cancel</router-link>
              <button type="submit" class="add-link">Add Feedback</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      currentCategory: "Feature",
      categoryList: ["Feature", "UI", "UX", "Enhancement", "Bug"],
      categorySelect: false,
      title: "",
      body: "",
    };
  },

  methods: {
    changeCategory(category) {
      this.currentCategory = category;
      this.categorySelect = false;
    },

    async handleForm() {
      try {
        const res = await axios.post(
          "https://productfeedback-app-api.herokuapp.com/api/feedbacks",
          {
            user_id: this.$store.state.user.id,
            title: this.title,
            body: this.body,
            votes: 0,
            feedback_type: this.currentCategory,
            roadmap_status: "Suggestion",
          }
        );

        if (res.status == 201) {
          this.$store.state.feedbacks.push(res.data);
          timeout: 2000;
          this.$router.push("/");
        }
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
  },
};
</script>

<style>
.create {
  padding-top: 92px;
}

.create__container {
  max-width: 540px;
  margin: 0 auto;
}

.go-back {
  margin-bottom: 70px;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  transition: all 0.3s ease;
}

.go-back:hover {
  opacity: 0.9;
  text-decoration: underline;
}

.go-back::before {
  width: 8px;
  height: 12px;
  margin-right: 15px;
  content: "";
  background-image: url(../assets/back-icon.png);
  background-repeat: no-repeat;
  background-position: center;
}

.create-form__wrapper {
  position: relative;
  width: 100%;
  background-color: var(--white);
  padding: 52px 42px 40px 42px;
  border-radius: 10px;
}

.create-form__wrapper::before {
  position: absolute;
  top: -28px;
  content: "";
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: url(../assets/plus-icon.png),
    radial-gradient(
      128.88% 128.88% at 103.9% -10.39%,
      #e84d70 0%,
      #a337f6 53.09%,
      #28a7ed 100%
    );
  background-repeat: no-repeat;
  background-position: center;
}

.create-form__wrapper .title {
  color: var(--heading-color);
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.33px;
  margin-bottom: 40px;
}

.form-title {
  color: var(--heading-color);
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.2px;
  margin-bottom: 2px;
}

.form-def {
  font-size: 14px;
  margin-bottom: 16px;
}

.create-form input[type="text"] {
  width: 100%;
  height: 48px;
  margin-bottom: 24px;
  padding: 12px 0 14px 24px;
  border: 1px solid transparent;
  background-color: var(--body-bg);
  border-radius: 5px;
  color: var(--heading-color);
  outline: transparent;
}

.create-form input[type="text"]:focus {
  border-color: #4661e6;
}

.form-category {
  position: relative;
}

.current-category {
  width: 100%;
  height: 48px;
  margin-bottom: 24px;
  padding: 13px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--body-bg);
  cursor: pointer;
}

.category-select {
  position: absolute;
  top: 64px;
  left: 0;
  z-index: 10;
  background-color: var(--white);
  width: 456px;
  border-radius: 10px;
  box-shadow: 0px 10px 40px -7px rgba(55, 63, 104, 0.350492);
}

.current-category img.active {
  transform: rotateX(180deg);
}

.category-option {
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-option:hover {
  color: #ad1fea;
}

.category-option:not(:last-child) {
  border-bottom: 1px solid rgba(58, 67, 116, 0.15);
}

.category-option.active {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.category-option.active::after {
  content: "";
  width: 20px;
  height: 20px;
  background-image: url(../assets/current-icon.png);
  background-repeat: no-repeat;
}

.create-form textarea {
  width: 100%;
  height: 96px;
  padding: 13px 24px;
  margin-bottom: 32px;
  resize: none;
  border-radius: 5px;
  background-color: var(--body-bg);
  outline: transparent;
  border: 1px solid transparent;
}

.create-form textarea:focus {
  border-color: #4661e6;
}

.create-form__btns {
  display: flex;
  align-items: center;
}

.create-form__btns a {
  text-decoration: none;
  padding: 12.5px 24px;
  margin-right: 16px;
  margin-left: auto;
  border-radius: 10px;
  background-color: var(--heading-color);
  color: var(--body-bg);
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  transition: all 0.3s ease;
}

.create-form__btns a:hover {
  background-color: #656ea3;
}

.create-form__btns .add-link {
  border: none;
  cursor: pointer;
}
</style>
