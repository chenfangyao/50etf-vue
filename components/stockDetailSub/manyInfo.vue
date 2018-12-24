<template>
  <view class='infoWrap uni-flex'>
    <view class="leftPart">
      <view class="line1">
        <view class="bigTxt">2413.31</view>
        <view class="txt2">
          <text>+14.83</text>
          <text>0.62%</text>
        </view>
      </view>
      <view class="line2 uni-flex">
        <view class="uni-flex uni-column">
          <text>最高</text>
          <text>上涨</text>
        </view>
        <view class="uni-flex uni-column">
          <text>2488.90</text>
          <text>17</text>
        </view>
      </view>
    </view>
    <view class="middlePart">
      <view class="line1 uni-flex">
        <view class="uni-flex uni-column">
          <text>今开</text>
          <text>成交额</text>
        </view>
        <view class="uni-flex uni-column">
          <text>2403.23</text>
          <text>56.1亿</text>
        </view>
      </view>
      <view class="line2 uni-flex">
        <view class="uni-flex uni-column">
          <text>最低</text>
          <text>平盘</text>
        </view>
        <view class="uni-flex uni-column">
          <text>2488.90</text>
          <text>8</text>
        </view>
      </view>
    </view>
    <view class="rightPart">
      <view class="line1 uni-flex">
        <view class="uni-flex uni-column">
          <text>昨收</text>
          <text>振幅</text>
        </view>
        <view class="uni-flex uni-column">
          <text>2403.23</text>
          <text>0.82%</text>
        </view>
      </view>
      <view class="line2 uni-flex">
        <view class="uni-flex uni-column">
          <text>成交量</text>
          <text>下跌</text>
        </view>
        <view class="uni-flex uni-column">
          <text>479万手</text>
          <text>28</text>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
view.infoWrap {
  border-bottom: 12upx solid #f5f5f5;
  padding: 35upx 28upx 0;
  justify-content: space-between;
  .line2 {
    margin-top: 21upx;
  }
  .line1{
    margin-top: 7upx;
  }
  view.uni-column:first-child {
    font-size: 13px;
    color: rgba(112, 118, 128, 1);
    margin-right: 21upx;
    line-height: 13px;
  }
  view.uni-column:last-child {
    font-size: 13px;
    font-family: ArialMT;
    color: rgba(24, 28, 40, 1);
    line-height: 13px;
  }
  view.uni-column>text{
    margin-bottom: 29upx;
  }

  view.leftPart {
    view.line1 {
      font-size: 12px;
      color: rgba(240, 95, 92, 1);
      line-height: 12px;
      margin-top: 0;
      view.bigTxt {
        font-size: 25px;
        line-height: 25px;
        font-weight: bold;
      }
      view.txt2{
        margin-bottom: 36upx;
      }
      text {
        margin-right: 27upx;
        line-height: 12px;
      }
    }
  }
}
</style>
