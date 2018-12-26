<template>
  <view class=" self-mask">
    <view class="wrap">
      <image v-if="isErr" src='/static/holdingImg/cedan-err.png'></image>
      <image v-else src='/static/holdingImg/cedan-succ.png'></image>
      <view>{{isErr?'交易已完成，撤单失败':'撤单成功'}}</view>
    </view>
  </view>
</template>
<script>
export default {
  props: ['isErr'],

}
</script>
<style lang="scss" scoped>
view.wrap {
  width: 380upx;
  height: 380upx;
  background-color: #fff;
  border-radius: 10upx;
  margin: 50% auto 0;
  text-align: center;
  image {
    width: 150upx;
    height: 150upx;
    margin: 80upx 0 36upx;
  }
  view {
    font-size: 15px;
    color: rgba(24, 28, 40, 1);
    line-height: 15px;
  }
}
</style>
