<template>
  <div>
    <h3
      class="bg-yellow"
      :style="textRed"
    >
      {{ title }}
    </h3>
    <p>개봉: {{ year }}</p>
    <p>장르: {{ category }}</p>
  </div>
</template>

<script>
export default {
  name: "MovieInfo",
  data() {
    return {
      foods: ["김밥", "만두", "순대"],
      title: "노량",
      year: 2023,
      category: "액션, 드라마",
      textRed: "color: red",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg-yellow {
  background: gold;
  padding: 10px;
}
</style>
