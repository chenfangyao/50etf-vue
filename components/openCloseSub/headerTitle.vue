<template>
  <view>
    <view class="headerContainer">
      <view class="occupy"></view>
      <view class="wrap uni-flex">
        <view class="leftPart"  @tap="back" >
          <image src='/static/arrow/l.png'/>
        </view>
        <view class="tabOpen uni-flex" :class="{active:tabActive}">
          <view @tap='tapChange'>开仓</view>
          <view @tap='tapChange'>平仓</view>
          <view class="slider">{{tabActive?'平仓':'开仓'}}</view>
        </view>
      </view>
    </view>
    <view class="h44"></view>
  </view>
</template>

<script>
export default {
  props: {
    tabActive: {
      require: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    back() {
      uni.navigateBack({
        delta: 1
      });
    },
    tapChange() {
      this.$emit('change-close')
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
  z-index: 200;
  background-color: #fff;
  view.wrap {
    view.leftPart {
      padding: 13px 20upx 0 30upx;
      height: 44px;
      position: absolute;
      left: 0;
      top: 0;
      image {
        width: 13px;
        height: 15px;
      }
    }
    text-align: center;
    height: 44px;
    line-height: 44px;
    position: relative;
    view.tabOpen {
      width: 176px;
      height: 27px;
      border-radius: 13px;
      margin: 0 auto;
      align-self: center;
      border: 1px solid #409de5;
      position: relative;
      .slider {
        position: absolute;
        width: 52%;
        border-radius: 13px;
        bottom: -1px;
        top: -1px;
        left: -1px;
        background-color: #409de5;
        color: #fff;
        transition: left 80ms;
      }
      > view {
        flex-grow: 1;
        text-align: center;
        line-height: 27px;
        font-size: 13px;
        color: #999;
      }
    }
    view.tabOpen.active {
      border-color: #e6aa12;
      .slider {
        left: 49%;
        background-color: #e6aa12;
      }
    }
  }
  .occupy {
    height: var(--status-bar-height);
  }
}
</style>
