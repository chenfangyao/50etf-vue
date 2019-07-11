<template>
  <div class="wrap">
    <base-header title="提现" has-back='1' right-txt='提现记录' @right-tap='rightTap'></base-header>
    <recharge-way v-if="hasBank" @change-wayi="changeWayI"></recharge-way>
    <recharge-way v-else txt2='添加您的银行卡以便提现到您的账户' txt1='请绑定银行卡' to-addcard="1"></recharge-way>
    <div class="panel black2">
      <div class="inputContainer">
        <div class="moneyTitle textc1">提现金额</div>
        <input type="number" class="black2 textc1" v-model="money">
        <span class="textc1">￥</span>
      </div>
      <div class="overage">
        <span>可提现余额：</span>
        <span>{{assetsObj.cash_money}}元</span>
        <span class="allWithdraw" v-vtap="{method:allGet}">全部提现</span>
      </div>
    </div>
    <div class="fixView">
      <btn-block txt='确认提现' @v-tap='doWhat'></btn-block>
      <div class="bottomTip">温馨提示：最小提现金额100元</div>

    </div>
  </div>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
import rechargeWay from '@/components/assetsSub/rechargeWay.vue'
import { mapState, mapMutations } from 'vuex';

export default {
  components: { btnBlock, rechargeWay },
  data() {
    return {
      money: '',
      hasBank: false,
      timmer: null,
      assetsObj: {},
      withdrawId: '',
      reqLock: false
    }
  },
  created() {
    this.mybankinfo()
    this.getassets()
    this.timmer = setInterval(() => this.getassets(), 3000)
  },
  beforeDestroy() {
    clearInterval(this.timmer)
    this.timmer = null
  },
  methods: {
    ...mapMutations(['setpaylist']),
    rightTap() {
      this.$navigateTo({ url: '/pages/assets_sub/recording/recording', query: { type: 2 } })
    },
    changeWayI(obj) {
      this.withdrawId = obj.id
    },
    doWhat() {
      var cash_money = this.assetsObj.cash_money.replace(/,/g, '')
      if (cash_money - this.money < 0) {
        this.$toast('可提现金额不足')
        return
      }
      var options = {
        url: '/Sapi/Ufund/cash',
        method: 'POST',
        data: {
          money: this.money,
          id: this.withdrawId,//提现到账银行卡标识
        }
      }
      if (this.reqLock) return;
      else this.reqLock = true;
      this.$httpReq(options).then((res) => {
        this.reqLock = false
        if (res.status) {
          this.$router.push({
            path: '/pages/assets_sub/recording/recording',
            query: {
              type: 2,
            }
          })
        } else {
          this.$toast.fail(res.info ? res.info : '提现申请失败')
        }
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    },
    allGet() {
      this.money = this.assetsObj.cash_money.replace(/,/g, '')
    },
    // 我的银行
    mybankinfo() {
      var options = {
        url: '/Sapi/Ubank/bankcard_list',
        method: 'GET',
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          if (res.data.list.length > 0) {
            this.hasBank = true
            this.setpaylist(res.data.list)
          }
        }
      }).catch((err) => {

        console.error(err, '捕捉')
      })
    },
    getassets() {
      var options = {
        url: '/Sapi/User/asset',
        method: 'GET',
      }
      this.$httpReq(options).then((res) => {
        if (res.status == 1) {
          this.assetsObj = res.data
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
div.wrap {
  height: 100vh;
  background-color: #f5f5f5;
  position: relative;
  min-height: 568px;
  div.panel {
    padding: 0.1px.46rem;
    background-color: #fff;
    div.inputContainer {
      padding-top: 0.36rem;
      position: relative;
      margin-bottom: 0.29rem;
      div.moneyTitle {
        font-size: 14px;
        color: rgba(24, 28, 40, 1);
        margin-bottom: 0.37rem;
      }
      input {
        font-size: 32px;
        color: rgba(24, 28, 40, 1);
        border-bottom: 1px solid #ccc;
        padding: 0 0 0.2rem 20px;
        /*height: 32px !important;*/
        width: 100%;
        #app.at-night & {
          border-color: $blackTxt2;
        }
      }
      > span {
        font-size: 18px;
        color: rgba(24, 28, 40, 1);
        line-height: 0.33rem;
        position: absolute;
        left: -3px;
        top: 1.5rem;
      }
    }
    div.overage {
      font-size: 14px;
      color: rgba(136, 138, 161, 1);
      line-height: 14px;
      margin-bottom: 0.49rem;
      span.allWithdraw {
        font-size: 14px;
        color: $primary1;
        margin-left: 0.15rem;
      }
    }
    div.priceItem {
      justify-content: space-between;
      flex-wrap: wrap;
      > div {
        width: 2rem;
        height: 0.74rem;
        background: rgba(245, 245, 245, 0);
        border: 1px solid $primary1;
        border-radius: 0.02rem;
        text-align: center;
        line-height: 0.74rem;
        font-size: 15px;
        flex-shrink: 0;
        margin-bottom: 0.36rem;
        color: $primary1;
      }
      div.active {
        background-color: $primary1;
        color: #fff;
      }
    }
  }
  div.fixView {
    position: absolute;
    bottom: 0.6rem;
    left: 0;
    right: 0;
    div.bottomTip {
      font-size: 13px;
      color: $primary1;
      text-align: center;
      line-height: 13px;
      margin-top: 0.36rem;
    }
  }
}
</style>


