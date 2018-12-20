<template>
<view>
	<view class="wrap">
		<base-header has-back='1'></base-header>
    <view class="line1">证件信息已提交</view>
    <view class="line2">信息正在审核</view>
    <view class="line3">审核时间：</view>
    <view class="line3">工作日10:00-18:00：将在30分钟左右完成审核18:00后将在次日审核</view>
	</view>
  <view class="fixBottom">

    <btn-block txt='确定' @v-tap='goNext'></btn-block>
  </view>
</view>

</template>

<script>
import btnBlock from '@/components/btnBlock.vue'

export default {
  components: { btnBlock },
  methods:{
    goNext(){
      uni.switchTab({url:'/pages/tabBar/mine/mine'})
    }
  }
}
</script>

<style lang='scss' scoped>
view.wrap {
  padding-left: 40upx;
  .line1 {
    font-size: 18px;
    color: rgba(51, 51, 51, 1);
    margin: 106upx 0 40upx;
    line-height: 18px;
  }
  .line2 {
    font-size: 30px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
    margin-bottom: 82upx;
  }
  .line3 {
    font-size: 14px;
    color: rgba(136, 136, 136, 1);
    margin-right: 129upx;
  }
}
view.fixBottom{
  position: fixed;
  bottom: 20upx;
  left: 0;
  right: 0;
}
</style>
