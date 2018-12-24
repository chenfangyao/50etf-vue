<template>
  <view class="subWrap ">
    <view class="panel1">
      <h2>可用资金（元）</h2>
      <h1>{{transmoney.enable_money}}</h1>
      <view class="h3">
        <text>总资产</text>
        <text>{{transmoney.dta_money}}</text>
      </view>
    </view>
    <view class="panel2 uni-flex">
      <view>
        <h4>{{transmoney.royalty_money}}</h4>
        <h4>权益金</h4>
      </view>
      <view>
        <h4>{{transmoney.freeze_money}}</h4>
        <h4>冻结金</h4>
      </view>
      <view>
        <h4>{{transmoney.add_fee_money}}</h4>
        <h4>管理费</h4>
      </view>
    </view>
    <view class="uni-flex btn2">
      <view class="hasBorder" @tap='go(1)'>
        <image src="/static/assetsImg/recharge.png"/>
        <text>充值</text>
      </view>
      <view  @tap='go'>
        <image src="/static/assetsImg/withdraw.png"/>
        <text>提现</text>
      </view>
    </view>
  </view>
</template>
<script>

export default {
  data() {
    return {

    }
  },
  props: ['transmoney'],
  methods: {
    go(i) {
      switch(i){
        case 1:
        uni.navigateTo({url:'/pages/assets_sub/recharge/recharge'})
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
      font-size: 28upx;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      margin: 0;
    }
    h1 {
      font-size: 56upx;
      font-family: ArialMT;
      line-height: 56upx;
      font-weight: bold;
      margin: 20upx 0;
    }
    view.h3 {
      font-size: 28upx;
      font-family: MicrosoftYaHei;
    }
  }
  .panel2 {
    background: rgba(41, 123, 205, 1);
    color: #fff;
    padding: 30upx 0;
    justify-content: space-around;
    h4 {
      font-size: 28upx;
      font-family: MicrosoftYaHei;
      font-weight: 400;
    }
  }
  view.btn2 {
    background-color: #fff;
    padding: 19upx 0;
    border-radius: 0 0 20upx 20upx;

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
