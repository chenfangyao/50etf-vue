<template>
  <view>
    <base-header title="行情"></base-header>
    <stock-tip-bar></stock-tip-bar>
    <view class="uni-tab-bar">
      <view class="swiper-tab uni-flex">
        <view v-for="(tab,index) in groupLabel" :key="tab.id" class='swiper-tab-list2' :id="tab.id">
          <text :class="[tabIndex==index ? 'active' : '']" @tap="tapTab" :data-current="index">{{tab.tag_name}}{{'('+tab.tag_expiry+')'}}</text>
        </view>
      </view>
      <futures-title></futures-title>
      <scroll-view class="list2" lower-threshold='10' scroll-y @scrolltolower="loadMore(1)">
        <futures-datas :quote-list='quoteList'></futures-datas>
        <view class="uni-tab-bar-loading">
          <uni-load-more :loading-type="resquestState" ></uni-load-more>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import stockTipBar from '@/components/quotesSub/stockTips.vue'
import futuresTitle from '@/components/quotesSub/futuresTitle.vue'
import futuresDatas from '@/components/quotesSub/futuresDatas.vue'

import uniLoadMore from '@/components/uni-load-more.vue';

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
    }
  },
  created() {
    this.getgroupLabel()
  },
  onHide() {
    clearInterval(this.timmer)
    this.timmer = null
  },
  onShow() {
     this.beginPolling()
  },
  methods: {
    loadMore(e) {
      // this.resquestState = 1
      // setTimeout(() => {
      //   this.addData(e);
      //   this.resquestState = 0
      // }, 1200);
    },
    beginPolling() {
      if(this.timmer===null){
        console.log('开启定时');
       // this.timmer = setInterval(() => this.resquestState && this.getquoteList(), 1500)
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
      }).catch((err) => {
        // 请求失败的回调
        console.log(err)
      })
    },
    // 获取stockCode
    getartlelist() {
      this.resquestState = 0
      var options = {
        url: '/fiftyEtf/list_stocks', //请求接口
        method: 'GET', //请求方法全部大写，默认GET
        data: {
          page_index: 0,
          page_size: 10000,
          tag_id: this.groupLabel[this.tabIndex].id
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
        this.getartlelist()
      }
    },
    dealquotationStr() {
      this.quotationStr = ''
      this.codeList.forEach(item => {
        this.quotationStr += '?' + item.stock_code
      });
    },

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
      // text-align: center;
      color: #181c28;
      width: 25%;
    }
  }
}
</style>
