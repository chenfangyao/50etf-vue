<template>
  <div class="fixWrap self-mask" @touchmove.prevent>
    <div class="subWrap">
      <div class="container">
        <div class="title uni-flex">
          <div>
            <span class="nameTxt">{{resObj.stock_name}}</span>
            <span>{{resObj.stock_code}}</span>
          </div>
          <div>持仓数：{{resObj.own_amount}}</div>
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
            <div :class="{green:parseInt(resObj.profit_money)<0}">{{resObj.profit_money}}</div>
          </div>
        </div>
        <div class="btn3 uni-flex">
          <div @click="go(2)">开仓</div>
          <div class="pingC" @click="go(3)">平仓</div>
          <div @click="go(4)">行情</div>
        </div>
      </div>
      <div class="closeIcom">
        <img src="../../assets/holdingImg/popClose.png" @click="closeMe">
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
          this.$navigateTo({ url: '/full_and_lose',query:{isfull:i,} })
          break
        case 2:
          this.$navigateTo({ url: '/open_close',query:{code,pinkaiC:0}})
          break
        case 3:
          this.$navigateTo({ url: '/open_close'  ,query:{code,pinkaiC:1,isActive:0}})
          break
        case 4:
          this.$redirectTo({ url: '/quotes' })
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
    padding: 0 0.35rem 0.5rem;
    div.title {
      height: 0.8rem;
      font-size: 13px;
      color: rgba(102, 102, 102, 1);
      justify-content: space-between;
      border-bottom: solid 1px #f2f2f2;
      > div {
        line-height: 0.8rem;
      }
      span.nameTxt {
        font-size: 15px;
        color: rgba(51, 51, 51, 1);
        line-height: 0.8rem;
        margin-right: 0.16rem;
      }
    }
    div.infoView {
      font-size: 12px;
      color: rgba(136, 136, 136, 1);
      line-height: 12px;
      margin: 0.35rem 0 0.5rem;
      justify-content: space-between;
      div.leftPart {
        flex-grow: 1;
        justify-content: space-between;
        div.left1 {
          margin-right: 0.4rem;
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
          line-height: 1rem;
          font-weight: bold;
          color: rgba(240, 95, 92, 1);
        }
        text-align: right;
      }
    }
    div.btn2 {
      justify-content: space-between;
      > div {
        width: 3.2rem;
        height: 1.5rem;
        background: rgba(236, 96, 94, 1);
        border-radius: 0.1rem;
        justify-content: space-between;
        padding: 0.3rem;
        div.uni-column {
          justify-content: space-between;
        }
        span:first-child {
          font-size: 0.4rem;
          font-weight: bold;
          line-height: 0.4rem;
        }
        span {
          color: rgba(255, 255, 255, 1);
          font-size: 0.3rem;
          line-height: 0.3rem;
        }
      }
      div.lose {
        background-color: #3aba8f;
      }
      img {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
    div.btn3 {
      justify-content: space-between;
      margin: 0.5rem 0 0.2rem;
      > div {
        height: 0.72rem;
        width: 2rem;
        border: 1px solid rgba(64, 157, 229, 1);
        border-radius: 0.04rem;
        font-size: 13px;
        color: rgba(64, 157, 229, 1);
        line-height: 0.68rem;
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
    margin: 0.26rem auto 0;
    img {
      width: 0.72rem;
      height: 0.72rem;
    }
  }
  .green {
    color: #3aba8f !important;
  }
}
</style>
