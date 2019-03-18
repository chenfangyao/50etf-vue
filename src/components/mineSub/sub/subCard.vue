<template>
  <div class="subCard black2 uni-flex" v-vtap="{method:go}">
    <div class="imgContainer">
      <img :src="switchObj.logo"/>
    </div>
    <div>
      <h2 class="textc1">{{sid?'用户名':'未登录'}}{{userinfo.user_name}}</h2>
      <h3 class="textc2">{{sid?userinfo.mobile:'— —'}}</h3>
    </div>
    <div >
      <button v-hover-class='"self-hover"'  v-if='userinfo.is_certified>0' >{{sid?'实名认证':'登录'}}</button>
      <button v-hover-class='"self-hover"'  v-else-if="!sid" >登录</button>
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
    go(e) {
      if (!this.sid) {
        this.$navigateTo({ url: '/pages/login/login' })
        return
      }
      // 判断实名认证状态实名认证状态。0=未提交，1=审核成功，2=审核中，3=审核失败"
      let realnstatus=this.userinfo.realn_status;
			if(realnstatus==0){
				this.$navigateTo({ url: '/pages/mine_sub/credentials_upload/tep1/tep1' })
			}else{
			  let type
         if(realnstatus==1){
          // this.$navigateTo({ url: '/pages/mine_sub/credentials_upload/tep4/tep4?type=1' })
           type=1
        }else if(realnstatus==2){
          // this.$navigateTo({ url: '/pages/mine_sub/credentials_upload/tep4/tep4?type=2' })
           type=2
        }else if(realnstatus==3){
          // this.$navigateTo({ url: '/pages/mine_sub/credentials_upload/tep4/tep4?type=3' })
           type=3
        }
        this.$router.push({
          path:'/pages/mine_sub/credentials_upload/tep4/tep4',
          query:{
            type:type,
          }
        })
      }
    }
  },
  computed: mapState(['sid', 'realnstatus','userinfo','switchObj']),
}
</script>
<style lang="scss">
button {
  width:1.6rem;
  height:0.66rem;
  background: rgba(64, 157, 229, 1);
  border-radius:.36rem;
  border: 0;
  font-size:13px;
  line-height:0.66rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
div.subCard {
  padding:0.7rem 0.3rem;
  text-align: center;
  height: 2.6rem;
  align-items: center;
  position: fixed;
  left: 0.2rem;
  right: 0.2rem;
  justify-content: space-between;
  div.imgContainer {
    img {
      width:1.20rem;
      height:1.20rem;
      border-radius: 50%;
    }
    // position: relative;
    // bottom:.52rem;
    margin-right:.30rem;
  }
  h2 {
    font-size:14px;
    font-weight: 400;
    margin: 0;

    color: rgba(24, 28, 40, 1);
  }
  h3 {
    font-size:13px;
    margin: 0;
    font-weight: 400;
    color: rgba(130, 133, 151, 1);
  }
div:last-child{
  flex-grow: 1;
  text-align: right;
}
  margin-top: 0.5rem;
  z-index: 5;
  background-color: #fff;
  border-radius:.20rem;
  box-shadow:0 .05rem .05rem 0 rgba(245, 245, 245, 0.6);
}
</style>
