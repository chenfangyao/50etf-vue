<template>
  <view>
    <view class="headerContainer">
      <view class="occupy"></view>
      <view class="wrap">
      <image src='/static/arrow/l.png' @tap="back" v-if="hasBack"/>

        <text>{{title}}</text>
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
    }
  },
  methods: {
    back() {
      uni.navigateBack({ delta: 1 });
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
  }
  .occupy {
    height: var(--status-bar-height);
  }
}
</style>
