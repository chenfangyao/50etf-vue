<template>
	<view class="wrap">
	  <base-header title="账户充值" right-txt='限额规则' has-back='1'></base-header>
    <recharge-way :way-lists='wayLists' @change-wayi='changeWayI' txt1='提示限额' txt2='（0-50,000）'></recharge-way>
    <view class="panel">
      <view class="inputContainer">
        <view class="moneyTitle">充值金额</view>
        <input type="number" v-model="money" :disabled='inputDisabled'>
        <text>￥</text>
      </view>
      <view class="overage">
        <text>账户余额：</text>
        <text>13.00元</text>
      </view>
      <view class="priceItem uni-flex">
        <view v-for="(item, i) in priceLists" :key="i"  :class="{active:priceItem_i==i}" @tap='choosePriceItem(i)'>{{10*(i+1)}} 元</view>
      </view>
    </view>
    <view class="fixView">
      <btn-block txt='下一步' @v-tap='go'></btn-block>
    </view>
	</view>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
import rechargeWay from '@/components/assetsSub/rechargeWay.vue'

export default {
  components: { btnBlock, rechargeWay },
  data() {
    return {
      money: '',
      priceLists: [, , , , , ,],
      priceItem_i: 0,
      wayLists: ['支付宝', '银行转账'],
      inputDisabled: false
    }
  },
  methods: {
    handleBlur() { },
    handChange() { },
    go() {
      if(this.inputDisabled){
        //对接支付宝
      }else{
        //跳转银行卡页
        uni.navigateTo({url:'/pages/assets_sub/bank_card/bank_card'})
      }
    },
    changeWayI(i) {
      if (i == 0) {//此处判断input禁用是以后端传来的实际字段为主
        this.inputDisabled = true
      } else {
        this.inputDisabled = false
      }
    },
    choosePriceItem(i) {
      this.priceItem_i = i
      this.money = 10*(i+1)//支付宝状态下点击充值金额选项，改变input的值，当前写假的
    }
  }
}
</script>

<style lang="scss" scoped>
view.wrap {
  height: 100vh;
  background-color: #f5f5f5;
  view.panel {
    padding: 0.1px 46upx;
    background-color: #fff;
    view.inputContainer {
      padding-top: 36upx;
      position: relative;
      margin-bottom: 29upx;
      view.moneyTitle {
        font-size: 14px;
        color: rgba(24, 28, 40, 1);
        margin-bottom: 37upx;
      }
      input {
        font-size: 32px;
        color: rgba(24, 28, 40, 1);
        border-bottom: 1px solid #ccc;
        padding: 0 0 20upx 20px;
        height: 32px !important;
      }
      > text {
        font-size: 18px;
        color: rgba(24, 28, 40, 1);
        line-height: 33upx;
        position: absolute;
        left: -3px;
        top: 150upx;
      }
    }
    view.overage {
      font-size: 14px;
      color: rgba(136, 138, 161, 1);
      line-height: 14px;
      margin-bottom: 49upx;
    }
    view.priceItem {
      justify-content: space-between;
      flex-wrap: wrap;
      > view {
        width: 200upx;
        height: 74upx;
        background: rgba(245, 245, 245, 0);
        border: 1px solid rgba(64, 157, 229, 1);
        border-radius: 2upx;
        text-align: center;
        line-height: 74upx;
        font-size: 15px;
        flex-shrink: 0;
        margin-bottom: 36upx;
        color: rgba(64, 157, 229, 1);
      }
      view.active {
        background-color: #409de5;
        color: #fff;
      }
    }
  }
  view.fixView {
    position: fixed;
    bottom: 20upx;
    left: 0;
    right: 0;
  }
}
</style>
