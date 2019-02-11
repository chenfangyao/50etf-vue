<template>
  <div>总计共{{total}}笔</div>
</template>
<script>
export default {
  props: ['total']
}
</script>
<style scoped>
div {
  height:.64rem;
  font-size: 13px;
  color: rgba(136, 136, 136, 1);
  line-height:.64rem;
  border-top: 1px solid #f5f5f5;
  padding-left:.26rem;
  background: rgba(255, 255, 255, 1);
}
</style>
