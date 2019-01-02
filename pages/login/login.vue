<template>
	<view class="wrap">
    <base-header :has-back='true' title='登录'></base-header>
    <view class="h1"></view>
    <view class="img"><image src='/static/loginResgImg/logo.png'></image></view>
    <view class="container">
      <input-item placeholderTxt='手机号 / 账号' v-model="uName" @now-blur='handleBlur' @now-change="handChange"></input-item>
      <input-item placeholderTxt='密码' :isPwd='true' v-model="pwd" @now-blur='handleBlur' @now-change="handChange"></input-item>
      <err-tip :err-class='showErr' :tip-content='tipContent'></err-tip>
      <submit-btn btnTxt='登录'  @v-tap='handleLogin' :verify-ok='verifyYes'></submit-btn>
      <view class="txt2 uni-flex">
        <text @tap='go(1)'>注册用户</text>
        <text @tap='go(2)'>忘记密码 ？</text>
      </view>
    </view>
    <view class="bottomTxt">
      <text>登录即代表阅读并同意 </text>
      <text class="blueTxt"  @tap='go(3)'>风险揭示书</text>
    </view>
	</view>
</template>

<script>
import submitBtn from '@/components/commonResgLog/submitBtn.vue'
import inputItem from '@/components/commonResgLog/inputItem.vue'
import errTip from '@/components/commonResgLog/errtip.vue'
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      tipContent: '您的账号和密码错误，请重新输入',
      verifyYes: false,//验证通过，把它至为true,登录按钮才会变色且启用
      pwd: '',
      uName: '',
      openEye: false,
      focusInput: false,
      showErr:false
    };
  },
	created(){
		if(this.$validata(this.uName,0)==1 && this.$validata(this.pwd,1)==1){
			this.verifyYes==true
		}
	},
    computed: mapState(['isWhite','sid','username','mobile','realnstatus','userinfo']),
  components: { submitBtn ,inputItem,errTip},
  methods: {
      ...mapMutations(['setsid','setusername','setmobile','setrealnstatus','setuserinfo']),
    go(i) {
      let url = ''
      switch (i) {
        case 1: url = '/pages/register/register'
          break
        case 2: url = '/pages/forget_pwd/tep1/tep1'
          break
        case 3: url = '/pages/risk_book/risk_book'
      }
      uni.navigateTo({ url })
    },
    handleLogin() {
        this.verifyYes=false
        this.showErr=false
          // 验证输入信息
        if(this.$validata(this.uName,0)!=1){
            this.showErr=true
            this.tipContent=this.$validata(this.uName,0)
            return
        }
        if(this.$validata(this.pwd,1)!=1){
            this.showErr=true
            this.tipContent=this.$validata(this.pwd,1)
            return
        }
            var options = {
                url: '/Sapi/Login/index', //请求接口
                data: {
                    user_name: this.uName,
                    user_pwd: this.pwd
                }, //发送给服务端的数据
                header: {
                    clienttype: 'web',
                    ver: 'v1.0'
                },
                method: 'POST', //请求方法全部大写，默认GET
            }
            this.$httpReq(options).then((res) => {
                // 请求成功的回调
                // res为服务端返回数据的根对象
                console.log(res)
                if (res.status == 1) {
                    this.verifyYes=true
                    this.setsid(res.data.sid)
                    this.setrealnstatus(res.data.realn_status)
                    // #ifdef H5
                    sessionStorage.setItem('etf_sid',res.data.sid)
                    // 实名认证状态
                    sessionStorage.setItem('realnstatus',res.data.realn_status)
                    // #endif
                    // 获取用户信息
                    this.getuserinfo()
                    uni.switchTab({ url: '/pages/tabBar/index/index'})
                }else{
                    this.showErr=true
                    if(res.info){
                        this.tipContent=res.info
                    }else{
                        this.tipContent='账号或密码错误'
                    }
                }
            }).catch((err) => {
                // 请求失败的回调
                console.log(err)
            })
    },
    getuserinfo() {
          var options = {
              url: '/Sapi/User/info', //请求接口
              method: 'GET', //请求方法全部大写，默认GET
          }

          this.$httpReq(options).then((res) => {
              // 请求成功的回调
              // res为服务端返回数据的根对象
              console.log('用户信息', res)
              if(res.status){
//                   this.setusername(res.data.user_name)
//                   this.setmobile(res.data.mobile)
									this.setuserinfo(res.data)
              }
          }).catch((err) => {
              // 请求失败的回调
              alert(err)
          })
      },
    handleBlur(){
      console.log('input失去焦点时触发');
    },
    handChange(){
        this.showErr=false
        if(this.uName && this.pwd){
            this.verifyYes=true
        }else if(!this.uName || !this.pwd){
            this.verifyYes=false
        }
      }
  },
}
</script>

<style lang="scss" scoped>
view.wrap {
  min-height: 100vh;
  position: relative;
  view.img {
    text-align: center;
    margin: 120upx 0 80upx;

    image {
      width: 140upx;
      height: 140upx;
    }
  }
  view.h1 {
    height: 1px;
    background-color: #ededed;
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
  view.bottomTxt {
    position: absolute;
    bottom: 60upx;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 12px;
    color: rgba(51, 51, 51, 1);
    text.blueTxt {
      color: #2e8ae5;
      text-decoration: underline;
    }
  }
}
</style>
