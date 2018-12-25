<template>
  <view class="mask" >
    <view class="wayList" :class="{active:showSheet}">
      <view class="title">
        <view class="iconWrap " @tap='closeMe'>
          <uni-icon type="closeempty"   size="30"></uni-icon>
        </view>
        <text>支付方式</text>
      </view>
      <view class="item uni-flex" v-for="(item,i) in wayLists" @tap='chooseWay(i)' hover-class='self-hover'>
        <image src='/static/mineImg/logo.png'></image>
        <view class="txt">
          <view class="wayName">{{item}}</view>
          <view class="wayTip">提示限额（0-50,000）</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import uniIcon from "@/components/uni-icon.vue"
export default {
  methods: {
    closeMe() {
      this.$emit('close-me')
    },
    chooseWay(i){
      this.$emit('choose-way',i)
    }
  },
  data() {
    return {
      wayLists: ['支付宝', '银行转账'],
      showSheet: false

    }
  },
  mounted() {
    setTimeout(() => {
      this.showSheet = true
    }, 0)
  },
  components: { uniIcon }
}
</script>

<style lang="scss" scoped>
view.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  view.wayList {
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    transition: transform 300ms;
    background-color: #fff;
    left: 0;
    right: 0;
    view.title {
      position: relative;
      height: 98upx;
      text-align: center;
      .iconWrap {
        position: absolute;
        left: 16upx;
        top: 22upx;
      }
      text {
        font-size: 16px;
        color: rgba(24, 28, 40, 1);
        line-height: 98upx;
      }
    }
    view.item {
      height: 140upx;
      background-color: #fff;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      padding-left: 36upx;
      align-items: center;
      view.wayName {
        font-size: 15px;
        color: rgba(24, 28, 40, 1);
      }
      view.wayTip {
        font-size: 12px;
        color: rgba(24, 28, 40, 1);
      }
      image {
        width: 76upx;
        height: 76upx;
        margin-right: 26upx;
      }
    }
  }
  view.wayList.active {
    transform: translateY(0);
  }
}
</style>
