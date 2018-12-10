<template>
  <view class="uni-flex">
    <view class="v1" hover-class="self-hover">开仓</view>
    <view class="v2" hover-class="self-hover">平仓</view>
  </view>
</template>
<style lang="scss" scoped>
view.uni-flex {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 98upx;
  font-size: 16px;
  text-align: center;
  .v1 {
    line-height: 98upx;
    background-color: #409de5;
    width: 50%;
  }
  .v2 {
    line-height: 98upx;
    width: 50%;
    background-color: #e6aa12;
  }
  color: rgba(255, 255, 255, 1);
}
</style>
