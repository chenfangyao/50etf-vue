<template>
  <view>
    <base-header title="行情"></base-header>
    <stock-tip-bar></stock-tip-bar>
    <view class="uni-tab-bar">
        <view  class="swiper-tab uni-flex" >
             <view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list2',tabIndex==index ? 'active' : '']"
                :id="tab.id" :data-current="index" @tap="tapTab">{{tab.name}}</view>
        </view>
        <futures-title></futures-title>
        <scroll-view class="list2" scroll-y @scrolltolower="loadMore(1)">
          <futures-datas ></futures-datas>
          <view class="uni-tab-bar-loading">
            <uni-load-more :loadingType="0" :contentText="loadingText"></uni-load-more>
          </view>
        </scroll-view>
    </view>
  </view>
</template>

<script>
import stockTipBar from '@/components/quotesSub/stockTips.vue'
import futuresTitle from '@/components/quotesSub/futuresTitle.vue'
import futuresDatas from '@/components/quotesSub/futuresDatas.vue'

import mediaList from '@/components/tab-nvue/mediaList.vue';
import uniLoadMore from '@/components/uni-load-more.vue';

export default {
  components: {
     mediaList, uniLoadMore, stockTipBar, futuresTitle, futuresDatas
  },
  data() {
    return {
      loadingText: {
        contentdown: "上拉显示更多",
        contentrefresh: "正在加载...",
        contentnomore: "没有更多数据了"
      },
      scrollLeft: 0,
      isClickChange: false,
      tabIndex: 0,
      newsitems: [1, 2, 3, 4],
      tabBars: [{
        name: '1811(0)',
        id: 'guanzhu'
      }, {
        name: '1812(28)',
        id: 'tuijian'
      }, {
        name: '1903(131)',
        id: 'tiyu'
      }, {
        name: '1906(211)',
        id: 'redian'
      },
      ]
    }
  },
  methods: {
    loadMore(e) {
      console.log(4555);

      // setTimeout(() => {
      //   this.addData(e);
      // }, 1200);
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
        this.isClickChange = true;
        this.tabIndex = e.target.dataset.current
      }
    },
  }

}

</script>

<style lang="scss" scoped>
.swiper-box {
  height: 1000upx !important;
}
view.uni-tab-bar {
  .list2 {
    height: 400px;
  }
  .swiper-tab {
    border-bottom: 1px solid #f4f6f6;
    justify-content: space-between;
    padding: 10upx 25upx 0;
    height: 84upx;
    .swiper-tab-list2.active {
      border-bottom: 1px solid #409de5;
      color: #409de5;
    }
    .swiper-tab-list2 {
      // padding-bottom: 27upx;
      font-size: 30upx;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #181c28;
    }
  }
}
</style>
