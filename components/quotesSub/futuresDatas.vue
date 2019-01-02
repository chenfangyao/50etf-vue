<template>
  <view>
    <view class="uni-flex wrap" v-for="(item,i) in quoteList_filter" @tap="go(item)" hover-class="self-hover" :key="i">
      <text class="txtred">{{item.incr_percent}}</text>
      <text class="txtred">{{item.buy_price1}}</text>
      <view class="uni-flex">
        <text class="gou">{{item.buy_amount1}}</text>
        <text class="midTxt">{{item.last_price}}</text>
        <text class="gou">{{item.sale_amount1}}</text>
      </view>
      <text class="txtgreen">{{item.sale_price1}}</text>
      <text class="txtgreen">-9.65</text>
    </view>
  </view>
</template>
<script>

export default {
  data() {
    return {
      quoteList_filter: []
    }
  },
  props: ['quoteList'],
  methods: {
    go(obj) {
      uni.navigateTo({
        url: '/pages/quotes_sub/qi_quan_xiang_qing/qi_quan_xiang_qing?code='+obj.stock_code
      });
    }
  },
  watch: {
    quoteList(val) {
      this.quoteList_filter=[]
      val.forEach(item => {
        let obj = { ...item }
        obj.last_price = Number(item.last_price).toFixed(4)
        obj.incr_percent = Number(item.incr_percent).toFixed(4)
        obj.sale_price1 = Number(item.sale_price1).toFixed(4)
        obj.buy_price1 = Number(obj.buy_price1).toFixed(4)
        this.quoteList_filter.push(obj)
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
    color: rgba(31, 31, 38, 1);
    width: 51px;
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
    font-size: 26upx;
    width: 128upx;
    color: #333;
  }
  .gou {
    width: 36upx;
    text-align: center;
    color: #999;
    line-height: 18upx;
    padding: 4upx 6upx;
    // display: inline-block;
    align-self: center;
    font-size: 28upx;
    border-radius: 11upx;
    text-align: center;
  }
}
</style>
