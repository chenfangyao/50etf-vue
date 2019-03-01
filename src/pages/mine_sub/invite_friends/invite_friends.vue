<template>
  <div class="wrap">
    <base-header title="邀请好友" has-back='1'></base-header>

    <img class="bg" v-if='atNight' src="../../../assets/mineImg/bg-black.png">
    <img class="bg" v-else src="../../../assets/mineImg/inviteFriendBg.png">
    <div class="aboveZindx">
      <div class="QRcode aboveZindex">
        <qrcode-vue :logoSrc="imageUrl" :text="link" :margin='0' :logoScale='200' :size='158'></qrcode-vue>
      </div>
      <div class="btn" v-if="onApp">
        <btn-block txt='分享' @v-tap='shareSystem'></btn-block>
      </div>
      <div class="txt textc1" v-else>{{baseurl}}</div>
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
      codeValue: 'http://50etfvue.com:1688/h5#/pages/registers/registers',
      link: 'http://50etfvue.cardoctor.com.cn/h5/pages/mine_sub/red_envelope/red_envelope',
      //  imageUrl:'http://pic168.nipic.com/file/20180607/2546657_191526185031_2.jpg',//默认二维码中间图片
      // imageUrl:require('../../../static/loginResgImg/logo.png'),//默认二维码中间图片
      imageUrl,//默认二维码中间图片
      shares :{},
      onApp:false,
    };
  },
  computed: {
    ...mapState(['userinfo', 'atNight','switchObj']),
    baseurl() {
      return this.codeValue + '/' + this.userinfo.user_id
    }
  },
  components: { btnBlock, QrcodeVue },
  methods: {
    shareSystem() {
      var msg = { 
        content: this.userinfo.user_name+'邀请您：', 
        href: 'http://50etfvue.cardoctor.com.cn/h5/pages/mine_sub/red_envelope/red_envelope',
        type:'web',
        title:'from linChengShu',
        thumbs:['../../../assets/mineImg/logo.png']
      }
      plus.share.sendWithSystem(msg, function () {
      }, function (e) {
        console.error('Failed: ' + JSON.stringify(e));
      })
    }

  },
  create() {
   this.onApp= process.env.NODE_ENV !== 'production'
  }
}
</script>


<style lang="scss" scoped>
div.wrap {
  position: relative;
  div.aboveZindex {
    position: relative;
    z-index: 2;
  }
  img.bg {
    height: 6.34rem;
    left: 0;
    width: 100%;
    position: absolute;
    // z-index: -5;
  }
  div.QRcode {
    width: 158px;
    height: 158px;
    //     background-color: #fff;
    margin: 3.46rem auto 0.4rem;
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
    padding: 0 0.53rem;
    margin-top: 0.57rem;
  }
}
</style>
