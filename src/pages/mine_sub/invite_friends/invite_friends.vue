<template>
  <div class="wrap">
    <base-header title="邀请好友" has-back='1'></base-header>

    <img class="bg" v-if='atNight' src="../../../assets/mineImg/bg-black.png">
    <img class="bg" v-else src="../../../assets/mineImg/inviteFriendBg.png">
    <div class="aboveZindx">

      <div class="QRcode aboveZindex">

        <qrcode-vue :logoSrc="imageUrl" :text="imageUrl" :margin='0' :logoScale='200' :size='158'></qrcode-vue>
      </div>

      <div class="txt textc1">{{baseurl}}</div>

      <div class="btn">
        <btn-block txt='复制' @v-tap='copy'></btn-block>
      </div>
    </div>
  </div>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
import QrcodeVue from 'vue-qr'
import { mapState } from 'vuex';
import imageUrl from '@/assets/mineImg/logo.png'
export default {
  data() {
    return {
       codeValue:'http://50etfvue.com:1688/h5#/pages/registers/registers',
      //  imageUrl:'http://img.zcool.cn/community/01f9ea56e282836ac72531cbe0233b.jpg@2o.jpg',//默认二维码中间图片
       // imageUrl:require('../../../static/loginResgImg/logo.png'),//默认二维码中间图片
       imageUrl,//默认二维码中间图片
    };
  },
  computed: {
    ...mapState(['userinfo','atNight']),
    baseurl() {
      return this.codeValue + '/' + this.userinfo.user_id
    }
  },
  components: { btnBlock, QrcodeVue},
  methods: {
    copy() {
      var str = this.baseurl;
      //#ifdef H5
      var oInput = document.createElement('input');
      oInput.value = str;
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand('copy');
      document.body.removeChild(oInput);
      this.$toast.success({
        message:'复制成功'
      })
      //#endif
    },


  },
}
</script>


<style lang="scss" scoped>
div.wrap {
  position: relative;
  div.aboveZindex{
    position: relative;
    z-index: 2;
  }
  img.bg {
    height:6.34rem;
    left: 0;
    width: 100%;
    position: absolute;
    // z-index: -5;
  }
  div.QRcode {
    width: 158px;
    height: 158px;
    //     background-color: #fff;
    margin:3.46rem auto .40rem;
    //     img {
    //       width:3.17rem;
    //       height:3.17rem;
    //       padding:.21rem;
    //     }
  }
  div.txt {
    font-size: 15px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 15px;
    text-align: center;
    word-wrap: break-word;
    width: 80%;
    margin-left: 10%;
  }
  div.btn {
    padding: 0 .53rem;
    margin-top:.57rem;
  }
}
</style>
