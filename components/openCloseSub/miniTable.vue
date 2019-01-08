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
        <text class="w71">{{hydetils.buyPrice1}}</text>
      </view>
      <view class="datas">
        <text>2</text>
        <text>{{hydetils.buyAmount2}}</text>
        <text class="w71">{{hydetils.buyPrice2}}</text>
      </view>
      <view class="datas">
        <text>3</text>
        <text>{{hydetils.buyAmount3}}</text>
        <text class="w71">{{hydetils.buyPrice3}}</text>
      </view>
      <view class="datas">
        <text>4</text>
        <text>{{hydetils.buyAmount4}}</text>
        <text class="w71">{{hydetils.buyPrice4}}</text>
      </view>
      <view class="datas">
        <text>5</text>
        <text>{{hydetils.buyAmount5}}</text>
        <text class="w71">{{hydetils.buyPrice5}}</text>
      </view>
    </view>
    <view class="right">
      <view class="title">
        <text class="w71">价格</text>
        <text>数量</text>
        <text>卖</text>
      </view>
      <view class="datas">
        <text class="w71">{{hydetils.salePrice1}}</text>
        <text>{{hydetils.saleAmount1}}</text>
        <text>1</text>
      </view>
      <view class="datas">
        <text class="w71">{{hydetils.salePrice2}}</text>
        <text>{{hydetils.saleAmount2}}</text>
        <text>2</text>
      </view>
      <view class="datas">
        <text class="w71">{{hydetils.salePrice3}}</text>
        <text>{{hydetils.saleAmount3}}</text>
        <text>3</text>
      </view>
      <view class="datas">
        <text class="w71">{{hydetils.salePrice4}}</text>
        <text>{{hydetils.saleAmount4}}</text>
        <text>4</text>
      </view>
      <view class="datas">
        <text class="w71">{{hydetils.salePrice5}}</text>
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
      buyPrice1: '',
      buyPrice2: '',
      buyPrice3: '',
      buyPrice4: '',
      buyPrice5: '',
      salePrice1: '',
      salePrice2: '',
      salePrice3: '',
      salePrice4: '',
      salePrice5: '',
    }
  },
  props: ['hydetils'],
  mounted() { 
    this.buyPrice1=this.hydetils.buyPrice1
    /* for(var i=1;i<6;i++){
      this['buyPrice'+i]=this.hydetils['buyPrice'+i]
      this['salePrice'+i]=this.hydetils['salePrice'+i]
    } */
  }

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
