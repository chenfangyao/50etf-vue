<template>
	<view>
		<base-header has-back='1'></base-header>
    <view class="title">设置您的账号</view>
    <view class="container">
      <input-item placeholderTxt='您的账号' @now-blur='handleBlur' v-model="uName"></input-item>
      <input-item placeholderTxt='手机号' @now-blur='handleBlur' is-tel='1' v-model='tel'></input-item>
      <view class="uni-flex vCode">
        <view>
          <input-item placeholderTxt='验证码' @now-blur='handleBlur' v-model="verificationCode"></input-item>
        </view>
        <count-down init-txt='发送验证码' @v-yzm="getyamfunc" ></count-down>
      </view>
      <err-tip :err-class='showErr' :tip-content='tipContent'></err-tip>

      <submit-btn btnTxt='下一步' @v-tap='handleLogin' :verify-ok='verifyYes'></submit-btn>
      <view class="bottomTxt">
        <text>注册即代表阅读并同意 </text>
        <text class="blueTxt"  @tap='go(3)'>风险揭示书</text>
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
      showErr: false
    };
  },
  components: { submitBtn, inputItem ,errTip,countDown},
  methods: {
    go() {
      let url = '/pages/risk_book/risk_book'
      uni.navigateTo({ url })
    },
    handleLogin() {
        // 验证输入信息
        if(this.$validata(this.uName,0)!=1){
            this.showErr=true
            this.tipContent=this.$validata(this.uName,0)
            return
        }
        if(this.$validata(this.tel,2)!=1){
            this.showErr=true
            this.tipContent=this.$validata(this.tel,2)
            return
        }
        this.phoneisLogin()
    },
    handleBlur() {
      this.showErr = true
    },
      // 手机是否被注册
      phoneisLogin(){
          this.verifyYes=false
          var options = {
              url: '/Sapi/Reg/existsmobile', //请求接口
              data: {
                  mobile: this.tel,
                  user_name: this.uName
              }, //发送给服务端的数据
              method: 'POST', //请求方法全部大写，默认GET
          }
          this.$httpReq(options).then((res) => {
              // 请求成功的回调
              // res为服务端返回数据的根对象
              console.log(res)
              this.verifyYes=true
              if (res.status == 1) {
                  uni.navigateTo({
                      url:'/pages/forget_pwd/tep3/tep3?username='+this.uName+'&tel='+this.tel+'&verificationCode='+this.verificationCode+'&type=1'
                      // url:'/pages/forget_pwd/tep3/tep3?username='+this.uName+''
                  })
              }else{
                  this.showErr=true
                  if(res.info){
                      this.tipContent=res.info
                  }else{
                      this.tipContent='手机已被注册'
                  }
                  // return
              }
          }).catch((err) => {
              // 请求失败的回调
              console.error(err,'捕捉')
          })
      },
      // 获取验证码
      getyamfunc(){
          var options = {
              url: '/Sapi/Code/sendex', //请求接口
              data: {
                  mobile: this.tel,
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
}
</style>
