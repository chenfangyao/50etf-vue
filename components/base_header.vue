<template>
  <view>
    <view class="headerContainer">
      <view class="occupy"></view>
      <view class="wrap">
        <image class="left commonStyle"  src='/static/arrow/l.png' @tap="back" v-if="hasBack"/>
        <text>{{title}}</text>
        <text class="right commonStyle" hover-class='self-hover' @tap="rightTap" v-if="showRight">确定</text>
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
    showRight:{
      default: false
    }
  },
  methods: {
    back() {
      uni.navigateBack({ delta: 1 });
    },
    rightTap(){
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
  z-index: 500;
  background-color: #fff;
  view.wrap {
    text-align: center;
    height: 44px;
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
    }
    image.left {
      left: 20upx;
      width: 13px;
      height: 15px;
    }
  }
  .occupy {
    height: var(--status-bar-height);
  }
}
</style>
