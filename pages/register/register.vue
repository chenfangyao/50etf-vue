<template>
	<view>
		<base-header has-back='1'></base-header>
    <view class="title">设置您的账号</view>
    <view class="container">
      <input-item placeholderTxt='您的账号' is-tel='1' v-model="uName"></input-item>
      <input-item placeholderTxt='手机号'  v-model='tel'></input-item>
      <view class="tip">{{tipContent}}</view>
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
export default {
  data() {
    return {
      uName: '',
      tel: '',
      verifyYes: false,
      tipContent: '您注册的账号已存在，请重新输入重新输入',
    };
  },
  components: { submitBtn, inputItem },
  methods: {
    go() {
      let url = '/pages/risk_book/risk_book'
      uni.navigateTo({ url })
    },
    handleLogin() {
      console.log('465433');
    }
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
  view.tip {
    font-size: 13px;
    color: rgba(240, 95, 92, 1);
    margin: 16upx 0 32upx;
    height: 36upx;
  }
  view.txt2 {
    justify-content: space-between;
    text {
      text-decoration: underline;
      font-size: 13px;
      color: rgba(132, 134, 137, 1);
    }
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
