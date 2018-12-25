<template>
	<view class="wrap">
	  <base-header title="提现"  has-back='1'></base-header>
    <recharge-way :way-lists='wayLists' txt1='尾号1123储蓄卡' go-to='1'></recharge-way>
		<view class="panel">
      <view class="inputContainer">
        <view class="moneyTitle"></view>
        <input type="number" v-model="money">
        <text>￥</text>
      </view>
      <view class="overage">
        <text>可提现余额：</text>
        <text>{{allMoney}}元</text>
        <text class="allWithdraw" @tap='allGet'>全部提现</text>
      </view>
    </view>
    <view class="fixView">
      <btn-block txt='确认提现' @v-tap='doWhat'></btn-block>
      <view class="bottomTip">温馨提示：最少体现金额0.01元</view>

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
      allMoney: '1,104,551.17',
      priceLists: [, , , , , ,],
      priceItem_i: 0,
      wayLists: ['招商银行'],

    }
  },
  methods: {
    handleBlur() { },
    handChange() { },
    doWhat() {
    },
    allGet() {
      this.money = this.allMoney
      this.$refs.allMoneyInput.valtxt = this.allMoney
      this.$refs.allMoneyInput.focusInput = true

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
      padding-top: 100upx ;
      position: relative;
      margin-bottom: 29px;
      input {
        font-size: 32px;
        color: rgba(24, 28, 40, 1);
        line-height: 33px;
        border-bottom: 1px solid #ccc;
        padding:0 0 24upx 20px;
      }
      > text {
        font-size: 18px;
        color: rgba(24, 28, 40, 1);
        line-height: 33upx;
        position: absolute;
        left: -3px;
        top: 110upx;
      }
    }
    view.overage {
      font-size: 14px;
      color: rgba(136, 138, 161, 1);
      line-height: 14px;
      margin-bottom: 49upx;
      text.allWithdraw {
        font-size: 14px;
        color: rgba(64, 157, 229, 1);
        margin-left: 15upx;
      }
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
    bottom: 60upx;
    left: 0;
    right: 0;
    view.bottomTip {
      font-size: 13px;
      color: rgba(64, 157, 229, 1);
      text-align: center;
      line-height: 13px;
      margin-top: 36upx;
    }
  }
}
</style>


