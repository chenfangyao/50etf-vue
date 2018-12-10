<template>
  <view class="wrap">
    <headerCard></headerCard>
    <view class="items">
      <view class="uni-flex" hover-class="self-hover">
        <image src="/static/mineImg/01.png" />
        <text>资金流水</text>
        <text class="tip" v-if="false"></text>
        <image src="../../../static/mineImg/arrow.png" />
      </view>
      <view class="uni-flex" hover-class="self-hover">
        <image src="/static/mineImg/02.png" />
        <text>银行卡</text>
        <text class="tip" v-if="false"></text>
        <image src="../../../static/mineImg/arrow.png" />

      </view>
      <view class="uni-flex bb6" hover-class="self-hover">
        <image src="/static/mineImg/03.png" />
        <text>交易规则</text>
        <text class="tip" v-if="false"></text>
        <image src="../../../static/mineImg/arrow.png" />
      </view>
      <view class="uni-flex" hover-class="self-hover">
        <image src="/static/mineImg/04.png" />
        <text>我的红包</text>
        <text class="tip" v-if="false"></text>
        <image src="../../../static/mineImg/arrow.png" />
      </view>
      <view class="uni-flex bb6" hover-class="self-hover">
        <image src="/static/mineImg/05.png" />
        <text>邀请好友</text>
        <text class="tip" v-if="false"></text>
        <image src="../../../static/mineImg/arrow.png" />
      </view>
      <view class="uni-flex" hover-class="self-hover">
        <image src="/static/mineImg/06.png" />
        <text>联系客服</text>
        <text class="tip" v-if="false"></text>
        <image src="../../../static/mineImg/arrow.png" />
      </view>
      <view class="uni-flex" hover-class="self-hover">
        <image src="/static/mineImg/07.png" />
        <text>50ETF</text>
        <text class="tip" v-if="false"></text>
        <image src="../../../static/mineImg/arrow.png" />
      </view>
      <view class="uni-flex" hover-class="self-hover">
        <image src="/static/mineImg/08.png" />
        <text>关于我们</text>
        <text class="tip" v-if="true"></text>
        <image src="../../../static/mineImg/arrow.png" />
      </view>
    </view>
  </view>
</template>

<script>
import headerCard from '@/components/mineSub/headerCard.vue'
export default {
  data() {
    return {}
  },
  components: {
    headerCard
  }
}
</script>

<style scoped lang="scss">
view.wrap {
  background-color: #f5f5f5;
  height: calc(100vh - 70upx);
  view.items {
    margin-top: 130upx;
    view {
      justify-content: space-between;
      background-color: #fff;
      font-size: 26upx;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(24, 28, 40, 1);
      margin-bottom: 1px;
      height: 96upx;
      line-height: 96upx;
      padding: 0 26upx 0 42upx;
      text {
        flex-grow: 1;
      }
      text.tip {
        flex-grow: 0;
        width: 16upx;
        height: 16upx;
        border-radius: 50%;
        background-color: #f16164;
        margin: 40upx 20upx 0 0;
      }
      image:first-child {
        width: 48upx;
        height: 48upx;
        margin: 24upx 46upx 0 0;
      }
      image:last-child {
        width: 30upx;
        height: 30upx;
        margin-top: 32upx;
      }
    }
    view.bb6 {
      margin-bottom: 12upx;
    }
  }
}
</style>
