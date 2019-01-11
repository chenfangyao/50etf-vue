<template>
<view>

  <view v-for='(item,i) in list' class="list2Item " :key="i">
    <view class="line1 ">
        <view >
          <text class="nameTxt">{{item.stock_name}}</text>
          <text class="codeTxt">{{item.stock_code}}</text>
        </view>
    </view>
    <view class="line2 uni-flex ">
      <view class="leftPart">
        <view class="buyOrSell">{{item.entrust_bs==1?'开仓':'平仓'}} ({{item.entrust_amount}}张)</view>
        <view class="price">
          <text>￥</text>
          <text>{{item.entrust_price}}</text>
        </view>
        <view class="time">
          <image src='/static/holdingImg/clock.png'></image>
          <text>{{createTime[i]}}</text>
        </view>
      </view>
      <view class="rightPart">
        <view :class="[item.status=='撤单'?'c1':'c2']">{{item.status}} ({{item.business_amount}}张)</view>
        <view class="price">
          <text>￥</text>
          <text>{{item.business_price}}</text>
        </view>
        <view class="time">
          <image src='/static/holdingImg/clock.png'></image>
          <text>{{cancelTime[i]}}</text>
        </view>
      </view>
    </view>
  </view>
</view>
</template>
<script>
export default {
  props: ['list', 'tabI'],
  data() {
    return {
      moneyColor: [],
      createTime: [],//时间数组
      cancelTime: [],
    }
  },
  watch: {
    list(val) {
      if (!val) return;
      this.createTime = []
      this.cancelTime = []
      val.forEach((item, i) => {
        this.createTime.push(this.$formatetimestr(item.create_time, 1))
        this.cancelTime.push(this.$formatetimestr(item.cancel_time, 1))
      });
    }
  },
}
</script>

<style lang="scss" scoped>
view.list2Item {
  > view {
    padding: 0 25upx;
  }
  view.line1 {
    border-bottom: 1px solid #f5f5f5;
    justify-content: space-between;
    height: 80upx;
    text.nameTxt {
      font-size: 16px;
      line-height: 80upx;
      margin-right: 14upx;
      color: #333;
    }
    text.codeTxt {
      font-size: 14px;
      color: #848689;
    }
  }
  .line2 {
    justify-content: space-between;
    text-align: center;
    padding: 20upx 48upx;
    view.time {
      image {
        width: 24upx;
        height: 24upx;
        vertical-align: middle;
      }
      text {
        vertical-align: middle;
        margin-left: 20upx;
        font-size: 1px;
        color: rgba(102, 102, 102, 1);
      }
    }
    view.buyOrSell {
      font-size: 14px;
      color: rgba(69, 69, 69, 1);
    }
    view.price {
      text {
        font-size: 24px;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
      }
      text:first-child {
        font-size: 13px;
        color: rgba(153, 153, 153, 1);
        margin-right: 0.3em;
      }
    }
    .c1 {
      color: #f05f5c;
    }
    .c2 {
      color: #1890ff;
    }
  }
  background-color: #fff;
  margin: 0 24upx 16upx;
}
</style>
