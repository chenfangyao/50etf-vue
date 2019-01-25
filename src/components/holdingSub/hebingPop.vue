<template>
  <div class="fixWrap self-mask" @touchmove.prevent>
    <div class="subWrap">
      <div class="container">
        <div class="title uni-flex">
          <div>
            <span class="nameTxt">{{resObj.stock_name}}</span>
            <span>{{resObj.stock_code}}</span>
          </div>
          <div>{{resObj.own_amount}}</div>
        </div>
        <div class="infoView uni-flex">
          <div class="leftPart uni-flex">
            <div class="uni-flex left1">
              <div class="uni-flex uni-column">
                <span>成交价：</span>
                <span>市值：</span>
              </div>
              <div class="uni-flex uni-column">
                <span>{{resObj.avg_buy_price}}</span>
                <span>{{resObj.market_value}}</span>
              </div>
            </div>
          </div>
          <div class="rightPart">
            <div :class="{green:resObj.profit_money<0}">{{resObj.profit_money}}</div>
          </div>
        </div>
        <div class="btn3 uni-flex">
          <div @click='go(2)'>开仓</div>
          <div class="pingC" @click='go(3)'>平仓</div>
          <div @click='go(4)'>行情</div>
        </div>
      </div>
      <div class="closeIcom">
        <img src="/assets/holdingImg/popClose.png" @click='closeMe">
      </div>
    </div>
    
  </div>
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
          this.$navigateTo({ url: '/pages/holding_sub/full_and_lose/full_and_lose?isfull=' + i })
          break
        case 2:
          this.$navigateTo({ url: '/pages/quotes_sub/open_close/open_close?pinkaiC=0&code=' + code })
          break
        case 3:
          this.$navigateTo({ url: '/pages/quotes_sub/open_close/open_close?pinkaiC=1&code=' + code })
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
div.fixWrap {
  display: flex;
  align-items: center;
  div.subWrap {
    flex-grow: 1;
  }
  div.container {
    background-color: #fff;
    padding: 0.35rem.50rem;
    div.title {
      height:.80rem;
      font-size: 13px;
      color: rgba(102, 102, 102, 1);
      justify-content: space-between;
      border-bottom: solid 1px #f2f2f2;
      > div {
        line-height:.80rem;
      }
      span.nameTxt {
        font-size: 15px;
        color: rgba(51, 51, 51, 1);
        line-height:.80rem;
        margin-right:.16rem;
      }
    }
    div.infoView {
      font-size: 12px;
      color: rgba(136, 136, 136, 1);
      line-height: 12px;
      margin:.35rem 0.50rem;
      justify-content: space-between;
      div.leftPart {
        flex-grow: 1;
        justify-content: space-between;
        div.left1 {
          margin-right:.40rem;
        }
        div.uni-column {
          justify-content: space-between;
        }
        div.uni-column:last-child {
          color: #333;
        }
      }
      div.rightPart {
        flex-grow: 1;
        > div:first-child {
          font-size: 21px;
          line-height:1.00rem;
          font-weight: bold;
          color: rgba(240, 95, 92, 1);
        }
        text-align: right;
      }
    }
    div.btn2 {
      justify-content: space-between;
      > div {
        width:3.20rem;
        height:1.50rem;
        background: rgba(236, 96, 94, 1);
        border-radius:.10rem;
        justify-content: space-between;
        padding:.30rem;
        div.uni-column {
          justify-content: space-between;
        }
        span:first-child {
          font-size:.40rem;
          font-weight: bold;
          line-height:.40rem;
        }
        span {
          color: rgba(255, 255, 255, 1);
          font-size:.30rem;
          line-height:.30rem;
        }
      }
      div.lose {
        background-color: #3aba8f;
      }
      img {
        width:.30rem;
        height:.30rem;
      }
    }
    div.btn3 {
      justify-content: space-between;
      margin:.50rem 0.20rem;
      > div {
        height:.72rem;
        width:2.00rem;
        border: 1px solid rgba(64, 157, 229, 1);
        border-radius:.04rem;
        font-size: 13px;
        color: rgba(64, 157, 229, 1);
        line-height:.68rem;
        text-align: center;
      }
      div.pingC {
        border-color: #e6aa12;
        color: #e6aa12;
      }
    }
    div.bigBtn {
      margin: 0 !important;
    }
  }
  div.closeIcom {
    text-align: center;
    margin:.26rem auto 0;
    img {
      width:.72rem;
      height:.72rem;
    }
  }
  .green {
    color: #3aba8f !important;
  }
}
</style>
