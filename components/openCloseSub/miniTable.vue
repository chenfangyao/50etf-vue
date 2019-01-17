<template>
  <view class="uni-flex wrap">
    <view class="left">
      <view class="title">
        <text>买</text>
        <text>数量</text>
        <text class="w71">价格</text>
      </view>
      <view class="datas">
        <text>1</text>
        <text>{{hydetils.buyAmount1}}</text>
        <text class="w71">{{buyPrice1}}</text>
      </view>
      <view class="datas">
        <text>2</text>
        <text>{{hydetils.buyAmount2}}</text>
        <text class="w71">{{buyPrice2}}</text>
      </view>
      <view class="datas">
        <text>3</text>
        <text>{{hydetils.buyAmount3}}</text>
        <text class="w71">{{buyPrice3}}</text>
      </view>
      <view class="datas">
        <text>4</text>
        <text>{{hydetils.buyAmount4}}</text>
        <text class="w71">{{buyPrice4}}</text>
      </view>
      <view class="datas">
        <text>5</text>
        <text>{{hydetils.buyAmount5}}</text>
        <text class="w71">{{buyPrice5}}</text>
      </view>
    </view>
    <view class="right">
      <view class="title">
        <text class="w71">价格</text>
        <text>数量</text>
        <text>卖</text>
      </view>
      <view class="datas">
        <text class="w71">{{salePrice1}}</text>
        <text>{{hydetils.saleAmount1}}</text>
        <text>1</text>
      </view>
      <view class="datas">
        <text class="w71">{{salePrice2}}</text>
        <text>{{hydetils.saleAmount2}}</text>
        <text>2</text>
      </view>
      <view class="datas">
        <text class="w71">{{salePrice3}}</text>
        <text>{{hydetils.saleAmount3}}</text>
        <text>3</text>
      </view>
      <view class="datas">
        <text class="w71">{{salePrice4}}</text>
        <text>{{hydetils.saleAmount4}}</text>
        <text>4</text>
      </view>
      <view class="datas">
        <text class="w71">{{salePrice5}}</text>
        <text>{{hydetils.saleAmount5}}</text>
        <text>5</text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    buyPrice1() {
      return this.hydetils.buyPrice1.toFixed(4)
    },
    buyPrice2() {
      return this.hydetils.buyPrice2.toFixed(4)
    },
    buyPrice3() {
      return this.hydetils.buyPrice3.toFixed(4)
    },
    buyPrice4() {
      return this.hydetils.buyPrice4.toFixed(4)
    },
    buyPrice5() {
      return this.hydetils.buyPrice5.toFixed(4)
    },
    salePrice1() { return this.hydetils.salePrice1.toFixed(4) },
    salePrice2() { return this.hydetils.salePrice2.toFixed(4) },
    salePrice3() { return this.hydetils.salePrice3.toFixed(4) },
    salePrice4() { return this.hydetils.salePrice4.toFixed(4) },
    salePrice5() { return this.hydetils.salePrice5.toFixed(4) },
  },
  props: ['hydetils'],

}
</script>
<style lang="scss" scoped>
view.wrap {
  padding: 26upx;
  background-color: #fff;
  view.left {
    margin-right: 18upx;
    view.datas {
      text:first-child {
        color: #999;
      }
      text:last-child {
        color: #3aba8f;
      }
    }
  }
  > view {
    flex-grow: 1;
    font-size: 12px;
    view.title,
    view.datas {
      display: flex;
      justify-content: space-between;
      padding: 0 22upx;
      border-bottom: 0.5px solid rgba(153, 153, 153, 0.5);
      font-size: 12px;
    }
    text.w71 {
      width: 45px;
      text-align: center;
    }
    view.title {
      background-color: #ededed;
      font-size: 11px;
      color: #848689;
      line-height: 18px;
      border-bottom: 0;
      height: 18px;
    }
  }
  view.right {
    view.datas {
      text:last-child {
        color: #999;
      }
      text:first-child {
        color: #ec605e;
      }
    }
  }
}
</style>
