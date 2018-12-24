<template>
	<view class="wrap">
	  <base-header title="账户充值" right-txt='限额规则' has-back='1'></base-header>
    <view class="rechargeWay uni-flex">
      <view class="zhifubao"></view>
      <view class="txt">
        <view>支付宝</view>
        <view>
          <text>提示限额</text>
          <text>（0-50,000）</text>
        </view>
      </view>
      <image class="to_r" src='/static/arrow/r.png'></image>
    </view>
    <view class="panel">
      <view class="inputContainer">
        <input-item placeholderTxt='充值金额'  v-model="money" @now-blur='handleBlur' @now-change="handChange"></input-item>
        <text>￥</text>
      </view>
      <view class="overage">
        <text>账户余额：</text>
        <text>13.00元</text>
      </view>
      <view class="priceItem uni-flex">
        <view>10 元</view>
      </view>
    </view>
	</view>
</template>

<script>
import inputItem from '@/components/commonResgLog/inputItem.vue'

export default {
  components: { inputItem },
  data() {
    return {
      money: '',
      priceLists:[,,,,,]

    }
  },
  methods: {
    handleBlur() { },
    handChange() { },
  }
}
</script>

<style lang="scss" scoped>
view.wrap {
  height: 100vh;
  background-color: #f5f5f5;
  view.rechargeWay {
    height: 140upx;
    background-color: #fff;
    margin: 12upx 0;
    align-items: center;
    .zhifubao {
      width: 76upx;
      height: 76upx;
      margin: 0 35upx 0 46upx;
      background-color: #409de5;
    }
    view.txt {
      flex-grow: 1;
      view {
        font-size: 15px;
        color: rgba(24, 28, 40, 1);
        line-height: 33upx;
        margin-bottom: 8upx;
      }
      text {
        margin-right: 8upx;
        font-size: 12px;
        color: rgba(168, 168, 168, 1);
        line-height: 28upx;
      }
    }
    image.to_r {
      width: 25upx;
      margin-right: 24upx;
      height: 30upx;
    }
  }
  view.panel {
    padding: 0.1px 46upx;
    background-color: #fff;
    view.inputContainer {
      padding-top: 100upx;
      position: relative;
      > text {
        font-size: 18px;
        color: rgba(24, 28, 40, 1);
        line-height: 33upx;
        position: absolute;
        left: -15px;
        top: 110upx;
      }
    }
    view.overage {
      font-size: 14px;
      color: rgba(136, 138, 161, 1);
      line-height: 14px;
    }
    view.priceItem{
      
    }
  }
}
</style>
