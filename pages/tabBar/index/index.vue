<template>
  <view :class="isWhite?'white':'black'">
    <base-header title="首页"></base-header>
    <view class="banner">
      <image src="/static/indexTabImg/banner.png" />
    </view>
    <four-tips></four-tips>
    <three-securities></three-securities>
    <view class="uni-flex newsViewTitle">
      <text>资讯</text>
      <text>更多></text>
    </view>
    <news-view></news-view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import newsView from '@/components/indexSub/newsView.vue'
import threeSecurities from '@/components/indexSub/securities3.vue'
import fourTips from '@/components/indexSub/tips4.vue'

export default {
  data() {
    return {
    }
  },
  components: { newsView, threeSecurities, fourTips },
  computed: mapState(['isWhite']),
  methods: {
  },
  created() {
    var options = {
      url: '/stockStat/getCommonSelectStock',//请求接口
      data:{},//发送给服务端的数据
      methods:'POST',//请求方法全部大写，默认GET
    }
    // this.$httpReq(options).then((res)=>{
    //   请求成功的回调
    //   res为服务端返回数据的根对象
    // }).catch((err)=>{
    //   请求失败的回调
    // })
  }
}
</script>
<style lang="scss">
page {
  background-color: #f5f5f5;
  padding: 0 20upx;
}
view.newsViewTitle {
  justify-content: space-between;
  font-size: 26upx;
  font-family: MicrosoftYaHei;
  color: rgba(24, 28, 40, 1);
  margin: 32upx 0 24upx;
  text:last-child {
    color: #a8a8a8;
  }
}
view.banner {
  height: 260upx;
  border-radius: 20upx;
  margin: 12upx 0;
  image {
    width: 100%;
    height: 100%;
  }
}
</style>


