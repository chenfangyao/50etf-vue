<template>
  <div class="fixWrap self-mask" @touchmove.prevent>
    <div class="subWrap black2">
      <div class="topTip uni-flex black2">
        <div>自动延期</div>
        <div @click="openPop2" class="iconWrap">
          <!-- <uni-icon type="checkmarkempty" size="20" v-if='resObj.auto_delay==1' color='#409DE5'></uni-icon> -->
          <img src="../../assets/holdingImg/dagou.png" v-if="resObj.auto_delay == 1">
          <img src="../../assets/holdingImg/meigou.png" v-else>
        </div>
      </div>
      <div class="container black2">
        <div class="title uni-flex">
          <div>
            <span class="nameTxt textc1">{{resObj.stock_name}}</span>
            <span class="textc2">{{resObj.stock_code}}</span>
          </div>
          <div class="textc2">{{timeDeal}}</div>
        </div>
        <div class="infoView uni-flex">
          <div class="leftPart uni-flex">
            <div class="uni-flex left1">
              <div class="uni-flex uni-column textc2">
                <span>成交价：</span>
                <span>延期费：</span>
              </div>
              <div class="uni-flex uni-column textc1">
                <span>{{resObj.avg_buy_price}}</span>
                <span>{{resObj.add_fee_money}}</span>
              </div>
            </div>
            <div class="uni-flex">
              <div class="uni-flex uni-column textc2">
                <span>市值：</span>
                <span>持仓：</span>
              </div>
              <div class="uni-flex uni-column textc1">
                <span>{{resObj.market_value}}</span>
                <span>{{resObj.own_amount}}</span>
              </div>
            </div>
          </div>
          <div class="rightPart">
            <div :class="{green:parseInt(resObj.profit_money)<0}">{{resObj.profit_money}}</div>
            <!-- <div>
              <span>延期：</span>
              <span>{{resObj.add_fee_money}}元</span>
            </div>-->
          </div>
        </div>
        <div class="btn2 uni-flex">
          <div class="uni-flex full" hover-class="self-hover" @click="go(1)">
            <div class="uni-flex uni-column">
              <span>止盈</span>
              <span>未接</span>
            </div>
            <div>
              <img src="../../assets/holdingImg/setIcon.png">
            </div>
          </div>
          <div class="uni-flex lose" hover-class="self-hover" @click="go(0)">
            <div class="uni-flex uni-column">
              <span>止损</span>
              <span>未接</span>
            </div>
            <div>
              <img src="../../assets/holdingImg/setIcon.png">
            </div>
          </div>
        </div>
        <div class="btn3 uni-flex">
          <div @click="go(2)">开仓</div>
          <div class="pingC" @click="go(3)">平仓</div>
          <div @click="go(4)">行情</div>
        </div>
        <btn-block txt="一键平仓" @v-tap="openPop"></btn-block>
      </div>
      <div class="closeIcom">
        <img src="../../assets/holdingImg/popClose.png" @click="closeMe">
      </div>
    </div>

    <one-key v-if="showPop" @close-pop="oneKeyHandle" :res-obj="resObj"></one-key>
    <extension-pop v-if="showPop2" @yes-tap="yesHandle(1)" @cancle-tap="yesHandle(0)"></extension-pop>
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
          this.$navigateTo({ url: '/full_and_lose', query: { isfull: i, } })
          break
        case 2:
          this.$navigateTo({ url: '/open_close', query: { code, pinkaiC: 0 } })
          break
        case 3:
          this.$navigateTo({ url: '/open_close', query: { code, pinkaiC: 1,isActive:1 } })
          break
        case 4:
          this.$redirectTo({ url: '/quotes' })
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
      if (this.resObj.auto_delay==1) {
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
          this.resObj.auto_delay=i
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
    this.resObj.in_time && (this.timeDeal = this.$formatetimestr(this.resObj.in_time))
  }
}
</script>
<style lang="scss" scoped>
div.fixWrap {
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
          font-size: 0.42rem;
          line-height: 0.44rem;
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
  div.topTip {
    background-color: #000;
    height: 0.8rem;
    padding: 0 0.35rem;
    margin-top: 33%;

    justify-content: space-between;
    align-items: center;
    > div {
      font-size: 11px;
      line-height: 0.8rem;
      color: rgba(255, 255, 255, 1);
    }
    div.iconWrap {
      height: 0.4rem;
      width: 0.4rem;
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
