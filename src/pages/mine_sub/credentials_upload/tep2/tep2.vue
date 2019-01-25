<template>
	<div class="wrap">
    <base-header title="证件上传" has-back='1'></base-header>
    <div class="subwrap">
      <div class="line1">证件上传</div>
      <div class="line2">证件类型：中国大陆剧名身份证</div>
      <!-- 正面 -->
      <div class="uploader_img" v-if="imgUrl[0]">
        <img  :src="imgUrl[0]" :data-src="imgUrl[0]" @click="previewImage">
      </div>
      <div class='cardPhoto' v-else @click='chooseImage(0)'>
        <div class="iconView"  hover-class='self-hover'>+</div>
        <div>点击上传身份证正面</div>
      </div>

      <!-- 反面 -->
      <div class="uploader_img imgView2" v-if="imgUrl[1]">
        <img  :src="imgUrl[1]" :data-src="imgUrl[1]" @click="previewImage">
      </div>
      <div class='cardPhoto mt20' v-else @click='chooseImage(1)'> 
        <div class="iconView" hover-class='self-hover'>+</div>
        <div>点击上传身份证反面</div>
      </div>

    </div>
    
    <btn-block txt='下一步' @v-tap='goNext'></btn-block>
    <div class="h20 "></div>
	</div>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'

export default {
  data() {
    return {
      imgUrl: [],
      uName: '',
      IDcard: '',
      f0: '',
      f1: '',
      f2: '',
      mobile:'',
    };
  },
  components: { btnBlock },
  methods: {
    goNext() {
      var options = {
        url: '/Sapi/User/realn',
        data: {
          real_name: this.uName,
          idtp: '00',
          idno: this.IDcard,
          photo: {
            f0: this.f0,
            f1: this.f1,
            f2: ""
          },
            mobile:this.mobile,

        },
        method: 'POST',
      }
      this.$httpReq(options).then((res) => {
        if (res.status == 1) {
          this.$navigateTo({ url: '../tep3/tep3' })
        } else {
          uni.showToast({
          	title: res.info?res.info:'实名认证失败',
          	mask: false,
          	duration: 2500
          });
        }
      }).catch((err) => {
        console.error(err,'捕捉')
      })
    },
    chooseImage(i) {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          this.$set(this.imgUrl, i, res.tempFilePaths[0])
          //#ifdef H5
          this.convertImgToBase64(this.imgUrl[i], (base64img) => {
            if (i == 0) {
              this.f0 = base64img
            } else if (i == 1) {
              this.f1 = base64img
            }
          })
          //#endif     
          //#ifdef APP-PLUS
          this.tobase64_app(res.tempFilePaths[0], i)
          //#endif     
        }
      })

    },
    previewImage(e) {
      var current = e.target.dataset.src
      uni.previewImage({
        current: current,
        urls: this.imgUrl
      })
    },
    //#ifdef APP-PLUS

    tobase64_app(path, i) {
      var img = new plus.nativeObj.Bitmap('ff', path);
      var base64str = img.toBase64Data()
      if (i == 0) {
        this.f0 = base64str
      } else if (i == 1) {
        this.f1 = base64str
      }
      img.clear()
    },
    //#endif
    //#ifdef H5
    convertImgToBase64(url, callback, outputFormat) {
      var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        img = new Image;
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback.call(this, dataURL);
        canvas = null;
      };
      img.src = url;
    }
    //#endif
  },
  onLoad(opt) {
    this.uName = opt.username
    this.IDcard = opt.IDcard
      this.mobile=opt.telnum
  }
}
</script>


<style lang="scss" scoped>
div.wrap {
  background-color: #f5f5f5;
  min-height: 100vh;
  div.subwrap {
    padding: 0.35rem;
  }
  div.line1 {
    font-size: 20px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin:.49rem 0.27rem;
  }
  div.line2 {
    font-size: 12px;
    color: rgba(102, 102, 102, 1);
    margin-bottom:.35rem;
  }
  div.cardPhoto {
    height:4.20rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px.02rem.06rem 0px rgba(102, 102, 102, 0.2);
    border-radius:.08rem;
    padding-top: 0.1px;
    text-align: center;
    > div:first-child {
      width:1.00rem;
      height:1.00rem;
      margin:1.30rem auto.30rem;
      border: dashed 1px #00aaee;
      color: #00aaee;
      font-weight: bold;
      font-size: 28px;
      line-height:.85rem;
    }
    > div:nth-child(2) {
      font-size: 13px;
      color: rgba(102, 102, 102, 1);
    }
  }
  div.mt20 {
    margin:.20rem 0.53rem;
  }
  div.h20 {
    height:.20rem;
  }
  div.uploader_img {
    height:4.20rem;
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
    }
  }
  div.imgView2 {
    margin:1.30rem auto.30rem;
  }
}
</style>
