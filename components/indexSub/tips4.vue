<template>
  <view class="tipItems">
    <view @tap='go(4)'>
      <view class="hasBg">
        <image src="/static/indexTabImg/jiaoyi.png" />
      </view>
      <text>交易</text>
    </view>
    <view @tap='go(1)' hover-class='self-hover'>
      <view class="hasBg bg2">
        <image src="/static/indexTabImg/gonggao.png" />
      </view>
      <text>公告</text>
    </view>
    <view @tap='go(3)'>
      <view class="hasBg bg3">
        <image src="/static/indexTabImg/chongzhi.png" />
      </view>
      <text>充值</text>
    </view>
    <view @tap='go(2)' hover-class='self-hover'>
      <view class="hasBg bg4">
        <image src="/static/indexTabImg/xinshouzhiying.png" />
      </view>
      <text>新手指引</text>
    </view>
  </view>
</template>
<script>
export default {
  methods: {
    go(i) {
      let url = ''
      switch (i) {
        case 3: url = '/pages/assets_sub/recharge/recharge'
          break
        case 4: uni.switchTab({ url: '/pages/tabBar/quotes/quotes' })
          return
        default: url = '/pages/msg_common/list/list?type=' + i
      }
      uni.navigateTo({ url })
    }
  },
}
</script>
<style lang="scss">
view.tipItems {
  background-color: #fff;
  padding: 24upx 0;
  margin-top: 8upx;
  border-radius: 5px;
  > view {
    text-align: center;
  }
  view.hasBg {
    image {
      width: 94upx;
      height: 94upx;
      margin-top: 22upx;
    }
  }
  display: flex;
  justify-content: space-around;
  text {
    font-size: 13px;
    color: rgba(24, 28, 40, 1);
  }
}
</style>
