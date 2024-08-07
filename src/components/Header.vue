<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
      <router-link to="/profile">Profile</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
nav {
  padding: 30px;
  background-color: #42b983;
}

nav a {
  font-weight: bold;
  color: white;
  padding: 0 15px;
}

nav a.router-link-exact-active {
  text-decoration: underline;
}
</style>
