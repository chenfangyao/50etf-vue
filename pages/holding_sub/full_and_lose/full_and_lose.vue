<template>
  <view>
    <base-header has-back='1'></base-header>
    <view class="border1"></view>
    <view class="wrap">

      <view class="title">止{{isFull==1?'盈':'损'}}设置</view>
      <view class="subTitle">开启止{{isFull==1?'盈':'损'}}功能，当日有效！</view>
      <view class="subTitle">参考价</view>
      <view class="price">2,326.06</view>
      <view class="inputContainer">

        <input-item :placeholderTxt="isFull==1?'止盈值':'止损值'" v-model="inputPrice"></input-item>
      </view>
      <submit-btn btnTxt='确定' @v-tap='handleNext' :verify-ok='verifyYes'></submit-btn>

    </view>
  </view>
</template>

<script>
import submitBtn from '@/components/commonResgLog/submitBtn.vue'
import inputItem from '@/components/commonResgLog/inputItem.vue'
export default {
  data() {
    return {
      isFull: '',
      inputPrice: '',
      verifyYes: false,
    };
  },
  watch: {
    inputPrice(val) {
      if (val.trim() !== '') this.verifyYes = true;
    },

  },
  components: { submitBtn, inputItem },
  methods: {
    handleNext() {
      uni.navigateBack({ delta: 1 })
    },
  },
  onLoad(option) {
    this.isFull = option.isfull
  }
}
</script>

<style lang="scss" scoped>
view.border1 {
  border-bottom: 1px solid #ededed;
}
view.wrap {
  padding: 0 23upx;
  view.title {
    font-size: 20px;
    line-height: 20px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin: 49upx 0 35upx;
  }
  view.subTitle {
    font-size: 13px;
    color: rgba(102, 102, 102, 1);
    line-height: 24px;
  }
  view.price {
    font-size: 24px;
    font-weight: bold;
    margin: 33upx 0 174upx 12upx;

    color: rgba(240, 95, 92, 1);
  }
  view.inputContainer{
    padding: 0 12upx;
    margin-bottom: 120upx;
  }
}
</style>
