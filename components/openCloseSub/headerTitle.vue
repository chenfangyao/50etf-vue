<template>
  <view>
    <view class="headerContainer">
      <view class="occupy"></view>
      <view class="wrap uni-flex">
        <image src='/static/arrow/l.png' @tap="back" />
        <view class="tabOpen uni-flex">
          <view  @tap='tapChange(false)'>开仓</view>
          <view @tap='tapChange(true)'>平仓</view>
          <view :class="['slider',{active:tabActive}]">{{tabActive?'平仓':'开仓'}}</view>
        </view>
      </view>
    </view>
    <view class="h44"></view>
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
    back() {
      uni.navigateBack({ delta: 1 });
    },
    tapChange(val) {
      this.tabActive = val
    }
  }
}
</script>

<style lang="scss">
view.h44 {
  height: 44px;
}
.headerContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2000;
  background-color: #fff;
  view.wrap {
    text-align: center;
    height: 44px;
    line-height: 44px;
    position: relative;
    image {
      width: 13px;
      height: 15px;
      align-self: center;
      left: 20upx;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
    }
    view.tabOpen {
      width: 360upx;
      height: 54upx;
      border-radius: 13px;
      margin: 0 auto;
      align-self: center;
      border: 1px solid rgba(168, 168, 168, 0.7);
      position: relative;
      .slider {
        position: absolute;
        width: 52%;
        border-radius: 13px;
        bottom: 0;
        top: 0;
        left: -1%;
        background-color: #409de5;
        color: #fff;
        transition: left 80ms ;
      }
      > view {
        flex-grow: 1;
        text-align: center;
        line-height: 54upx;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #707680;
      }
      > view.active.slider {
        left: 50%;
        background-color: #e6aa12;
      }
    }
  }
  .occupy {
    height: var(--status-bar-height);
  }
}
</style>
