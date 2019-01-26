<template>
  <div class="wrap">
    <header-tab @tab-tap='tabTap' :title-list='titleList' :tabI='tabI'></header-tab>
    <div>
      <div class="fix">
        <!-- <filter-list :total='titleList[0].total' v-if='tabI==0'></filter-list> -->
        <hebin-total :total='titleList[tabI].total' v-if="tabI<2"></hebin-total>
        <template v-else-if="tabI==2">
          <div class="h8"></div>
          <top-btn ></top-btn>
        </template>
      </div>
      <div class="heightUp" v-show="tabI!=3"></div>
      <div class="h40" v-show="tabI==2"></div>
    </div>
    <scroll-view :class="[objI<2?'list2':objI==2?'list3':'list4']" v-for="(obj,objI) in titleList" :key="objI" v-show="tabI==objI" lower-threshold='20' scroll-y @scrollToEnd="loadMore(objI)">
      <list-one :tab-i='objI' :list='obj.list' @gou-shi='openPop' v-if="objI<2"></list-one>
      <list-two :tab-i='objI' :list='obj.list' v-else-if='objI==2'></list-two>
      <list-three :tab-i='objI' :list='obj.list' v-else></list-three>
      <div v-if="obj.total==0" class="nullTxt">您还未开仓，空空如也</div>
      <uni-load-more v-else :loading-type="obj.resquestState"></uni-load-more>
    </scroll-view>
    <div class="h5"></div>
    <fenbi-pop v-if="showFenbiPop" :hebin-hide='tabI==0' :res-obj='listItem' @close-me='closePop'></fenbi-pop>
    <hebing-pop v-if="showHebingPop"  :res-obj='listItem' @close-me='closePop'></hebing-pop>

  </div>
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
import scrollView from '@/components/other/scroll-view'

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
  components: { headerTab, filterList, uniLoadMore, listOne, hebinTotal, topBtn, listTwo, listThree, fenbiPop, hebingPop ,scrollView},
  methods: {
    ...mapMutations(['setweituoindex']),
    openPop(i) {
      this.tabI == 1 ? (this.showHebingPop = true) : (this.showFenbiPop = true)
      this.listItem = this.titleList[this.tabI].list[i]//分笔pop
    },
    closePop() {
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
        console.error(err,'捕捉')
      })
    }
  },
  created() {
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
div.wrap {
  /* #ifdef H5 */
  min-height: calc(100vh - 50px);
  /* #endif */
  /* #ifndef H5 */
  height: 100vh;
  /* #endif */
  background-color: #f5f5f5;
  .list2 {
    overflow: hidden;
    height: calc(100vh - .68rem  -  86px);
    // height: calc(100vh -.68rem - 44px - var(--status-bar-height));
  }
  .list3 {
    overflow: hidden;
    height: calc(100vh - 1.24rem - 94px);
    // height: calc(100vh -1.28rem - 44px - var(--status-bar-height));
  }
  .list4 {
    overflow: hidden;
    height: calc(100vh - 94px - .12rem);
    // height: calc(100vh - 44px - var(--status-bar-height) -.12rem);
    margin-top:.12rem;
  }
  div.heightUp {
    height:.68rem;
  }
  div.h8{
    height: 8px;
    background-color: #f5f5f5;
    position: relative;
    z-index: 50
  }
  div.h5{
    height: 5px;
  }
  div.fix {
    position: fixed;
    left: 0;
    right: 0;
    /* #ifdef H5 */
    top: 44px;
    /* #endif */
    // top: calc(44px + var(--status-bar-height));

    z-index: 20;
    background-color: #f5f5f5;
    // padding-bottom:.16rem;
  }
  div.h40 {
    height:.50rem;
  }
  div.nullTxt {
    text-align: center;
    margin-top: 50%;
  }
}
</style>
