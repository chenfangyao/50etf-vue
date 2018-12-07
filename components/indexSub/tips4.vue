<template>
  <view class="tipItems">
    <view>
      <view class="hasBg">
        <image src="/static/indexTabImg/jiaoyi.png"/>
      </view>
      <text>交易</text>
    </view>
    <view>
      <view class="hasBg bg2">
        <image src="/static/indexTabImg/gonggao.png"/>
      </view>
      <text>公告</text>
    </view>
    <view>
      <view class="hasBg bg3">
        <image src="/static/indexTabImg/chongzhi.png"/>
      </view>
      <text>充值</text>
    </view>
    <view>
      <view class="hasBg bg4">
        <image src="/static/indexTabImg/xinshouzhiying.png"/>
      </view>
      <text>新手指引</text>
    </view>
  </view>
</template>
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
    width: 94upx;
    height: 94upx;
    border-radius: 50%;
    background-color: #E67C30;
    image {
      width: 54upx;
      height: 54upx;
      margin-top: 22upx;
    }
  }
  .hasBg.bg2{
    background-color: #F05F5C;
  }
  .hasBg.bg3{
    background-color: #509BEB;
  }
  .hasBg.bg4{
    background-color: #E6AA12;
  }
  display: flex;
  justify-content: space-around;
  image {
    width: 60upx;
    height: 60upx;
  }
  text {
    font-size: 22upx;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(24, 28, 40, 1);
  }
}
</style>
