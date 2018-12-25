<template>
<view>
  <view class="rechargeWay uni-flex" @tap='switchPop'>
      <view class="zhifubao" v-if='wayLists'></view>
      <view class="txt">
        <view>{{wayLists[way_i]}}</view>
        <view>
          <text>{{txt1}}</text>
          <text>{{txt2}}</text>
        </view>
      </view>
      <image  class="to_r" src='/static/arrow/r.png'></image>
  </view>
  <recharge-actionsheet v-if="showAction" @choose-way='chooseWay'  @close-me='switchPop'></recharge-actionsheet>
  
</view>
</template>
<script>
import rechargeActionsheet from '@/components/assetsSub/rechargeActionsheet.vue'

export default {
  components: {   rechargeActionsheet },
  data() {
    return {
      showAction: false,
      way_i: 0
    }
  },
  props:['wayLists','txt1','txt2','goTo'],
  methods: {
    chooseWay(i) {
      this.way_i = i
      this.switchPop()
    },
    switchPop() {
      if(this.goTo){
        uni.navigateTo({url:'/pages/mine_sub/bank_card/card_list/card_list'})
        return
      }
      this.showAction = !this.showAction
    },
  }
}
</script>

<style lang="scss" scoped>
 view.rechargeWay {
    height: 140upx;
    background-color: #fff;
    margin: 12upx 0;
    align-items: center;
    .zhifubao {
      width: 76upx;
      height: 76upx;
      margin-left: 46upx;
      background-color: #409de5;
    }
    view.txt {
      flex-grow: 1;
      margin-left: 35upx;
      view {
        font-size: 15px;
        color: rgba(24, 28, 40, 1);
        line-height: 33upx;
        margin-bottom: 8upx;
      }
      text {
        margin-right: 8upx;
        font-size: 12px;
        color: rgba(168, 168, 168, 1);
        line-height: 28upx;
      }
    }
    image.to_r {
      width: 25upx;
      margin-right: 24upx;
      height: 30upx;
    }
  }
</style>
