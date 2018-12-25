<template>
	<view>
		<base-header has-back='1'></base-header>
    <view class="title">实名认证</view>
    <view class="container">

      <input-item placeholderTxt='输入您的姓名'  @now-blur='handleBlur' v-model="uName"></input-item>
      <input-item placeholderTxt='输入您的身份证号'  @now-blur='handleBlur' v-model="IDcard"></input-item>
			<err-tip :err-class='showErr' :tip-content='tipContent'></err-tip>

      <submit-btn btnTxt='完成' @v-tap='handleNext' :verify-ok='verifyYes'></submit-btn>

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
      verifyYes: true,
      IDcard:'',
      uName:'',
			showErr:false,
			tipContent: '您输入的身份证信息有误',
    };
  },
  components: { submitBtn, inputItem, errTip },
  methods: {
    handleNext() {
			if(this.$validata(this.IDcard,3)!=1){
					this.showErr=true
					this.tipContent=this.$validata(this.IDcard,3)
					return
			}
			this.showErr=false
      uni.navigateTo({ url:'/pages/mine_sub/credentials_upload/tep2/tep2?username='+this.uName+'&IDcard='+this.IDcard+'' })
    },
    handleBlur() {
      console.log('input失去焦点时触发');
      this.verifyYes = true
    },
  }
}
</script>

<style lang="scss" scoped>
view.title {
  font-size: 28px;
  font-weight: 500;
  margin: 0 0 88upx 32upx;
  color: #333;
}
view.container {
  margin: 0 55upx;
}
</style>
