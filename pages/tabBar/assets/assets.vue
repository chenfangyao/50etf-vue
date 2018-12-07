<template>
	<view class="wrap">
    <base-header title="资产"></base-header>
    <header-card></header-card>
    <view class="info">
      <view>权益金</view>
      <view class="uni-flex">
        <text>权益金</text>
        <text>1,104,612.64</text>
      </view>
      <view class="uni-flex">
        <text>盈亏</text>
        <text class="hasColor">- 1,000,000</text>
      </view>
    </view>
    <view class="info">
      <view>冻结金</view>
      <view class="uni-flex">
        <text>委托金</text>
        <text>25,765,00</text>
      </view>
      <view class="uni-flex">
        <text>提现金额</text>
        <text >3,535.65</text>
      </view>
    </view>
	</view>
</template>

<script>
import baseHeader from '@/components/base_header.vue'
import headerCard from '@/components/assetsSub/headerCard.vue'
export default {
  data() {
    return {

    };
  },
  components: {
    baseHeader, headerCard
  }
}
</script>

<style lang="scss" scoped>
view.wrap {
  background-color: #f5f5f5;
  height: calc(100vh - 70upx);
  view.info {
    margin-bottom: 12upx;
    > view {
      background-color: #fff;
      height: 64upx;
      line-height: 64upx;
      display: flex;
      justify-content: space-between;
      padding: 0 26upx;
      margin-bottom: 1px;
      font-size: 30upx;
      font-family: MicrosoftYaHei;
      color: rgba(24, 28, 40, 1);
    }
    > view:first-child {
      font-size: 26upx;
      font-family: MicrosoftYaHei;
      color: rgba(112, 118, 128, 1);
    }
    text.hasColor{
      color: #3ABA8F;
    }
  }
}
</style>
