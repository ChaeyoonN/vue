<!-- 라우터를 사용하는 컴포넌트에서는 router-view와 router-link를 사용하여 네비게이션을 처리 -->
<template>
  <v-app>
    <v-app-bar app color="#4f81bd" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>My App</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/"> 홈 </router-link>
      <router-link to="/login"> 로그인 </router-link>
      <router-link to="/register"> 회원가입 </router-link>
      <router-link to="/profile"> 프로필 </router-link>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item link title="List Item 1"></v-list-item>
        <v-list-item link title="List Item 2"></v-list-item>
        <v-divider></v-divider>
        <v-list-item link title="List Item 3"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  //name: "App",
  components: {},
  data() {
    return {
      drawer: false, // 사이드바의 열림/닫힘 상태
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

nav {
  padding: 15px;
  background-color: #4f81bd;
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
