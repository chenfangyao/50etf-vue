<template>
  <div class="subCard black2 uni-flex" >
    <div class="imgContainer">
      <img :src="switchObj.logo" />
    </div>
    <div>
      <h2 class="textc1">{{sid?userinfo.user_name:'未登录'}}</h2>
      <h3 class="textc2">{{userinfo?userinfo.mobile:'— —'}}</h3>
    </div>
    <div v-vtap="{method:go}" class="mineSubbtn">
      <button v-hover-class='"self-hover"' v-if="!sid">登录</button>
      <button v-hover-class='"self-hover"' v-else-if='userinfo.is_certified>0'>{{sid?'实名认证':'登录'}}</button>
      <button v-hover-class='"self-hover"' v-else>{{sid?'实名认证':'登录'}}</button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import {getuserinfo} from '@/common/saveLogin'
export default {
  data() {
    return {
    }
  },
  methods: {
    go(e) {
      if (!this.sid) {
        this.$navigateTo({ url: '/pages/login/login' })
        return
      }
      if (this.userinfo.is_certified == 0) return;
      // 判断实名认证状态实名认证状态。0=未提交，1=审核成功，2=审核中，3=审核失败"
      let realnstatus = this.userinfo.realn_status;
      if (realnstatus == 0) {
        this.$navigateTo({ url: '/pages/mine_sub/credentials_upload/tep1/tep1' })
      } else {
        let type
        if (realnstatus == 1) {
          type = 1
        } else if (realnstatus == 2) {
          type = 2
        } else if (realnstatus == 3) {
          type = 3
        }
        this.$router.push({
          path: '/pages/mine_sub/credentials_upload/tep3/tep3',
          query: {
            type: type,
          }
        })
      }
    },
  },
  computed: mapState(['userinfo', 'realnstatus',  'switchObj','sid']),
  created(){
    getuserinfo()
  }
}
</script>
<style lang="scss">
button {
  width: 1.6rem;
  height: 0.66rem;
  border-radius: 0.36rem;
  border: 0;
  font-size: 13px;
  background-color: #fff;
  line-height: 0.66rem;
  font-weight: 500;
  color: $primary1;
}
div.subCard {
  text-align: center;
  align-items: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  z-index: 5;
  color: #fff;
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
  }
  h3 {
    font-size: 13px;
    margin: 0;
    font-weight: 400;
  }
  div:last-child {
    flex-grow: 1;
    text-align: right;
  }
  
}
.at-night .mineSubbtn button{
  background-color: $primary1;
  color: #fff;

}
</style>
