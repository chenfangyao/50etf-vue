<template>
  <view class="hwrap">
    <view class="occupy"></view>

    <header-title></header-title>
    <sub-card></sub-card>
  </view>
</template>
<script>
import headerTitle from './sub/headerTitle.vue'
import subCard from './sub/subCard.vue'
export default {
  components: { subCard, headerTitle }
}
</script>
<style lang="scss" scoped>
view.hwrap {
  height: 328upx;
  position: relative;
  top: -var(--status-bar-height);
  background: linear-gradient(
    0deg,
    rgba(41, 123, 205, 1),
    rgba(64, 157, 229, 1)
  );
  .occupy {
    height: var(--status-bar-height);
  }
}
</style>
