<template>
  <view>
    <view class="headerContainer">
      <view class="occupy"></view>
      <view class="wrap">
        <view class="left commonStyle" @tap="back">
          <image src='/static/arrow/l.png'  v-if="hasBack"/>
        </view>
        <text>{{title}}</text>
        <text class="right commonStyle" hover-class='self-hover' @tap="rightTap" v-if="rightTxt">{{rightTxt}}</text>
      </view>
    </view>
    <view class="h44"></view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      default: ''
    },
    hasBack: {
      default: false
    },
    rightTxt: {
      default: ''
    },
    specialBack: {
      default: false
    }
  },
  methods: {
    back() {
      if (this.specialBack) {
        this.$emit('special-back')
        return
      }
      uni.navigateBack({ delta: 1 });
    },
    rightTap() {
      this.$emit('right-tap')
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
  z-index: 50;
  background-color: #fff;
  view.wrap {
    text-align: center;
    height: 44px;
    font-size: 16px;
    line-height: 44px;
    position: relative;
    .commonStyle {
      align-self: center;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
    }
    text.right {
      right: 20upx;
      font-size: 14px;
    }
    view.left {
      padding: 13px 20upx 0 30upx;
      height: 44px;
      left: 0;
      image {
        width: 13px;
        height: 15px;
      }
    }
  }
  .occupy {
    height: var(--status-bar-height);
  }
}
</style>
