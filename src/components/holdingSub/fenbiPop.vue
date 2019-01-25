<template>
  <div class="fixWrap self-mask" @touchmove.prevent>
    <div class="subWrap">
      <div class="topTip uni-flex">
        <div>自动延期</div>
        <div @touchend='openPop2' class="iconWrap">
          <!-- <uni-icon type="checkmarkempty" size="20" v-if='resObj.auto_delay==1' color='#409DE5'></uni-icon> -->
          <img src="/assets/holdingImg/dagou.png" v-if="showDagou == 1">
          <img src="/assets/holdingImg/meigou.png" v-else>
        </div>
      </div>
      <div class="container">
        <div class="title uni-flex">
          <div>
            <span class="nameTxt">{{resObj.stock_name}}</span>
            <span>{{resObj.stock_code}}</span>
          </div>
          <div>{{timeDeal}}</div>
        </div>
        <div class="infoView uni-flex">
          <div class="leftPart uni-flex">
            <div class="uni-flex left1">
              <div class="uni-flex uni-column">
                <span>成交价：</span>
                <span>延期费：</span>
              </div>
              <div class="uni-flex uni-column">
                <span>{{resObj.avg_buy_price}}</span>
                <span>{{resObj.add_fee_money}}</span>
              </div>
            </div>
            <div class="uni-flex">
              <div class="uni-flex uni-column">
                <span>市值：</span>
                <span>持仓：</span>
              </div>
              <div class="uni-flex uni-column">
                <span>{{resObj.market_value}}</span>
                <span>{{resObj.own_amount}}</span>
              </div>
            </div>
          </div>
          <div class="rightPart">
            <div :class="{green:resObj.profit_money<0}">{{resObj.profit_money}}</div>
            <!-- <div>
              <span>延期：</span>
              <span>{{resObj.add_fee_money}}元</span>
            </div> -->
          </div>
        </div>
        <div class="btn2 uni-flex" >
          <div class="uni-flex full " hover-class='self-hover'>
            <div class="uni-flex uni-column">
              <span>止盈</span>
              <span>未接</span>
            </div>
            <div>
              <img src="/assets/holdingImg/setIcon.png">
            </div>
          </div>
          <div class="uni-flex lose" hover-class='self-hover'>
            <div class="uni-flex uni-column">
              <span>止损</span>
              <span>未接</span>
            </div>
            <div>
              <img src="/assets/holdingImg/setIcon.png">
            </div>
          </div>
        </div>
        <div class="btn3 uni-flex">
          <div @touchend='go(2)'>开仓</div>
          <div class="pingC" @touchend='go(3)'>平仓</div>
          <div @touchend='go(4)'>行情</div>
        </div>
        <btn-block txt='一键平仓' @v-tap='openPop'></btn-block>
      </div>
      <div class="closeIcom">
        <img src="/assets/holdingImg/popClose.png" @touchend='closeMe">
      </div>
    </div>
    
    <one-key v-if="showPop"   @close-pop='oneKeyHandle'  :res-obj='resObj'> </one-key>
    <extension-pop v-if="showPop2" @yes-tap='yesHandle(1)' @cancle-tap='yesHandle(0)'></extension-pop>
  </div>
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
    oneKeyHandle(str) {
      this.showPop = false
      str == 'deep' && this.closeMe()
    },
    openPop() {
			
      this.showPop = true
    },
    openPop2() {
      if (this.showDagou) {
        this.showPop2 = true
      } else {
        this.sendAutodelay(1)
      }
    },
    sendAutodelay(i) {
      var options = {
        url: '/Sapi/Stock/autodelay', 
        method: 'POST', 
        data: {
          ischecked: i,
          hid: this.resObj.id
        },
      }
      this.$httpReq(options).then((res) => {
        if (res.info === "ok") {
          this.showDagou = !this.showDagou
        }
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    },
    yesHandle(i) {
      this.showPop2 = false
      i == 1 && this.sendAutodelay(0)

    },

  },
  mounted() {
    this.showDagou = this.resObj.auto_delay == 1
    this.resObj.in_time && (this.timeDeal = this.$formatetimestr(this.resObj.in_time))
  }
}
</script>
<style lang="scss" scoped>
div.fixWrap {
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
          font-size:.42rem;
          line-height:.44rem;
          font-weight: bold;
          color: rgba(240, 95, 92, 1);
        }
        text-align: right;
        span:first-child {
          color: rgba(136, 136, 136, 1);
        }
        span {
          font-size: 12px;
          color: #333;
          line-height: 12px;
        }
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
  div.topTip {
    background-color: #000;
    height:.80rem;
    padding: 0.35rem;
    margin-top: 33%;

    justify-content: space-between;
    align-items: center;
    > div {
      font-size: 11px;
      line-height:.80rem;
      color: rgba(255, 255, 255, 1);
    }
    div.iconWrap {
      height:.40rem;
      width:.40rem;
      line-height: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .green {
    color: #3aba8f !important;
  }
  div.topTip.hebinHide {
    margin-top: calc(33% +1.66rem); //经典
  }
}
</style>
