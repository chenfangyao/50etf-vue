<template>
  <view class="title">
    <view class="msg">
      <text>消息</text>
      <uni-badge text="2" type="danger"></uni-badge>
    </view>
    <text class="set" @tap='go'>设置</text>
  </view>
</template>
<script>
import uniBadge from "@/components/uni-badge.vue"
export default {
  components: { uniBadge },
  methods:{
    go(){
      uni.navigateTo({url:'/pages/mine_sub/setting/setting'})
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  padding: 0 26upx;
  .msg {
    position: relative;
    margin-right: 44upx;
  }
  display: flex;
  justify-content: space-between;
  text {
    color: #fff;
    font-size: 28upx;
    font-family: MicrosoftYaHei;
    font-weight: 400;
  }
  text.set {
    padding-top: 12upx;
  }
  .uni-badge {
    position: absolute;
    right: -32upx;
    top: 0;
    padding: 4upx 8upx;
    font-size: 22upx;
  }
}
</style>
