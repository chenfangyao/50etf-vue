<template>
	<view class="wrap">
		<base-header title="平仓结算" has-back='1'></base-header>
    <view class="title">
      <text class="nameTxt">XD购12月2892A</text>
      <text class="codeTxt">10001409</text>
    </view>
    <view class="buy uni-flex">
      <view class="leftPart">
        <view class="subTitle">买入</view>
        <view class="uni-flex ">

          <view class="uni-flex flexColumn txt">
            <text>价格：</text>
            <text>权利金：</text>
          </view>
          <view class="uni-flex flexColumn">
            <text>0.004</text>
            <text>4.08</text>
          </view>
        </view>
      </view>
      <view class="rightPart">
        <view class="time">2018-08-08 10:30:30</view>
        <view>
          <text class='txt'>数量：</text>
          <text>1张</text>
        </view>
      </view>
    </view>
    <view class="sell uni-flex">
      <view class="leftPart">
        <view class="subTitle">卖出</view>
        <view class="uni-flex ">

          <view class="uni-flex flexColumn txt">
            <text>价格：</text>
            <text>权利金：</text>
          </view>
          <view class="uni-flex flexColumn">
            <text>0.004</text>
            <text>4.08</text>
          </view>
        </view>
      </view>
      <view class="rightPart">
        <view class="time">2018-08-08 10:30:30</view>
        <view>
          <text class='txt'>数量：</text>
          <text>12张</text>
        </view>
      </view>
    </view>
    <view class="uni-flex lastLine">
      <view class="uni-flex">
        <text>合约乘数：</text>
        <text>缴纳手续费：</text>
        <text>合约盈亏：</text>
        <text>缴纳保证金：</text>
        <text>总净值：</text>
      </view>
      <view class="uni-flex">
        <text>10202</text>
        <text>4.00</text>
        <text>4.08</text>
        <text>4.08</text>
        <text>-2.98</text>
      </view>
    </view>
    </view>
	</view>
</template>

<script>
import filterList from '@/components/holdingSub/filterList.vue';
import uniLoadMore from '@/components/uni-load-more.vue';

export default {
  data() {
    return {
    };
  },
  methods: {
    go() {
      uni.navigateTo({ url: '../ping_c_item/ping_c_item' })
    },
  },

}
</script>

<style lang="scss" scoped>
view.wrap {
  min-height: 100vh;
  background-color: #f5f5f5;
  view.title {
    color: rgba(51, 51, 51, 1);
    font-size: 16px;
    font-family: Arial-BoldMT;
    font-weight: bold;
    margin: 12upx 0 1px;
    height: 90upx;
    line-height: 90upx;
    background-color: #fff;
    padding-left: 26upx;
  }
  .buy,
  .sell {
    justify-content: space-between;
    background-color: #fff;
    margin-bottom: 12upx;
    padding: 36upx;
    font-size: 12px;
    view.subTitle {
      font-size: 16px;
      line-height: 16px;
      font-weight: bold;
      margin-bottom: 28upx;
      color: rgba(102, 102, 102, 1);
    }

    view.time {
      font-size: 11px;
      font-family: ArialMT;
      color: rgba(153, 153, 153, 1);
    }
    view.flexColumn {
      flex-direction: column;
    }
    .txt {
      color: #888;
      margin-right: 19upx;
    }
    view.rightPart {
      justify-content: space-between;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
  view.lastLine {
    background-color: #fff;
    padding: 30upx;
    > view {
      flex-direction: column;
      line-height: 52upx;
      color: #181c28;
    }
    > view:first-child {
      font-size: 12px;
      color: rgba(136, 136, 136, 1);
      margin-right: 19upx;
    }
  }
}
</style>
