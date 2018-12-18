<template>
	<view>
		<base-header has-back='1'></base-header>
    <view class="title">忘记密码？</view>
    <view class="container">

      <input-item placeholderTxt='您的账号' @now-blur='handleBlur' v-model="uName"></input-item>
      <err-tip :err-class='showErr' :tip-content='tipContent'></err-tip>

      <submit-btn btnTxt='下一步' @v-tap='handleNext' :verify-ok='verifyYes'></submit-btn>

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
      uName: '',
      tipContent: '您注册的账号已存在，请重新输入重新输入',
      verifyYes: true,
      showErr:false,
    };
  },
  components: { submitBtn, inputItem ,errTip},
  methods: {
    handleNext() {
      uni.navigateTo({ url:'/pages/forget_pwd/tep2/tep2' })

      console.log('点击事件，this.verifyYes==true时才会触发！！');
    },
    handleBlur() {
      console.log('input失去焦点时触发');
      this.showErr = true
    },
  }
}
</script>

<style lang="scss" scoped>
view.title {
  font-size: 28px;
  font-weight: 500;
  margin: 0 0 338upx 32upx;
  color: #333;
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
</style>
