<template>
  <!-- router를 통해 보여주는 컴포넌트는
views폴더에 넣고, 그것이 아니라면 components폴더에 넣는것! -->
  <div>
    <h1>Home</h1>
    <p>Welcome to the home page!</p>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
