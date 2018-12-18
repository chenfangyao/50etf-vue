<template>
	<view>
		<base-header has-back='1'></base-header>
    <view class="title">设置您的账号</view>
    <view class="container">
      <input-item placeholderTxt='您的账号' @now-blur='handleBlur' v-model="uName"></input-item>
      <input-item placeholderTxt='手机号' @now-blur='handleBlur' is-tel='1' v-model='tel'></input-item>
      <view class="uni-flex vCode">
        <view>
          <input-item placeholderTxt='验证码' @now-blur='handleBlur' v-model="verificationCode"></input-item>
        </view>
        <count-down init-txt='发送验证码'></count-down>
      </view>
      <err-tip :err-class='showErr' :tip-content='tipContent'></err-tip>

      <submit-btn btnTxt='下一步' @v-tap='handleLogin' :verify-ok='verifyYes'></submit-btn>
      <view class="bottomTxt">
        <text>注册即代表阅读并同意 </text>
        <text class="blueTxt"  @tap='go(3)'>风险揭示书</text>
      </view>
    </view>
	</view>
</template>

<script>
import submitBtn from '@/components/commonResgLog/submitBtn.vue'
import inputItem from '@/components/commonResgLog/inputItem.vue'
import errTip from '@/components/commonResgLog/errtip.vue'
import countDown from '@/components/commonResgLog/countdown.vue'

export default {
  data() {
    return {
      uName: '',
      tel: '',
      verificationCode: '',//验证码
      verifyYes: false,
      tipContent: '您注册的账号已存在，请重新输入重新输入',
      showErr: false
    };
  },
  components: { submitBtn, inputItem ,errTip,countDown},
  methods: {
    go() {
      let url = '/pages/risk_book/risk_book'
      uni.navigateTo({ url })
    },
    handleLogin() {
      console.log('点击事件，this.verifyYes==true时才会触发！！');
    },
    handleBlur() {
      console.log('input失去焦点时触发');
      this.showErr = true
    },
  },
}
</script>

<style lang="scss" scoped>
view.title {
  font-size: 28px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin: 0 0 88upx 32upx;
}
view.container {
  margin: 0 55upx;
  view.vCode {
    height: 104upx;
  }
  view.bottomTxt {
    font-size: 12px;
    margin-top: 58upx;
    color: #333;
    text.blueTxt {
      color: #2e8ae5;
      text-decoration: underline;
    }
  }
}
</style>
