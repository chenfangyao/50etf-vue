<template>
  <view class="wrap">
    <header-tab @tab-tap='tabTap' :title-list='titleList'></header-tab>
    <filter-list :total='titleList[0].total' v-if='tabI==0'></filter-list>
    <hebin-total :total='titleList[1].total' v-else-if="tabI==1"></hebin-total>
    <scroll-view class="list2" v-for="(obj,objI) in titleList" :key="objI" v-show="tabI==objI" lower-threshold='10' scroll-y @scrolltolower="loadMore(objI)">
        <list-one :tab-i='objI' :list='obj.list' v-if="objI<2"></list-one>
        <uni-load-more :loading-type="obj.resquestState" ></uni-load-more>
    </scroll-view>
  </view>
</template>

<script>
import headerTab from '@/components/holdingSub/headerTab.vue';
import filterList from '@/components/holdingSub/filterList.vue';
import listOne from '@/components/holdingSub/listOne.vue';
import hebinTotal from '@/components/holdingSub/hebinTotal.vue';
import uniLoadMore from '@/components/uni-load-more.vue';

export default {
  data() {
    return {

      tabI: 0,//顶部tab位置
      titleList: [
        { name: '分笔', startI: 0, list: [], resquestState: 0,total:0, },
        { name: '合并', startI: 0, list: [], resquestState: 0,total:0, },
        { name: '委托', startI: 0, list: [], resquestState: 0,total:0, },
        { name: '撤单', startI: 0, list: [], resquestState: 0,total:0, },
      ],

    };
  },
  components: { headerTab, filterList, uniLoadMore, listOne,hebinTotal },
  methods: {
    tabTap(i) {
      this.tabI = i
      this.titleList[i].list.length === 0 && this.getFenbiList(i)
    },
    loadMore(i) {
      this.resquestState = 1
      this.titleList[i].startI++
      this.titleList[i].resquestState < 2 && this.getFenbiList(i, 'add')
    },
    getFenbiList(i, add) {
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
        this.titleList[i].total=res.data.total
        if (add) {
          this.titleList[i].list = this.titleList[i].list.concat(res.data.list)
        } else {
          this.titleList[i].list = res.data.list
        }
        this.titleList[i].resquestState = res.data.list.length == 10 ? 0 : 2
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  onShow() {
    this.getFenbiList(this.tabI)
  }
}
</script>

<style lang="scss" scoped>
view.wrap {
  min-height: 100vh;
  background-color: #f5f5f5;
  .list2 {
    height: calc(100vh - 274upx);
  }
}
</style>
