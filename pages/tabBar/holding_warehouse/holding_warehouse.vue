<template>
  <view class="wrap">
    <header-tab @tab-tap='tabTap' :title-list='titleList' :tabI='tabI'></header-tab>
    <view>
      <view class="fix">
        <!-- <filter-list :total='titleList[0].total' v-if='tabI==0'></filter-list> -->
        <hebin-total :total='titleList[tabI].total' v-if="tabI<2"></hebin-total>
        <top-btn v-else-if="tabI==2"></top-btn>
      </view>
      <view class="heightUp" v-show="tabI!=3"></view>
      <view class="h60" v-show="tabI==2"></view>
    </view>
    <scroll-view :class="[objI<2?'list2':objI==2?'list3':'list4']" v-for="(obj,objI) in titleList" :key="objI" v-show="tabI==objI" lower-threshold='20' scroll-y @scrolltolower="loadMore(objI)">
      <list-one :tab-i='objI' :list='obj.list' @gou-shi='openPop' v-if="objI<2"></list-one>
      <list-two :tab-i='objI' :list='obj.list' v-else-if='objI==2'></list-two>
      <list-three :tab-i='objI' :list='obj.list' v-else></list-three>
      <view v-if="obj.total==0" class="nullTxt">您还未开仓，空空如也</view>
      <uni-load-more v-else :loading-type="obj.resquestState"></uni-load-more>
    </scroll-view>
    <fenbi-pop v-if="showFenbiPop" :hebin-hide='tabI==0' :res-obj='listItem' @close-me='closePop'></fenbi-pop>
    <hebing-pop v-if="showHebingPop"  :res-obj='listItem' @close-me='closePop'></hebing-pop>

  </view>
</template>

<script>
import headerTab from '@/components/holdingSub/headerTab.vue';
import filterList from '@/components/holdingSub/filterList.vue';
import listOne from '@/components/holdingSub/listOne.vue';
import listTwo from '@/components/holdingSub/listTwo.vue';
import listThree from '@/components/holdingSub/listThree.vue';
import hebinTotal from '@/components/holdingSub/hebinTotal.vue';
import topBtn from '@/components/holdingSub/topBtn.vue';
import uniLoadMore from '@/components/uni-load-more.vue';

import hebingPop from '@/components/holdingSub/hebingPop.vue'
import fenbiPop from '@/components/holdingSub/fenbiPop.vue'
import { mapState, mapMutations } from 'vuex';
import util from '@/common/util.js'

export default {
  data() {
    return {
      tabI: 0,//顶部tab位置
      showFenbiPop: false,
      showHebingPop: false,
      listItem: {},//给fenbiPop的数据
      viewMask: null,
      revokeTimer: null,//撤单定时器
      titleList: [
        { name: '分笔', startI: 0, list: [], resquestState: 0, total: 0, },
        { name: '合并', startI: 0, list: [], resquestState: 0, total: 0, },
        { name: '委托', startI: 0, list: [], resquestState: 0, total: 0, },
        { name: '撤单', startI: 0, list: [], resquestState: 0, total: 0, },
      ],

    };
  },
  computed: mapState(['weituoindex']),
  components: { headerTab, filterList, uniLoadMore, listOne, hebinTotal, topBtn, listTwo, listThree, fenbiPop, hebingPop },
  methods: {
    ...mapMutations(['setweituoindex']),
    openPop(i) {
      //#ifdef APP-PLUS
      this.viewMask === null && (this.viewMask = new plus.nativeObj.View('mask', { left: '0px', height: '56px', bottom: '0px', width: '100%', backgroundColor: "rgba(0,0,0,0.3)" }));
      this.viewMask && this.viewMask.show()
      //#endif
      this.tabI == 1 ? (this.showHebingPop = true) : (this.showFenbiPop = true)
      this.listItem = this.titleList[this.tabI].list[i]//分笔pop
    },
    closePop() {
      //#ifdef APP-PLUS
      this.viewMask && this.viewMask.close()
      this.viewMask = null
      //#endif
      this.tabI == 1 ? (this.showHebingPop = false) : (this.showFenbiPop = false)
    },
    tabTap(i) {
      this.tabI = i
      this.checkRevoke(i)
      this.titleList[i].startI=0//重搜
      this.getFenbiList(i)
    },
    checkRevoke(i) {
      if (i == 3) {
        !this.revokeTimer && (this.revokeTimer = setInterval(i => { this.getFenbiList(3) }, 3000))
      } else {
        clearInterval(this.revokeTimer)
        this.revokeTimer = null
      }
    },
    loadMore(i) {
      if (this.titleList[i].resquestState < 2) {
        this.titleList[i].startI++
        this.getFenbiList(i, 'add')
      }
    },
    getFenbiList(i, add) {
      this.titleList[i].resquestState = 1
      let url = ''
      let j = Number(i)
      switch (j) {
        case 0: url = '/Sapi/Squery/list_fbcc'
          break
        case 1: url = '/Sapi/Squery/list_hbcc'
          break
        case 2: url = '/Sapi/Squery/list_entrust'
          break
        case 3: url = '/Sapi/Squery/list_kc'
          break
      }
      var options = {
        url, //请求接口
        data: {
          page_index: this.titleList[i].startI,
          page_size: 10,
        },
        method: 'GET'
      }
      this.$httpReq(options).then((res) => {
        if (res.data.not_auth == 1) {
          return this.$tipLogin()
        }
        this.titleList[i].total = res.data.total
        if (add) {
          this.titleList[i].list = this.titleList[i].list.concat(res.data.list)
        } else {
          this.titleList[i].list = res.data.list
        }
        this.titleList[i].resquestState = res.data.list.length == 10 ? 0 : 2
      }).catch((err) => {
        console.error(err)
      })
    }
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

    if (this.weituoindex == 2) {
      this.tabI = 2
      this.titleList[2].startI = 0

      this.getFenbiList(2)
      return
    }
    this.titleList[this.tabI].list.length || this.getFenbiList(this.tabI)
  },
  onHide() {
    this.setweituoindex(0)
    this.checkRevoke()//清除撤单定时器
  }
}
</script>

<style lang="scss" scoped>
view.wrap {
  /* #ifdef H5 */
  min-height: calc(100vh - 50px);
  /* #endif */
  /* #ifndef H5 */
  height: 100vh;
  /* #endif */
  background-color: #f5f5f5;
  .list2 {
    /* #ifdef H5 */
    height: calc(100vh - 68upx - 94px);
    /* #endif */
    /* #ifndef H5 */
    height: calc(100vh - 68upx - 44px - var(--status-bar-height));
    /* #endif */
  }
  .list3 {
    /* #ifdef H5 */
    height: calc(100vh - 128upx - 94px);
    /* #endif */
    /* #ifndef H5 */
    height: calc(100vh - 128upx - 44px - var(--status-bar-height));
    /* #endif */
  }
  .list4 {
    /* #ifdef H5 */
    height: calc(100vh - 94px - 12upx);
    /* #endif */
    /* #ifndef H5 */
    height: calc(100vh - 44px - var(--status-bar-height) - 12upx);
    /* #endif */
    margin-top: 12upx;
  }
  view.heightUp {
    height: 68upx;
  }
  view.fix {
    position: fixed;
    left: 0;
    right: 0;
    /* #ifdef H5 */
    top: 45px;
    /* #endif */
    /* #ifndef H5 */
    top: calc(44px + var(--status-bar-height));
    /* #endif */

    z-index: 20;
    background-color: #f5f5f5;
    // padding-bottom: 16upx;
  }
  view.h60 {
    height: 60upx;
  }
  view.nullTxt {
    text-align: center;
    margin-top: 50%;
  }
}
</style>
