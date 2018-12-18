<template>
	<view class="wrap">
    <base-header :has-back='true' title='登录'></base-header>
    <view class="h1"></view>
    <view class="img"><image src='/static/loginResgImg/logo.png'></image></view>
    <view class="container">
      <input-item placeholderTxt='手机号 / 账号' v-model="uName" @now-blur='handleBlur'></input-item>
      <input-item placeholderTxt='密码' :isPwd='true' v-model='pwd' @now-blur='handleBlur'></input-item>
      <err-tip :err-class='showErr' :tip-content='tipContent'></err-tip>
      <submit-btn btnTxt='登录' @v-tap='handleLogin' :verify-ok='verifyYes'></submit-btn>
      <view class="txt2 uni-flex">
        <text @tap='go(1)'>注册用户</text>
        <text @tap='go(2)'>忘记密码 ？</text>
      </view>
    </view>
    <view class="bottomTxt">
      <text>登录即代表阅读并同意 </text>
      <text class="blueTxt"  @tap='go(3)'>风险揭示书</text>
    </view>
	</view>
</template>

<script>
import submitBtn from '@/components/commonResgLog/submitBtn.vue'
import inputItem from '@/components/commonResgLog/inputItem.vue'
import errTip from '@/components/commonResgLog/errtip.vue'
export default {
  data() {
    return {
      tipContent: '您的账号和密码错误，请重新输入',
      verifyYes: false,//验证通过，把它至为true,登录按钮才会变色且启用
      pwd: '',
      uName: '',
      openEye: false,
      focusInput: false,
      showErr:false
    };
  },
  components: { submitBtn ,inputItem,errTip},
  methods: {
    go(i) {
      let url = ''
      switch (i) {
        case 1: url = '/pages/register/register'
          break
        case 2: url = '/pages/forget_pwd/tep1/tep1'
          break
        case 3: url = '/pages/risk_book/risk_book'
      }
      uni.navigateTo({ url })
    },
    handleLogin() {
      console.log(this.uName);
    },
    handleBlur(){
      console.log('input失去焦点时触发');
      this.showErr=true
    }
  },
}
</script>

<style lang="scss" scoped>
view.wrap {
  min-height: 100vh;
  position: relative;
  view.img {
    text-align: center;
    margin: 120upx 0 80upx;

    image {
      width: 140upx;
      height: 140upx;
    }
  }
  view.h1 {
    height: 1px;
    background-color: #ededed;
  }
  view.container {
    margin: 0 55upx;
    view.txt2 {
      justify-content: space-between;
      text {
        text-decoration: underline;
        font-size: 13px;
        color: rgba(132, 134, 137, 1);
      }
    }
  }
  view.bottomTxt {
    position: absolute;
    bottom: 60upx;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 12px;
    color: rgba(51, 51, 51, 1);
    text.blueTxt {
      color: #2e8ae5;
      text-decoration: underline;
    }
  }
}
</style>
