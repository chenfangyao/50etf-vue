<template>
  <view>
    <base-header title="持仓"></base-header>
    <view class="secondTitle">
      <text>50etf</text>
      <text>
        <text>0.2236</text>
        <text>2.3336</text>
        <text>0.6%</text>
      </text>
    </view>
    <button @tap="handleClick">111</button>
    <button @tap="handleClick2">2</button>
    <button @tap="go(2)">登录</button>
  </view>
</template>

<script>

export default {
  data() {
    return {

    };
  },

  methods: {
    handleClick() {
      //#ifdef APP-PLUS
      plus.screen.lockOrientation('portrait-primary');
      //#endif
    },
    go(i) {
      i == 2 && uni.navigateTo({ url: '/pages/login/login' });
    },
    handleClick2() {
      //#ifdef APP-PLUS
      plus.screen.lockOrientation("landscape-primary");
      //#endif
      uni.navigateTo({
        url: '/pages/echarts/echarts'
      });
    },
  },
}
</script>

<style>
view.secondTitle {
  display: flex;
  justify-content: space-between;
  margin: 0 13px;
}
</style>
