<template>
  <nav>
    <router-link to="/">
      Home
    </router-link>
    <router-link to="/login">
      Login
    </router-link>
    <router-link to="/register">
      Register
    </router-link>
    <router-link to="/profile">
      Profile
    </router-link>
    <button
      v-if="isAuthenticated"
      @click="logout"
    >
      Logout
    </button>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    ...mapActions(["logout"]),
    logout() {
      this.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  gap: 10px;
}

router-link {
  text-decoration: none;
  color: #42b983;
}

router-link:hover {
  text-decoration: underline;
}

button {
  background-color: transparent;
  border: none;
  color: #42b983;
  cursor: pointer;
}

button:hover {
  text-decoration: underline;
}
</style>
