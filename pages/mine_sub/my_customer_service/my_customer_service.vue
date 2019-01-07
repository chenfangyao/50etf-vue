<template>
	<view class="wrap">
		<base-header :hasBack="true" title='我的客服'></base-header>
    <view class="h50"></view>
    <btn-block txt='电话客服' @v-tap='showPop'></btn-block>
    <!--<view class="h577"></view>-->
	<view class="telPop" v-show="telShow">
      <view class="fixed"  @tap="showPop"></view>
      <view class="container">
        <view class="txt">是否拨打电话</view>
        <view class="telNum">9-559-555</view>
        <view class="btn" hover-class='self-hover' @tap='call'>拨打</view>
      </view>
    </view>
	</view>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
export default {
  data() {
    return {
      telShow: false,
    };
  },
  components:{btnBlock},
  methods: {
    showPop() {
      this.telShow = !this.telShow
    },
    call() {
      uni.makePhoneCall({
        phoneNumber: '9-559-555' 
      });
    }
  }
}
</script>

<style lang="scss" scoped>
view.wrap {
  background-color: #f5f5f5;
  height: 100vh;
  view.h50{
    height: 500upx;
  }
  view.telPop {
    view.fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
    }
    view.container {
      text-align: center;
      background-color: #fff;
      position: fixed;
      top: 50%;
      padding-bottom: 42upx;
      border-radius: 10upx;
      transform: translateY(-50%);
      left: 75upx;
      right: 75upx;
      view.txt {
        font-size: 16px;
        line-height: 16px;
        color: rgba(24, 28, 40, 1);
        margin: 39upx 0 91upx;
      }
      view.telNum {
        font-size: 45px;
        line-height: 45px;
        font-family: ArialMT;
        color: rgba(24, 28, 40, 1);
        margin-bottom: 103upx;
      }
    }
  }
  view.btn {
    height: 98upx;
    margin: 0 20upx;
    background: rgba(64, 157, 229, 1);
    border-radius: 10upx;
    font-size: 32upx;
    color: rgba(255, 255, 255, 1);
    line-height: 98upx;
    text-align: center;
  }
  view.h577 {
    height: 577upx;
    background-color: #fff;
    margin: 50upx 20upx 0;
  }
}
</style>
