<template>
  <div class="hwrap black1">
    <header-title ></header-title>
    <sub-card></sub-card>
  </div>
</template>
<script>
import headerTitle from './sub/headerTitle.vue'
import subCard from './sub/subCard.vue'
export default {
  components: { subCard, headerTitle },
}
</script>
<style lang="scss" scoped>
div.hwrap {
  height:3.3rem;
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  background: linear-gradient(
    90deg,
    rgba(41, 123, 205, 1),
    rgba(64, 157, 229, 1)
  );
}
</style>
