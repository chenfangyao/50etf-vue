<template>
  <div class="has-padding">
    <div v-for='(item,i) in list' class="list1Item black2" v-vtap="{method: popShow , params: i}" v-hover-class='"self-hover"' :key="i">
      <div class="line1 uni-flex">
        <div>
          <span class="nameTxt textc1">{{item.stock_name}}</span>
          <span class="codeTxt">{{item.stock_code}}</span>
        </div>
        <div class="timeTxt textc2" v-if="item.in_time">{{create_time[i]}}</div>
        <div class="timeTxt textc2" v-else>持仓数：{{item.own_amount}}</div>
      </div>
      <div class="line2 uni-flex">
        <div class='uni-flex leftPart fg1'>
          <div class="uni-flex" :class="[tabI==1?'fg1':'w240']">
            <div class="itemView textc2">
              <span>{{tabI==0?'成交价：':'总市值：'}}</span>
              <span>{{tabI==0?'市值：':'平均成交价：'}}</span>
            </div>
            <div class="itemView c1 textc1">
              <span>{{tabI==0?item.avg_buy_price:item.royalty_money}}</span>
              <span>{{tabI==0?item.market_value:item.avg_buy_price}}</span>
            </div>
          </div>
          <div class=" uni-flex" v-if='tabI==0'>
            <div class="itemView textc2">
              <span>延期费：</span>
              <span>持仓：</span>
            </div>
            <div class="itemView c1 textc1">
              <span>{{item.add_fee_money}}</span>
              <span>{{item.own_amount}}</span>
            </div>
          </div>
        </div>
        <div class="moneyTxt" :class="{green:moneyColor[i]}">{{item.profit_money}}</div>
      </div>
    </div>
  </div>
</template>
<script>
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
    }
  },
  methods: {

    popShow(i) {
      this.$emit('gou-shi', i)//兼容狗屎iPhone

    },

  },
  watch: {
    list(val) {
      if (!val) return;
      this.moneyColor = []
      this.create_time = []
      val.forEach((item, i) => {
        this.moneyColor.push(parseInt(item.profit_money) < 0)
        this.create_time.push(this.$formatetimestr(item.in_time))
      });
    }
  },
}
</script>

<style lang="scss" scoped>
div.has-padding {
  padding: 1px 0;
}
div.list1Item {
  border-radius: 5px;
  background-color: #fff;
  margin: 0.22rem;
  > div {
    padding: 0 0.25rem;
  }
  div.line1 {
    border-bottom: 1px solid #f5f5f5;
    justify-content: space-between;
    height: 0.64rem;
    color: #999;
    span.nameTxt {
      line-height: 0.64rem;
      margin-right: 0.14rem;
      color: #333;
      font-weight: bold;
    }
    span.codeTxt {
      font-size: 12px;
    }
    div.timeTxt {
      font-size: 11px;
      line-height: 0.64rem;
    }
  }
  .line2 {
    .moneyTxt {
      font-size: 24px;
      font-weight: bold;
      color: $primary1;
      line-height: 42px;
      flex-grow: 1;
      text-align: right;
      font-family: Arial;
    }
    .moneyTxt.green {
      color: $green1;
    }
    div.itemView {
      display: flex;
      flex-direction: column;
    }
    .fg1 {
      flex-grow: 1;
    }
    .leftPart > div {
      font-size: 12px;
      color: #666;
      .c1 {
        color: #000;
      }
    }
    div.w240 {
      width: 2.5rem;
    }
    justify-content: space-between;
    padding: 0.2rem.25rem;
  }
}
div.at-night div.line1 {
  border-color: #0f131f;
}
</style>
