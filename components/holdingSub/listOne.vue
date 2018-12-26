<template>
<view>
  <fenbi-pop v-if="showFenbiPop" @close-me='closePop'></fenbi-pop>
  <view v-for='(item,i) in list' class="list1Item " @tap='popShow' hover-class='self-hover' :key="i">
    <view class="line1 uni-flex">
        <view >
          <text class="nameTxt">{{item.stock_name}}</text>
          <text class="codeTxt">{{item.stock_code}}</text>
        </view>
        <view class="timeTxt" v-if="item.in_time">{{create_time[i]}}</view>
    </view>
    <view class="line2 uni-flex">
      <view class='uni-flex leftPart'>
        <view>
          <view class="itemView">
            <text>{{tabI==0?'成交价：':'总市值'}}</text>
            <text></text>
          </view>
          <view>
            <text>{{tabI==0?'延期费：':'平均成交价'}}</text>
            <text>{{item.add_fee_money}}</text>
          </view>
        </view>
        <view class="itemView" v-if='tabI==0'>
          <view>
            <text>市值：</text>
            <text>{{item.market_value}}</text>
          </view>
          <view>
            <text>持仓：</text>
            <text></text>
          </view>
        </view>
      </view>
      <view class="moneyTxt" :class="{green:moneyColor[i]}">{{item.profit_money}}</view>
    </view>
  </view>
</view>
</template>
<script>
import hebingPop from '@/components/holdingSub/hebingPop.vue'
import fenbiPop from '@/components/holdingSub/fenbiPop.vue'
export default {
  props: ['list', 'tabI'],
  data() {
    return {
      moneyColor: [],
      create_time: [],
      showHebingPop: false,
      showFenbiPop: false,
    }
  },
  components: { hebingPop, fenbiPop },
  methods: {
    popShow() {

      this.showFenbiPop = true
    },
    closePop(){
      
      this.showFenbiPop = false
    }
  },
  watch: {
    list(val) {
      if (!val) return;
      val.forEach((item, i) => {
        this.moneyColor.push(parseInt(item.profit_money) < 0)
        this.create_time.push(this.$formatetimestr(item.in_time))

      });
    }
  },
}
</script>

<style lang="scss" scoped>
view.list1Item {
  > view {
    padding: 0 25upx;
  }
  view.line1 {
    border-bottom: 1px solid #f5f5f5;
    justify-content: space-between;
    height: 64upx;
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
    view.timeTxt {
      font-size: 12px;
      color: rgba(153, 153, 153, 1);
      line-height: 64upx;
    }
  }
  .line2 {
    .moneyTxt {
      font-size: 24px;
      font-weight: bold;
      color: rgba(240, 95, 92, 1);
      line-height: 42px;
    }
    .moneyTxt.green {
      color: #3aba8f;
    }
    view.itemView {
      display: flex;
      flex-direction: column;
    }
    .leftPart > view:first-child {
      margin-right: 66upx;
    }
    .leftPart > view {
      font-size: 12px;
      color: rgba(153, 153, 153, 1);
      text:last-child {
        color: #333;
        margin-left: 0.5em;
      }
    }
    justify-content: space-between;
    padding: 20upx 25upx;
  }
  background-color: #fff;
  margin-bottom: 11upx;
}
</style>
