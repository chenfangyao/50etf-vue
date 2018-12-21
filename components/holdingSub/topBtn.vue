<template>
  <view class="uni-flex itemwrap">
    <view hover-class='self-hover' @tap="go('/pages/holding_sub/clinch/clinch')">成交记录</view>
    <view hover-class='self-hover' @tap="go('/pages/holding_sub/ping_c_list/ping_c_list')">平仓结算</view>
  </view>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    go(url) {
      uni.navigateTo({ url })
    }
  }
}
</script>

<style scoped lang='scss'>
view.itemwrap {
  justify-content: space-between;
  height: 96upx;
  margin: 16upx 22upx 0;
  padding: 10upx 0;
  background-color: #fff;
  box-shadow:0px 0px 8upx 0px rgba(153,153,153,0.5);;
  border-radius:8upx;
  > view {
    width: 50%;
    text-align: center;
    font-size: 13px;
    color: #999;
    line-height: 86upx;
  }
  > view:first-child {
    border-right: 1px solid #ededed;
  }
}
</style>
