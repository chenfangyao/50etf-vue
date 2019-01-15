<template>
  <view class="fixWrap self-mask" @touchmove.prevent>
    <view class="subWrap">
      <view class="topTip uni-flex">
        <view>自动延期</view>
        <view @tap='openPop2' class="iconWrap">
          <!-- <uni-icon type="checkmarkempty" size="20" v-if='resObj.auto_delay==1' color='#409DE5'></uni-icon> -->
          <image src='/static/holdingImg/dagou.png' v-if="showDagou"></image>
          <image src='/static/holdingImg/meigou.png' v-else></image>
        </view>
      </view>
      <view class="container">
        <view class="title uni-flex">
          <view>
            <text class="nameTxt">{{resObj.stock_name}}</text>
            <text>{{resObj.stock_code}}</text>
          </view>
          <view>{{timeDeal}}</view>
        </view>
        <view class="infoView uni-flex">
          <view class="leftPart uni-flex">
            <view class="uni-flex left1">
              <view class="uni-flex uni-column">
                <text>成交价：</text>
                <text>延期费：</text>
              </view>
              <view class="uni-flex uni-column">
                <text>{{resObj.avg_buy_price}}</text>
                <text>{{resObj.add_fee_money}}</text>
              </view>
            </view>
            <view class="uni-flex">
              <view class="uni-flex uni-column">
                <text>市值：</text>
                <text>持仓：</text>
              </view>
              <view class="uni-flex uni-column">
                <text>{{resObj.market_value}}</text>
                <text>{{resObj.own_amount}}</text>
              </view>
            </view>
          </view>
          <view class="rightPart">
            <view :class="{green:resObj.profit_money<0}">{{resObj.profit_money}}</view>
            <!-- <view>
              <text>延期：</text>
              <text>{{resObj.add_fee_money}}元</text>
            </view> -->
          </view>
        </view>
        <view class="btn2 uni-flex" >
          <view class="uni-flex full " hover-class='self-hover'>
            <view class="uni-flex uni-column">
              <text>止盈</text>
              <text>未接</text>
            </view>
            <view>
              <image src='/static/holdingImg/setIcon.png'></image>
            </view>
          </view>
          <view class="uni-flex lose" hover-class='self-hover'>
            <view class="uni-flex uni-column">
              <text>止损</text>
              <text>未接</text>
            </view>
            <view>
              <image src='/static/holdingImg/setIcon.png'></image>
            </view>
          </view>
        </view>
        <view class="btn3 uni-flex">
          <view @tap='go(2)'>开仓</view>
          <view class="pingC" @tap='go(3)'>平仓</view>
          <view @tap='go(4)'>行情</view>
        </view>
        <btn-block txt='一键平仓' @v-tap='openPop'></btn-block>
      </view>
      <view class="closeIcom">
        <image src='/static/holdingImg/popClose.png' @tap='closeMe'></image>
      </view>
    </view>
    
    <one-key v-if="showPop"  @yes-tap='oneKeyHandle(1)' @close-pop='oneKeyHandle'  :res-obj='resObj'> </one-key>
    <extension-pop v-if="showPop2" @yes-tap='yesHandle(1)' @cancle-tap='yesHandle(0)'></extension-pop>
  </view>
</template>
<script>
import btnBlock from '@/components/btnBlock.vue'
import oneKey from '@/components/holdingSub/oneKeyPop.vue'
import extensionPop from '@/components/holdingSub/extensionPop.vue'
export default {
  data() {
    return {
      showPop: false,
      showPop2: false,
      timeDeal: '',
      showDagou: false,
      oneKeyObj: {}
    }
  },
  props: {
    resObj: {
    },
  },
  components: { btnBlock, oneKey, extensionPop },
  methods: {
    closeMe() {
      this.$emit('close-me')
    },
    go(i) {
      this.$emit('close-me')
      let code = this.resObj.stock_code
      switch (i) {
        case 0:
        case 1:
          uni.navigateTo({ url: '/pages/holding_sub/full_and_lose/full_and_lose?isfull=' + i })
          break
        case 2:
          uni.navigateTo({ url: '/pages/quotes_sub/open_close/open_close?pinkaiC=0&code=' + code })
          break
        case 3:
          uni.navigateTo({ url: '/pages/quotes_sub/open_close/open_close?pinkaiC=1&code=' + code })
          break
        case 4:
          uni.switchTab({ url: '/pages/tabBar/quotes/quotes' })
          break

      }
    },
    oneKeyHandle(i) {
      this.showPop = false
    },
    openPop() {
      this.showPop = true
    },
    openPop2() {
      if (this.showDagou) {
        this.showPop2 = true
      } else {
        this.showDagou = true
        this.resObj.auto_delay = 1
      }
    },
    yesHandle(i) {
      this.showPop2 = false
      if (i == 1) {
        this.showDagou = !this.showDagou
        this.resObj.auto_delay = this.showDagou ? 1 : 0
      }
      //还没发请求，auto_delay还没改
    },

  },
  mounted() {
    this.showDagou = this.resObj.auto_delay == 1
    this.resObj.in_time && (this.timeDeal = this.$formatetimestr(this.resObj.in_time))
  }
}
</script>
<style lang="scss" scoped>
view.fixWrap {
  view.container {
    background-color: #fff;
    padding: 0 35upx 50upx;
    view.title {
      height: 80upx;
      font-size: 13px;
      color: rgba(102, 102, 102, 1);
      justify-content: space-between;
      border-bottom: solid 1px #f2f2f2;
      > view {
        line-height: 80upx;
      }
      text.nameTxt {
        font-size: 15px;
        color: rgba(51, 51, 51, 1);
        line-height: 80upx;
        margin-right: 16upx;
      }
    }
    view.infoView {
      font-size: 12px;
      color: rgba(136, 136, 136, 1);
      line-height: 12px;
      margin: 35upx 0 50upx;
      justify-content: space-between;
      view.leftPart {
        flex-grow: 1;
        justify-content: space-between;
        view.left1 {
          margin-right: 40upx;
        }
        view.uni-column {
          justify-content: space-between;
        }
        view.uni-column:last-child {
          color: #333;
        }
      }
      view.rightPart {
        flex-grow: 1;
        > view:first-child {
          font-size: 42upx;
          line-height: 44upx;
          font-weight: bold;
          color: rgba(240, 95, 92, 1);
        }
        text-align: right;
        text:first-child {
          color: rgba(136, 136, 136, 1);
        }
        text {
          font-size: 12px;
          color: #333;
          line-height: 12px;
        }
      }
    }
    view.btn2 {
      justify-content: space-between;
      > view {
        width: 320upx;
        height: 150upx;
        background: rgba(236, 96, 94, 1);
        border-radius: 10upx;
        justify-content: space-between;
        padding: 30upx;
        view.uni-column {
          justify-content: space-between;
        }
        text:first-child {
          font-size: 40upx;
          font-weight: bold;
          line-height: 40upx;
        }
        text {
          color: rgba(255, 255, 255, 1);
          font-size: 30upx;
          line-height: 30upx;
        }
      }
      view.lose {
        background-color: #3aba8f;
      }
      image {
        width: 30upx;
        height: 30upx;
      }
    }
    view.btn3 {
      justify-content: space-between;
      margin: 50upx 0 20upx;
      > view {
        height: 72upx;
        width: 200upx;
        border: 1px solid rgba(64, 157, 229, 1);
        border-radius: 4upx;
        font-size: 13px;
        color: rgba(64, 157, 229, 1);
        line-height: 68upx;
        text-align: center;
      }
      view.pingC {
        border-color: #e6aa12;
        color: #e6aa12;
      }
    }
    view.bigBtn {
      margin: 0 !important;
    }
  }
  view.closeIcom {
    text-align: center;
    margin: 26upx auto 0;
    image {
      width: 72upx;
      height: 72upx;
    }
  }
  view.topTip {
    background-color: #000;
    height: 80upx;
    padding: 0 35upx;
    margin-top: 33%;

    justify-content: space-between;
    align-items: center;
    > view {
      font-size: 11px;
      line-height: 80upx;
      color: rgba(255, 255, 255, 1);
    }
    view.iconWrap {
      height: 40upx;
      width: 40upx;
      line-height: 0;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .green {
    color: #3aba8f !important;
  }
  view.topTip.hebinHide {
    margin-top: calc(33% + 166upx); //经典
  }
}
</style>
