<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="username">Username:</label>
        <input id="username" v-model="username" type="text" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "EmRegister",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["register"]),
    async register() {
      try {
        await this.register({
          username: this.username,
          password: this.password,
        });
        this.$router.push("/login");
      } catch (error) {
        alert("Registration failed. Please try again.");
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
