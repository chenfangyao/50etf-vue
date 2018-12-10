<template>
  <view>
    <view class="uni-tab-bar">
      <view class="swiper-tab uni-flex">
        <view v-for="(tab,index) in tabBars" :key="index" :class="['swiper-tab-list2',tabIndex==index ? 'active' : '']" :data-current="index" @tap="tapTab">{{tab.name}}</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      tabBars: [
        {
          name: '分时',
        }, {
          name: '5日',
        }, {
          name: '日K',
        }, {
          name: '周K',
        }, { name: '月K', },
      ],
      tabIndex: 0,
    }
  },
  methods: {
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
view.uni-tab-bar {
  .list2 {
    height: 400px;
  }
  .swiper-tab {
    border-bottom: 1px solid #f4f6f6;
    justify-content: space-between;
    padding: 10upx 25upx 0;
    height: 72upx;
    font-size: 14px;
    background-color: #ededed;
    .swiper-tab-list2.active {
      border-bottom: 2px solid #409de5;
      color: #409de5;
    }
    .swiper-tab-list2 {
      font-size: 30upx;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #707680;
    }
  }
}
</style>
