<template>
  <div class="wrap">
    <header-tab @tab-tap="tabTap" :title-list="titleList" :tabI="tabI"></header-tab>
    <div v-if="tabI<2">
      <div class="fix black1" :style="{top:40+statusbarHeight+'px'}">
        <!-- <filter-list :total='titleList[0].total' v-if='tabI==0'></filter-list> -->
        <hebin-total :total="titleList[tabI].total" ></hebin-total>
      </div>
      <div class="heightUp black1"></div>
    </div>
    <scroll-view class="list2" v-show="tabI<2" ref="s1" @scrollToEnd="loadMore(tabI)">
      <list-one :tab-i="tabI" :list="titleList[tabI].list" @gou-shi="openPop"></list-one>
      <div v-if="titleList[tabI].total==0" class="nullTxt">您还未持仓，去持仓盈利吧！</div>
    </scroll-view>
    <scroll-view class="list3" @scrollToEnd="loadMore(2)" ref="s2" v-show="tabI==2">
      <div>
        <top-btn></top-btn>
        <list-two :tab-i="tabI" :list="titleList[2].list"></list-two>
      </div>
      <div v-if="titleList[2].total==0" class="nullTxt">今日未有交易委托！</div>
    </scroll-view>
    <scroll-view class='list4' @scrollToEnd="loadMore(3)" ref="s3" v-show="tabI==3">
      <list-three :tab-i="tabI" :list="titleList[3].list" @re-get='getFenbiList(3)'></list-three>
      <div v-if="titleList[3].total==0" class="nullTxt">无可撤的委托！</div>
    </scroll-view>
    <div class="h5 black1"></div>
    <fenbi-pop v-if="showFenbiPop" :hebin-hide="tabI==0" :res-obj="listItem" @close-me="closePop"></fenbi-pop>
    <hebing-pop v-if="showHebingPop" :res-obj="listItem" @close-me="closePop"></hebing-pop>
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
  computed: mapState(['weituoindex', 'statusbarHeight', 'atNight']),
  components: { headerTab, filterList, uniLoadMore, listOne, hebinTotal, topBtn, listTwo, listThree, fenbiPop, hebingPop, scrollView },
  methods: {
    ...mapMutations(['setweituoindex']),
    openPop(i) {
      this.listItem = this.titleList[this.tabI].list[i]//分笔pop
      this.tabI == 1 ? (this.showHebingPop = true) : (this.showFenbiPop = true)
    },
    closePop() {
      this.tabI == 1 ? (this.showHebingPop = false) : (this.showFenbiPop = false)
    },
    tabTap(i) {
      this.tabI = i
      this.setweituoindex(i)
      this.checkRevoke(i)
      this.titleList[i].startI = 0//重搜
      this.getFenbiList(i)
    },
    checkRevoke(i) {
      clearInterval(this.revokeTimer)
      this.revokeTimer = null
      if (i === 'leave') {
        return
      } else {
        this.revokeTimer = setInterval(() => { this.getFenbiList(i, false, true) }, 3000)
      }
    },
    loadMore(i) {
      if (this.titleList[i].resquestState < 2) {
        this.titleList[i].startI++
        this.getFenbiList(i, 'add')
      }
    },
    refreshScroll() {
      if (this.tabI < 2) {
        this.$refs.s1.refresh()
      } else if (this.tabI == 2) {
        this.$refs.s2.refresh()
      } else {
        this.$refs.s3.refresh()
      }
    },
    getFenbiList(i, add, all) {
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
        url,
        data: {
          page_index: all ? 0 : this.titleList[i].startI,
          page_size: all ? this.titleList[i].list.length : 10,
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
          setTimeout(this.refreshScroll.bind(this), 500)
        } else {
          this.titleList[i].list = res.data.list
        }
        this.titleList[i].resquestState = res.data.list.length == 10 ? 0 : 2
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (process.env.API_HOST) vm.atNigh || plus.navigator.setStatusBarStyle("light");
      vm.tabI = vm.weituoindex
      vm.checkRevoke(vm.tabI)
      vm.titleList[vm.tabI].list.length || vm.getFenbiList(vm.tabI)
    })
  },
  beforeRouteLeave(to, from, next) {
    // this.setweituoindex(0)
    if (process.env.API_HOST) this.atNigh || plus.navigator.setStatusBarStyle("dark");

    this.checkRevoke('leave')//清除撤单定时器
    next()
  }
}
</script>

<style lang="scss" scoped>
div.wrap {
  height: calc(100vh - 50px);
  background-color: #f5f5f5;
  .list2 {
    overflow: hidden;
    height: calc(100vh - 0.68rem - 94px);
    // height: calc(100vh -.68rem - 44px - var(--status-bar-height));
  }
  .list3 {
    overflow: hidden;
    height: calc(100vh  - 97px);
  }
  .list4 {
    overflow: hidden;
    height: calc(100vh - 94px - 0.12rem);
    // height: calc(100vh - 44px - var(--status-bar-height) -.12rem);
    margin-top: 0.12rem;
  }
  div.heightUp {
    height: 0.58rem;
  }
  div.h8 {
    height: 8px;
    background-color: #f5f5f5;
    position: relative;
    z-index: 50;
  }
  div.fix {
    position: fixed;
    left: 0;
    right: 0;
    // top: calc(44px + var(--status-bar-height));

    z-index: 20;
  }
  div.h40 {
    height: 1.4rem;
  }
  div.nullTxt {
    text-align: center;
    margin-top: 50%;
  }
}
</style>
