<template>
<view>
  <view class="uni-flex wrap" v-for="(item,i) in aa" @tap="go" hover-class="self-hover" :key="i">
    <text class="txtred">7.09%</text>
    <text class="txtred">0.1881</text>
    <view class="uni-flex">
      <text class="gou">12</text>
      <text class="midTxt">2.2000</text>
      <text class="gou">8</text>
    </view>
    <text class="txtgreen">0.0213</text>
    <text class="txtgreen">-9.65%</text>
  </view>
</view>
</template>
<script>
export default {
  data() {
    return {
      aa: [, , , , , , , , , , , , , ,]
    }
  },
  methods: {
    go() {
      uni.navigateTo({
        url: '/pages/quotes_sub/qi_quan_xiang_qing/qi_quan_xiang_qing'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
view.wrap {
  justify-content: space-between;
  padding: 0 25upx;
  height: 70upx;
  line-height: 70upx;
  border-bottom: 1px solid #f5f5f5;
  text {
    font-size: 26upx;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(31, 31, 38, 1);
  }
  text.txtred {
    color: #ec605e;
  }
  text.txtgreen {
    color: #3aba8f;
  }
  text.midTxt {
    margin: 0 13upx;
    background-color: #eaeeed;
    display: inline-block;
    height: 100%;
    line-height: 70upx;
    padding: 0 23upx;
  }
  .gou {
    color: #fff;
    background: rgba(240, 95, 92, 1);
    line-height: 18upx;
    padding: 4upx 6upx;
    // display: inline-block;
    align-self: center;
    font-size: 18upx;
    border-radius: 11upx;
    text-align: center;
  }
}
</style>
