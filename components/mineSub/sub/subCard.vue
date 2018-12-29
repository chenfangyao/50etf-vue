<template>
<view class="subCard">
    <view class=" uni-flex ml50">
        <view class="imgContainer">
          <image src="/static/mineImg/touxiang.png"/>
        </view>
        <view>
          <h2>{{sid?'用户名':'未登录'}}{{userinfo.user_name}}</h2>
          <h3>{{sid?userinfo.mobile:'— —'}}</h3>
        </view>
    </view>
    <button hover-class='self-hover' @tap='go'>{{sid?'实名认证':'登录'}}</button>
  </view>
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
        uni.navigateTo({ url: '/pages/login/login' })
        return
      }
      // 判断实名认证状态实名认证状态。0=未提交，1=审核成功，2=审核中，3=审核失败"
      let realnstatus;
      //#ifndef H5
      realnstatus = this.realnstatus || ""
      // #endif
      // #ifdef H5
      realnstatus = sessionStorage.getItem('realnstatus') || ""
      // #endif
      uni.navigateTo({ url: '/pages/mine_sub/credentials_upload/tep1/tep1' })
    }
  },
  computed: mapState(['sid', 'realnstatus','userinfo']),
}
</script>
<style lang="scss">
button {
  width: 260upx;
  height: 72upx;
  background: rgba(64, 157, 229, 1);
  border-radius: 36upx;
  border: 0;
  font-size: 30upx;
  line-height: 72upx;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin-top: 10upx;
}
view.subCard {
  padding: 22upx 0 34upx;
  view.ml50 {
    margin-left: 50upx;
  }
  view.imgContainer {
    image {
      width: 120upx;
      height: 120upx;
    }
    border-radius: 50%;
    position: relative;
    bottom: 52upx;
    margin-right: 30upx;
  }
  h2 {
    font-size: 30upx;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(24, 28, 40, 1);
  }
  h3 {
    font-size: 22upx;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(130, 133, 151, 1);
  }

  margin: 114upx 20upx 0;
  background-color: #fff;
  border-radius: 20upx;
  box-shadow: 0upx 5upx 5upx 0upx rgba(245, 245, 245, 0.6);
  min-height: 200upx;
}
</style>
