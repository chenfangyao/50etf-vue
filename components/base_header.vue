<template>
  <view>
    <view class="headerContainer">
      <view class="occupy"></view>
      <view class="wrap">
        <text>{{title}}</text>
      </view>
    </view>
    <view class="h44"></view>
  </view>
</template>

<script>
export default {
  props: ['title']
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
  }
  .occupy {
    height: var(--status-bar-height);
  }
}
</style>
