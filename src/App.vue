<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>인사관리 서비스</v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>
          <!-- <v-btn icon="mdi-filter" variant="text"></v-btn> -->
        </template>

        <v-btn text :to="{ path: '/login' }" class="nav-btn">로그인</v-btn>
        <v-btn text :to="{ path: '/register' }" class="nav-btn">회원가입</v-btn>

        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>

      <!-- 사이드바 -->
      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <v-list dense>
          <template v-for="item in items" :key="item.route">
            <v-list-item
              v-if="!item.children"
              :class="{ 'active-item': selectedRoute === item.route }"
              :to="item.route"
              link
              @click="selectRoute(item.route)"
            >
              <v-list-item-content>{{ item.title }}</v-list-item-content>
            </v-list-item>

            <!-- 하위 메뉴가 존재한다면 -->
            <template v-if="item.children">
              <v-list-item
                :class="{ 'active-item': selectedRoute === item.route }"
              >
                <v-list-item-content>{{ item.title }}</v-list-item-content>
              </v-list-item>
              <v-list-item
                v-for="child in item.children"
                :key="child.route"
                :class="{ 'active-item': selectedRoute === child.route }"
                :to="child.route"
                link
                @click="selectRoute(child.route)"
                class="child-item"
              >
                <v-list-item-content>{{ child.title }}</v-list-item-content>
              </v-list-item>
            </template>
          </template>

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-content>추가 항목</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100%">
        <!-- <v-card-text>
          The navigation drawer will appear from the bottom on smaller size
          screens.
        </v-card-text> -->
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      selectedRoute: "/",
      items: [
        { title: "홈", route: "/" },
        { title: "인사관리", route: "/insa" },
        { title: "조직관리", route: "/dept" },
        {
          title: "휴가관리",
          route: "/leave",
          children: [
            { title: "휴가그룹및유형", route: "/leaveGroupType" },
            { title: "휴가정책", route: "/leavePolicy" },
            { title: "직원휴가관리", route: "/emLeaveManage" },
          ],
        },
        { title: "로그인", route: "/login" },
        { title: "회원가입", route: "/register" },
        { title: "프로필", route: "/profile" },
      ],
    };
  },
  methods: {
    selectRoute(route) {
      this.selectedRoute = route;
    },
  },
  watch: {
    $route(to) {
      this.selectedRoute = to.path;
    },
  },
  created() {
    this.selectedRoute = this.$route.path;
  },
};
</script>

<style>
/* 전체 앱 스타일 설정 */
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 0px;
}
/* 사이드 바 */
/* 네비게이션 링크 스타일 */
.nav-link {
  text-decoration: none; /* 링크의 밑줄 제거 */
  color: inherit; /* 링크의 색상 제거 */
}

.nav-link:hover .v-list-item-content {
  color: #2c3e50;
}

.v-navigation-drawer .v-list-item:hover {
  background-color: #e0e0e0;
}

/* 클릭된 상태를 유지하는 스타일 */
.active-item .v-list-item-content {
  color: #e0e0e0;
}

/* 하위 항목 스타일 */
.child-item {
  font-size: 0.875rem; /* 글씨 크기를 작게 설정 */
  padding-left: 32px !important; /* 들여쓰기 */
}
</style>
