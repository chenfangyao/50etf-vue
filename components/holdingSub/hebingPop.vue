<template>
  <view class="fixWrap self-mask" @touchmove.prevent>
    <view class="subWrap">
      <view class="container">
        <view class="title uni-flex">
          <view>
            <text class="nameTxt">{{resObj.stock_name}}</text>
            <text>{{resObj.stock_code}}</text>
          </view>
          <view>{{resObj.own_amount}}</view>
        </view>
        <view class="infoView uni-flex">
          <view class="leftPart uni-flex">
            <view class="uni-flex left1">
              <view class="uni-flex uni-column">
                <text>成交价：</text>
                <text>市值：</text>
              </view>
              <view class="uni-flex uni-column">
                <text>{{resObj.avg_buy_price}}</text>
                <text>{{resObj.market_value}}</text>
              </view>
            </view>
          </view>
          <view class="rightPart">
            <view :class="{green:resObj.profit_money<0}">{{resObj.profit_money}}</view>
          </view>
        </view>
        <view class="btn3 uni-flex">
          <view @tap='go(2)'>开仓</view>
          <view class="pingC" @tap='go(3)'>平仓</view>
          <view @tap='go(4)'>行情</view>
        </view>
      </view>
      <view class="closeIcom">
        <image src='/static/holdingImg/popClose.png' @tap='closeMe'></image>
      </view>
    </view>
    
  </view>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props: {
    resObj: {
      default() { return {} }
    },
  },
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
  },
}
</script>
<style lang="scss" scoped>
view.fixWrap {
  display: flex;
  align-items: center;
  view.subWrap {
    flex-grow: 1;
  }
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
          font-size: 21px;
          line-height: 100upx;
          font-weight: bold;
          color: rgba(240, 95, 92, 1);
        }
        text-align: right;
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
  .green {
    color: #3aba8f !important;
  }
}
</style>
