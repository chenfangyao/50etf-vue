<template>
  <div>
    <base-header title="行情"></base-header>
    <stock-tip-bar :commonstock="commonstock"></stock-tip-bar>
    <div class="uni-tab-bar">
      <div class="swiper-tab uni-flex black2 ">
        <div v-for="(tab,index) in taglist" :key="tab.id" class="swiper-tab-list2 textc1" :id="tab.id">
          <span
            :class="[tabIndex==index ? 'active' : '']"
            v-vtap="{method:tapTab}"
            :data-current="index"
          >{{tab.tag_name}}{{'('+tab.tag_expiry+')'}}</span>
        </div>
      </div>
      <futures-title></futures-title>
      <scroll-view class="list2" @scrollToEnd="loadMore(1)">
        <futures-datas :quote-list="quoteList" :code-list="codeList" :latest-price="commonstock"></futures-datas>
        <!-- <div class="uni-tab-bar-loading">
          <uni-load-more :loading-type="resquestState" ></uni-load-more>
        </div>-->
      </scroll-view>
    </div>
  </div>
</template>

<script>
import stockTipBar from '@/components/quotesSub/stockTips.vue'
import futuresTitle from '@/components/quotesSub/futuresTitle.vue'
import futuresDatas from '@/components/quotesSub/futuresDatas.vue'

import uniLoadMore from '@/components/uni-load-more.vue';
import { mapState, mapMutations } from 'vuex';
import util from '@/common/util.js'
import scrollView from '@/components/other/scroll-view'

export default {
  components: {
    uniLoadMore, stockTipBar, futuresTitle, futuresDatas, scrollView
  },
  data() {
    return {
      scrollLeft: 0,
      tabIndex: 0,
      resquestState: 1,
      newsitems: [1, 2, 3, 4],
      quotationStr: '',//获取列表所需的拼接字符串
      codeList: [],
      timmer: null,
      quoteList: [],//行情页显示的涨跌数据列表
      commonstock: [{priceChangeRate:0}],//50etf股票详情
      commonstocktimmer: null
    }
  },
  computed: mapState(['taglist']),
  beforeRouteLeave(to, from, next) {
    clearInterval(util.indextimmer.quotesQryQuotationList)
    clearInterval(util.indextimmer.quotesCommonSelectStock)
    util.indextimmer.quotesQryQuotationList = null
    util.indextimmer.quotesCommonSelectStock = null
    next()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.quotationStr || vm.getgroupLabel()//获取那一串股票码
      vm.getcommonselectstock([''])
      if (!util.calcLegalTime()) return;
      vm.beginPolling()
      if (util.indextimmer.quotesCommonSelectStock === null) {
        util.indextimmer.quotesCommonSelectStock = setInterval(() => {
          vm.getcommonselectstock([vm.commonstock[0].tradeMins])
        }, 1500)
      }
    })
  },
  methods: {
    ...mapMutations(['setcommonstock', 'settaglist']),
    loadMore(e) {
      // this.resquestState = 1
      // setTimeout(() => {
      //   this.addData(e);
      //   this.resquestState = 0
      // }, 1200);
    },
    beginPolling() {
      if (util.indextimmer.quotesQryQuotationList === null) {
        util.indextimmer.quotesQryQuotationList = setInterval(() => this.resquestState && this.getquoteList(), 1500)
      }
    },
    getquoteList() {
      this.resquestState = 0
      var options = {
        url: '/fiftyEtf/QryQuotationList', //请求接口
        method: 'POST', 
        data: {
          quotation_list: this.quotationStr
        },
        header: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
      this.$httpReq(options).then((res) => {
        this.resquestState = 1//请求状态
        this.quoteList = res.data.list
      }).catch((err) => {
        // 请求失败的回调
        console.error(err, '捕捉')
      })
    },
    getgroupLabel() {
      var options = {
        url: '/Sapi/Squery/list_tag', 
        // url: '/fiftyEtf/list_tag', //请求接口
        method: 'GET', 
      }
      if(this.taglist){
        this.startArtlelist()
        return
      }
      this.$httpReq(options).then((res) => {
        this.settaglist(res.data.list)
        this.startArtlelist()
      })
    },
    startArtlelist(){
      this.getartlelist()
      util.calcLegalTime() && this.beginPolling()//启动轮询
    },
    // 获取stockCode
    getartlelist() {
      this.resquestState = 0
      var options = {
        url: '/Sapi/Squery/list_stocks', //请求接口
        method: 'GET', 
        data: {
          page_index: 0,
          page_size: 10000,
          tag_id: this.taglist[this.tabIndex].id,
          timestr: [],
          commonstock: {}
        },
      }

      this.$httpReq(options).then((res) => {
        this.codeList = res.data.list
        this.codeList&&this.dealquotationStr()
      }).catch((err) => {
        // 请求失败的回调
        console.error(err, '捕捉')
      })
    },
    addData(e) {
      if (this.newsitems[e].data.length > 30) {
        this.newsitems[e].loadingType = 2;
        return;
      }
      for (let i = 1; i <= 10; i++) {
        this.newsitems[e].data.push('hjkh');
      }
      this.newsitems[e].loadingType = 1;
    },
    tapTab(e) { //点击tab
      if (this.tabIndex === e.target.dataset.current) {
        return false;
      } else {
        this.tabIndex = e.target.dataset.current
        this.quoteList = []
        this.getartlelist()
      }
    },
    dealquotationStr() {
      this.quotationStr = ''
      this.codeList.forEach(item => {
        this.quotationStr += '?' + item.stock_code
      });
      this.getquoteList()

    },
    // 获取50etf指数
    getcommonselectstock(timestrs) {
      // var timesformate=new Date().format("hh:mm:sss");
      var stockTradeMins = [{ "stockCodeInternal": "510050", "tradeMins": timestrs[0] }],
        stockTradeMins = JSON.stringify(stockTradeMins)
      var options = {
        url: '/stockStat/getCommonSelectStock', //请求接口
        method: 'POST', 
        data: { stockTradeMins: stockTradeMins },
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
      this.$httpReq(options).then((res) => {
        // 请求成功的回调
        if (res.result == 1 && res.ldata[0].updated === true) {
          this.commonstock = res.ldata
          this.setcommonstock(res.ldata)
        }
      }).catch((err) => {
        // 请求失败的回调
        console.error(err, '捕捉')
      })
    }

  }

}
</script>

<style lang="scss" scoped>
div.uni-tab-bar {
  .list2 {
    height: calc(100vh - 2.48rem - 97px);
    overflow: hidden;
    // height: calc(100vh -2.48rem - 44px - var(--status-bar-height));
  }

  .swiper-tab {
    border-bottom: 1px solid #f4f6f6;
    // justify-content: space-between;
    // padding: 0.1rem 0.25rem 0;
    padding-top: 0.1rem;
    height: 0.84rem;

    .swiper-tab-list2 span.active {
      border-bottom: 1px solid #409de5;
      color: #409de5;
      padding-bottom: 13px;
    }

    .swiper-tab-list2 {
      // padding-bottom:.27rem;
      font-size: 15px;
      font-weight: 400;
      text-align: center;
      color: #181c28;
      width: 25%;
    }
  }
}
</style>
