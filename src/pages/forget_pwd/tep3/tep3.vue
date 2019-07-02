<template>
<!-- 此页暂时无用 -->
	<div>
		<base-header has-back='1'></base-header>
    <div class="title">设置您的密码</div>
    <div class="container">

      <input-item placeholderTxt='密码' is-pwd='1' @now-blur='handleBlur' @now-change="handChange" v-model="pwd1"></input-item>
      <input-item placeholderTxt='确认密码' is-pwd='1' @now-blur='handleBlur' @now-change="handChange" v-model="pwd2"></input-item>
      <err-tip :err-class='showErr' :tip-content='tipContent'></err-tip>

      <submit-btn btnTxt='完成' @v-tap='handleNext' :verify-ok='verifyYes'></submit-btn>

    </div>
	</div>
</template>

<script>
import submitBtn from '@/components/commonResgLog/submitBtn.vue'
import inputItem from '@/components/commonResgLog/inputItem.vue'
import errTip from '@/components/commonResgLog/errtip.vue'

export default {
  data() {
    return {
      tipContent: '两次输入密码不一致',
      verifyYes: false,
      pwd2:'',
      pwd1:'',
			uName:'',
			tel:'',
			verificationCode:'',
      showErr:false,
			type:'',
    };
  },
  components: { submitBtn, inputItem ,errTip},
  methods: {
    handleNext() {
        if(this.pwd1!=this.pwd2){
            this.verifyYes=false
            this.tipContent='两次输入密码不一致'
            this.showErr=true
            return
        }
				// 用户注册
				if(this.type=='1'){
					this.resignfun()
				}
				// 忘记密码
				else if(this.type=='0'){
					this.resetped()
				}
      
      // this.$navigateTo({ url:'/pages/forget_pwd/tep2/tep2' })

    },
    handleBlur() {
      this.showErr = true
    },
    handChange(){
          this.showErr=false
          if(this.pwd1 && this.pwd2){
              this.verifyYes=true
          }else if(!this.pwd1 || !this.pwd2){
              this.verifyYes=false
          }
      },
      // 注册
    resignfun(){
          var options = {
              url: '/Sapi/Reg/index', //请求接口
              data: {
                  mobile: this.tel,
                  user_name: this.uName,
                  user_pwd:this.pwd2,
                  mobile_verify:this.verificationCode,
                  rel_user:''
              }, //发送给服务端的数据
              method: 'POST', 
          }
          this.$httpReq(options).then((res) => {
              if (res.status == 1) {
              }else{
								this.showErr=true
                  if(res.info){
                      this.tipContent=res.info
                  }else{
                      this.tipContent='账号或密码错误'
                  }
                  return
              }
          }).catch((err) => {
              // 请求失败的回调
              console.error(err,'捕捉')
          })
      },
			// 忘记密码
	resetped(){
				var options = {
						url: '/Sapi/User/resetPwd ', //请求接口
						data: {
								mobile: this.tel,
								user_pwd:this.pwd2,
								mobile_verify:this.verificationCode,
						}, //发送给服务端的数据
						method: 'POST', 
				}
				this.$httpReq(options).then((res) => {
						if (res.status == 1) {
						}else{
							this.showErr=true
								if(res.info){
										this.tipContent=res.info
								}else{
										this.tipContent='账号或密码错误'
								}
								return
						}
				}).catch((err) => {
						// 请求失败的回调
						console.error(err,'捕捉')
				})
			}
			
  },
	onLoad(option){
		this.uName=option.username
		this.tel=option.tel
		this.verificationCode=option.verificationCode
		this.type=option.type
	}
}
</script>

<style lang="scss" scoped>
div.title {
  font-size: 28px;
  font-weight: 500;
  margin: 0 0.88rem.32rem;
  color: #333;
}
div.container {
  margin: 0.55rem;
}
</style>
