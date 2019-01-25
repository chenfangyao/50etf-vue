<template>
  <div class="hwrap">
    <div class="h44"></div>
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
  height:3.28rem;
  background: linear-gradient(
    90deg,
    rgba(41, 123, 205, 1),
    rgba(64, 157, 229, 1)
  );
  
  .h44{
    height: 44px;
  }
}
</style>
