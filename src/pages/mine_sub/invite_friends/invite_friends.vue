<template>
  <div class="wrap">
    <base-header title="邀请好友" has-back='1'></base-header>
    <s-icon  icon-class="yaoqing_bg2" class='bg'></s-icon>
    <div>
      <div class="QRcode aboveZindex">
        <qrcode-vue :logoSrc="imageUrl" :text="realAddress" :margin='0' :logoScale='200' :size='158'></qrcode-vue>
      </div>
      <div class="btn" v-if="onApp">
        <btn-block txt='分享' @v-tap='shareSystem'></btn-block>
      </div>
      <div class="txt textc1" v-else>邀请链接：{{realAddress}}</div>
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
      link: process.env.API_HOST+'/reg/index.html',
      //  imageUrl:'http://pic168.nipic.com/file/20180607/2546657_191526185031_2.jpg',//默认二维码中间图片
      // imageUrl:'http://www.pptok.com/wp-content/uploads/2012/08/xunguang-4.jpg',//默认二维码中间图片
      imageUrl,//默认二维码中间图片
      shares :{},
      onApp:false,
    };
  },
  computed: {
    ...mapState(['userinfo', 'atNight','switchObj']),
     realAddress() {
      return this.link + '?rel_user=' + this.userinfo.user_id
    }
  },
  components: { btnBlock, QrcodeVue },
  methods: {
    shareSystem() {
      var msg = { 
        content: this.userinfo.user_name+'邀请您：', 
        href: this.realAddress,
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
  
  created() {
   this.onApp= process.env.NODE_ENV === 'production'
  }
}
</script>

<style lang="scss" scoped>
div.wrap {
  position: relative;
  min-height: 100vh;
  div.aboveZindex {
    position: relative;
    z-index: 2;
  }
  .bg {
    height: 6.34rem;
    width: 100vw;
    top: 0;
    position: absolute;
    // z-index: -5;
  }
  div.QRcode {
    width: 158px;
    height: 158px;
    //     background-color: #fff;
    margin: 3.46rem auto 0.4rem;
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
