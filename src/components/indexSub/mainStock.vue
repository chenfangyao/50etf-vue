<template>
  <div class="">
    <div class="tab2 black1" v-if="switchObj.home<3">
      <div v-vtap="{method:tabClick}" :class="{active:!activeI}">看涨</div>
      <div v-vtap="{method:tabClick}" :class="{active2:activeI}">看跌</div>
    </div>
    <div class="uni-flex newsViewTitle textc1" v-else>
      <span>自选合约</span>
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
    <div class="quotesList black2">
      <ul v-for="(item,i) in stockArr" :key="i" class="uni-flex" v-vtap="{method:go,params:i}">
        <li>
          <div class="textc1">{{item.stock_name.substr(5)}}</div>
          <div class="textc2">{{item.stock_code}}</div>
        </li>
        <li>{{item.trade_volume | judgeLength}}</li>
        <li>{{item.open_interest | judgeLength}}</li>
        <li :class="{inUp:item.incr_percent>0}" class="price">{{item.last_price}}</li>
        <li :class="{inUp:item.incr_percent>0}">{{item.incr_percent | percent}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Tab, Tabs } from 'vant';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      activeI: 0,
      stockItems: [],
      timmer: null,
      stockArr: [],
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  methods: {
    go(i) {
      this.$navigateTo({
        url: '/qi_quan_xiang_qing',
        query: { code: this.stockArr[i].stock_code }
      });
    },
    getquoteList() {
      this.resquestState = 0
      var options = {
        url: '/fiftyEtf/QryQuotationList',
        method: 'POST',
        data: {
          quotation_list: this.quotationStr
        },
        header: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
      this.$httpReq(options).then((res) => {
        this.stockArr = res.data.list
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    },
    getMainlist() {
      var options = {
        url: this.switchObj.home < 3 ? '/Sapi/Squery/main_stock_list' : '/Sapi/Fav/list_fav',
        method: 'POST',
      }
      this.$httpReq(options).then((res) => {
        if(this.switchObj.home < 3)this.stockItems = this.activeI ? res.data.down : res.data.up;
        else this.stockItems=res.data.list
        this.getquoteList()
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    },
    tabClick() {
      this.activeI = this.activeI == 0 ? 1 : 0
      this.getMainlist()
    },
  },
  filters: {
    percent(val) {
      return (val - 0).toFixed(2) + '%'
    },
    judgeLength(val) {
      return val > 99999 ? (val / 10000).toFixed(2) + '万' : val
    }
  },
  computed: {
    quotationStr() {
      return this.stockItems.map(item => {
        return '?' + item.stock_code
      }).join("")
    },
    ...mapState(['switchObj'])
  },
  created() {
    this.getMainlist()
    this.timmer || (this.timmer = setInterval(this.getquoteList, 3000))
  },
  activated() {//稍冗余
    this.getMainlist()
    this.timmer || (this.timmer = setInterval(this.getquoteList, 3000))
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
    background-color: $primary1;
  }
  > div:first-child {
    margin-right: 29px;
  }
}
div.newsViewTitle {
  justify-content: space-between;
  font-size: 16px;
  line-height: 16px;
  color: #333;
  margin: 0.32rem 0.1rem 0.24rem;
  span {
    border-left: solid $primary1 3px;
    padding-left: 6px;
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
.quotesList {
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 0 0.26rem;
  min-height: 350px;
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
      background: $primary1;
    }
    .price.inUp {
      color: $primary1;
    }
    .price {
      color: $green1;
    }
  }
  ul:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
}
div#app.at-night ul:not(:last-child) {
  border-color: #000;
}
</style>
