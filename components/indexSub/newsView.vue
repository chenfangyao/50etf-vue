<template>
  <view>
    <view
      v-for="(item,i) in newsItem"
      :key="i"
      class="newsView"
    >
      <h3>上海市副市长吴情：发展科技创业板为新经济注入活水</h3>
      <view class="uni-flex">
        <text>证券时报网</text>
        <text>
          <text>2018-12-02</text>
          <text class="newsTime">10:57:59</text>
        </text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      newsItem: [1, 2, 3]
    }
  },
}
</script>
<style lang="scss">
view.newsView {
  background-color: #fff;
  padding: 24upx;
  border-radius: 20upx;
  margin: 20upx 0;
  h3 {
    font-size: 13px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(24, 28, 40, 1);
  }
  text {
    font-size: 10px;
    font-family: MicrosoftYaHei;
    color: rgba(168, 168, 168, 1);
  }
  text.newsTime{
    margin-left: 10upx;
  }
  >view.uni-flex{
    justify-content: space-between;
    margin-top: 18upx;
  }
}
</style>
