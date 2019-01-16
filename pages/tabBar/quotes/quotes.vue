<template>
  <view>
    <base-header title="行情"></base-header>
    <stock-tip-bar :commonstock='commonstock'></stock-tip-bar>
    <view class="uni-tab-bar">
      <view class="swiper-tab uni-flex">
        <view v-for="(tab,index) in groupLabel" :key="tab.id" class='swiper-tab-list2' :id="tab.id">
          <text :class="[tabIndex==index ? 'active' : '']" @tap="tapTab" :data-current="index">{{tab.tag_name}}{{'('+tab.tag_expiry+')'}}</text>
        </view>
      </view>
      <futures-title></futures-title>
      <scroll-view class="list2" lower-threshold='10' scroll-y @scrolltolower="loadMore(1)">
        <futures-datas :quote-list='quoteList' :code-list='codeList'></futures-datas>
        <!-- <view class="uni-tab-bar-loading">
          <uni-load-more :loading-type="resquestState" ></uni-load-more>
        </view> -->
      </scroll-view>
    </view>
  </view>
</template>

<script>
import stockTipBar from '@/components/quotesSub/stockTips.vue'
import futuresTitle from '@/components/quotesSub/futuresTitle.vue'
import futuresDatas from '@/components/quotesSub/futuresDatas.vue'

import uniLoadMore from '@/components/uni-load-more.vue';
import { mapState, mapMutations } from 'vuex';
import util from '@/common/util.js'

export default {
  components: {
    uniLoadMore, stockTipBar, futuresTitle, futuresDatas
  },
  data() {
    return {
      scrollLeft: 0,
      tabIndex: 0,
      resquestState: 1,
      newsitems: [1, 2, 3, 4],
      quotationStr: '',//获取列表所需的拼接字符串
      groupLabel: [],
      codeList: [],
      timmer: null,
      quoteList: [],//行情页显示的涨跌数据列表
      commonstock: {},//50etf股票详情
      commonstocktimmer: null
    }
  },
  created() {
    this.getgroupLabel()
  },
  computed: mapState(['taglist']),
  onHide() {
    console.log('关闭了第二个页面的定时器')
    clearInterval(util.indextimmer.quotesQryQuotationList)
    clearInterval(util.indextimmer.quotesCommonSelectStock)
    util.indextimmer.quotesQryQuotationList = null
    util.indextimmer.quotesCommonSelectStock = null
  },
  onShow() {
    clearInterval(util.indextimmer.indexCommonSelectStock)
    util.indextimmer.indexCommonSelectStock = null
    clearInterval(util.indextimmer.quotesCommonSelectStock)
    util.indextimmer.quotesCommonSelectStock = null
    clearInterval(util.indextimmer.quotesQryQuotationList)
    util.indextimmer.quotesQryQuotationList = null
    clearInterval(util.indextimmer.quotesQrySingleQuotationMsg)
    util.indextimmer.quotesQrySingleQuotationMsg = null
    
    // this.quotationStr || this.getartlelist()
    this.beginPolling()
    this.getcommonselectstock([''])
    if (util.indextimmer.quotesCommonSelectStock === null) {
      util.indextimmer.quotesCommonSelectStock = setInterval(() => {
        this.getcommonselectstock([this.commonstock[0].tradeMins])
      }, 1500)
    }
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
        console.log('启动', this.resquestState);
        util.indextimmer.quotesQryQuotationList = setInterval(() => this.resquestState && this.getquoteList(), 1500)
      }
    },
    getquoteList() {
      this.resquestState = 0
      var options = {
        url: '/fiftyEtf/QryQuotationList', //请求接口
        method: 'POST', //请求方法全部大写，默认GET
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
        console.log(err)
      })
    },
    getgroupLabel() {
      var options = {
        url: '/fiftyEtf/list_tag', //请求接口
        method: 'GET', //请求方法全部大写，默认GET
      }
      this.$httpReq(options).then((res) => {
        this.groupLabel = res.data.list
        this.getartlelist()
        this.beginPolling()//启动轮询
        this.settaglist(this.groupLabel[0])
      })
    },
    // 获取stockCode
    getartlelist() {
      this.resquestState = 0
      var options = {
        url: '/Sapi/Squery/list_stocks', //请求接口
        method: 'GET', //请求方法全部大写，默认GET
        data: {
          page_index: 0,
          page_size: 10000,
          tag_id: this.groupLabel[this.tabIndex].id,
          timestr: [],
          commonstock: {}
        },
      }

      this.$httpReq(options).then((res) => {
        this.codeList = res.data.list
        this.dealquotationStr()
        this.getquoteList()
      }).catch((err) => {
        // 请求失败的回调
        console.log(err)
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
    tapTab(e) { //点击tab-bar
      if (this.tabIndex === e.target.dataset.current) {
        return false;
      } else {
        this.tabIndex = e.target.dataset.current
        this.settaglist(this.groupLabel[this.tabIndex])
        this.getartlelist()
      }
    },
    dealquotationStr() {
      this.quotationStr = ''
      this.codeList.forEach(item => {
        this.quotationStr += '?' + item.stock_code
      });
    },
    // 获取50etf指数
    getcommonselectstock(timestrs) {
      // var timesformate=new Date().format("hh:mm:sss");
      var stockTradeMins = [{ "stockCodeInternal": "510050", "tradeMins": timestrs[0] }],
        stockTradeMins = JSON.stringify(stockTradeMins)
      var options = {
        url: '/stockStat/getCommonSelectStock', //请求接口
        method: 'POST', //请求方法全部大写，默认GET
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
        console.log(err)
      })
    }

  }

}
</script>

<style lang="scss" scoped>
view.uni-tab-bar {
  .list2 {
    /* #ifdef H5 */
    height: calc(100vh - 248upx - 94px);
    /* #endif */
    /* #ifndef H5 */
    height: calc(100vh - 248upx - 44px - var(--status-bar-height));
    /* #endif */
  }

  .swiper-tab {
    border-bottom: 1px solid #f4f6f6;
    justify-content: space-between;
    padding: 10upx 25upx 0;
    height: 84upx;

    .swiper-tab-list2 text.active {
      border-bottom: 1px solid #409de5;
      color: #409de5;
      padding-bottom: 13px;
    }

    .swiper-tab-list2 {
      // padding-bottom: 27upx;
      font-size: 15px;
      font-weight: 400;
      text-align: center;
      color: #181c28;
      width: 25%;
    }
  }
}
</style>
