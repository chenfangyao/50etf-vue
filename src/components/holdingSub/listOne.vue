<template>
  <div>
    <div v-for='(item,i) in list' class="list1Item " @click='popShow(i)' hover-class='self-hover' :key="i">
      <div class="line1 uni-flex">
        <div>
          <span class="nameTxt">{{item.stock_name}}</span>
          <span class="codeTxt">{{item.stock_code}}</span>
        </div>
        <div class="timeTxt" v-if="item.in_time">{{create_time[i]}}</div>
      </div>
      <div class="line2 uni-flex">
        <div class='uni-flex leftPart fg1'>
          <div class="uni-flex" :class="[tabI==1?'fg1':'w240']">
            <div class="itemView">
              <span>{{tabI==0?'成交价：':'总市值：'}}</span>
              <span>{{tabI==0?'市值：':'平均成交价：'}}</span>
            </div>
            <div class="itemView c1">
              <span>{{tabI==0?item.avg_buy_price:item.royalty_money}}</span>
              <span>{{tabI==0?item.market_value:item.avg_buy_price}}</span>
            </div>
          </div>
          <div class=" uni-flex" v-if='tabI==0'>
            <div class="itemView">
              <span>延期费：</span>
              <span>持仓：</span>
            </div>
            <div class="itemView c1">
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
div.list1Item {
  > div {
    padding: 0 .25rem;
  }
  div.line1 {
    border-bottom: 1px solid #f5f5f5;
    justify-content: space-between;
    height:.64rem;
    span.nameTxt {
      font-size: 15px;
      line-height:.64rem;
      margin-right:.14rem;
      color: rgba(51, 51, 51, 1);
    }
    span.codeTxt {
      font-size: 13px;
      color: rgba(102, 102, 102, 1);
    }
    div.timeTxt {
      font-size: 12px;
      color: rgba(153, 153, 153, 1);
      line-height:.64rem;
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
    div.itemView {
      display: flex;
      flex-direction: column;
    }
    .fg1 {
      flex-grow: 1;
    }
    .leftPart > div {
      font-size: 12px;
      color: rgba(153, 153, 153, 1);
      .c1 {
        color: #333;
        // margin-left: 0.5em;
      }
    }
    div.w240 {
      width:2.50rem;
    }
    justify-content: space-between;
    padding:.20rem.25rem;
  }
  background-color: #fff;
  margin-bottom:.11rem;
}
</style>
