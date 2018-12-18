<template>
	<view class="wrap">
		<base-header title="设置" has-back='1'></base-header>
    <view class=' uni-flex' hover-class='self-hover' @tap='go(1)'>
      <text>修改密码</text>
      <image src='/static/arrow/r.png'></image>
    </view>
    <view class='mb26 uni-flex' hover-class='self-hover' @tap='go(2)'>
      <text>关于</text>
      <view class="uni-flex verView">
        <text class="verTxt">版本号：10.1.38</text>
        <image src='/static/arrow/r.png'></image>
      </view>
    </view>
    <btn-block txt='退出登录' @v-tap='logOut'></btn-block>

	</view>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'

export default {
  data() {
    return {

    };
  },
  components: { btnBlock },
  methods: {
    logOut() { },
    go(i) {
      let url = ''
      switch (i) {
        case 1: url = '/pages/mine_sub/change_password/change_password'
          break
        case 2: url = '/pages/mine_sub/about_us/about_us'
          break

      }
      uni.navigateTo({ url })
    }
  }
}
</script>

<style lang="scss" scoped>
view.wrap {
  height: 100vh;
  background-color: #f5f5f5;
  > view {
    height: 98upx;
    padding: 0 26upx 0 30upx;
    background-color: #fff;
    align-items: center;
    font-size: 15px;
    color: rgba(24, 28, 40, 1);
    justify-content: space-between;
    border-top: solid 1px #ededed;
    view.verView {
      align-items: center;
      text.verTxt {
        font-size: 14px;
        color: rgba(112, 118, 128, 1);
        margin-right: 20upx;
      }
    }
  }
  view.mb26 {
    margin-bottom: 26upx;
  }
  image {
    width: 26upx;

    height: 30upx;
  }
}
</style>
