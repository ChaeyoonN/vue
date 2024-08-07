import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import UserLogin from "../views/Login.vue";
import EmRegister from "../views/Register.vue";
import UserProfile from "../views/Profile.vue";

import InsaManage from "../views/Insa.vue";

import DeptManage from "../views/Dept.vue";

import LeaveManage from "../views/Leave.vue";
import LeaveGroupType from "../views/LeaveGroupType.vue";
import LeavePolicy from "../views/Policy.vue";
import EmLeaveManage from "../views/EmLeaveManage.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: UserLogin },
  { path: "/register", component: EmRegister },
  { path: "/profile", component: UserProfile },
  { path: "/insa", component: InsaManage },
  { path: "/dept", component: DeptManage },
  { path: "/leave", component: LeaveManage },
  { path: "/leaveGroupType", component: LeaveGroupType },
  { path: "/leavePolicy", component: LeavePolicy },
  { path: "/emLeaveManage", component: EmLeaveManage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
