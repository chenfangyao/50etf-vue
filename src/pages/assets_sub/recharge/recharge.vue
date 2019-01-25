<template>
	<div class="wrap">
	  <base-header title="账户充值" right-txt='充值记录' has-back='1' @right-tap='rightTap'></base-header>
    <!-- <recharge-way :way-lists='wayList' @change-wayi='changeWayI' txt1='提示限额' txt2='（0-50,000）'></recharge-way> -->
    <recharge-way :way-lists='wayList' :showbanklogo="showbanklogo" @change-wayi='changeWayI' txt1='' txt2=''></recharge-way>
    <div class="panel">
      <div class="inputContainer">
        <div class="moneyTitle">充值金额</div>
        <input type="tel" v-model="money" :disabled='inputDisabled'>
        <span>￥</span>
      </div>
      <div class="overage">
        <span>账户余额：</span>
        <span>{{assets.enable_money}}</span>
      </div>
      <div class="priceItem uni-flex">
        <div v-for="(item, i) in priceLists" :key="i"  :class="{active:priceItem_i==i}" @click='choosePriceItem(i,item)'>{{item}} 元</div>
      </div>
    </div>
    <div class="fixView">
      <btn-block txt='下一步' @v-tap='go'></btn-block>
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
      priceLists: [, , , , , ,],
      priceItem_i: 0,
      wayList: ['支付宝', '银行转账'],
      inputDisabled: true,
      paytype: 'remit_alipay',
      payeeinfo: {},
			showbanklogo:true,
			defaultitemmoney:'',
    }
  },
  computed: mapState(['assets']),
  methods: {
    ...mapMutations(['setpaylist']),
    go() {
      if (this.money == '') {
        alert('请输入金额')
        return
      }
      //跳转银行卡页
      switch (this.paytype) {
        case 'remit_alipay':
          this.$navigateTo({ url: '/pages/assets_sub/bank_card/bank_card?pay_money=' + this.money + '&paytype=' + this.paytype + '&cardname=' + this.payeeinfo.cardname + '&cardno=' + this.payeeinfo.cardno + '&pw_id=' + this.payeeinfo.pw_id + '', })
          break
        case 'remit_icbc':
          this.$navigateTo({ url: '/pages/assets_sub/bank_card/bank_card?pay_money=' + this.money + '&paytype=' + this.paytype + '&cardname=' + this.payeeinfo.cardname + '&cardno=' + this.payeeinfo.cardno + '&pw_id=' + this.payeeinfo.pw_id + '&bank_name=' + this.payeeinfo.bank_name + '' })
          break
      }
    },
    rightTap() {
      this.$navigateTo({ url: '/pages/assets_sub/recording/recording?type=1' })
    },
    getpayway() {
      var options = {
        url: '/Sapi/Ufund/payway', //请求接口
        method: 'GET', //请求方法全部大写，默认GET
      }
      this.$httpReq(options).then((res) => {
        // 请求成功的回调
        // res为服务端返回数据的根对象
        console.log('支付方式列表列表', res)
        if (res.status) {
          this.setpaylist(res.data)
          // 设置默认下一步传递参数
          this.payeeinfo = res.data.alipay[0]
          // 设置默认的选择金额
          this.priceLists = res.data.alipay[0].money_selects
          this.money = this.priceLists[0]
          // this.pickerValueArray=res.data.list
        } else {

        }
      }).catch((err) => {
        // 请求失败的回调
        console.error(err,'捕捉')
      })
    },
    changeWayI(i) {
      this.payeeinfo = i
      this.priceLists = i.money_selects
      // 支付方式
      this.paytype = i.pay_code
      // 支付宝支付禁用输入框
      if (this.paytype == "remit_alipay") {//此处判断input禁用是以后端传来的实际字段为主
        this.inputDisabled = true
				this.money=this.defaultitemmoney
      } else {
        this.inputDisabled = false
      }
    },
    choosePriceItem(i, item) {
      this.priceItem_i = i
			this.defaultitemmoney=item
      this.money = item//支付宝状态下点击充值金额选项，改变input的值，当前写假的
    }
  },
  onLoad() {
    this.getpayway()
  }
}
</script>

<style lang="scss" scoped>
div.wrap {
  height: 100vh;
  background-color: #f5f5f5;
  div.panel {
    padding: 0.1px .46rem;
    background-color: #fff;
    div.inputContainer {
      padding-top: .36rem;
      position: relative;
      margin-bottom:.29rem;
      div.moneyTitle {
        font-size: 14px;
        color: rgba(24, 28, 40, 1);
        margin-bottom:.37rem;
      }
      input {
        font-size: 32px;
        color: rgba(24, 28, 40, 1);
        background-color: white;
        border-bottom: 1px solid #ccc;
        padding: 0 0 .20rem 20px;
        background-color: #fff;
        width: 100%;
        height: 32px !important;
      }
      > span {
        font-size: 18px;
        color: rgba(24, 28, 40, 1);
        line-height:.33rem;
        position: absolute;
        left: -3px;
        top:1.30rem;
      }
    }
    div.overage {
      font-size: 14px;
      color: rgba(136, 138, 161, 1);
      line-height: 14px;
      margin-bottom:.49rem;
    }
    div.priceItem {
      justify-content: space-between;
      flex-wrap: wrap;
      > div {
        width:2.00rem;
        height:.74rem;
        background: rgba(245, 245, 245, 0);
        border: 1px solid rgba(64, 157, 229, 1);
        border-radius:.02rem;
        text-align: center;
        line-height:.74rem;
        font-size: 15px;
        flex-shrink: 0;
        margin-bottom:.36rem;
        color: rgba(64, 157, 229, 1);
      }
      div.active {
        background-color: #409de5;
        color: #fff;
      }
    }
  }
  div.fixView {
    position: fixed;
    bottom:.20rem;
    left: 0;
    right: 0;
  }
}
</style>
