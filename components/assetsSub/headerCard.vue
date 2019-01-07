<template>
  <view class="subWrap ">
    <view class="panel1">
      <h2>可用资金（元）</h2>
      <h1>{{transmoney.enable_money}}</h1><h1 v-if='!transmoney.enable_money'>0.00</h1>
      <view class="h3">
        <text>总资产</text>
        <text>{{transmoney.dta_money}}</text><text v-if='!transmoney.enable_money'>0.00</text>
      </view>
    </view>
    <view class="panel2 uni-flex">
      <view>
        <h4>{{transmoney.royalty_money}}</h4><h4 v-if='!transmoney.enable_money'>0.00</h4>
        <h4>权益金</h4>
      </view>
      <view>
        <h4>{{transmoney.freeze_money}}</h4><h4 v-if='!transmoney.enable_money'>0.00</h4>
        <h4>冻结金</h4>
      </view>
      <view>
        <h4>{{transmoney.add_fee_money}}</h4><h4 v-if='!transmoney.enable_money'>0.00</h4>
        <h4>管理费</h4>
      </view>
    </view>
    <view class="uni-flex btn2">
      <view class="hasBorder" @tap='go(1)'>
        <image src="/static/assetsImg/recharge.png"/>
        <text>充值</text>
      </view>
      <view  @tap='go(2)'>
        <image src="/static/assetsImg/withdraw.png"/>
        <text>提现</text>
      </view>
    </view>
  </view>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {

    }
  },
  computed: mapState(['sid']),
  props: ['transmoney'],
  methods: {
    go(i) {
      if(!this.sid){
        this.$tipLogin()
        return
      }
      switch (i) {
        case 1:
          uni.navigateTo({ url: '/pages/assets_sub/recharge/recharge' })
          break
        case 2:
          uni.navigateTo({ url: '/pages/assets_sub/withdraw/withdraw' })
          break
      }
    }
  },
  created() {

  },

}
</script>
<style lang="scss" scoped>
view.subWrap {
  margin: 12upx 22upx;
  .panel1 {
    background: linear-gradient(
      0deg,
      rgba(41, 123, 205, 1),
      rgba(64, 157, 229, 1)
    );
    border-radius: 20upx 20upx 0px 0px;
    text-align: center;
    color: #fff;
    h2 {
      font-size: 14px;
      margin: 0;
    }
    h1 {
      font-size: 28px;
      font-family: ArialMT;
      line-height: 28px;
      font-weight: bold;
      margin: 20upx 0;
    }
    view.h3 {
      font-size: 14px;
    }
  }
  .panel2 {
    background: rgba(41, 123, 205, 1);
    color: #fff;
    padding: 30upx 0;
    justify-content: space-around;
    h4 {
      font-size: 14px;
      font-weight: normal;
    }
    h4:first-child {
      font-size: 15px;
    }
  }
  view.btn2 {
    background-color: #fff;
    padding: 19upx 0;
    border-radius: 0 0 20upx 20upx;
    text {
      font-size: 15px;
      vertical-align: middle;
    }
    > view {
      text-align: center;
      flex-grow: 1;
    }
    view.hasBorder {
      border-right: solid 1px #e6e6e6;
    }
    image {
      width: 44upx;
      height: 44upx;
      vertical-align: middle;
      margin-right: 23upx;
    }
  }
}
</style>
