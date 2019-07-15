<template>
  <div class="wrap">
    <base-header title="平仓结算" has-back='1'></base-header>
    <div class="title black2 ">
      <span class="nameTxt textc1">{{pingCItem.stock_name}}</span>
      <span class="codeTxt textc2">{{pingCItem.stock_code}}</span>
    </div>
    <div class="buy uni-flex black2">
      <div class="leftPart">
        <div class="subTitle textc1">
          <s-icon icon-class="pingcang_buy" class=''></s-icon>
          <span>买入</span>
        </div>
        <div class="uni-flex ">

          <div class="uni-flex flexColumn txt">
            <span>价格：</span>
            <span>市值：</span>
          </div>
          <div class="uni-flex flexColumn val2 textc1">
            <span>{{pingCItem.avg_buy_price}}</span>
            <span>{{pingCItem.buy_value}}</span>
          </div>
        </div>
      </div>
      <div class="rightPart textc2">
        <div class="time textc2">{{buss_time}}</div>
        <div>
          <span class='txt'>数量：</span>
          <span>{{pingCItem.sum_buy_amount}}张</span>
        </div>
      </div>
    </div>
    <div class="sell uni-flex black2">
      <div class="leftPart">
        <div class="subTitle textc1">
          <s-icon icon-class="pingcang_sell" class=''></s-icon>
          <span>卖出</span>
        </div>
        <div class="uni-flex ">
          <div class="uni-flex flexColumn txt">
            <span>价格：</span>
            <span>市值：</span>
          </div>
          <div class="uni-flex flexColumn val2 textc1">
            <span>{{pingCItem.sell_price}}</span>
            <span>{{pingCItem.sell_value}}</span>
          </div>
        </div>
      </div>
      <div class="rightPart">
        <div class="time textc2">{{close_time}}</div>
        <div>
          <span class='txt'>数量：</span>
          <span>{{sell_amount}}张</span>
        </div>
      </div>
    </div>
    <div class="uni-flex lastLine black2">
      <div class="uni-flex textc2">
        <span>合约乘数：</span>
        <span>平仓手续费：</span>
        <span>合约盈亏：</span>
        <span>缴纳保证金：</span>
        <span>总净值：</span>
      </div>
      <div class="uni-flex textc1">
        <span>{{hynumber}}</span>
        <span>{{pingCItem.fee}}</span>
        <span>{{pingCItem.all_income}}</span>
        <span>{{pingCItem.deposit}}</span>
        <span>{{pingCItem.all_realin}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import filterList from '@/components/holdingSub/filterList.vue';
import uniLoadMore from '@/components/uni-load-more.vue';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      buss_time: '',
      close_time: '',
      sell_amount: '',
      hynumber: 0
    };
  },
  methods: {
    gethyinfoprice() {
      var obj = {
        url: '/Sapi/Stock/hyinfo', 
        method: 'POST',
        dataType: "json",
        data: {
          stock_code: this.pingCItem.stock_code,
        },
      }
      this.$httpReq(obj).then((res) => {
        if (res.status) {
          this.hynumber = parseInt(res.data.volume_multiple)
        }
      })
    }
  },
  mounted() {
    this.close_time = this.$formatetimestr(this.pingCItem.close_time)
    this.buss_time = this.$formatetimestr(this.pingCItem.buss_time)
    this.sell_amount = parseInt(this.pingCItem.sell_amount)
    this.gethyinfoprice()
  },
  computed: mapState(['pingCItem'])
}
</script>

<style lang="scss" scoped>
div.wrap {
  min-height: 100vh;
  width: 100%;
  background-color: #f5f5f5;
  div.title {
    color: rgba(51, 51, 51, 1);
    font-size: 16px;
    
    font-weight: bold;
    margin: 0.12rem 0 1px;
    height: 0.9rem;
    line-height: 0.9rem;
    background-color: #fff;
    padding-left: 0.26rem;
    .nameTxt {
      margin-right: 0.2rem;
      color: #333;
      & + .codeTxt {
        font-weight: normal;
        color: #666;
        font-size: 13px;
      }
    }
  }
  .buy,
  .sell {
    justify-content: space-between;
    background-color: #fff;
    margin-bottom: 0.12rem;
    padding: 0.36rem;
    font-size: 12px;
    color: #666;
    div.subTitle {
      font-size: 16px;
      line-height: 16px;
      font-weight: bold;
      margin-bottom: 0.28rem;
      color: rgba(102, 102, 102, 1);
    }

    div.time {
      font-size: 11px;
      color: #999;
      & + div {
        span:last-child {
          color: $primary1;
        }
      }
    }
    div.flexColumn {
      flex-direction: column;
    }
    .txt {
      margin-right: 0.19rem;
    }
    .val2{
      color: #000;
    }
    div.rightPart {
      justify-content: space-between;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
  div.lastLine {
    background-color: #fff;
    padding: 0.3rem;
    justify-content: space-between;
    > div {
      flex-direction: column;
      line-height: 0.52rem;
      color: #333;
    }
    > div:first-child {
      font-size: 12px;
      color: #666;
      margin-right: 0.19rem;
    }
    >div:last-child{
      width: 200px;
      text-align: right;
    }
  }
}
</style>
