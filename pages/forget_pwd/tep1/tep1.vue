<template>
	<view>
		<base-header has-back='1'></base-header>
    <view class="title">忘记密码？</view>
    <view class="container">

      <input-item placeholderTxt='您的手机号' @now-blur='handleBlur' @now-change='handChange'  v-model="uName"></input-item>
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
      tipContent: '您的手机号不合法',
      verifyYes: false,
      showErr:false,
    };
  },
  components: { submitBtn, inputItem ,errTip},
  methods: {
    handleNext() {
			this.getyamfunc()
      uni.navigateTo({ url:'/pages/forget_pwd/tep2/tep2?uName='+this.uName+'&type=0' })

      console.log('点击事件，this.verifyYes==true时才会触发！！');
    },
    handleBlur() {
      console.log('input失去焦点时触发');
      this.showErr = true
    },
		handChange(){
			this.verifyYes=false
			if(this.uName.length==10){
				this.verifyYes=true
			}
		},
		// 获取验证码
		getyamfunc(){
				var options = {
						url: '/Sapi/Code/sendex', //请求接口
						data: {
								mobile: this.uName,
								type: 'register'
						}, //发送给服务端的数据
						method: 'POST', //请求方法全部大写，默认GET
				}
				this.$httpReq(options).then((res) => {
						// 请求成功的回调
						// res为服务端返回数据的根对象
						console.log(res)
						if (res.status == 1) {
						}else{
								if(res.info){
										// this.tipContent=res.info
								}else{
										// this.tipContent='获取验证码失败'
								}
								// return
						}
				}).catch((err) => {
						// 请求失败的回调
						console.error(err,'捕捉')
				})
		}
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
