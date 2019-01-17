<template>
  <view>
    <base-header title="开户状态" has-back='1'></base-header>
    <view class="border1">
		<view class='textview'><text>{{text1}}</text></view>
		<view class='textview'><text>{{text2}}</text></view>
		<view class='textview'><text>{{text3}}</text></view>	
	</view>
    <view class="title">
		 <view class="fixView">
		      <btn-block :txt='btntext' @v-tap='doWhat'></btn-block>
		    </view>
	</view>
  </view>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
export default {
  data() {
    return {
      text1: '您的实名认证申请已通过审核',
      text2: '无需重复提交，如有疑问请联系客服热线：',
      text3: '400-100-8959',
      btntext: '返回主页',
      type: ''
    };
  },
  components: { btnBlock },
  methods: {
    doWhat() {
      let url
      switch (this.type) {
        case '1':
          url = '/pages/tabBar/mine/mine'
          break
        case '2':
          url = '/pages/tabBar/mine/mine'
          break
        case '3':
          url = '/pages/mine_sub/credentials_upload/tep1/tep1'
          break
      }
      if (this.type == 3) { uni.navigateTo({ url }) } else { uni.switchTab({ url }) }
    },
  },
  onLoad(opt) {
    this.type = opt.type
    if (opt.type == 1) {
      this.text1 = '您的实名认证申请已通过审核'
      this.text2 = '无需重复提交，如有疑问请联系客服热线：'
    }
    else if (opt.type == 2) {
      this.text1 = '您的实名认证申请已提交请耐心等待'
      this.text2 = '无需重复提交，如有疑问请联系客服热线：'
    }
    else if (opt.type == 3) {
      this.text1 = '您的实名认证申请审核失败'
      this.text2 = '申请失败，如有疑问请联系客服热线：'
      this.btntext = '重新申请'
    }
  }
}
</script>

<style lang="scss" scoped>
view.border1 {
  border-bottom: 1px solid #ededed;
  height: 280upx;
  padding-top: 0.1px;
  background-color: rgb(245, 245, 245);
  view.textview {
    text-align: center;
    margin-top: 30upx;
  }
  view:nth-child(1) {
    color: red;
    font-size: 18px;
  }
}
view.title {
  font-size: 16px;
  padding: 0 43upx;
  color: rgba(24, 28, 40, 1);
  margin: 50upx 0 34upx;
  line-height: 16px;
}
view.content {
  font-size: 15px;
  color: rgba(112, 118, 128, 1);
  line-height: 58upx;
  padding: 0 43upx;
}
</style>

