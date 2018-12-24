<template>
  <view class="mask uni-flex">
    <view :class="['container',{show}]">
      <view class="title"> 延期关闭</view>
      <view class="subTitle">是否关闭延期，关闭后当日会自动平仓！</view>
      <view class="btn2 uni-flex">
        <view hover-class='tap-hover' @tap='yesTap'>确定</view>
        <view hover-class='tap-hover' @tap='cancleTap'>取消</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    cancleTap: function () {
      this.$emit('cancle-tap')
    },
    yesTap() {
      this.$emit('yes-tap')
      // uni.navigateTo({
      //   url: '/pages/quotes_sub/entrust_succ/entrust_succ'
      // })
    }
  },
  created() {
    setTimeout(
      () => { this.show = true }, 10
    )
  },

}
</script>

<style scoped lang="scss">
.mask {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 3000;
  align-items: center;
  .container {
    transform: scale(0, 0);
    transition: transform 300ms;
    overflow: hidden;
    flex-grow: 1;
    margin: 0 64upx;
    background: #fff;
    border-radius: 10upx;
    z-index: 3100;
    padding: 28upx 30upx 20upx;
    .c_red {
      color: #f05f5c;
    }
    view.title {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      color: rgba(24, 28, 40, 1);
      position: relative;
      margin-bottom: 20upx;
    }
    view.subTitle {
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      line-height: 14px;
      text-align: center;
    }
    view.btn2 {
      justify-content: space-between;
      margin-top: 78upx;
      > view {
        flex-grow: 1;
        height: 88upx;
        border-radius: 10upx;
        font-size: 14px;
        color: rgba(255, 255, 255, 1);
        line-height: 88upx;
        text-align: center;
      }
      > view:first-child {
        background: #f5f5f5;
        margin-right: 20upx;
        color: #666;
      }
      > view.tap-hover:first-child {
        background: darken(rgba(153, 153, 153, 1), 5%);
      }
      > view:last-child {
        background: #409de5;
      }
      > view.tap-hover:last-child {
        background: darken(#409de5, 5%);
      }
    }
  }
  .container.show {
    transform: scale(1, 1);
  }
}
</style>
