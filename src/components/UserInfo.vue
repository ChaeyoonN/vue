<template>
  <div>
    <h1>나의 인사정보</h1>
    <table>
      <tr>
        <th>사용자 ID</th>
        <td>{{ user.username }}</td>
      </tr>
      <tr>
        <th>이름</th>
        <td>{{ user.first_name }} {{ user.last_name }}</td>
      </tr>
      <tr>
        <th>부서</th>
        <td>{{ user.department }}</td>
      </tr>
      <tr>
        <th>직위</th>
        <td>{{ user.position }}</td>
      </tr>
      <tr>
        <th>이메일</th>
        <td>{{ user.email }}</td>
      </tr>
      <tr>
        <th>휴가일수</th>
        <td>{{ user.left_leave_days }} / {{ user.total_leave_days }}</td>
      </tr>
    </table>
    <button @click="requestUpdate">
      정보수정요청
    </button>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props: {
    user: Object,
  },
  methods: {
    requestUpdate() {
      alert("정보수정요청이 관리자에게 전송되었습니다.");
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #358a62;
}
</style>
