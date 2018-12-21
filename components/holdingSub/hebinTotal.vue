<template>
  <view>总计共{{total}}笔</view>
</template>
<script>
export default {
  props: ['total']
}
</script>
<style scoped>
view {
  height: 64upx;
  font-size: 13px;
  color: rgba(136, 136, 136, 1);
  line-height: 64upx;
  text-align: center;
  border-top: 1px solid #f5f5f5;
  background: rgba(255, 255, 255, 1);
  margin-bottom: 12upx;
}
</style>
