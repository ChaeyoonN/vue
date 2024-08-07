<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input
          id="username"
          v-model="username"
          type="text"
          required
        >
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
        >
      </div>
      <button type="submit">
        Login
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "UserLogin",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    async login() {
      try {
        await this.login({ username: this.username, password: this.password });
        this.$router.push("/profile");
      } catch (error) {
        alert("Login failed. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
