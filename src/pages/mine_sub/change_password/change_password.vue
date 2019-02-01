<template>
	<div>
		<base-header has-back='1'></base-header>
    <div class="title">修改密码</div>
    <div class="container">

      <input-item placeholderTxt='旧密码' is-pwd='1' @now-blur='handleBlur' @now-change='handChange' v-model="pwd1"></input-item>
      <input-item placeholderTxt='新密码' is-pwd='1' @now-blur='handleBlur' v-model="pwd2"></input-item>
      <input-item placeholderTxt='确认密码' is-pwd='1' @now-blur='handleBlur' v-model="pwd3"></input-item>
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
      verifyYes: true,
      pwd1:'',
      pwd2:'',
			pwd3:'',
      showErr:false,
    };
  },
  components: { submitBtn, inputItem ,errTip},
  methods: {
    handleNext() {
			// 新旧密码是否一致
			if(this.pwd3!==this.pwd2){
				this.showErr=true
				this.tipContent='两次输入不一致'
				return
			}
			// 验证输入信息
			if(this.$validata(this.pwd2,1)!=1){
					this.showErr=true
					this.tipContent=this.$validata(this.pwd2,1)
					return
			}
			this.resetPwd()
    },
    handleBlur() {

    },
		resetPwd(){
			var options = {
					url: '/Sapi/User/savePwd', //请求接口
					data: {
							user_oldpwd: this.pwd1,
							user_pwd: this.pwd2
					}, //发送给服务端的数据
					method: 'POST', //请求方法全部大写，默认GET
			}
			this.$httpReq(options).then((res) => {
					if (res.status == 1) {
						this.showErr=false
						this.$toast.success(res.info?res.info: '修改成功')
						setTimeout(()=>{
							this.$navigateTo({ url:'/pages/login/login' })
						},1500)

					}else{
						this.showErr=true
							if(res.info){
									this.tipContent=res.info
							}else{
									this.tipContent='修改密码失败'
							}
							// return
					}
			}).catch((err) => {
					// 请求失败的回调
					console.error(err,'捕捉')
			})
		},
		handChange(){
			this.showErr=false
		}
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
  div.txt2 {
    justify-content: space-between;
    span {
      text-decoration: underline;
      font-size: 13px;
      color: rgba(132, 134, 137, 1);
    }
  }
}
</style>
