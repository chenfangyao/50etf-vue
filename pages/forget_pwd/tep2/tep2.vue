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
			bankid:'',
			identifica:'',
			username:'',
			bankcardid:'',
			type:''
    };
  },
  components: { submitBtn, inputItem, errTip, countDown },
  methods: {
    handleNext() {
			if(this.type==0){
				uni.navigateTo({ url: '/pages/forget_pwd/tep3/tep3?username='+this.uName+'&tel='+this.tel+'&verificationCode='+this.vCode+'&type=0' })
			}else if(this.type==1){
				this.addmybankcard()
			}
      
    },
    handleBlur() {
      console.log('input失去焦点时触发');
      // this.showErr = true
    },
		addmybankcard(){
			var options = {
								url: '/Sapi/Ubank/bind', //请求接口
								method: 'POST', //请求方法全部大写，默认GET
								data:{
									sub_id:this.bankid,
									cardno:this.bankcardid,
									cardname:this.username,
									idno:this.identifica,
									mobile:"手机 字符串 必填",
									mobile_verify:this.vCode
			
								}
						}
						this.$httpReq(options).then((res) => {
								// 请求成功的回调
								// res为服务端返回数据的根对象
								console.log('银行', res)
								if(res.status){
							
								}else{
									this.showErr=true
									this.tipContent=res.info?res.info:'绑定失败' 
								}
						}).catch((err) => {
								// 请求失败的回调
								console.log(err)
						})
		}
  },
	onLoad(opt){
		this.type=opt.type
		if(opt.type==0){
			this.tel=opt.uName
		}else if(opt.type==1){
			this.username=opt.username
			this.bankid=opt.bankid
			this.identifica=opt.identifica
			this.bankcardid=opt.bankcardid
			this.tel=opt.tel
		}
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
