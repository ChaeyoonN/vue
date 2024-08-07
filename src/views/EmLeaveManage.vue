<template>
  <div>
    <h1>직원휴가관리</h1>
    <v-container>
      <v-data-table :items="items"></v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "EmLeaveManage",
  data() {
    return {
      items: [
        { name: "John Doe", age: 30 },
        { name: "Jane Smith", age: 25 },
      ],
    };
  },
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
