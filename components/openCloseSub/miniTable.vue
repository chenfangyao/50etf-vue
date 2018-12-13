<template>
  <view class="uni-flex wrap">
    <view class="left">
      <view class="title">
        <text>买</text>
        <text>数量</text>
        <text class="w71">价格</text>
      </view>
      <view class="datas" v-for="(item ,i) in buyData" :key="i">
        <text>{{i}}</text>
        <text>20</text>
        <text class="w71">0.2326</text>
      </view>

    </view>
    <view class="right">
      <view class="title">
        <text class="w71">价格</text>
        <text>数量</text>
        <text>卖</text>
      </view>
       <view class="datas" v-for="(item ,i) in sellData" :key="i">
        <text class="w71">0.2326</text>
        <text>20</text>
        <text>{{i}}</text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      buyData: [, , , ,],
      sellData: [, , , ,]
    }
  }

}
</script>
<style lang="scss" scoped>
view.wrap {
  padding: 26upx;
  view.left {
    margin-right: 18upx;
  }
  > view {
    flex-grow: 1;
    font-size: 12px;
    view.title,
    view.datas {
      display: flex;
      justify-content: space-between;
      padding: 0 22upx;
      border-bottom: 1px solid #ededed;
      padding-bottom: 2px;
    }
    text.w71 {
      width: 45px;
      text-align: center;
    }
    view.title {
      background-color: #ededed;
      font-size: 13px;
      color: rgba(24, 28, 40, 1);
      line-height: 26px;
    }
  }
}
</style>
