<template>
	<view class="wrap">
		<base-header title="收款银行" has-back='1' ></base-header>
		<view class="subWrap">
      <view class="line1">收款账号</view>
      <view class="item">
        <view class="l1">中国银行（福建省福州市支行）</view>
        <view class="l2">收款银行</view>
      </view>
      <view class="item uni-flex">
        <view>
          <view class="l1">张三</view>
          <view class="l2">转账人</view>
        </view>
        <view class="copy" @tap='handleCopy'>复制</view>
      </view>
      <view class="item uni-flex">
        <view>
          <view class="l1">6222 2222 0000 0000</view>
          <view class="l2">银行账号</view>
        </view>
        <view class="copy" @tap='handleCopy'>复制</view>

      </view>
    </view>
    <view class="subWrap2">
      <view class="txt1">转账帮助（银行卡转账）：</view>

      <view class="txt2">
        <text>1. 通过 </text>
        <text>线上网上银行</text>
        <text>进行转账</text>
      </view>
      <view class="txt2">
        <text>2. 通过 </text>
        <text>柜台填写</text>
        <text>转账凭证</text>
      </view>
      <view class="txt3">
        <text>提示：转账备注号由客户号和客户代码组成；我方通过转账备注识别充值账号</text>
        <text>（必填）</text>
      </view>
    </view>
	</view>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    handleCopy() {
      var str = '随便什么值';
      //#ifdef H5
      var oInput = document.createElement('input');
      oInput.value = str;
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand('copy');
      document.body.removeChild(oInput);
      uni.showToast({
        title: '复制成功',
        duration: 500
      });
      //#endif
      //#ifndef H5
      uni.setClipboardData({
        data: str,
        success() {
          console.log('success');
          uni.showToast({
            title: '复制成功',
            duration: 500
          });
        }
      });
      //#endif
    }
  }
}
</script>

<style lang="scss" scoped>
view.wrap {
  height: 100vh;
  background-color: #f5f5f5;
  view.subWrap {
    margin-top: 12upx;
    background-color: #fff;
    > view {
      padding-left: 27upx;
      border-bottom: solid 1px #f5f5f5;
    }
    view.line1 {
      font-size: 16px;
      color: rgba(24, 28, 40, 1);
      height: 84upx;
      line-height: 84upx;
    }
    .l2 {
      font-size: 13px;
      color: rgba(168, 168, 168, 1);
    }
    view.item {
      height: 140upx;
      padding-top: 10upx;
      justify-content: space-between;
      .l1 {
        font-size: 15px;
        color: rgba(24, 28, 40, 1);
      }
      view.copy {
        font-size: 14px;
        color: rgba(64, 157, 229, 1);
        line-height: 100upx;
        margin-right: 25upx;
      }
    }
  }
  view.subWrap2 {
    padding: 0 37upx;
    view.txt1,
    .txt2 {
      font-size: 14px;
      line-height: 14px;
      color: rgba(24, 28, 40, 1);
    }
    view.txt1 {
      margin: 70upx 0 31upx;
    }
    view.txt2 {
      margin-bottom: 20upx;
      text:nth-child(2) {
        color: #409de5;
        margin: 0 8upx;
        text-decoration: underline;
      }
    }
    view.txt3 {
      font-size: 12px;
      color: rgba(168, 168, 168, 1);
      line-height: 38upx;
      text:last-child{
        color: #F05F5C;
      }
    }
  }
}
</style>

