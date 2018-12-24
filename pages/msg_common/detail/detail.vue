<template>
  <view class="wrap">
    <base-header has-back='1'></base-header>
    <view class="title">公司发展方向通知</view>
    <view class="timeTitle">2018-02-08 15:46:59</view>
    <view class="content">上证50指数由上海证券交易所编制，指数简称为上证50，代码000016，基日为2003年12月31日，基点为1000点。2004年1月2日正式发布并于上海证券交易所上市交易。上证50ETF的投资目标是紧密跟踪上证50指数，最小化跟踪偏离度和跟踪误差，代码510050。基金采取被动式投资策略，具体使用的跟踪指数的投资方法主要是完全复制法，追求实现与上证50指数累死的风险与收益特征。</view>
  </view>
</template>

<script>
export default {
  data() {
    return {

    };
  }
}
</script>

<style lang="scss" scoped>
view.wrap {
  text-align: center;
  .title {
    font-size: 20px;
    color: rgba(24, 28, 40, 1);
    padding-top: 51upx;
    border-top: 1px solid #f5f5f5;
  }
  .timeTitle {
    font-size: 13px;
    color: rgba(130, 133, 151, 1);
  }
  .content {
    font-size: 15px;
    color: rgba(24, 28, 40, 1);
    line-height: 58upx;
    margin: 40upx 43upx 0 36upx;
    text-align: left;
  }
}
</style>

