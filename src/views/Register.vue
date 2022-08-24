<template>
  <div class="register">
    <div class="register__container">
      <div class="register__title">
        <h2>Sign Up</h2>
      </div>

      <form class="register__form" @submit.prevent="register">
        <div>
          <label>Full Name:</label>
          <input type="text" v-model="name" required />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" v-model="username" required />
          <p class="error" v-if="errors.username">{{ errors.username[0] }}</p>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" v-model="email" required />
          <p class="error" v-if="errors.email">{{ errors.email[0] }}</p>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <div>
          <label>Password Confirmation:</label>
          <input type="password" v-model="passwordConfirmation" required />
          <p class="error" v-if="errors.password">{{ errors.password[0] }}</p>
        </div>

        <div class="submit-btns">
          <router-link to="/">Home</router-link>
          <router-link to="/login">Sign in</router-link>
          <button type="submit">Create Account</button>
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
      name: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: {
        email: "",
        username: "",
        password: "",
      },
    };
  },

  methods: {
    async register() {
      try {
        const res = await axios.post(
          "https://productfeedback-app-api.herokuapp.com/api/register",
          {
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password,
            password_confirmation: this.passwordConfirmation,
          }
        );

        if (res.status == 201) {
          this.$store.commit("SET_USER_DATA", res.data);
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
.register {
  padding-top: 30px;
}
.register__container {
  max-width: 750px;
  margin: 0 auto;
  padding: 0 20px;
}

.register__title {
  background-color: var(--home-header-bg);
  padding: 15px 0;
  border-radius: 8px;
  margin-bottom: 30px;
}

.register__title {
  text-align: center;
  font-size: 20px;
  color: var(--white);
}

.register__form {
  padding: 40px;
  margin: 0 auto;
  border: 1px solid var(--home-header-bg);
  border-radius: 8px;
}

.register__form div {
  max-width: 400px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.register__form input {
  width: 400px;
  height: 40px;
  padding: 0 15px;
  border: none;
  outline: none;
  color: var(--text-color);
}

.register__form label {
  display: block;
  margin-bottom: 10px;
}

.register__form button {
  display: block;
  padding: 12.5px 25px;
  margin-left: auto;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  color: var(--secondary-white);
  transition: all 0.3s ease;
  text-align: center;
  background-color: var(--add-bg-color);
  border: none;
  cursor: pointer;
}

.register__form button:hover {
  background-color: var(--add-bg-hover);
}

.register__form .submit-btns {
  margin-top: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
}

.register__form .submit-btns a {
  font-weight: 700;
  color: var(--add-bg-color);
  transition: all 0.3s ease;
  text-decoration: none;
}

.register__form .submit-btns a:hover {
  color: var(--add-bg-hover);
  text-decoration: underline;
}

.register__form .submit-btns a:first-child {
  margin-right: 20px;
}

.error {
  font-size: 12px;
  margin-top: 5px;
  line-height: 1;
  color: red;
}
</style>
