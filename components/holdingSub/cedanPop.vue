<template>
  <view class="maskWrap self-mask">
    <view class="container">
      <view class="txt">撤单确认</view>
      <image src='/static/holdingImg/cedan.png'></image>
      <view class="txt">是否撤单？</view>
      <view class="btn2 uni-flex">
        <view @tap='cancle'>取消</view>
        <view @tap='yesTap'>确定</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  methods: {
    cancle() { 
      this.$emit('close-me')
    },
    yesTap() { 
      this.$emit('close-me','yes')
    },
  }
}
</script>

<style lang="scss" scoped>
view.maskWrap {
  view.container {
    background-color: #fff;
    width: 600upx;
    height: 580upx;
    border-radius: 10upx;
    margin: 50% auto 0;
    text-align: center;
    padding-top: 19px;
    view.txt {
      font-size: 16px;
      line-height: 16px;
      color: rgba(31, 36, 51, 1);
    }
    image {
      width: 150upx;
      height: 150upx;
      margin: 80upx 0 36upx;
    }
    view.btn2 {
      justify-content: space-between;
      padding: 0 55upx;
      margin-top: 80upx;
      view {
        width: 230upx;
        height: 72upx;
        background: rgba(64, 157, 229, 0);
        border: 1px solid #999;
        border-radius: 4upx;
        font-size: 14px;
        color: rgba(153, 153, 153, 1);
        line-height: 72upx;
        text-align: center;
      }
      view:last-child {
        background-color: #409de5;
        color: #fff;
        border: 0;
      }
    }
  }
}
</style>
