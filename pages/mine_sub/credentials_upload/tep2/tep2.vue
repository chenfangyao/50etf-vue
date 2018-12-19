<template>
	<view class="wrap">
    <base-header title="证件上传" has-back='1'></base-header>
    <view class="subwrap">
      <view class="line1">证件上传</view>
      <view class="line2">证件类型：中国大陆剧名身份证</view>
      <!-- 正面 -->
      <view class="uploader_img" v-if="imgUrl[0]">
        <image  :src="imgUrl[0]" :data-src="imgUrl[0]" @tap="previewImage"></image>
      </view>
      <view class='cardPhoto' v-else @tap='chooseImage(0)'>
        <view class="iconView"  hover-class='self-hover'>+</view>
        <view>点击上传身份证正面</view>
      </view>

      <!-- 反面 -->
      <view class="uploader_img imgView2" v-if="imgUrl[1]">
        <image  :src="imgUrl[1]" :data-src="imgUrl[1]" @tap="previewImage"></image>
      </view>
      <view class='cardPhoto mt20' v-else @tap='chooseImage(1)'> 
        <view class="iconView" hover-class='self-hover'>+</view>
        <view>点击上传身份证反面</view>
      </view>

    </view>
    
    <btn-block txt='下一步' @v-tap='goNext'></btn-block>
    <view class="h20 "></view>
	</view>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'

export default {
  data() {
    return {
      imgUrl: [],
    };
  },
  components: { btnBlock },
  methods: {
    goNext() {
      uni.navigateTo({ url: '../tep3/tep3' })
    },
    upload() {
      uni.uploadFile({
        url: 'https://www.example.com/xxx', //仅为示例，非真实的接口地址
        files:[
          {
            name:'',//后端定义的
            uri:this.imgUrl[0]
          },
          {
            name:'',//后端定义的
            uri:this.imgUrl[1]
          },
        ],
        success: (res) => {
          console.log(res.data);
          this.goNext()
        }
      });
    },
    chooseImage(i) {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          this.$set(this.imgUrl, i, res.tempFilePaths[0])
          console.log(res);
          console.log(this.imgUrl[i]);
        }
      })
    },
    previewImage(e) {
      var current = e.target.dataset.src
      uni.previewImage({
        current: current,
        urls: this.imgUrl
      })
    }
  }
}
</script>


<style lang="scss" scoped>
view.wrap {
  background-color: #f5f5f5;
  min-height: 100vh;
  view.subwrap {
    padding: 0 35upx;
  }
  view.line1 {
    font-size: 20px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin: 49upx 0 27upx;
  }
  view.line2 {
    font-size: 12px;
    color: rgba(102, 102, 102, 1);
    margin-bottom: 35upx;
  }
  view.cardPhoto {
    height: 420upx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2upx 6upx 0px rgba(102, 102, 102, 0.2);
    border-radius: 8upx;
    padding-top: 0.1px;
    text-align: center;
    > view:first-child {
      width: 100upx;
      height: 100upx;
      margin: 130upx auto 30upx;
      border: dashed 1px #00aaee;
      color: #00aaee;
      font-weight: bold;
      font-size: 28px;
      line-height: 85upx;
    }
    > view:nth-child(2) {
      font-size: 13px;
      color: rgba(102, 102, 102, 1);
    }
  }
  view.mt20 {
    margin: 20upx 0 53upx;
  }
  view.h20 {
    height: 20upx;
  }
  view.uploader_img {
    height: 420upx;
    background-color: #fff;
    image {
      width: 100%;
      height: 100%;
    }
  }
  view.imgView2 {
    margin: 130upx auto 30upx;
  }
}
</style>
