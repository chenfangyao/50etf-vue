<template>
  <div class="black1">总计共{{total}}笔</div>
</template>
<script>
export default {
  props: ['total']
}
</script>
<style scoped>
div {
  height:0.9rem;
  font-size: 13px;
  color: rgba(136, 136, 136, 1);
  line-height:0.9rem;
  padding-left:.26rem;
}
</style>
