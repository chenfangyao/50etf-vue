<template>
  <section class="uni-flex">
    <view>
      <h5>3409.4800</h5>
      <view>
        <text>17.73</text>
        <text>+0.66%</text>
      </view>
      <h4>上证指数</h4>
    </view>
    <view>
      <h5>3409.4800</h5>
      <view>
        <text>17.73</text>
        <text>+0.52%</text>
      </view>
      <h4>上证指数</h4>
    </view>
    <view>
      <h5>3409.4800</h5>
      <view>
        <text>17.73</text>
        <text>+0.52%</text>
      </view>
      <h4>上证指数</h4>
    </view>
  </section>
</template>
<style lang="scss">
section {
  text-align: center;
  justify-content: space-between;
  margin-top: 10upx;
  h5 {
    font-size: 16px;
    font-family: ArialMT;
    font-weight: 400;
    color: rgba(240, 95, 92, 1);
    margin-bottom: 0;
  }
  > view {
    padding: 26upx 0;
    font-size: 11px;
    font-family: ArialMT;
    font-weight: 400;
    color: rgba(240, 95, 92, 1);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 5px 0px rgba(245, 245, 245, 0.6);
    border-radius: 5px;
    flex-grow: 1;
    text:first-child {
      margin-right: 12upx;
    }
  }
  > view:nth-child(2) {
    margin: 0 10upx;
  }
  h4 {
    font-size: 13px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(24, 28, 40, 1);
    margin-top: 0;
  }
}
</style>
