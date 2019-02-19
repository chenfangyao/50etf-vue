<template>
  <div class="wrap">
    <base-header title="证件上传" has-back="1"></base-header>
    <div class="subwrap">
      <div class="line1 textc1">证件上传</div>
      <div class="line2 textc2">证件类型：中国大陆剧名身份证</div>
      <!-- 正面 -->
      <div class="uploader_img" v-if="imgUrl[0]">
        <img :src="imgUrl[0]" :data-src="imgUrl[0]" @click="previewImage">
      </div>
      <div class="cardPhoto" v-else @click="chooseImage(0)">
        <div class="iconView" hover-class="self-hover">+</div>
        <div>点击上传身份证正面</div>
      </div>

      <!-- 反面 -->
      <div class="uploader_img imgView2" v-if="imgUrl[1]">
        <img :src="imgUrl[1]" :data-src="imgUrl[1]" @click="previewImage">
      </div>

      <div class="cardPhoto mt20" v-else @click="chooseImage(1)">
        <div class="iconView" hover-class="self-hover">+</div>
        <div>点击上传身份证反面</div>
      </div>

    </div>

    <btn-block txt="下一步" @v-tap="goNext"></btn-block>
    <div class="h20"></div>
  </div>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
import lrz from 'lrz'
import Qs from 'qs'

export default {
  data() {
    return {
      imgUrl: [],
      uName: '',
      IDcard: '',
      f0: '',
      f1: '',
      f2: '',
      mobile: '',
    };
  },
  components: { btnBlock },
  methods: {
    goNext() {
      this.$store.commit("setloadingFlag", true);
      var ajax = new XMLHttpRequest();
      ajax.onreadystatechange =  ()=> {
        if (ajax.readyState == 4 && ajax.status == 200) {
          var res = JSON.parse(ajax.responseText)
          this.$store.commit("setloadingFlag", false);
          if (res.status == 1) {
            this.$navigateTo({ url: '../tep3/tep3' })
          } else {
            this.$toast(res.info ? res.info : '实名认证失败')
          }
        }
      }
      ajax.open('post', 'http://47.100.226.135:8040/Sapi/User/realn');
      ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      ajax.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      ajax.send(Qs.stringify({
          real_name: this.uName,
          idtp: '00',
          idno: this.IDcard,
          photo: {
            f0: this.f0,
            f1: this.f1,
            f2: ""
          },
          mobile: this.mobile,
        }));
    },
    chooseImage(i) {
      if (process.env.NODE_ENV !== 'production') {
        this.$toast('请使用APP上传图片')
        return
      }
      plus.gallery.pick(path => {
        this.$store.commit("setloadingFlag", true);
         lrz(path).then (rst=> {
           if (i == 0) {
            this.f0 = rst.base64
          } else if (i == 1) {
            this.f1 = rst.base64
          }
          this.$set(this.imgUrl, i, path)
          this.$store.commit("setloadingFlag", false);
        }).catch(function (err) {
          console.error(err)
        })
      }, e => { }, { filename: '_doc/gallery/', system: true });
    },
    previewImage(e) {
      if (process.env.NODE_ENV !== 'production') {
        this.$toast('请下载APP预览大图')
        return      }
      plus.nativeUI.previewImage(this.imgUrl, {
        current: 0,
        loop: false,
        indicator: 'number'
      });
    },
  },
  created() {
    var opt = this.$route.query
    this.uName = opt.username
    this.IDcard = opt.IDcard
    this.mobile = opt.telnum
  }
}
</script>


<style lang="scss" scoped>
div.wrap {
  background-color: #f5f5f5;
  min-height: 100vh;
  div.subwrap {
    padding: 0 0.35rem;
  }
  div.line1 {
    font-size: 20px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin: 0.49rem 0 0.27rem;
  }
  div.line2 {
    font-size: 12px;
    color: rgba(102, 102, 102, 1);
    margin-bottom: 0.35rem;
  }
  div.cardPhoto {
    height: 4.2rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px.02rem.06rem 0px rgba(102, 102, 102, 0.2);
    border-radius: 0.08rem;
    padding-top: 0.1px;
    text-align: center;
    > div:first-child {
      width: 1rem;
      height: 1rem;
      margin: 1.3rem auto 0.3rem;
      border: dashed 1px #00aaee;
      color: #00aaee;
      font-weight: bold;
      font-size: 28px;
      line-height: 0.85rem;
    }
    > div:nth-child(2) {
      font-size: 13px;
      color: rgba(102, 102, 102, 1);
    }
  }
  div.mt20 {
    margin: 0.2rem 0 0.53rem;
  }
  div.h20 {
    height: 0.2rem;
  }
  div.uploader_img {
    height: 4.2rem;
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
    }
  }
  div.imgView2 {
    margin: 1.3rem auto 0.3rem;
  }
}
</style>
