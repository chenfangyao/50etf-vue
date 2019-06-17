<template>
  <div class="">
    <div class="tab2 black1">
      <div v-vtap="{method:tabClick}" :class="{active:!activeI}">看涨</div>
      <div v-vtap="{method:tabClick}" :class="{active2:activeI}">看跌</div>
    </div>
    <div class="title uni-flex black2 textc2">
      <div>名称</div>
      <div class="middle">
        <span>成交量</span>
        <span>持仓量</span>
        <span>现价</span>
      </div>
      <div>涨幅比</div>
    </div>
    <div class="list black2">
      <ul v-for="(item,i) in stockItems" :key="i" class="uni-flex" v-vtap="{method:go,params:i}">
        <li>
          <div class="textc1">{{item.stock_name.substr(5)}}</div>
          <div class="textc2">{{item.stock_code}}</div>
        </li>
        <li>{{item.buy_amount1 | judgeLength}}</li>
        <li>{{item.open_interest | judgeLength}}</li>
        <li :class="{inUp:!activeI}" class="price">{{item.last_price}}</li>
        <li :class="{inUp:!activeI}">{{item.incr_percent | percent}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Tab, Tabs } from 'vant';
export default {
  data() {
    return {
      activeI: 0,
      stockItems: [],
      allStock: {},
      timmer: null
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  methods: {
    go(i){
      this.$navigateTo({
        url: '/qi_quan_xiang_qing',
        query: { code:this.stockItems[i].stock_code }
      });
    },
    getMainlist() {
      var options = {
        url: '/Sapi/Squery/main_stock_list',
        method: 'POST',
      }
      this.$httpReq(options).then((res) => {
        this.allStock = res.data
        this.stockItems = this.activeI ? res.data.down : res.data.up
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    },
    tabClick() {
      this.activeI = this.activeI == 0?1:0
      this.getMainlist()
    },
  },
  filters: {
    percent(val) {
      return val.toFixed(2) + '%'
    },
    judgeLength(val) {
      return val > 99999 ? (val / 10000).toFixed(2) + '万' : val
    }
  },
  activated() {
    this.getMainlist()
    this.timmer = setInterval(this.getMainlist, 3000)
  },
  deactivated() {
    clearInterval(this.timmer)
    this.timmer = null
  }
}
</script>
<style lang="scss" scoped>
.tab2 {
  display: flex;
  justify-content: center;
  padding: 15px 0;
  .active::after,
  .active2::after {
    content: "";
    width: 17px;
    height: 3px;
    background-color: $green1;
    display: block;
    transform: translateX(5px);
  }
  .active::after {
    background-color: $red1;
  }
  > div:first-child {
    margin-right: 29px;
  }
}
.title {
  justify-content: space-between;
  font-size: 12px;
  font-weight: 500;
  height: 44px;
  margin-bottom: 4px;
  background-color: #fff;
  border-radius: 5px;
  color: rgba(102, 102, 102, 1);
  padding: 0 0.29rem;
  > div {
    line-height: 44px;
    span:nth-child(2) {
      margin-left: 0.58rem;
      margin-right: 0.58rem;
    }
  }
  div.middle {
    width: 60%;
    margin-left: 0.2rem;
    text-align: center;
  }
}
.list {
  background-color: #fff;
  border-radius: 5px;
  min-height: 400px;
  margin-bottom: 20px;
  padding: 0 0.26rem;
  ul {
    justify-content: space-between;
    align-items: center;
    padding: 0.15rem 0;
    li {
      line-height: 1;
      width: 18%;
    }
    li:first-child {
      font-size: 11px;
      width: 21%;
      color: #999;
      div:first-child {
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
    }
    li:last-child {
      width: 1.2rem;
      height: 0.54rem;
      color: #fff;
      line-height: 0.54rem;
      text-align: center;
      border-radius: 2px;
      background: $green1;
    }
    li:not(:last-child):not(:first-child) {
      text-align: center;
    }
    .inUp:last-child {
      background: $red1;
    }
    .price.inUp {
      color: $red1;
    }
    .price {
      color: $green1;
    }
  }
  ul:not(:last-child){
    border-bottom: 1px solid #ddd;
  }
}
div#app.at-night ul:not(:last-child){
  border-color: #000
}
</style>
