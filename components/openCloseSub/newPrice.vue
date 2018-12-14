<template>
  <view class="wrap">
    <view class="title commonStyle1">最新价</view>
    <view class="uni-flex line2">
      <view class="newPrice">2.4789</view>
      <view class="uni-flex btn3">
        <view v-for="(item,i) in btn3Arr" :class="{active:btn3_i==i}" :data-i='i' @tap='changePriceType(i)'>{{item}}</view>
      </view>
    </view>
    <view v-show="onClose">
      <view class="entrustType">
        <text class="type commonStyle1">委托类型</text>
        <text class="commonStyle2">持仓笔数 <text class="commonStyle2">1</text></text>
      </view>
      <view class="tabOpen uni-flex">
        <view  @tap='tapChange(false)'>合并</view>
        <view @tap='tapChange(true)'>分笔</view>
        <view :class="['slider',{active:tabActive}]">{{tabActive?'分笔':'合并'}}</view>
      </view>
    </view>
    <view class="uni-flex entrustCount">
      <view>
        <text class="commonStyle1">委托数量</text>
        <text class="useCount mr5 commonStyle2">{{onClose?'可用数':'最大可买'}}</text>
        <text class="commonStyle2">13</text>
      </view>
      <view v-show="!onClose">
        <text class="commonStyle2 mr5">当前持仓</text>
        <text class="commonStyle2">21</text>
      </view>
    </view>
    <view class="sliderPart uni-flex">
      <view>
        <image @tap='plusStep(-1)' src='/static/openCloseImg/minus.png'></image>
        <text class="countxt">{{sliderVal}}</text>
        <image @tap='plusStep(1)' src='/static/openCloseImg/plus.png'></image>
      </view>
      <view class="sliderItem">
        <slider @changing="slidering" max='100' min='1' :value='sliderVal' backgroundColor='#e6e6e6' block-size='18' activeColor='#409de5'/>
      </view>

    </view>
  </view>
</template>
<script>
export default {
  props: {
    onClose: {
      require: true
    }
  },
  data() {
    return {
      tabActive: false,
      btn3Arr: ['最新', '对手', '排队',],
      btn3_i: 0,
      sliderVal: 1
    }
  },
  methods: {
    tapChange(val) {
      this.tabActive = val
    },
    changePriceType(i) {
      this.btn3_i = i
    },
    slidering(e) {
      this.sliderVal = e.detail.value
    },
    plusStep(i){
      this.sliderVal+=i
    }
  }
}
</script>
<style lang="scss" scoped>
view.wrap {
  padding: 30upx 32upx;
  .commonStyle1 {
    line-height: 16px;
    height: 16px;
    font-weight: bold;
    font-size: 16px;
    color: rgba(102, 102, 102, 1);
  }
  text.commonStyle2 {
    font-size: 12px !important;
    color: rgba(153, 153, 153, 1) !important;
    line-height: 16px;
    font-family: MicrosoftYaHei;
    font-weight: normal !important;
  }
  view.line2 {
    align-items: center;
    justify-content: space-between;
    margin: 29upx 0 48upx;
    view.newPrice {
      font-size: 24px;
      line-height: 60upx;
      font-family: Arial-BoldMT;
      font-weight: bold;
      color: rgba(64, 157, 229, 1);
    }

    view.btn3 {
      > view {
        width: 50px;
        height: 30px;
        background: rgba(245, 245, 245, 0);
        border: 1px solid rgba(153, 153, 153, 1);
        border-radius: 15px;
        text-align: center;
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
        line-height: 30px;
      }
      > view.active {
        border-color: rgba(64, 157, 229, 1);
        color: #409de5;
      }
      > view:nth-child(2) {
        margin: 0 26upx;
      }
    }
  }
  view.entrustType {
    text {
      font-size: 14px;
      color: #707680;
    }
    text.type {
      margin-right: 5px;
      font-size: 16px;
      color: rgba(102, 102, 102, 1);
    }
  }
  view.tabOpen {
    width: 180upx;
    height: 60upx;
    border-radius: 15px;
    align-self: center;
    background-color: #efefef;
    margin: 30upx 0 30upx 1px;
    position: relative;
    .slider {
      position: absolute;
      width: 52%;
      border-radius: 15px;
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
      line-height: 60upx;
      font-size: 12px;
      color: #707680;
    }
    > view.active.slider {
      left: 50%;
    }
  }
  view.entrustCount {
    font-size: 16px;
    line-height: 16px;
    justify-content: space-between;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    text.useCount {
      margin-left: 7px;
    }
    text.mr5 {
      margin-right: 5px;
    }
  }
  view.sliderPart {
    justify-content: space-between;
    margin: 35upx 0 14upx;
    text.countxt {
      font-size: 24px;
      font-family: ArialMT;
      margin: 0 65upx;
      color: rgba(51, 51, 51, 1);
      line-height: 24px;
    }
    image {
      width: 18px;
      height: 18px;
    }
    uni-slider {
      margin: 0;
      margin-left: 150upx;
      margin-right: 10upx;
    }
    view.sliderItem {
      flex-grow: 1;
    }
  }
}
</style>
