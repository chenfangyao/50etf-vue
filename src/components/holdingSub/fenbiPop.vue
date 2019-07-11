<template>
  <div class="fixWrap self-mask" @touchmove.prevent v-vtap.self="{method:closeMe}">
    <div class="subWrap ">
      <div class="container black2">
        <div class="title ">
          <span class="nameTxt textc1">{{resObj.stock_name}}</span>
          <span class="textc2">{{resObj.stock_code}}</span>
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
        <div class="btn2 uni-flex" v-if="switchObj.show_sltp>=1">
          <div class="uni-flex full" v-hover-class="'self-hover'" v-if="!(switchObj.show_sltp==3)" v-vtap="{method: go , params: 1}">
            <div class="uni-flex uni-column">
              <span>止盈</span>
              <span>{{resObj.sltp_price_tp?resObj.sltp_price_tp:'添加止盈'}}</span>
            </div>
            <div>
              <img src="../../assets/holdingImg/setIcon.png">
            </div>
          </div>
          <div class="uni-flex lose" v-hover-class="'self-hover'" v-if="!(switchObj.show_sltp==2)" v-vtap="{method: go , params: 0}">
            <div class="uni-flex uni-column">
              <span>止损</span>
              <span>{{resObj.sltp_price_sl?resObj.sltp_price_sl:'添加止损'}}</span>
            </div>
            <div>
              <img src="../../assets/holdingImg/setIcon.png">
            </div>
          </div>
        </div>
        <div class="btn3 uni-flex textc2">
          <div v-vtap="{method: go , params: 2}">
            <span>开仓</span>
            <s-icon :icon-class="'enterright' | atNightIcon" />
          </div>
          <div v-vtap="{method: go , params: 3}">
            <span>平仓</span>
            <s-icon :icon-class="'enterright' | atNightIcon" />
          </div>
          <div v-vtap="{method: go , params: 4}">
            <span>行情</span>
            <s-icon :icon-class="'enterright' | atNightIcon" />
          </div>
        </div>
        <div class="latterTip uni-flex black2">
          <div class="uni-flex" v-vtap="{method:openPop2}">
            <div class="iconWrap">
              <s-icon v-if="resObj.auto_delay == 1" icon-class="selected"></s-icon>
            </div>
            <div class="txt22 textc2">自动延期</div>
          </div>
          <div class="textc2">{{timeDeal}}</div>
        </div>
        <btn-block txt="一键平仓" @v-tap="openPop"></btn-block>
      </div>
      <div class="closeIcom">
        <img src="../../assets/holdingImg/popClose.png" v-vtap="{method:closeMe}">
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
import { mapState } from 'vuex'
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
          if (this.resObj.status == 7) {
            this.$toast('止损中')
            return
          }
        case 1:
          if (this.resObj.status == 6) {
            this.$toast('止盈中')
            return
          }
          this.$navigateTo({
            url: '/full_and_lose',
            query: {
              isfull: i,
              code: this.resObj.stock_code,
              resObj: this.resObj
            }          })
          break
        case 2:
          this.$navigateTo({ url: '/open_close', query: { code, pinkaiC: 0 } })
          break
        case 3:
          this.$navigateTo({ url: '/open_close', query: { code, pinkaiC: 1, isActive: 1 } })
          break
        case 4:
          // this.$redirectTo({ url: '/quotes' })
          this.$redirectTo({            url: '/qi_quan_xiang_qing', query: {
              code: this.resObj.stock_code
            }          })
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
      if (this.resObj.auto_delay == 1) {
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
          this.resObj.auto_delay = i
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
  },
  computed: mapState(['switchObj'])
}
</script>
<style lang="scss" scoped>
#app.at-night{
  .title{
    border-color: $black1;
  }
}
div.fixWrap {
  .subWrap{
    margin: 0 0.22rem;
  }
  div.container {
    border-radius: 5px;
    background-color: #fff;
    padding: 0 0.35rem 0.5rem;
    div.title {
      height: 0.8rem;
      font-size: 14px;
      margin-top: 33%;
      color: #999;
      border-bottom: solid 1px #f2f2f2;
      span.nameTxt {
        font-size: 16px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 0.8rem;
        margin-right: 0.16rem;
      }
    }
    div.infoView {
      font-size: 12px;
      color: #666;
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
        // width: 3.1rem;
        flex-grow: 1;
        height: 1.5rem;
        background: #ff6b3d;
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
        margin-left: 0.27rem;
      }
      img {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
    div.btn3 {
      justify-content: space-between;
      color: #333;
      margin: 0.5rem 0 0.2rem;
      > div {
        height: 0.72rem;
        width: 2rem;
        border: 1px solid #333;
        border-radius: 0.04rem;
        font-size: 13px;
        line-height: 0.68rem;
        text-align: center;
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
  div.latterTip {

    justify-content: space-between;
    align-items: center;
    > div {
      height: 0.8rem;
      font-size: 11px;
      line-height: 0.8rem;
      color: #333;
      &:last-child {
        color: #999;
      }
      &:first-child {
        align-items: center;
      }
    }
    div.txt22 {
      line-height: 0.8rem;
    }
    .iconWrap {
      width: 0.22rem;
      height: 0.22rem;
      border: 1px solid #999;
      border-radius: 2px;
      margin-right: 7px;
      line-height: 0;
      text-align: center;
      .s-icon {
        width: 0.18rem;
        height: 0.18rem;
      }
    }
  }
  .green {
    color: #3aba8f !important;
  }
  div.latterTip.hebinHide {
    margin-top: calc(33% +1.66rem); //经典
  }
}
</style>
