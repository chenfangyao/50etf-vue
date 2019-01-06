<template>
  <view>
    <fenbi-pop v-if="showFenbiPop" :res-obj='listItem' @close-me='closePop'></fenbi-pop>
    <view v-for='(item,i) in list' class="list1Item " @tap='popShow(i)' hover-class='self-hover' :key="i">
      <view class="line1 uni-flex">
        <view>
          <text class="nameTxt">{{item.stock_name}}</text>
          <text class="codeTxt">{{item.stock_code}}</text>
        </view>
        <view class="timeTxt" v-if="item.in_time">{{create_time[i]}}</view>
      </view>
      <view class="line2 uni-flex">
        <view class='uni-flex leftPart fg1'>
          <view class="uni-flex" :class="[tabI==1?'fg1':'w240']">
            <view class="itemView">
              <text>{{tabI==0?'成交价：':'总市值：'}}</text>
              <text>{{tabI==0?'市值：':'平均成交价：'}}</text>
            </view>
            <view class="itemView c1">
              <text>{{item.market_value}}</text>
              <text>{{item.royalty_money||item.market_value}}</text>
            </view>
          </view>
          <view class=" uni-flex" v-if='tabI==0'>
            <view class="itemView">
              <text>延期费：</text>
              <text>持仓：</text>
            </view>
            <view class="itemView c1">
              <text>{{item.add_fee_money}}</text>
              <text>{{item.enable_amount}}</text>
            </view>
          </view>
        </view>
        <view class="moneyTxt" :class="{green:moneyColor[i]}">{{item.profit_money}}</view>
      </view>
    </view>
  </view>
</template>
<script>
import fenbiPop from '@/components/holdingSub/fenbiPop.vue'
export default {
  props: {
    list: {
      default() {
        return []
      }
    },
    tabI: ''
  },
  data() {
    return {
      moneyColor: [],
      create_time: [],
      showHebingPop: false,
      showFenbiPop: false,
      viewMask: null,
      listItem: {}
    }
  },
  components: { fenbiPop },
  methods: {
    popShow(i) {
      this.listItem = this.list[i]
      this.$emit('gou-shi')//兼容狗屎iPhone
      this.showFenbiPop = true
      //#ifdef APP-PLUS
      this.viewMask === null && (this.viewMask = new plus.nativeObj.View('mask', { left: '0px', height: '56px', bottom: '0px', width: '100%', backgroundColor: "rgba(0,0,0,0.3)" }));
      this.viewMask.show()
      //#endif
    },
    closePop() {
      //#ifdef APP-PLUS
      this.viewMask.close()
      this.viewMask = null
      //#endif
      this.showFenbiPop = false
      this.$emit('gou-shi')//兼容狗屎iPhone

    }
  },
  watch: {
    list(val) {
      if (!val) return;
      this.moneyColor = []
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
      flex-grow: 1;
      text-align: right;
      font-family: Arial;
    }
    .moneyTxt.green {
      color: #3aba8f;
    }
    view.itemView {
      display: flex;
      flex-direction: column;
    }
    .fg1 {
      flex-grow: 1;
    }
    .leftPart > view {
      font-size: 12px;
      color: rgba(153, 153, 153, 1);
      .c1 {
        color: #333;
        // margin-left: 0.5em;
      }
    }
    view.w240 {
      width: 250upx;
    }
    justify-content: space-between;
    padding: 20upx 25upx;
  }
  background-color: #fff;
  margin-bottom: 11upx;
}
</style>
