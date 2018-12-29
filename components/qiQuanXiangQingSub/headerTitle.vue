<template>
<view>

  <view class="wrap " >
    <view class="occupy"></view>
    <image src='/static/arrow/l.png' @tap="back"/>
    <view>
      <h4>{{name1}}</h4>
      <h5>{{name2}}</h5>
    </view>
  </view>
  <view class="h44"></view>
</view>
</template>
<script>
export default {
  props: {
    name1: {
      default: '50ETF购11月2250'
    },
    name2: {
      default: '22336666'
    }
  },
  methods: {
    back() {
      uni.switchTab({ url: '/pages/tabBar/quotes/quotes' })
    }
  }
}
</script>

<style lang="scss" scoped>
view.h44 {
  height: 44px;
}
view.wrap {
  border-bottom: 1px solid #ededed;
  padding-top: 12upx;
  height: 44px;
  position: fixed;
  left: 0;
  right: 0;
  background-color: #fff;
  top: 0;
  z-index: 50;
  .occupy {
    height: var(--status-bar-height);
  }
  > view {
    flex-grow: 1;
    text-align: center;
  }
  image {
    width: 13px;
    height: 15px;
    align-self: center;
    left: 20upx;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
  }
  h4 {
    font-size: 15px;
    font-weight: 400;
    color: rgba(24, 28, 40, 1);
    margin: 0;
    line-height: 15px;
    margin-bottom: 9upx;
  }
  h5 {
    font-size: 10px;
    font-weight: 400;
    color: rgba(24, 28, 40, 1);
    margin: 0;
    line-height: 10px;
    margin-bottom: 13upx;
  }
}
</style>
