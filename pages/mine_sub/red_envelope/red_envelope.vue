<template>
	<view class="wrap">
		<base-header title="我的红包" has-back='1'></base-header>
    <image class="bg" src='/static/mineImg/hong_bao_bg.jpg'></image>
    <view class='logo'>
      <image  src='/static/mineImg/logo.png'></image>
    </view>
    <view class="txt">你投资，我出钱</view>
    <view class="txt">注册就送200红包</view>
    <view class="subTxt">
      <text>已经有 </text>
      <text>40050000</text>
      <text> 人选择50ETF期权</text>
    </view>
    <view class="redBadge">
      <image src='/static/mineImg/hong_bao.png'></image>
      <view class="price">
        <text>200</text>
        <text>元</text>
      </view>
      <input type="number" maxlength='11' placeholder-class='placeholderTxt' placeholder='请输入手机号'>
      <view class="btn" hover-class='active'>领取奖励</view>
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
  position: relative;
  image.bg {
    height: calc(100vh - 44px);
    position: absolute;
    left: 0;
    z-index: -10;
    width: 100%;
  }
  .logo {
    text-align: center;
    margin: 110upx 0 30upx;
    image {
      width: 140upx;
      height: 140upx;
    }
  }
  view.txt {
    font-size: 25px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height: 64upx;
    text-align: center;
  }
  view.subTxt {
    font-size: 14px;
    color: rgba(255, 255, 255, 1);
    line-height: 14px;
    margin: 30upx 0 70upx;
    text-align: center;
    text:nth-child(2) {
      color: #fcd334;
    }
  }
  view.redBadge {
    margin: 0 66upx;
    position: relative;
    height: 559upx;
    padding-top: 1px;
    image {
      position: absolute;
      z-index: -2;
      width: 100%;
    }
    .placeholderTxt {
      font-size: 15px;
      color: rgba(102, 102, 102, 1);
      line-height: 98upx;
    }
    input {
      text-align: center;
      height: 98upx;
      background-color: #fff;
      border-radius: 10upx;
      margin: 45upx 49upx 30upx;
    }
    view.price {
      font-size: 18px;
      color: rgba(255, 226, 67, 1);
      line-height: 28upx;
      text-align: center;
      margin-top: 141upx;
      text:first-child {
        font-size: 50px;
        font-weight: bold;
        color: rgba(255, 226, 67, 1);
        line-height: 28upx;
      }
    }
    view.btn {
      background: rgba(253, 210, 66, 1);
      border-radius: 10upx;
      margin: 0 49upx;
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
      line-height: 98upx;
      height: 98upx;
      text-align: center;
    }
    view.btn.active {
      background-color: darken(#fdd242, 10%);
    }
  }
}
</style>

