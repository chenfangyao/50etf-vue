<template>
	<div>
		<base-header has-back='1'></base-header>
    <div class="title">输入验证码</div>
    <div class="subTitle ">
      我们已向 {{tel}}发送验证码短信，请查看短信并输入验证码。
    </div>
    <div class="container">
      <div class="uni-flex">
        <input-item is-tel='1' input6='1' @now-blur='handleBlur' v-model="vCode"></input-item>
        <count-down init-txt='重新发送'></count-down>
      </div>
      <err-tip :err-class='showErr' :tip-content='tipContent'></err-tip>

      <submit-btn btnTxt='下一步' @v-tap='handleNext' :verify-ok='verifyYes'></submit-btn>

    </div>
	</div>
</template>

<script>
import submitBtn from '@/components/commonResgLog/submitBtn.vue'
import inputItem from '@/components/commonResgLog/inputItem.vue'
import errTip from '@/components/commonResgLog/errtip.vue'
import countDown from '@/components/commonResgLog/countdown.vue'
import { mapState, mapMutations } from 'vuex';

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
			type:'',
			sub_id:''
    };
  },
  components: { submitBtn, inputItem, errTip, countDown },
	computed: mapState(['userinfo']),
  methods: {
    handleNext() {
			if(this.type==0){
				this.$navigateTo({ url: '/pages/forget_pwd/tep3/tep3?username='+this.uName+'&tel='+this.tel+'&verificationCode='+this.vCode+'&type=0' })
			}else if(this.type==1){
				this.addmybankcard()
			}

    },
    handleBlur() {
      console.log('input失去焦点时触发');
    },
		addmybankcard(){
			var options = {
								url: '/Sapi/Ubank/bind', //请求接口
								method: 'POST', //请求方法全部大写，默认GET
								data:{
									sub_id:this.sub_id,
									cardno:this.bankcardid,
                                    cardname:this.username,
                                    // cardname:this.userinfo.real_name,
									idno:this.identifica,
									mobile:this.userinfo.mobile,
									mobile_verify:this.vCode
								}
						}
						this.$httpReq(options).then((res) => {
								// 请求成功的回调
								// res为服务端返回数据的根对象
								console.log('银行', res)
								if(res.status){
							     uni.showToast({
                   title: res.info?res.info:'绑定成功',
                   duration: 2000,
                   image:'/static/holdingImg/cedan-succ.png'
                   });
							     setTimeout(()=>{
                                     uni.switchTab({ url: '/pages/tabBar/mine/mine' })
                                 },2000)
								}else{
									uni.showToast({
									title: res.info?res.info:'绑定失败',
									duration: 2000,
									image:'/static/holdingImg/cedan-succ.png'
									});
								}
						}).catch((err) => {
								// 请求失败的回调
								console.error(err,'捕捉')
						})
		},
		// 获取手机验证码
		getverificacode(){
			var options = {
					url: '/Sapi/Code/sendex', //请求接口
					method: 'POST', //请求方法全部大写，默认GET
					data:{
						mobile:this.userinfo.mobile,
						type:"bind"
					}
			}
			this.$httpReq(options).then((res) => {
					// 请求成功的回调
					// res为服务端返回数据的根对象
					console.log('验证码', res)
					if(res.status){

					}else{

					}
			}).catch((err) => {
					// 请求失败的回调
					console.error(err,'捕捉')
			})
			}
  },
	// onLoad(opt){
	// 	this.type=opt.type
	// 	// 忘记密码
	// 	if(opt.type==0){
	// 		this.tel=opt.uName
	// 	}
	// 	// 绑定银行类型
	// 	else if(opt.type==1){
	// 		this.username=opt.username
	// 		this.sub_id=opt.sub_id
	// 		this.identifica=opt.identifica
	// 		this.bankcardid=opt.bankcardid
	// 		this.tel=this.userinfo.mobile
	// 		this.getverificacode()
	// 	}
	// }

  created(){
    var opt=this.$route.query
    // 忘记密码
    if(opt.type==0){
      this.tel=opt.uName
    }
    // 绑定银行类型
    else if(opt.type==1){
      this.username=opt.username
      this.sub_id=opt.sub_id
      this.identifica=opt.identifica
      this.bankcardid=opt.bankcardid
      this.tel=this.userinfo.mobile
      this.getverificacode()
    }
  }
}
</script>

<style lang="scss" scoped>
div.title {
  font-size: 28px;
  font-weight: 500;
  margin: 0 0 .24rem .32rem;
  color: #333;
}
div.subTitle {
  margin: 0 1.46rem 2.12rem .32rem;
  font-size: 14px;
  font-weight: 500;
  color: #454545;
  line-height:.40rem;
}
div.container {
  margin: 0 .55rem;
}
</style>
