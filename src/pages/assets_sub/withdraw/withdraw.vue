<template>
	<div class="wrap">
	  <base-header title="提现"  has-back='1'  right-txt='提现记录'  @right-tap='rightTap'></base-header>
    <recharge-way v-if="hasBank" :way-lists='wayLists' :showbanklogo="showbanklogo" txt1='' :txt2='txts1' go-to='1'></recharge-way>
    <recharge-way v-else txt2='添加您的银行卡以便提现到您的账户' txt1='请绑定银行卡' go-to='1'></recharge-way>
		<div class="panel">
      <div class="inputContainer">
        <div class="moneyTitle">提现金额</div>
        <input type="number" v-model="money">
        <span>￥</span>
      </div>
      <div class="overage">
        <span>可提现余额：</span>
        <span>{{assets.enable_money}}元</span>
        <span class="allWithdraw" @click='allGet'>全部提现</span>
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
import { mapState } from 'vuex';

export default {
  components: { btnBlock, rechargeWay },
  data() {
    return {
      money: '',
      allMoney: '1,104,551.17',
      priceLists: [, , , , , ,],
      priceItem_i: 0,
      wayLists: ['招商银行'],
      hasBank: false,
      bankName: [],
			txts1:'',
			showbanklogo:false
    }
  },
  computed: mapState(['assets']),
  created() {
    this.mybankinfo()
  },
  methods: {
    rightTap() {
      this.$navigateTo({ url: '/pages/assets_sub/recording/recording' ,query:{type:2}})
    },
    doWhat() {
      this.ufundcash()
    },
    allGet() {
      this.money = this.assets.enable_money.replace(/,/g, '')
    },
    // 我的银行
    mybankinfo() {
      var options = {
        url: '/Sapi/Ubank/info', //请求接口
        method: 'GET', //请求方法全部大写，默认GET
      }
      this.$httpReq(options).then((res) => {
        console.log('我的银行', res)
        if (res.status) {
          if (res.data.sub_id != undefined) {
            this.hasBank = true
            this.bankName[0] = res.data.bank_name
						this.wayLists[0]=res.data.bank_name
            this.pickerText = res.data.bank_name
            this.pickerCityText = res.data.prov + '-' + res.data.city
            this.pickSubBankText = res.data.sub_name
            this.sub_id = res.data.sub_id
            this.username = res.data.cardname
            this.bankcardid = res.data.cardno
            this.identifica = res.data.idno
						this.txts1=res.data.cardno
          }
        } else {

        }
      }).catch((err) => {
        // 请求失败的回调
        console.error(err,'捕捉')
      })
    },
    // 提现
    ufundcash() {
      var options = {
        url: '/Sapi/Ufund/cash', //请求接口
        method: 'POST', //请求方法全部大写，默认GET
        data: {
          money: this.money
        }
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.$router.push({
            path:'/pages/assets_sub/recording/recording',
            query:{
              type:2,
            }
          })
        } else {
          this.$toast.fail(res.info ? res.info : '提现申请失败')
        }
      }).catch((err) => {
        console.error(err,'捕捉')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
div.wrap {
  height: 100vh;
  background-color: #f5f5f5;
  div.panel {
    padding: 0.1px.46rem;
    background-color: #fff;
    div.inputContainer {
      padding-top:.36rem;
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
        border-bottom: 1px solid #ccc;
        padding: 0 0 .20rem 20px;
        /*height: 32px !important;*/
      }
      > span {
        font-size: 18px;
        color: rgba(24, 28, 40, 1);
        line-height:.33rem;
        position: absolute;
        left: -3px;
        top:1.50rem;
      }
    }
    div.overage {
      font-size: 14px;
      color: rgba(136, 138, 161, 1);
      line-height: 14px;
      margin-bottom:.49rem;
      span.allWithdraw {
        font-size: 14px;
        color: rgba(64, 157, 229, 1);
        margin-left:.15rem;
      }
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
    bottom:.60rem;
    left: 0;
    right: 0;
    div.bottomTip {
      font-size: 13px;
      color: rgba(64, 157, 229, 1);
      text-align: center;
      line-height: 13px;
      margin-top:.36rem;
    }
  }
}
</style>


