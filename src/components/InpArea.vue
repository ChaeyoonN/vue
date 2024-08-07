<template>
  <div class="hello">
    <input :value="msg" @input="$emit('update:msg', $event.target.value)" />
  </div>
</template>

<script>
export default {
  name: "InpArea",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
