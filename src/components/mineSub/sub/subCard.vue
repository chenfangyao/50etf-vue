<template>
<div class="subCard">
    <div class=" uni-flex ml50">
        <div class="imgContainer">
          <img src="/assets/mineImg/touxiang.png"/>
        </div>
        <div>
          <h2>{{sid?'用户名':'未登录'}}{{userinfo.user_name}}</h2>
          <h3>{{sid?userinfo.mobile:'— —'}}</h3>
        </div>
    </div>
    <button hover-class='self-hover' @click='go'>{{sid?'实名认证':'登录'}}</button>
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
      // 判断实名认证状态实名认证状态。0=未提交，1=审核成功，2=审核中，3=审核失败"
      let realnstatus=this.userinfo.realn_status;
			if(realnstatus==0){
				this.$navigateTo({ url: '/pages/mine_sub/credentials_upload/tep1/tep1' })
			}else if(realnstatus==1){
				this.$navigateTo({ url: '/pages/mine_sub/credentials_upload/tep4/tep4?type=1' })
			}else if(realnstatus==2){
				this.$navigateTo({ url: '/pages/mine_sub/credentials_upload/tep4/tep4?type=2' })
			}else if(realnstatus==3){
				this.$navigateTo({ url: '/pages/mine_sub/credentials_upload/tep4/tep4?type=3' })
			}
    }
  },
  computed: mapState(['sid', 'realnstatus','userinfo']),
}
</script>
<style lang="scss">
button {
  width:2.60rem;
  height:.72rem;
  background: rgba(64, 157, 229, 1);
  border-radius:.36rem;
  border: 0;
  font-size:.30rem;
  line-height:.72rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin-top:.10rem;
}
div.subCard {
  padding:.22rem 0.34rem;
  div.ml50 {
    margin-left:.50rem;
  }
  div.imgContainer {
    img {
      width:1.20rem;
      height:1.20rem;
    }
    border-radius: 50%;
    position: relative;
    bottom:.52rem;
    margin-right:.30rem;
  }
  h2 {
    font-size:.30rem;
    font-weight: 400;
    color: rgba(24, 28, 40, 1);
  }
  h3 {
    font-size:.22rem;
    font-weight: 400;
    color: rgba(130, 133, 151, 1);
  }

  margin:.66rem.20rem 0;
  background-color: #fff;
  border-radius:.20rem;
  box-shadow:.00rem.05rem.05rem.00rem rgba(245, 245, 245, 0.6);
  min-height:2.00rem;
}
</style>
