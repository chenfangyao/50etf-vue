<template>
  <div class="subCard black2 uni-flex" v-vtap="{method:go}">
    <div class="imgContainer">
      <img :src="switchObj.logo" />
    </div>
    <div>
      <h2 class="textc1">{{sid?'':'未登录'}}{{userinfo.user_name}}</h2>
      <h3 class="textc2">{{sid?userinfo.mobile:'— —'}}</h3>
    </div>
    <div>
      <button v-hover-class='"self-hover"' v-if='userinfo.is_certified>0'>{{sid?'实名认证':'登录'}}</button>
      <button v-hover-class='"self-hover"' v-else-if="!sid">登录</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
    }
  },
  methods: {
    go() {
      if (!this.sid) {
        this.$navigateTo({ url: '/pages/login/login' })
        return
      }
      if (this.userinfo.is_certified == 0) return;
      // 判断实名认证状态实名认证状态。0=未提交，1=审核成功，2=审核中，3=审核失败"
      let realnstatus = this.userinfo.realn_status;
      if (realnstatus == 0) {
        if (this.userinfo.is_certified < 6) {
          this.$navigateTo({ url: '/pages/mine_sub/credentials_upload/tep1/tep1' })
          return
        }
        this.$httpReq({
          url: '/Sapi/User/realn',
          method: 'POST'
        }).then(res => {
          if (res.status == 1) {
            this.$navigateTo({ url: '/pages/mine_sub/credentials_upload/tep3/tep3' })
          } else {
            this.$toast(res.info ? res.info : '实名认证失败')
          }
        })
      } else {
        this.$router.push({
          path: '/pages/mine_sub/credentials_upload/tep3/tep3',
          query: { type: realnstatus }
        })
      }
    }
  },
  computed: mapState(['sid', 'realnstatus', 'userinfo', 'switchObj']),
}
</script>
<style lang="scss">
button {
  width: 1.6rem;
  height: 0.66rem;
  background: $primary1;
  border-radius: 0.36rem;
  border: 0;
  font-size: 13px;
  line-height: 0.66rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
div.subCard {
  padding: 0.7rem 0.3rem;
  text-align: center;
  height: 2.6rem;
  align-items: center;
  position: fixed;
  left: 0.2rem;
  right: 0.2rem;
  justify-content: space-between;
  div.imgContainer {
    img {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
    }
    // position: relative;
    // bottom:.52rem;
    margin-right: 0.3rem;
  }
  h2 {
    font-size: 14px;
    font-weight: 400;
    margin: 0;
    text-align: left;
    color: rgba(24, 28, 40, 1);
  }
  h3 {
    font-size: 13px;
    margin: 0;
    font-weight: 400;
    color: rgba(130, 133, 151, 1);
  }
  div:last-child {
    flex-grow: 1;
    text-align: right;
  }
  margin-top: 0.5rem;
  z-index: 5;
  background-color: #fff;
  border-radius: 0.2rem;
  box-shadow: 0 0.05rem 0.05rem 0 rgba(245, 245, 245, 0.6);
}
</style>
