<template>
<view class="fixWrap">
  <view class="occupy"></view>
  <view class="title">
    <view class="msg">
      <text @tap='go(3) ' class="commonStyle1">消息</text>
      <!-- <uni-badge :text="txt" type="danger"></uni-badge> -->
      <uni-badge :text="sid?newlengths:'0'" type="danger"></uni-badge>
    </view>
    <text class="commonStyle1" @tap='go'>设置</text>
  </view>
</view>
</template>
<script>
import uniBadge from "@/components/uni-badge.vue"
import { mapState } from 'vuex';
export default {
	data(){
		return{
			txt:'0'
		}
	},
  components: { uniBadge },
	computed: mapState(['sid','newlengths']),
	created(){
		console.log(4444)
		if(this.sid){
			this.txt=this.newlengths.toString()
		}else{
			this.txt='0'
		}
	
	},
  methods: {
    go(i) {
				if(!this.sid){
				 uni.showModal({
				        title:'您还未登录',
				        content:'现在去登录',
				        success:(res)=>{
				            if (res.confirm) {
				                uni.navigateTo({
				                	url: '/pages/login/login',
				                	success: res => {},
				                	fail: () => {},
				                	complete: () => {}
				                });
				            } else if (res.cancel) {
				                console.log('用户点击取消');
				            }
				        }
				    })
						return
			}
      if (i == 3) {
        uni.navigateTo({ url: '/pages/msg_common/list/list?type=' + i })
      } else {
        uni.navigateTo({ url: '/pages/mine_sub/setting/setting' })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.fixWrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  background: linear-gradient(
    90deg,
    rgba(41, 123, 205, 1),
    rgba(64, 157, 229, 1)
  );
  right: 0;
  .occupy {
    height: var(--status-bar-height);
  }
}
.title {
  height: 44px;
  padding: 0 26upx;

  .msg {
    position: relative;
    margin-right: 44upx;
  }

  display: flex;
  justify-content: space-between;
  text.commonStyle1 {
    color: #fff;
    font-size: 14px;
    line-height: 44px;
  }
  .uni-badge {
    position: absolute;
    right: -32upx;
    top: 20upx;
    padding: 4upx 8upx;
    font-size: 11px;
  }
}
</style>
