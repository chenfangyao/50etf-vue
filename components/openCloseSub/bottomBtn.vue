<template>
  <view>

    <view class="wrap uni-flex">
      <view class="txt">
        <text class="total">合计</text>
        <text class="totalPrice">￥{{totalmoney||0}}</text>
      </view>
      <view class="buyBtn" :class="{c1:onClose==1}" @tap='showPop' hover-class='tap-hover'>{{onClose?'平仓':'开仓'}}</view>
    </view>
    <view class="h98"></view>
    <order-pop v-if="popShow" :on-close="onClose" @close-pop='closePop'></order-pop>
  </view>
</template>
<script>
import orderPop from './orderPop.vue'
import { mapState } from 'vuex';

export default {
  data() {
    return {
      popShow: false
    }
  },
  props: ['onClose', 'totalmoney'],
  components: { orderPop },
  computed: mapState(['sid']),
  methods: {
    showPop() {
      if (this.sid) {
        this.popShow = true
      } else {
        this.$tipLogin()
      }
    },
    closePop() {
      this.popShow = false
    },
  }

}
</script>
<style lang="scss" scoped>
view.h98 {
  height: 1px;
  margin-top: 98upx;
  background-color: #ededed;
}
view.wrap {
  height: 98upx;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  view.txt {
    width: 500upx;
    background-color: #fff;
    text.total {
      margin-left: 30upx;
      font-size: 12px;
      color: rgba(51, 51, 51, 1);
    }
    text {
      font-size: 16px;
      line-height: 98upx;
    }
    text.totalPrice {
      font-size: 20px;
      font-family: Arial-BoldMT;
      color: rgba(51, 51, 51, 1);
      line-height: 46upx;
    }
  }
  view.buyBtn {
    font-size: 16px;
    flex-grow: 1;
    text-align: center;
    background: rgba(64, 157, 229, 1);
    color: rgba(255, 255, 255, 1);
    line-height: 98upx;
  }
  .buyBtn.tap-hover {
    background: darken(rgb(64, 157, 229), 5%);
  }
  .c1.buyBtn {
    background-color: #e6ab12;
  }
}
</style>
