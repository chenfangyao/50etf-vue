<template>
	<view>
		<base-header has-back='1'></base-header>
    <view class="title">设置您的密码</view>
    <view class="container">

      <input-item placeholderTxt='密码' is-pwd='1' @now-blur='handleBlur' v-model="pwd1"></input-item>
      <input-item placeholderTxt='确认密码' is-pwd='1' @now-blur='handleBlur' v-model="pwd2"></input-item>
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
      tipContent: '两次输入密码不一致',
      verifyYes: false,
      pwd2:'',
      pwd1:'',
      showErr:false,
    };
  },
  components: { submitBtn, inputItem ,errTip},
  methods: {
    handleNext() {
      uni.navigateTo({ url:'/pages/forget_pwd/tep2/tep2' })

      console.log('点击事件，this.verifyYes==true时才会触发！！');
    },
    handleBlur() {
      console.log('input失去焦点时触发');
      this.showErr = true
    },
      // 注册
    loginfun(){
          var options = {
              url: '/Sapi/Reg/index', //请求接口
              data: {
                  mobile: this.tel,
                  user_name: ''
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
                      this.tipContent='账号或密码错误'
                  }
                  return
              }
          }).catch((err) => {
              // 请求失败的回调
              console.log(err)
          })
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
