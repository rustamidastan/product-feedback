<template>
  <div class="edit">
    <div class="edit__container">
      <router-link to="/" class="go-back">Go Back</router-link>

      <div class="edit-form__wrapper">
        <h2 class="title">Editing ‘Add a dark theme option’</h2>

        <form class="edit-form" @submit.prevent="handleForm">
          <div>
            <h4 class="form-title">Feedback Title</h4>
            <p class="form-def">Add a short, descriptive headline</p>
            <input type="text" v-model="feedback.title" />
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
          </div>

          <div>
            <h4 class="form-title">Update Status</h4>
            <p class="form-def">Change feedback state</p>
            <div class="form-category">
              <div class="current-category" @click="statusSelect = true">
                <span>{{ currentStatus }}</span>
                <img
                  src="../assets/bottom-icon.png"
                  :class="{ active: statusSelect }"
                />
              </div>
              <div class="category-select" v-if="statusSelect">
                <div
                  class="category-option"
                  v-for="status in statusList"
                  :key="status"
                  @click="changeStatus(status)"
                  :class="{ active: status == currentStatus }"
                >
                  {{ status }}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 class="form-title">Feedback Detail</h4>
            <p class="form-def">
              Include any specific comments on what should be improved, added,
              etc.
            </p>
            <textarea v-model="feedback.body"></textarea>
          </div>

          <div class="edit-form__btns">
            <button type="button" class="delete-btn" @click="destroy">
              Delete
            </button>
            <router-link to="/">Cancel</router-link>
            <button type="submit" class="add-link">Add Feedback</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      feedback: {},
      currentCategory: "",
      categoryList: ["Feature", "UI", "UX", "Enhancement", "Bug"],
      categorySelect: false,
      currentStatus: "",
      statusList: ["Suggestion", "Planed", "In-Progress", "Live"],
      statusSelect: false,
      title: "",
      body: "",
    };
  },
  mounted() {
    axios
      .get(
        "https://productfeedback-app-api.herokuapp.com/api/feedbacks/" + this.id
      )
      .then((response) => {
        this.feedback = response.data;
        this.currentCategory = this.feedback.feedback_type;
        this.currentStatus = this.feedback.roadmap_status;
      })
      .catch((err) => console.log(err.message));
  },

  methods: {
    changeCategory(category) {
      this.currentCategory = category;
      this.categorySelect = false;
    },
    changeStatus(status) {
      this.currentStatus = status;
      this.statusSelect = false;
    },

    async handleForm() {
      this.feedback.feedback_type = this.currentCategory;
      this.feedback.roadmap_status = this.currentStatus;
      const uri =
        "https://productfeedback-app-api.herokuapp.com/api/feedbacks/" +
        this.id;
      await axios.put(uri, this.feedback).then(() => {
        this.$store.commit("EDIT_FEEDBACKS", this.feedback);
        this.$router.push({ name: "Feedback", params: { id: this.id } });
      });
    },

    async destroy() {
      const uri =
        "https://productfeedback-app-api.herokuapp.com/api/feedbacks/" +
        this.id;
      await axios.delete(uri, this.feedback).then(() => {
        this.$store.commit("CHANGE_FEEDBACKS", this.feedback.id);
        this.$router.push("/");
      });
    },
  },
};
</script>

<style>
.edit {
  padding-top: 92px;
}

.edit__container {
  max-width: 540px;
  margin: 0 auto;
}

.edit-form__wrapper {
  position: relative;
  width: 100%;
  background-color: var(--white);
  padding: 52px 42px 40px 42px;
  border-radius: 10px;
}

.edit-form__wrapper::before {
  position: absolute;
  top: -28px;
  content: "";
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: url(../assets/edit-icon.png),
    radial-gradient(
      128.88% 128.88% at 103.9% -10.39%,
      #e84d70 0%,
      #a337f6 53.09%,
      #28a7ed 100%
    );
  background-repeat: no-repeat;
  background-position: center;
}

.edit-form__wrapper .title {
  color: var(--heading-color);
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.33px;
  margin-bottom: 40px;
}

.edit-form input[type="text"] {
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

.edit-form input[type="text"]:focus {
  border-color: #4661e6;
}

.edit-form textarea {
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

.edit-form textarea:focus {
  border-color: #4661e6;
}

.edit-form__btns {
  display: flex;
  align-items: center;
}

.edit-form__btns a,
.delete-btn {
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

.edit-form__btns a:hover {
  background-color: #656ea3;
}

.delete-btn {
  background-color: #d73737;
  border: none;
  margin-left: 0;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #e98888;
}

.edit-form__btns .add-link {
  border: none;
  cursor: pointer;
}
</style>
