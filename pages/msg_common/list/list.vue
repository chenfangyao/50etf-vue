<template>
  <view>
    <base-header :title="title" has-back='1'></base-header>
    <view class="listItem" v-for="(item,i) in lists" :key="i" hover-class='self-hover' @tap='go'>
      <view class="title uni-flex">
        <text>{{'公告'+i}}</text>
        <text class="time">2018-02-09 18:57:59</text>
      </view>
      <view class="miniContent">资讯类信息文案可以打慢多行资讯类信息文案可以打慢多行资讯类信息文案可以打慢多行资讯类信息文案可以打慢多行</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      lists: [, , ,]
    };
  },
  onLoad(options) {
    let type = Number(options.type)
    switch (type) {
      case 1:
        this.title = '公告'
        break
      case 2:
        this.title = '新手引导'
        break
      case 3:
        this.title = '消息'
        break
    }
  },
  methods: {
    go(){
      uni.navigateTo({url:'../detail/detail'})
    }
  },
}
</script>

<style lang="scss" scoped>
view.listItem {
  padding: 35upx 0;
  padding-left: 27upx;
  border-top: 12upx solid #f5f5f5;
  view.title {
    justify-content: space-between;
    margin-right: 27upx;
    margin-bottom: 10upx;
    > text:first-child {
      font-size: 16px;
      color: rgba(24, 28, 40, 1);
    }
    text {
      line-height: 47upx;
      font-size: 12px;
      font-family: ArialMT;
      color: rgba(130, 133, 151, 1);
    }
  }
  view.miniContent {
    font-size: 14px;
    color: rgba(112, 118, 128, 1);
    line-height: 58upx;
    margin-right: 52upx;
  }
}
</style>
