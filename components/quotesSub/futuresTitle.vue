<template>
  <view class="uni-flex wrap">
    <text>涨跌(%)</text>
    <text>现价</text>
    <view class="uni-flex">
      <text class="gou">购</text>
      <text class="mlr">行权价</text>
      <text class="gu">沽</text>
    </view>
    <text>现价</text>
    <text>涨跌(%)</text>
  </view>
</template>
<style lang="scss" scoped>
view.wrap {
  justify-content: space-between;
  padding: 18upx 25upx;
  border-bottom: 1px solid #f5f5f5;
  text {
    font-size: 12px;
    color: rgba(31, 31, 38, 1);
    text-align: center;
  }
  text.mlr{
    margin: 0 33upx;
  }
  .gou,
  .gu {
    color: #fff;
    background: rgba(240, 95, 92, 1);
    border-radius: 5px;
    height: 37upx;
    width: 37upx;
    line-height: 37upx;
    text-align: center;
    display: inline-block;
    align-self: center;
  }
  .gu{
    background: #3ABA8F;
  }
}
</style>
