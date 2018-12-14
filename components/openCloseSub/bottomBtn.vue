<template>
<view>

  <view class="wrap uni-flex">
      <view class="txt">
        <text class="total">合计：</text>
        <text class="totalPrice">￥1399.00</text>
      </view>
      <view class="buyBtn" hover-class='tap-hover'>购买</view>
  </view>
  <view class="h98"></view>
</view>
</template>
<script>
export default {
  data() {
    return {}
  }

}
</script>
<style lang="scss" scoped>
view.h98 {
  height: 1px;
  margin-top: 98upx;
  background-color: #ededed;

}
view.wrap {
  height: 98upx;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  view.txt {
    width: 500upx;
    background-color: #fff;
    text.total {
      color: rgba(153, 153, 153, 1);
      margin-left: 26upx;
    }
    text {
      font-size: 16px;
      line-height: 98upx;
    }
    text.totalPrice {
      color: #333;
    }
  }
  view.buyBtn {
    font-size: 16px;
    flex-grow: 1;
    text-align: center;
    background: rgba(64, 157, 229, 1);
    color: rgba(255, 255, 255, 1);
    line-height: 98upx;
  }
  .buyBtn.tap-hover{
    background: darken(rgb(64, 157, 229), 5%);

  }

}
</style>
