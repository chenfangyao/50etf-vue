<template>
	<view>
		<base-header has-back='1'></base-header>
    <view class="title">忘记密码</view>
    <view class="container">
      <input-item placeholderTxt='手机号' @now-blur='handleBlur' is-tel='1' v-model='tel'></input-item>
      <view class="uni-flex vCode">
        <view>
          <input-item placeholderTxt='验证码' @now-blur='handleBlur' v-model="verificationCode"></input-item>
        </view>
        <count-down init-txt='发送验证码' @v-yzm="getyamfunc" ></count-down>
      </view>
	  <view class="pwdclass">
	  	<input-item placeholderTxt='密码' :isPwd='true' v-model="pwd" @now-blur='handleBlur' ></input-item>
	  </view>
      <err-tip :err-class='showErr' :tip-content='tipContent'></err-tip>
       <view class='bottom-part'>
		 <submit-btn btnTxt='完成' @v-tap='handleLogin' :verify-ok='verifyYes'></submit-btn>  
	   </view>
      
      
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
      uName: '',
      tel: '',
      verificationCode: '',//验证码
      verifyYes: true,
      tipContent: '您注册的账号已存在，请重新输入重新输入',
      showErr: false,
	  pwd:','
    };
  },
  components: { submitBtn, inputItem ,errTip,countDown},
  methods: {
    go() {
      let url = '/pages/risk_book/risk_book'
      uni.navigateTo({ url })
    },
	resetped(){
				var options = {
						url: '/Sapi/User/resetPwd ', //请求接口
						data: {
								mobile: this.tel,
								user_pwd:this.pwd,
								mobile_verify:this.verificationCode,
						}, //发送给服务端的数据
						method: 'POST', //请求方法全部大写，默认GET
				}
				this.$httpReq(options).then((res) => {
						// 请求成功的回调
						// res为服务端返回数据的根对象
						console.log(res)
						if (res.status == 1) {
							this.showErr=false
							 uni.showModal({
							      title:'修改成功',
							      content:'现在去登录',
							      success:(res)=>{
							          if (res.confirm) {
							              uni.navigateTo({
							              	url: '/pages/login/login',
							              	success: res => {},
							              	fail: () => {},
							              	complete: () => {}
							              });
							          } else if (res.cancel) {
							              console.log('用户点击取消');
							          }
							      }
							  })
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
    handleLogin() {
        // 验证输入信息
//         if(this.$validata(this.uName,0)!=1){
//             this.showErr=true
//             this.tipContent=this.$validata(this.uName,0)
//             return
//         }
        if(this.$validata(this.tel,2)!=1){
            this.showErr=true
            this.tipContent=this.$validata(this.tel,2)
            return
        }
        this.resetped()
    },
    handleBlur() {

    },
      // 获取验证码
      getyamfunc(){
          var options = {
              url: '/Sapi/Code/sendex', //请求接口
              data: {
                  mobile: this.tel,
                  type: 'resetpass'
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
                      this.tipContent=res.info
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
  view.vCode {
    height: 104upx;
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
    view.pwdclass{
  	  margin-top: 10px;
  }
    view.bottom-part{
  	  position: fixed;
  	  bottom: 10px;
      left:55upx;
  	  right:55upx;
  }
}
</style>
