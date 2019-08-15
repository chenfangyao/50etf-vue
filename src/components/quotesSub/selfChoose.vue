<template>
  <div class="">
    <div class="title uni-flex black2 textc2">
      <div v-vtap="{method:reorder}">
        <span>名称</span>
        <s-icon icon-class="order_by"></s-icon>
      </div>
      <div class="middle">
        <span>成交量</span>
        <span>持仓量</span>
        <span>现价</span>
      </div>
      <div>涨幅比</div>
    </div>
    <div class="list black2 textc1" v-if="stockArr">
      <div v-for="(item,i) in stockArr" :key="item.stock_code">
        <div class="singleItem">
          <ul class="uni-flex" v-vtap="{method:go}" :data-i="i">
            <li>
              <div class="textc1">{{item.stock_name.substr(5)}}</div>
              <div class="textc2">{{item.stock_code}}</div>
            </li>
            <li>{{item.trade_volume | judgeLength}}</li>
            <li>{{item.open_interest | judgeLength}}</li>
            <li :class="{inUp:item.incr_percent>0}" class="price">{{item.last_price}}</li>
            <li :class="{inUp:item.incr_percent>0}">{{item.incr_percent | percent}}</li>
          </ul>
          <div class="deleteBtn" v-vtap="{method:deleteFav}" :data-i="i">删除</div>
        </div>
      </div>
    </div>
    <div v-else class="svgDiv">
      <s-icon icon-class="weitianjia"></s-icon>
      <div>您尚未添加自选合约！</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stockItems: [],
      timmer: null,
      stockArr: null,
      orderTypeI: 0
    }
  },
  methods: {
    reorder() {
      this.orderTypeI = this.orderTypeI == 2 ? 0 : ++this.orderTypeI;
      this.getMainlist()
    },
    go(e) {
      const i = e.currentTarget.dataset.i;
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
        url: '/Sapi/Fav/list_fav',
        method: 'GET',
        data: {
          page_index: 0,
          page_size: 20,
          order_type: this.orderTypeI
        }
      }
      this.$httpReq(options).then((res) => {
        this.stockItems = res.data.list
        this.getquoteList()
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    },
    deleteFav(e) {
      const i = e.currentTarget.dataset.i;
      var options = {
        url: '/Sapi/Fav/del_fav',
        method: 'POST',
        data: {
          code: this.stockArr[i].stock_code,
        },
      }
      this.$httpReq(options).then(res => {
        if (res.status) {
          this.stockItems.splice(i, 1)
          this.$toast(res.info)
        }
      }
      )
    },
    startDoSth() {
      if (this.unActive) return;
      this.getMainlist()
      this.timmer || (this.timmer = setInterval(this.getquoteList, 3000))
    }
  },
  props: ['unActive'],
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
    }
  },
  created() {
    this.startDoSth()
  },
  activated() {
    this.startDoSth()
  },
  deactivated() {
    clearInterval(this.timmer)
    this.timmer = null
  },
  watch: {
    unActive(val) {
      if (val) {//本页隐藏时
        clearInterval(this.timmer)
        this.timmer = null
      } else {
        this.startDoSth()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  justify-content: space-between;
  font-size: 12px;
  font-weight: 500;
  height: 44px;
  margin-bottom: 4px;
  background-color: #fff;
  color: rgba(102, 102, 102, 1);
  padding: 0 0.29rem;
  border-bottom: solid 1px #ccc;
  > div {
    line-height: 44px;
    span:nth-child(2) {
      margin-left: 0.6rem;
      margin-right: 0.6rem;
    }
  }
  div.middle {
    width: 60%;
    text-align: center;
  }
}
.list {
  background-color: #fff;
  border-radius: 5px;
  min-height: 400px;
  margin-bottom: 20px;
  padding-left: 0.26rem;
  > div {
    overflow: auto;
    &:not(:last-child) {
      border-bottom: 1px solid #ddd;
    }
  }
  .singleItem {
    display: flex;
    width: calc(100% + 1.36rem);
    .deleteBtn {
      flex-shrink: 0;
      width: 1.33rem;
      background-color: $primary1;
      color: #fff;
      line-height: 1.17rem;
      text-align: center;
      margin-left: 15px;
    }
  }
  ul {
    justify-content: space-between;
    align-items: center;
    padding: 0.15rem 0;
    width: 100%;
    height: 1.17rem;
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
}
.svgDiv {
  font-size: 10px;
  text-align: center;
  padding-top: 2.5rem;
  color: rgba(153, 153, 153, 1);
  .s-icon {
    width: 1.9rem;
    height: 1.9rem;
  }
}
div#app.at-night ul:not(:last-child) {
  border-color: #000;
}
</style>
