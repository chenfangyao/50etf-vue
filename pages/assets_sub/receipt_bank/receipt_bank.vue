<template>
	<view class="wrap">
		<base-header title="收款银行" has-back='1' ></base-header>
		<view class="subWrap">
      <view class="line1">收款账号</view>
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
  height: 100vh;
  background-color: #f5f5f5;
  view.subWrap {
    margin-top: 12upx;
    background-color: #fff;
    view.line1 {
      font-size: 16px;
      color: rgba(24, 28, 40, 1);
      padding-left: 27upx;
      height: 84upx;
      line-height: 84upx;
      border-bottom: solid 1px #f5f5f5;
    }
  }
}
</style>

