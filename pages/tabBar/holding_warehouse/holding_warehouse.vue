<template>
  <view class="wrap">
    <header-tab @tab-tap='tabTap' :title-list='titleList'></header-tab>
    <view >
      <view class="fix">
        <!-- <filter-list :total='titleList[0].total' v-if='tabI==0'></filter-list> -->
        <hebin-total :total='titleList[tabI].total' v-if="tabI<2"></hebin-total>
        <top-btn v-else-if="tabI==2"></top-btn>
      </view>
      <view class="heightUp" v-show="tabI!=3"></view>
      <view class="h60" v-show="tabI==2"></view>
    </view>
   <scroll-view :class="[objI<2?'list2':objI==2?'list3':'list4']"  v-for="(obj,objI) in titleList" :key="objI" v-show="tabI==objI" lower-threshold='20' scroll-y @scrolltolower="loadMore(objI)">
      <list-one :tab-i='objI' :list='obj.list' @gou-shi='closes1' v-if="objI<2"></list-one>
      <list-two :tab-i='objI' :list='obj.list' v-else-if='objI==2' ></list-two>
      <list-three :tab-i='objI' :list='obj.list' v-else ></list-three>
      <view v-if="obj.total==0" class="nullTxt">您还未开仓，空空如也</view>
      <uni-load-more v-else :loading-type="obj.resquestState" ></uni-load-more>
    </scroll-view>
    <view class="sview" v-show="s1view"></view>

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


export default {
  data() {
    return {
      s1view: false,//兼容狗屎iphone
      tabI: 0,//顶部tab位置
      titleList: [
        { name: '分笔', startI: 0, list: [], resquestState: 0, total: 0, },
        { name: '合并', startI: 0, list: [], resquestState: 0, total: 0, },
        { name: '委托', startI: 0, list: [], resquestState: 0, total: 0, },
        { name: '撤单', startI: 0, list: [], resquestState: 0, total: 0, },
      ],

    };
  },
  components: { headerTab, filterList, uniLoadMore, listOne, hebinTotal, topBtn, listTwo, listThree },
  methods: {
    closes1() {
      this.s1view = !this.s1view
    },
    tabTap(i) {
      this.tabI = i
      this.titleList[i].list.length === 0 && this.getFenbiList(i)
    },
    loadMore(i) {
      console.log('到底了');
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
        console.log(err)
      })
    }
  },
  onShow() {
    this.getFenbiList(this.tabI)
  },
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
  view.sview {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.5) ;
    height: 75px;
    /* #ifndef H5 */
    height:calc( 76px + var(--status-bar-height));
    /* #endif */

  }
}
</style>
