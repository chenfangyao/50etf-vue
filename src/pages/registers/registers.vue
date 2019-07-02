<template>
  <div class="wrap">
    <base-header has-back="1" title="注册"></base-header>
    <div class="title textc1"></div>
    <div class="img"><img :src="switchObj.logo"></div>
    <div class="container">
      <input-item what-icon="login_zhanghao" placeholderTxt="您的账号" @now-blur="handleBlur" v-model="uName" v-if='switchObj.show_reg_username==1'></input-item>
      <input-item placeholderTxt="手机号" what-icon="login_shouji" @now-blur="handleBlur" is-tel="1" v-model="tel"></input-item>
      <div class="uni-flex vCode">
        <div>
          <input-item what-icon="login_code" placeholderTxt="验证码" @now-blur="handleBlur" v-model="verificationCode"></input-item>
        </div>
        <count-down init-txt="发送验证码" @v-yzm="getyamfunc" :countdown-ok='countdownOk'></count-down>
      </div>
      <div class="pwdclass">
        <input-item placeholderTxt="密码" :isPwd="true" v-model="pwd" @now-blur="handleBlur"></input-item>
      </div>
      <input-item placeholderTxt="邀请人的邀请码" @now-blur="handleBlur" v-if='switchObj.show_reluser==1' v-model="inviteCode"></input-item>

      <!-- <submit-btn btnTxt='完成' @v-tap='handleLogin' :verify-ok='verifyYes'></submit-btn> -->
      <div class="bottom-part">
        <submit-btn btnTxt="完成" @v-tap="handleLogin" :verify-ok="verifyYes"></submit-btn>
        <err-tip :err-class="showErr" :tip-content="tipContent"></err-tip>
        <div class="bottomTxt">
          <span>注册即代表阅读并同意</span>
          <span class="blueTxt" v-vtap="{method: go , params: 3}">风险揭示书</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import submitBtn from '@/components/commonResgLog/submitBtn.vue'
import inputItem from '@/components/commonResgLog/inputItem.vue'
import errTip from '@/components/commonResgLog/errtip.vue'
import countDown from '@/components/commonResgLog/countdown.vue'
import { mapState } from 'vuex';

export default {
  data() {
    return {
      uName: '',
      tel: '',
      verificationCode: '',//验证码
      verifyYes: true,
      tipContent: '您注册的账号已存在，请重新输入重新输入',
      showErr: false,
      pwd: '',
      countdownOk: false,
      inviteCode: ''//邀请码
    };
  },
  components: { submitBtn, inputItem, errTip, countDown },
  methods: {
    go() {
      let url = '/risk_book'
      this.$navigateTo({ url })
    },
    handleLogin() {
      if (this.inviteCode.trim() === '' && this.switchObj.show_reluser == 1) {
        this.showErr = true
        this.tipContent = '邀请码必填'
        return
      }
      // 验证输入信息
      if (this.$validata(this.uName, 0) != 1 && this.switchObj.show_reg_username == 1) {
        this.showErr = true
        this.tipContent = this.$validata(this.uName, 0)
        return
      }
      if (this.$validata(this.tel, 2) != 1) {
        this.showErr = true
        this.tipContent = this.$validata(this.tel, 2)
        return
      }
      this.phoneisLogin()
    },
    // 注册
    resignfun() {
      var options = {
        url: '/Sapi/Reg/index', //请求接口
        data: {
          mobile: this.tel,
          user_name: this.uName,
          user_pwd: this.pwd,
          mobile_verify: this.verificationCode,
          rel_user: this.inviteCode
        },
        method: 'POST',
      }
      this.$httpReq(options).then((res) => {
        if (res.status == 1) {
          this.showErr = false
          this.$toast('注册成功')
          this.$router.goBack()
        } else {
          this.showErr = true
          if (res.info) {
            this.tipContent = res.info
          } else {
            this.tipContent = '注册失败'
          }
          return
        }
      }).catch((err) => {
        // 请求失败的回调
        console.error(err, '捕捉')
      })
    },
    handleBlur() {
      // this.showErr = true
    },
    // 手机是否被注册
    phoneisLogin() {
      this.verifyYes = false
      var options = {
        url: '/Sapi/Reg/existsmobile', //请求接口
        data: {
          mobile: this.tel,
          user_name: this.uName
        }, //发送给服务端的数据
        method: 'POST',
      }
      this.$httpReq(options).then((res) => {
        this.verifyYes = true
        if (res.status == 1) {
          //                   this.$navigateTo({
          //                       url:'/pages/forget_pwd/tep3/tep3?username='+this.uName+'&tel='+this.tel+'&verificationCode='+this.verificationCode+'&type=1'
          //                       // url:'/pages/forget_pwd/tep3/tep3?username='+this.uName+''
          //                   })
          this.resignfun()
        } else {
          this.showErr = true
          if (res.info) {
            this.tipContent = res.info
          } else {
            this.tipContent = '手机已被注册'
          }
          // return
        }
      }).catch((err) => {
        // 请求失败的回调
        console.error(err, '捕捉')
      })
    },
    // 获取验证码
    getyamfunc() {
      var options = {
        url: '/Sapi/Code/sendex',
        data: {
          mobile: this.tel,
          type: 'register'
        },
        method: 'POST',
      }
      this.countdownOk = false
      this.$httpReq(options).then(res => {
        if (res.status == 1) {
          this.countdownOk = true
          this.showErr = false
        } else {
          this.showErr = true
          if (res.info) {
            this.tipContent = res.info
          } else {
            this.tipContent = '获取验证码失败'
          }
        }
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    }
  },
  computed: mapState(['switchObj']),
  watch: {
    showErr(val) {
      if (val) {
        setTimeout(() => this.showErr = false, 3000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div.wrap {
  height: 100vh;
  min-height: 550px;
  position: absolute;
}
div.title {
  font-size: 28px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin: 0 0 0.88rem 0.32rem;
}
div.img {
  text-align: center;
  margin: 1.2rem 0.8rem;

  img {
    width: 1.4rem;
    height: 1.4rem;
  }
}
div.container {
  margin: 0 0.36rem;
  div.vCode {
    height: 1.04rem;
    justify-content: space-between;
    > div:first-child {
      flex-grow: 1;
      margin-right: 15px;
    }
  }
  div.pwdclass {
    margin-top: 10px;
  }
  div.bottomTxt {
    font-size: 12px;
    margin: 0.58rem 0 10px;
    text-align: center;
    color: #333;
    span.blueTxt {
      color: #2e8ae5;
      text-decoration: underline;
    }
  }
  div.bottom-part {
    position: absolute;
    bottom: 10px;
    left: 0.55rem;
    right: 0.55rem;
  }
}
</style>
