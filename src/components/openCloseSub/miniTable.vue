<template>
  <div class="uni-flex root-el">
    <div class="left">
      <div class="title">
        <span>买</span>
        <span>数量</span>
        <span class="w71">价格</span>
      </div>
      <div class="datas">
        <span>1</span>
        <span>{{hydetils.buyAmount1}}</span>
        <span class="w71">{{buyPrice1}}</span>
      </div>
      <div class="datas">
        <span>2</span>
        <span>{{hydetils.buyAmount2}}</span>
        <span class="w71">{{buyPrice2}}</span>
      </div>
      <div class="datas">
        <span>3</span>
        <span>{{hydetils.buyAmount3}}</span>
        <span class="w71">{{buyPrice3}}</span>
      </div>
      <div class="datas">
        <span>4</span>
        <span>{{hydetils.buyAmount4}}</span>
        <span class="w71">{{buyPrice4}}</span>
      </div>
      <div class="datas">
        <span>5</span>
        <span>{{hydetils.buyAmount5}}</span>
        <span class="w71">{{buyPrice5}}</span>
      </div>
    </div>
    <div class="right">
      <div class="title">
        <span class="w71">价格</span>
        <span>数量</span>
        <span>卖</span>
      </div>
      <div class="datas">
        <span class="w71">{{salePrice1}}</span>
        <span>{{hydetils.saleAmount1}}</span>
        <span>1</span>
      </div>
      <div class="datas">
        <span class="w71">{{salePrice2}}</span>
        <span>{{hydetils.saleAmount2}}</span>
        <span>2</span>
      </div>
      <div class="datas">
        <span class="w71">{{salePrice3}}</span>
        <span>{{hydetils.saleAmount3}}</span>
        <span>3</span>
      </div>
      <div class="datas">
        <span class="w71">{{salePrice4}}</span>
        <span>{{hydetils.saleAmount4}}</span>
        <span>4</span>
      </div>
      <div class="datas">
        <span class="w71">{{salePrice5}}</span>
        <span>{{hydetils.saleAmount5}}</span>
        <span>5</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },

  computed: {
    buyPrice1() {
      if(this.hydetils.buyPrice1)return this.hydetils.buyPrice1.toFixed(4)
    },
    buyPrice2() {
      if(this.hydetils.buyPrice2)return this.hydetils.buyPrice2.toFixed(4)
    },
    buyPrice3() {
      if(this.hydetils.buyPrice3)return this.hydetils.buyPrice3.toFixed(4)
    },
    buyPrice4() {
      if(this.hydetils.buyPrice4)return this.hydetils.buyPrice4.toFixed(4)
    },
    buyPrice5() {
      if(this.hydetils.buyPrice5)return this.hydetils.buyPrice5.toFixed(4)
    },
    salePrice1() { if(this.hydetils.salePrice1)return this.hydetils.salePrice1.toFixed(4) },
    salePrice2() { if(this.hydetils.salePrice2)return this.hydetils.salePrice2.toFixed(4) },
    salePrice3() { if(this.hydetils.salePrice3)return this.hydetils.salePrice3.toFixed(4) },
    salePrice4() { if(this.hydetils.salePrice4)return this.hydetils.salePrice4.toFixed(4) },
    salePrice5() { if(this.hydetils.salePrice5)return this.hydetils.salePrice5.toFixed(4) },
  },
  props: ["hydetils"]

}
</script>
<style lang="scss" scoped>
div#app.at-night div.title{
  background-color: #1f2433;
}
div.root-el {
  padding:.26rem;
  background-color: #fff;
  div.left {
    margin-right:.18rem;
    div.datas {
      span:first-child {
        color: #999;
      }
      span:last-child {
        color: #3aba8f;
      }
    }
  }
  > div {
    flex-grow: 1;
    font-size: 12px;
    div.title,
    div.datas {
      display: flex;
      justify-content: space-between;
      padding: 0 .22rem;
      border-bottom: 0.5px solid rgba(153, 153, 153, 0.5);
      font-size: 12px;
    }
    span.w71 {
      width: 45px;
      text-align: center;
    }
    div.title {
      background-color: #ededed;
      font-size: 11px;
      color: #848689;
      line-height: 18px;
      border-bottom: 0;
      height: 18px;
    }
  }
  div.right {
    div.datas {
      span:last-child {
        color: #999;
      }
      span:first-child {
        color: #ec605e;
      }
    }
  }
}
</style>
