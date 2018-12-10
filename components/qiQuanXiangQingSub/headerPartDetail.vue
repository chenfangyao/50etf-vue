<template>
  <view class="wrap">
    <view class="line1 uni-flex">
      <view>
        <text>最高</text>
        <text>0.2129</text>
      </view>
      <view>
        <text>最低</text>
        <text>0.1868</text>
      </view>
      <view>
        <text>剩余天数</text>
        <text>1天</text>
      </view>
    </view>
    <view class="line2 uni-flex">
      <view>
        <text>行权日</text>
        <text>20180627</text>
      </view>
      <view>
        <text>行权价格</text>
        <text>2.2500</text>
      </view>
      <view>
        <text>合约单位</text>
        <text>10000</text>
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
view.wrap {
  margin: 22upx 0 0 25upx;
  transition: height 300ms;
  height: 43.2px;
  overflow: hidden;
  text:first-child {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(112, 118, 128, 1);
    width: 48px;
  }
  text:last-child {
    font-size: 12px;
    flex-grow: 1;
    margin-left: 15upx;
    font-family: ArialMT;
    color: rgba(24, 28, 40, 1);
  }
  view.uni-flex {
    justify-content: space-between;
    flex-grow: 1;
    > view {
      display: flex;
      width: 32%;
      justify-content: space-between;
    }
  }
}
</style>
