<template>
  <div class="register">
    <div class="register__container">
      <div class="register__title">
        <h2>Sign in</h2>
      </div>

      <form class="register__form" @submit.prevent="login">
        <div>
          <label>Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" v-model="password" required />
        </div>

        <p class="error" v-if="error" style="text-align: center">{{ error }}</p>

        <div class="submit-btns">
          <router-link to="/">Home</router-link>
          <router-link to="/register">Sign up</router-link>
          <button>Sign in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },

  methods: {
    async login() {
      try {
        const res = await axios.post(
          "https://productfeedback-app-api.herokuapp.com/api/login",
          {
            email: this.email,
            password: this.password,
          }
        );

        if (res.status == 201) {
          this.$store.commit("SET_USER_DATA", res.data);
          timeout: 2000;
          this.$router.push("/");
        }
      } catch (error) {
        this.error = "Invalid email or password";
      }
    },
  },
};
</script>

<style></style>
