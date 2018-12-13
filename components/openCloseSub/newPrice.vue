<template>
  <view class="wrap">
    <view class="title">最新价</view>
    <view class="uni-flex">
      <view>2.4789</view>
      <view class="uni-flex btn3">
        <view>最新</view>
        <view>对手</view>
        <view>排队</view>
      </view>
    </view>
    <view class="entrustType">
      <text class="type">委托类型</text>
      <text >（ 持仓数量 <text>13</text> ）</text>
    </view>
    <view class="tabOpen uni-flex">
      <view  @tap='tapChange(false)'>合仓</view>
      <view @tap='tapChange(true)'>分仓</view>
      <view :class="['slider',{active:tabActive}]">{{tabActive?'分仓':'合仓'}}</view>
    </view>
    <view class="entrustCount">委托数量</view>
  </view>
</template>
<script>
export default {
  props: {
  },
  data() {
    return {
      tabActive: false
    }
  },
  methods: {
    tapChange(val) {
      this.tabActive = val
    }
  }
}
</script>
<style lang="scss" scoped>
view.wrap {
  padding: 30upx 32upx;
  view.title {
    font-size: 15px;
    color: rgba(24, 28, 40, 1);
  }
  view.entrustType {
    text {
      font-size: 14px;
      color: #707680;
    }
    text.type {
      color: rgba(24, 28, 40, 1);
      margin-right: 5px;
    }
  }
  view.tabOpen {
    width: 320upx;
    height: 48upx;
    border-radius: 12px;
    align-self: center;
    background-color: #ededed;
    margin: 30upx 0 30upx 1px;
    position: relative;
    .slider {
      position: absolute;
      width: 52%;
      border-radius: 12px;
      bottom: 0;
      top: 0;
      left: -1%;
      transition: left 80ms;
      background-color: #409de5;
      color: #fff;
    }
    > view {
      flex-grow: 1;
      text-align: center;
      line-height: 48upx;
      font-size: 13px;
      font-family: MicrosoftYaHei;
      color: #707680;
    }
    > view.active.slider {
      left: 50%;
    }
  }
  view.entrustCount {
    font-size: 14px;
    color: rgba(24, 28, 40, 1);
  }
}
</style>
