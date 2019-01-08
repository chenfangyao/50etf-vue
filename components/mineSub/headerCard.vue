<template>
  <view class="hwrap">
    <view class="h44"></view>
    <header-title :newlength='newlength'></header-title>
    <sub-card></sub-card>
  </view>
</template>
<script>
import headerTitle from './sub/headerTitle.vue'
import subCard from './sub/subCard.vue'
export default {
  components: { subCard, headerTitle },
	props:['newlength'],
}
</script>
<style lang="scss" scoped>
view.hwrap {
  height: 328upx;
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
