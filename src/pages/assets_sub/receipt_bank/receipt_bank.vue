<template>
	<div class="wrap">
		<base-header title="收款银行" has-back='1' ></base-header>
		<div class="subWrap">
      <div class="line1">收款账号</div>
      <div class="item">
        <div class="l1">中国银行（福建省福州市支行）</div>
        <div class="l2">收款银行</div>
      </div>
      <div class="item uni-flex">
        <div>
          <div class="l1">张三</div>
          <div class="l2">转账人</div>
        </div>
        <div class="copy" @click='handleCopy'>复制</div>
      </div>
      <div class="item uni-flex">
        <div>
          <div class="l1">6222 2222 0000 0000</div>
          <div class="l2">银行账号</div>
        </div>
        <div class="copy" @click='handleCopy'>复制</div>

      </div>
    </div>
    <div class="subWrap2">
      <div class="txt1">转账帮助（银行卡转账）：</div>

      <div class="txt2">
        <span>1. 通过 </span>
        <span>线上网上银行</span>
        <span>进行转账</span>
      </div>
      <div class="txt2">
        <span>2. 通过 </span>
        <span>柜台填写</span>
        <span>转账凭证</span>
      </div>
      <div class="txt3">
        <span>提示：转账备注号由客户号和客户代码组成；我方通过转账备注识别充值账号</span>
        <span>（必填）</span>
      </div>
    </div>
	</div>
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
div.wrap {
  height: 100vh;
  background-color: #f5f5f5;
  div.subWrap {
    margin-top:.12rem;
    background-color: #fff;
    > div {
      padding-left:.27rem;
      border-bottom: solid 1px #f5f5f5;
    }
    div.line1 {
      font-size: 16px;
      color: rgba(24, 28, 40, 1);
      height:.84rem;
      line-height:.84rem;
    }
    .l2 {
      font-size: 13px;
      color: rgba(168, 168, 168, 1);
    }
    div.item {
      height:1.40rem;
      padding-top:.10rem;
      justify-content: space-between;
      .l1 {
        font-size: 15px;
        color: rgba(24, 28, 40, 1);
      }
      div.copy {
        font-size: 14px;
        color: rgba(64, 157, 229, 1);
        line-height:1.00rem;
        margin-right:.25rem;
      }
    }
  }
  div.subWrap2 {
    padding: 0.37rem;
    div.txt1,
    .txt2 {
      font-size: 14px;
      line-height: 14px;
      color: rgba(24, 28, 40, 1);
    }
    div.txt1 {
      margin:.70rem 0.31rem;
    }
    div.txt2 {
      margin-bottom:.20rem;
      span:nth-child(2) {
        color: #409de5;
        margin: 0.08rem;
        text-decoration: underline;
      }
    }
    div.txt3 {
      font-size: 12px;
      color: rgba(168, 168, 168, 1);
      line-height:.38rem;
      span:last-child{
        color: #F05F5C;
      }
    }
  }
}
</style>

