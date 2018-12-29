<template>
  <view class="wrap">
    <base-header title="邀请好友" has-back='1'></base-header>

    <image class="bg" src='/static/mineImg/inviteFriendBg.png'></image>
    <view class="QRcode">
      <image src='/static/mineImg/QRcode.png'></image>
    </view>
		<!-- <view class="QRcode" id="qrcode" ref="qrcode">	 -->
		<!-- </view> -->
    <view class="txt">http://wxv.zjkj888.cn/m/register/100</view>

    <view class="btn">
      <btn-block txt='复制' @v-tap='copy'></btn-block>
    </view>
  </view>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
// import QRCode from 'qrcodejs2'

export default {
  data() {
    return {

    };
  },
  components: { btnBlock },
  methods: {
    copy() {
      var str = 'http://wxv.zjkj888.cn/m/register/100';
      //#ifdef H5
      var oInput = document.createElement('input');
      oInput.value = str;
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand('copy');
      document.body.removeChild(oInput);
      uni.showToast({
        title: '复制成功',
        duration: 500
      });
      //#endif
      //#ifndef H5
      uni.setClipboardData({
        data: str,
        success () {
          console.log('success');
          uni.showToast({
            title: '复制成功',
            duration: 500
          });
        }
      });
      //#endif
    },
// 		qrcode () {
//     let qrcode = new QRCode('qrcode',{
//         width: 200, // 设置宽度，单位像素
//         height: 200, // 设置高度，单位像素
//         text: 'https://www.baidu.com'   // 设置二维码内容或跳转地址
//     })
// },

  },
	created(){
		// this.qrcode()
	}
}
</script>


<style lang="scss" scoped>
page {
  padding: 0;
}
view.wrap {
  position: relative;
  image.bg {
    height: 634upx;
    left: 0;
    width: 100%;
    position: absolute;
    z-index: -5;
  }
  view.QRcode {
    width: 360upx;
    height: 360upx;
    background-color: #fff;
    margin: 346upx auto 40upx;
    image {
      width: 317upx;
      height: 317upx;
      padding: 21upx;
    }
  }
  view.txt {
    font-size: 15px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 15px;
    text-align: center;
  }
  view.btn {
    padding: 0 53upx;
    margin-top: 57upx;
  }
}
</style>
