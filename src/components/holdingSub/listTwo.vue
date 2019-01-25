<template>
<div>

  <div v-for='(item,i) in list' class="list2Item " :key="i">
    <div class="line1 ">
        <div >
          <span class="nameTxt">{{item.stock_name}}</span>
          <span class="codeTxt">{{item.stock_code}}</span>
        </div>
    </div>
    <div class="line2 uni-flex ">
      <div class="leftPart">
        <div class="buyOrSell">{{item.entrust_bs==1?'开仓':'平仓'}} ({{item.entrust_amount}}张)</div>
        <div class="price">
          <span>￥</span>
          <span>{{item.entrust_price}}</span>
        </div>
        <div class="time">
          <img src="/assets/holdingImg/clock.png">
          <span>{{createTime[i]}}</span>
        </div>
      </div>
      <div class="rightPart">
        <div :class="[item.status=='撤单'?'c1':'c2']">{{item.status}} ({{item.business_amount}}张)</div>
        <div class="price">
          <span>￥</span>
          <span>{{item.business_price}}</span>
        </div>
        <div class="time">
          <img src="/assets/holdingImg/clock.png">
          <span>{{cancelTime[i]}}</span>
        </div>
      </div>
    </div>
  </div>
</div>
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
div.list2Item {
  > div {
    padding: 0.25rem;
  }
  div.line1 {
    border-bottom: 1px solid #f5f5f5;
    justify-content: space-between;
    height:.80rem;
    span.nameTxt {
      font-size: 16px;
      line-height:.80rem;
      margin-right:.14rem;
      color: #333;
    }
    span.codeTxt {
      font-size: 14px;
      color: #848689;
    }
  }
  .line2 {
    justify-content: space-between;
    text-align: center;
    padding:.20rem.48rem;
    div.time {
      img {
        width:.24rem;
        height:.24rem;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
        margin-left:.20rem;
        font-size: 1px;
        color: rgba(102, 102, 102, 1);
      }
    }
    div.buyOrSell {
      font-size: 14px;
      color: rgba(69, 69, 69, 1);
    }
    div.price {
      span {
        font-size: 24px;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
      }
      span:first-child {
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
  margin: 0.24rem.16rem;
}
</style>
