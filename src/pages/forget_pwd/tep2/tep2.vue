<template>
  <div class="allPage">
    <base-header has-back='1' title="短信验证"></base-header>
    <div class="subTitle ">我们已向 {{tel||userinfo.mobile}}发送验证码短信，请查看短信并输入验证码。</div>
    <div class="uni-flex vcodeInput">
      <input-item icon-txt="验证码" placeholderTxt="输入验证码" v-model="vCode" style="width:70%"></input-item>
      <count-down init-txt='重新发送' @v-yzm="getverificacode" :countdown-ok='countdownOk'></count-down>
    </div>
    <div class="container">
      <submit-btn btnTxt='提交验证' @v-tap='handleNext' :verify-ok='true'></submit-btn>
      <br>
      <err-tip :err-class='showErr' :tip-content='tipContent'></err-tip>
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
      showErr: false,
      tipContent: '',
      tel: '',
      uName: '',
      username: '',
      countdownOk: false,
      typeWhat: '',//为1时 绑定银行卡
    };
  },
  components: { submitBtn, inputItem, errTip, countDown },
  computed: mapState(['userinfo']),
  methods: {
    handleNext() {
      switch (this.typeWhat) {
        case 0:
          this.$navigateTo({ url: '/pages/forget_pwd/tep3/tep3?username=' + this.uName + '&tel=' + this.tel + '&verificationCode=' + this.vCode + '&typeWhat=0' })
          break
        case 1:
          this.addmybankcard()
          break
        case 2:
          this.unbindCard()
      }

    },
    addmybankcard() {
      var options = {
        url: '/Sapi/Ubank/bind_new',
        method: 'POST',
        data: {
          ...this.$route.query,
          mobile: this.userinfo.mobile,
          mobile_verify: this.vCode,
          step: 2
        }
      }
      this.nextDo(options, '绑定成功')
    },
    nextDo(options, str) {
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.$toast.success({
            message: res.info ? res.info : str,
          })
          setTimeout(() => {
            this.$navigateTo({ url: '/mine' })
          }, 1000)
        } else {
          this.showErr = true
          this.tipContent = res.info
        }
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    },
    // 获取手机验证码
    getverificacode() {
      this.countdownOk = false
      var options = {
        url: '/Sapi/Code/sendex',
        method: 'POST',
        data: {
          mobile: this.userinfo.mobile,
          type: this.$route.query.type || "bind"
        }
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.countdownOk = true
        } else {
          this.showErr = true
          this.tipContent = res.info
        }
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    },
    unbindCard() {
      let options = {
        url: ' /Sapi/Ubank/unbind',
        method: 'POST',
        data: {
          ...this.$route.query,
          mobile: this.userinfo.mobile,
          mobile_verify: this.vCode,
        }
      }
      this.nextDo(options, '解绑成功')
    }
  },
  created() {
    var opt = this.$route.query
    this.typeWhat = opt.typeWhat
    // 忘记密码
    if (opt.typeWhat == 0) {
      this.tel = opt.uName
    }
    // 绑定银行类型
    else if (opt.typeWhat >= 1) {
      this.getverificacode()
    }
  }
}
</script>

<style lang="scss" scoped>
.allPage {
  background-color: #f5f5f5;
  min-height: 100vh;
}

div.subTitle {
  margin: 10px 0;
  height: 1.5rem;
  padding: 0.4rem 0.22rem;
  padding-right: 1.6rem;
  font-size: 12px;
  font-weight: 500;
  color: #999;
  line-height: 24px;
  background-color: #fff;
}
.vcodeInput {
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.2rem;
  height: 0.98rem;
  ._input {
    font-size: 14px;
    margin-bottom: 0;
    border-bottom: 0;
    /deep/ .leftSvg {
      top: 6px;
    }
  }
}
div.container {
  margin: 0.22rem;
}
</style>
