<template>
  <view class="wrap">
    <view class="title">费用总计</view>
    <view class="uni-flex row">

      <view class="uni-flex col hasMargin">
        <text>手续费：</text>
        <text>冻结权利金：</text>
      </view>
      <view class="uni-flex col">
        <text>￥{{feemoney.feemoney}}</text>
        <text>￥{{feemoney.djmoney}}</text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {}
  },
    props:['feemoney']

}
</script>
<style lang="scss" scoped>
view.wrap {
  padding: 30upx 33upx;
  background-color: #fff;
  view.title {
    font-size: 16px;
    font-weight: bold;
    line-height: 16px;
    color: rgba(102, 102, 102, 1);
  }
  view.row {
    justify-content: space-between;
    margin-top: 35upx;
    view.uni-flex.col {
      justify-content: space-between;
      height: 82upx;
      flex-direction: column;

      > text {
        line-height: 12px;
        font-size: 12px;
      }
    }
    > view:nth-child(2) {
      color: rgba(102, 102, 102, 1);
    }
    > view:first-child {
      color: rgba(24, 28, 40, 1);
    }
  }
}
</style>
