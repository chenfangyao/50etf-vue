<template>
<view>

  <view v-for='(item,i) in list' class="list2Item " hover-class='self-hover' :key="i">
    <view class="line1 uni-flex">
        <view >
          <text class="nameTxt">{{item.stock_name}}</text>
          <text class="codeTxt">{{item.stock_code}}</text>
        </view>
        <view class="badgeView">{{item.status}}</view>
    </view>
    <view class="line2 uni-flex ">
      <view class='uni-flex leftPart'>
        <view>
          <view class="itemView">
            <text>市值</text>
            <text>5543</text>
          </view>
          <view>
            <text>现价</text>
            <text>{{item.last_price}}</text>
          </view>
          <view>
            <text>数量</text>
            <text>{{item.entrust_amount}}</text>
          </view>
        </view>
      </view>
      <view class="businessType" >
        <text> 交易类型</text>
        <text  :class="{yellow:moneyColor[i]}">平仓</text>
      </view>

    </view>
    <view class='line3'>委托时间：{{createTime[i]}}</view>
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
    }
  },
  watch: {
    list(val) {
      if (!val) return;
      val.forEach((item, i) => {
        this.createTime.push(this.$formatetimestr(item.create_time))
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
    height: 64upx;
    view.badgeView {
      width: 100upx;
      height: 36upx;
      background: rgba(240, 95, 92, 1);
      border-radius: 18upx;
      font-size: 12px;
      color: rgba(255, 255, 255, 1);
      line-height: 36upx;
      text-align: center;
      align-self: center;
    }
    text.nameTxt {
      font-size: 15px;
      line-height: 64upx;
      margin-right: 14upx;
      color: rgba(51, 51, 51, 1);
    }
    text.codeTxt {
      font-size: 13px;
      color: rgba(102, 102, 102, 1);
    }
  }
  .line2 {
    .businessType {
      font-size: 14px;
      color: rgba(112, 118, 128, 1);
      align-self: center;
      text:last-child {
        margin-left: 39upx;
        color: #409de5;
      }
      text.yellow:last-child {
        color: #e6aa12;
      }
    }
    view.itemView {
      display: flex;
    }
    .leftPart > view {
      color: #707680;
      text:last-child {
        color: #181c28;
        margin-left: 0.5em;
      }
      text {
        font-size: 14px;
      }
    }
    justify-content: space-between;
    padding: 20upx 25upx;
  }
  .line3 {
    font-size: 12px;
    color: rgba(168, 168, 168, 1);
    padding-bottom: 20upx;
  }
  background-color: #fff;
  margin-bottom: 11upx;
}
</style>
