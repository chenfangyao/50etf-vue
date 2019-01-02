<template>
  <view class="wrap">
    <base-header title="邀请好友" has-back='1'></base-header>

    <image class="bg" src='/static/mineImg/inviteFriendBg.png'></image>
    <view class="QRcode">
			<qrcode-vue :logoSrc="imageUrl" :text="codeValue" margin='0' logoScale='200' size='158'></qrcode-vue>
    </view>
		

    <view class="txt">http://wxv.zjkj888.cn/m/register/100</view>

    <view class="btn">
      <btn-block txt='复制' @v-tap='copy'></btn-block>
    </view>
  </view>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
import QrcodeVue from 'vue-qr'

export default {
  data() {
    return {
       codeValue:'http://172.26.63.71:8083/h5/#/pages/register/register',
       // imageUrl:'http://img.zcool.cn/community/01f9ea56e282836ac72531cbe0233b.jpg@2o.jpg',//默认二维码中间图片
       // imageUrl:require('../../../static/loginResgImg/logo.png'),//默认二维码中间图片
       imageUrl:'static/loginResgImg/logo.png',//默认二维码中间图片
    };
  },
  components: { 
	 btnBlock,
	 QrcodeVue
	 },
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
    width: 158px;
    height: 158px;
//     background-color: #fff;
    margin: 346upx auto 40upx;
//     image {
//       width: 317upx;
//       height: 317upx;
//       padding: 21upx;
//     }
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
