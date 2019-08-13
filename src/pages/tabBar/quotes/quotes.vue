<template>
  <div>
    <header-title v-if="switchObj.show_fav" :tab-active="onMarket" @change-close="reGetSth" left-name="自选" right-name="市场"></header-title>
    <base-header title="行情" v-else></base-header>
    <stock-tip-bar :commonstock="commonstock"></stock-tip-bar>
    <div class="uni-tab-bar" v-show="onMarket">
      <div class="swiper-tab uni-flex black2 ">
        <div v-for="(tab,index) in taglist" :key="tab.id" class="swiper-tab-list2 textc1" :id="tab.id">
          <span :class="[tabIndex==index ? 'active' : '']" v-vtap="{method:tapTab}" :data-current="index">{{tab.tag_name}}{{'('+tab.tag_expiry+')'}}</span>
        </div>
      </div>
      <futures-title></futures-title>
      <scroll-view class="list2" :style="{height: clacHeight}" @scrollToEnd="loadMore(1)">
        <futures-datas :quote-list="quoteList" :code-list="codeList" :latest-price="commonstock"></futures-datas>
      </scroll-view>
    </div>
    <self-choose v-show="!onMarket" :un-active="onMarket"></self-choose>
  </div>
</template>

<script>
import stockTipBar from '@/components/quotesSub/stockTips.vue'
import futuresTitle from '@/components/quotesSub/futuresTitle.vue'
import futuresDatas from '@/components/quotesSub/futuresDatas.vue'
import selfChoose from '@/components/quotesSub/selfChoose.vue'
import headerTitle from '@/components/openCloseSub/headerTitle.vue'

import uniLoadMore from '@/components/uni-load-more.vue';
import { mapState, mapMutations } from 'vuex';
import util from '@/common/util.js'
import scrollView from '@/components/other/scroll-view'

export default {
  components: {
    uniLoadMore, stockTipBar, futuresTitle, futuresDatas, scrollView, headerTitle, selfChoose
  },
  data() {
    return {
      scrollLeft: 0,
      tabIndex: 0,
      onMarket: true,
      resquestState: 1,
      newsitems: [1, 2, 3, 4],
      quotationStr: '',//获取列表所需的拼接字符串
      codeList: [],
      timmer: null,
      quoteList: [],//行情页显示的涨跌数据列表
      commonstock: [{ priceChangeRate: 0 }],//50etf股票详情
      commonstocktimmer: null
    }
  },
  computed: {
    ...mapState(['taglist', 'statusbarHeight', 'switchObj']),
    clacHeight() {
      return window.innerHeight - 230 - this.statusbarHeight + 'px'
    }
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(util.indextimmer.quotesQryQuotationList)
    clearInterval(util.indextimmer.quotesCommonSelectStock)
    util.indextimmer.quotesQryQuotationList = null
    util.indextimmer.quotesCommonSelectStock = null
    next()
  },
  /*  beforeRouteEnter(to, from, next) {
     next(vm => {
       
     })
   }, */
  activated() {
    this.quotationStr || this.getgroupLabel()//获取那一串股票码
    this.getcommonselectstock([''])
    if (!util.calcLegalTime()) return;
    this.beginPolling()
    if (util.indextimmer.quotesCommonSelectStock === null) {
      util.indextimmer.quotesCommonSelectStock = setInterval(() => {
        this.getcommonselectstock([this.commonstock[0].tradeMins])
      }, 1500)
    }
  },
  methods: {
    ...mapMutations(['setcommonstock', 'settaglist']),
    reGetSth() {
      this.onMarket = !this.onMarket
      if(this.onMarket){
        this.beginPolling()
      }else{
        clearInterval(util.indextimmer.quotesQryQuotationList)
        util.indextimmer.quotesQryQuotationList = null
      }

    },
    loadMore(e) {
      // this.resquestState = 1
      // setTimeout(() => {
      //   this.addData(e);
      //   this.resquestState = 0
      // }, 1200);
    },
    beginPolling() {
      if (util.indextimmer.quotesQryQuotationList === null&&this.onMarket) {
        util.indextimmer.quotesQryQuotationList = setInterval(() => this.resquestState && this.getquoteList(), 1000)
      }
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
        this.resquestState = 1//请求状态
        this.quoteList = res.data.list
      }).catch((err) => {

        console.error(err, '捕捉')
      })
    },
    getgroupLabel() {
      var options = {
        url: '/Sapi/Squery/list_tag',
        method: 'GET',
      }
      if (this.taglist) {
        this.startArtlelist()
        return
      }
      this.$httpReq(options).then((res) => {
        this.settaglist(res.data.list)
        this.startArtlelist()
      })
    },
    startArtlelist() {
      this.getartlelist()
      util.calcLegalTime() && this.beginPolling()//启动轮询
    },
    // 获取stockCode
    getartlelist() {
      this.resquestState = 0
      var options = {
        url: '/Sapi/Squery/list_stocks',
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
        this.codeList && this.dealquotationStr()
      }).catch((err) => {

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
        url: '/stockStat/getCommonSelectStock',
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

        console.error(err, '捕捉')
      })
    }

  }

}
</script>

<style lang="scss" scoped>
div.uni-tab-bar {
  .list2 {
    overflow: hidden;
  }

  .swiper-tab {
    border-bottom: 1px solid #f4f6f6;
    // justify-content: space-between;
    // padding: 0.1rem 0.25rem 0;
    padding-top: 0.1rem;
    height: 0.84rem;

    .swiper-tab-list2 span.active {
      border-bottom: 1px solid $primary1;
      color: $primary1;
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
