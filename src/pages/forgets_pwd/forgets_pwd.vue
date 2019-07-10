<template>
  <div class="wrap">
    <base-header has-back="1" title="重置密码"></base-header>
    <div class="title textc1"></div>
    <div class="container">
      <input-item placeholderTxt="手机号" what-icon="login_shouji" @now-blur="handleBlur" is-tel="1" v-model="tel"></input-item>
      <div class="uni-flex vCode">
        <div>
          <input-item what-icon="login_code" placeholderTxt="验证码" @now-blur="handleBlur" v-model="verificationCode"></input-item>
        </div>
        <count-down init-txt="发送验证码" @v-yzm="getyamfunc" :countdown-ok="countdownOk"></count-down>
      </div>
      <div class="pwdclass">
        <input-item placeholderTxt="密码" :isPwd="true" v-model="pwd" @now-blur="handleBlur"></input-item>
      </div>
      <div class="bottom-part">
        <submit-btn btnTxt="完成" @v-tap="handleLogin" :verify-ok="verifyYes"></submit-btn>
        <err-tip :err-class="showErr" :tip-content="tipContent"></err-tip>
      </div>
    </div>
  </div>
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
      pwd: '',
      countdownOk: false
    };
  },
  components: { submitBtn, inputItem, errTip, countDown },
  methods: {
    go() {
      let url = '/risk_book'
      this.$navigateTo({ url })
    },
    resetped() {
      var options = {
        url: '/Sapi/User/resetPwd ',
        data: {
          mobile: this.tel,
          user_pwd: this.pwd,
          mobile_verify: this.verificationCode,
        },
        method: 'POST',
      }
      this.$httpReq(options).then((res) => {
        if (res.status == 1) {
          this.showErr = false
          this.$dialog.confirm({
            title: '修改成功',
            content: '现在去登录'
          }).then(
            () => this.$navigateTo({ url: '/pages/login/login', })
          )
        } else {
          this.showErr = true
          if (res.info) {
            this.tipContent = res.info
          } else {
            this.tipContent = '账号或密码错误'
          }
          return
        }
      }).catch((err) => {
        
        console.error(err, '捕捉')
      })
    },
    handleLogin() {
      // 验证输入信息
      //         if(this.$validata(this.uName,0)!=1){
      //             this.showErr=true
      //             this.tipContent=this.$validata(this.uName,0)
      //             return
      //         }
      if (this.$validata(this.tel, 2) != 1) {
        this.showErr = true
        this.tipContent = this.$validata(this.tel, 2)
        return
      }
      this.resetped()
    },
    handleBlur() {

    },
    // 获取验证码
    getyamfunc() {
      var options = {
        url: '/Sapi/Code/sendex', 
        data: {
          mobile: this.tel,
          type: 'resetpass'
        }, //发送给服务端的数据
        method: 'POST',
      }
      this.countdownOk = false
      this.$httpReq(options).then((res) => {
        if (res.status == 1) {
          this.showErr = false
          this.countdownOk = true
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
div.container {
  margin: 0 0.36rem;
  div.vCode {
    height: 1.04rem;
    justify-content: space-between;
    >div:last-child{
      transform: translateY(-5px)
    }
    > div:first-child {
      flex-grow: 1;
      margin-right: 15px;
    }
  }
  div.bottomTxt {
    font-size: 12px;
    margin-top: 0.58rem;
    color: #333;
    span.blueTxt {
      color: #2e8ae5;
      text-decoration: underline;
    }
  }
  div.pwdclass {
    margin-top: 10px;
  }
  div.bottom-part {
    position: absolute;
    bottom: 10px;
    left: 0.36rem;
    right: 0.36rem;
  }
}
</style>
