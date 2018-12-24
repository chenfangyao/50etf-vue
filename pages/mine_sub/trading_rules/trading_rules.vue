<template>
  <view>
    <base-header title="交易规则" has-back='1'></base-header>
    <view class="border1"></view>
    <view class="title">交易条目</view>
    <view class="content">交易时间：每天9：30至15：00系统都会接受买卖委托。当日15：00－16：00为计算排名时间，同时本系统将自动清空委托库，在这段时间内的提交的委托为无效委托，此前未能成交的委托也一并被清空。系统在交易日的15:00－ ...</view>
    <view class="title">交易条目</view>
    <view class="content">交易时间：每天9：30至15：00系统都会接受买卖委托。当日15：00－16：00为计算排名时间，同时本系统将自动清空委托库，在这段时间内的提交的委托为无效委托，此前未能成交的委托也一并被清空。系统在交易日的15:00－ ...</view>
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
view.border1 {
  border-bottom: 1px solid #ededed;
}
view.title {
  font-size: 16px;
  padding: 0 43upx;
  color: rgba(24, 28, 40, 1);
  margin: 50upx 0 34upx;
  line-height: 16px;
}
view.content {
  font-size: 15px;
  color: rgba(112, 118, 128, 1);
  line-height: 58upx;
  padding: 0 43upx;
  
}
</style>

