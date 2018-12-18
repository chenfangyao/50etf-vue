<template>
	<view>
		<base-header has-back='1'></base-header>
    <view class="title">实名认证</view>
    <view class="container">

      <input-item placeholderTxt='输入您的姓名'  @now-blur='handleBlur' v-model="uName"></input-item>
      <input-item placeholderTxt='输入您的身份证号'  @now-blur='handleBlur' v-model="IDcard"></input-item>

      <submit-btn btnTxt='完成' @v-tap='handleNext' :verify-ok='verifyYes'></submit-btn>

    </view>
	</view>
</template>

<script>
import submitBtn from '@/components/commonResgLog/submitBtn.vue'
import inputItem from '@/components/commonResgLog/inputItem.vue'

export default {
  data() {
    return {
      verifyYes: false,
      IDcard:'',
      uName:'',
    };
  },
  components: { submitBtn, inputItem },
  methods: {
    handleNext() {
      uni.navigateTo({ url:'/pages/mine_sub/credentials_upload/tep2/tep2' })

      console.log('点击事件，this.verifyYes==true时才会触发！！');
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
