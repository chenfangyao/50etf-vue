<template>
	<view>
		<base-header has-back='1'></base-header>
    <view class="title">输入验证码</view>
    <view class="subTitle ">
      我们已向 {{tel}}发送验证码短信，请查看短信并输入验证码。
    </view>
    <view class="container">
      <view class="uni-flex">
        <input-item is-tel='1' input6='1' @now-blur='handleBlur' v-model="vCode"></input-item>
        <count-down init-txt='重新发送'></count-down>
      </view>
      <err-tip :err-class='showErr' :tip-content='tipContent'></err-tip>

      <submit-btn btnTxt='下一步' @v-tap='handleNext' :verify-ok='verifyYes'></submit-btn>

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
      vCode: '',
      tipContent: '您输入的验证码错误',
      verifyYes: true,
      focus_i: 1,
      showErr: false,
			tel:'',
			uName:'',
    };
  },
  components: { submitBtn, inputItem, errTip, countDown },
  methods: {
    handleNext() {
      uni.navigateTo({ url: '/pages/forget_pwd/tep3/tep3?username='+this.uName+'&tel='+this.tel+'&verificationCode='+this.vCode+'&type=0' })
      console.log('点击事件，this.verifyYes==true时才会触发！！');
    },
    handleBlur() {
      console.log('input失去焦点时触发');
      // this.showErr = true
    },
  },
	onLoad(opt){
		this.tel=opt.uName
	}
}
</script>

<style lang="scss" scoped>
view.title {
  font-size: 28px;
  font-weight: 500;
  margin: 0 0 24upx 32upx;
  color: #333;
}
view.subTitle {
  margin: 0 146upx 212upx 32upx;
  font-size: 14px;
  font-weight: 500;
  color: #454545;
  line-height: 40upx;
}
view.container {
  margin: 0 55upx;
}
</style>
