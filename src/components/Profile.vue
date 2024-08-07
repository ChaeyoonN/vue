<template>
  <div>
    <h1>Profile</h1>
    <div v-if="user">
      <p>Username: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
      <!-- 필요한 다른 정보 추가 -->
    </div>
    <button @click="logout">
      Logout
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "UserProfile",
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    if (!this.user) {
      this.$router.push("/login");
    }
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
h1 {
  color: #42b983;
}
</style>
