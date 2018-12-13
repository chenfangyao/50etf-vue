<template>
	<view class="wrap">
		<base-header :hasBack="true" title='关于至简'></base-header>
    <view class="img">
      <image src=''></image>
    </view>
    <view class="txt">
      福建至简智能科技有限公司致力于通过场内期权的不断创新和运用，努力创建业内更加高品质的在线询价，在线操作，在线开户等服务。福建至简智能科技有限公司在任重道远的前进征途上，真诚欢迎广大用户及合作伙伴与我们一起携手同进，共创辉煌
    </view>
	</view>
</template>

<script>
export default {
  data() {
    return {

    };
  }
}
</script>

<style lang="scss" scoped>
view.wrap {
  background-color: #a8a8a8;
  height: 100vh;
  view.img {
    text-align: center;
    image {
      width: 100px;
      height: 100px;
    }
  }
  view.txt {
    font-size: 15px;
    color: rgba(24, 28, 40, 1);
    line-height: 21px;
    margin: 54upx 75upx;
  }
}
</style>
