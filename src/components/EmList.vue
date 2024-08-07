<template>
  <!-- employee-list.html -->
  <div class="employee-list-container">
    <h2>인사목록</h2>
    <div class="search-container">
      <input id="search" type="text" placeholder="검색..." />
      <button id="search-btn">검색</button>
    </div>
    <div class="filter-container">
      <!-- 필터 옵션 (부서, 상태 등) -->
    </div>
    <table id="employee-table">
      <thead>
        <tr>
          <th>이름</th>
          <th>이메일</th>
          <th>부서</th>
          <th>상태</th>
          <th>액션</th>
        </tr>
      </thead>
      <tbody>
        <!-- 직원 목록 데이터 -->
      </tbody>
    </table>
    <button id="add-employee-btn">직원 추가</button>
  </div>
</template>

<script>
export default {
  name: "EmList",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
