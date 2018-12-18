<template>
  <view class="subCard uni-flex">
    <view class="imgContainer">
      <image src="/static/mineImg/touxiang.png"/>
    </view>
    <view>
      <h2>用户名{{username}}</h2>
      <h3>{{mobile}}</h3>
      <button hover-class='self-hover' @tap='go'>实名认证</button>
    </view>
  </view>
</template>
<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
	  data(){
			return{
			}
    },
    methods:{
      go(){
        uni.navigateTo({url:'/pages/mine_sub/credentials_upload/tep1/tep1'})
      }
    },
		computed: mapState(['sid','username','mobile']),
		created(){
		}
	}
</script>
<style lang="scss">
view.subCard {
  padding: 22upx 0 34upx 50upx;
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
    margin-top: 40upx;
  }
  margin: 114upx 20upx 0;
  background-color: #fff;
  border-radius: 20upx;
  box-shadow: 0upx 5upx 5upx 0upx rgba(245, 245, 245, 0.6);
  min-height: 200upx;
}
</style>
