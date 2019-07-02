<template>
  <div class="wrap">
    <base-header has-back='1' title="实名认证"></base-header>
    <div class="title">设置成功后，可通过账号密码登录</div>
    <div class="container">
      <input-item iconTxt='真实姓名' @now-blur='handleBlur' v-model="uName"></input-item>
      <input-item iconTxt='身份证号' @now-blur='handleBlur' v-model="IDcard"></input-item>
      <input-item iconTxt='手机号' v-if="userinfo.is_certified!=5" @now-blur='handleBlur' isTel='1' v-model="telnum"></input-item>
    </div>
    <div class="btn">
      <submit-btn btnTxt='下一步' @v-tap='handleNext' :verify-ok='verifyYes'></submit-btn>
    </div>
    <br>
    <err-tip :err-class='showErr' :tip-content='tipContent'></err-tip>
  </div>
</template>

<script>
import submitBtn from '@/components/commonResgLog/submitBtn.vue'
import inputItem from '@/components/commonResgLog/inputItem.vue'
import errTip from '@/components/commonResgLog/errtip.vue'
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      verifyYes: true,
      IDcard: '',
      uName: '',
      showErr: false,
      tipContent: '您输入的身份证信息有误',
      telnum: '',
    };
  },
  computed: mapState(['userinfo']),
  components: { submitBtn, inputItem, errTip },
  methods: {
    handleNext() {
      if (this.$validata(this.IDcard, 3) != 1) {
        this.showErr = true
        this.tipContent = this.$validata(this.IDcard, 3)
        return
      } else if (this.$validata(this.uName) != 1) {
        this.showErr = true
        this.tipContent = this.$validata(this.uName)
        return
      } else if (this.userinfo.is_certified != 5 && this.$validata(this.telnum, 2) != 1) {
        this.showErr = true
        this.tipContent = this.$validata(this.telnum, 2)
        return
      }
      this.showErr = false
      if ([2, 3, 5].indexOf(this.userinfo.is_certified) != -1) {
        var options = {
          url: '/Sapi/User/realn',
          method: 'POST',
          data: {
            real_name: this.uName,
            idtp: '00',
            idno: this.IDcard,
            mobile: this.telnum,
          },
          header: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
        this.$httpReq(options).then(res => {
          if (res.status == 1) {
            this.$navigateTo({ url: '../tep3/tep3' })
          } else {
            this.$toast(res.info ? res.info : '实名认证失败')
          }
        })
        return
      }
      this.$navigateTo({ url: '/pages/mine_sub/credentials_upload/tep2/tep2', query: { username: this.uName, IDcard: this.IDcard, telnum: this.telnum } })
    },
    handleBlur() {
      this.verifyYes = true
    },
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  background-color: #f5f5f5;
  min-height: 100vh;
  .title {
    font-weight: 500;
    color: #999;
    padding: 0.25rem 0.4rem ;
  }
  div.container {
    padding: 0.2rem 0.2rem 1px;
    background-color: #fff;
    margin-bottom: 20px;
  }
  .btn{
    padding:  0 0.22rem;
  }
}
</style>
