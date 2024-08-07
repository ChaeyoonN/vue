import axios from "axios";

const state = {
  // Vuex 스토어의 상태입니다. token과 user를 관리
  token: localStorage.getItem("token") || "",
  user: {},
};

const mutations = {
  // 상태를 변경하는 메서드들입니다. 동기적으로 상태를 변경
  auth_success(state, token) {
    //로그인 성공 시 token을 설정
    state.token = token;
  },
  auth_error(state) {
    //인증 오류 시 token을 제거
    state.token = "";
  },
  set_user(state, user) {
    //사용자 정보를 설정
    state.user = user;
  },
  logout(state) {
    //로그아웃 시 token과 user를 초기화
    state.token = "";
    state.user = {};
  },
};

const actions = {
  // 비동기 작업을 수행하는 메서드들입니다. API 호출과 같은 작업을 수행
  async login({ commit }, user) {
    //로그인 요청을 보내고, 성공 시 token을 저장하고 설정
    try {
      const response = await axios.post("/api/auth/login", user);
      const token = response.data.accessToken; // Vuex의 login 액션은 서버 응답에서 accessToken을 추출하고,
      localStorage.setItem("token", token); // 이를 localStorage에 저장
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // axios의 기본 헤더에 Authorization 헤더를 설정하여 이후 API 요청에 인증 정보를 포함
      commit("auth_success", token); // 로그인 성공 시 Vuex auth_success 뮤테이션이 호출되어 상태가 업데이트
    } catch (error) {
      commit("auth_error");
      localStorage.removeItem("token");
      throw error;
    }
  },
  async register({ commit }, user) {
    //회원가입 요청을 보냄
    try {
      await axios.post("/api/auth/register", user);
    } catch (error) {
      commit("auth_error");
      throw error;
    }
  },
  logout({ commit }) {
    //로그아웃 작업을 수행하고, token을 제거
    commit("logout");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  },
  async getUser({ commit }) {
    //현재 사용자 정보를 가져옴
    const response = await axios.get("/api/user/me");
    commit("set_user", response.data);
  },
};

const getters = {
  // 상태를 조회하는 메서드들
  isAuthenticated: (state) => !!state.token, //사용자가 인증되었는지 여부를 반환
  user: (state) => state.user, //현재 사용자 정보를 반환
};

export default {
  state,
  mutations,
  actions,
  getters,
}; // auth 모듈을 내보냅니다.
