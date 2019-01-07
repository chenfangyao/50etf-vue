<template>
      <view class="tip" :class="{errclass:errClass}">{{tipContent}}</view>
</template>
<script>
export default {
  props:['errClass','tipContent']
}
</script>

<style scoped>
view.tip {
  font-size: 13px;
  color: rgba(240, 95, 92, 1);
  margin: -36upx 0 32upx;
  height: 36upx;
  opacity: 0;
}
view.tip.errclass {
  opacity: 1;
  transition: opacity 900ms;
}
</style>
