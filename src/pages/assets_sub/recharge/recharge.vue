<template>
	<div class="wrap" :class="showTable? 'mengban':''" >
	  <base-header title="账户充值" right-txt='充值记录' has-back='1' @right-tap='rightTap'></base-header>
    <!-- <recharge-way :way-lists='wayList' @change-wayi='changeWayI' txt1='提示限额' txt2='（0-50,000）'></recharge-way> -->
    <recharge-way :way-lists='wayList' :showbanklogo="showbanklogo" @change-wayi='changeWayI' txt1='' txt2=''></recharge-way>
    <div class="panel black2">
      <div class="inputContainer">
        <div class="moneyTitle textc1">充值金额</div>
        <div class="uni-flex inputContainer2">
          <span class="textc1">￥</span>
          <input type="tel" class="black2 textc1" v-model="money" :disabled='inputDisabled'>
        </div>
      </div>
      <div class="overage textc1">
        <span>账户余额：</span>
        <span>{{assets.enable_money}}</span>
      </div>
      <div class="priceItem uni-flex">
        <div v-for="(item, i) in priceLists" :key="i"  :class="{active:priceItem_i==i}" v-vtap="{method: choosePriceItem , params: i}">{{item}} 元</div>
      </div>
    </div>
    <div class="tip textc1" v-show="inputDisabled"><!--支付宝限额，银行不限额-->
      <span>温馨提醒：</span>
      <span class="_a" v-vtap="{method:showtables}">充值限额表</span>
    </div>
    <div class="fixView">
      <btn-block txt='下一步' @v-tap='go'></btn-block>
    </div>
    <!-- <limit-table></limit-table> -->
    <div id="alipayform" v-show="false" v-html="alipayRes"></div>
    <div v-if="showTable" class="self-mask ">
      <div  class="alipayLimit black2 "  >
        <table cellspacing="0" class="textc1">
          <thead>
          <tr>
            <td class="tr-title">银行</td>
            <td>单笔额度</td>
            <td>单日额度</td>
            <td>单月额度</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="tr-title">中国银行</td>
            <td>1万</td>
            <td>1万</td>
            <td>无限额</td>
          </tr>
          <tr>
            <td class="tr-title">农业银行</td>
            <td>1万</td>
            <td>1万</td>
            <td>30万</td>
          </tr>
          <tr>
            <td class="tr-title">工商银行</td>
            <td>1万</td>
            <td>10万</td>
            <td>10万</td>
          </tr>
          <tr>
            <td class="tr-title">交通银行</td>
            <td>1万</td>
            <td>1万</td>
            <td>20万</td>
          </tr>
          <tr>
            <td class="tr-title">建设银行</td>
            <td>1万</td>
            <td>5万</td>
            <td>10万</td>
          </tr>
          <tr>
            <td class="tr-title">平安银行</td>
            <td>5万</td>
            <td>5万</td>
            <td>无限额</td>
          </tr>
          <tr>
            <td class="tr-title">中信银行</td>
            <td>5万</td>
            <td>5万</td>
            <td>无限额</td>
          </tr>
          <tr>
            <td class="tr-title">光大银行</td>
            <td>6万</td>
            <td>6万</td>
            <td>无限额</td>
          </tr>
          <tr>
            <td class="tr-title">浦发银行</td>
            <td>50万</td>
            <td>50万</td>
            <td>无限额</td>
          </tr>
          <tr>
            <td class="tr-title">招商银行</td>
            <td>5万</td>
            <td>5万</td>
            <td>无限额</td>
          </tr>
          <tr>
            <td class="tr-title">广发银行</td>
            <td>3万</td>
            <td>3万</td>
            <td>无限额</td>
          </tr>
          <tr>
            <td class="tr-title">邮储银行</td>
            <td>1万</td>
            <td>1万</td>
            <td>无限额</td>
          </tr>
          <tr>
            <td class="tr-title">民生银行</td>
            <td>5万</td>
            <td>5万</td>
            <td>无限额</td>
          </tr>
          <tr>
            <td class="tr-title">兴业银行</td>
            <td>5万</td>
            <td>5万</td>
            <td>无限额</td>
          </tr>
          <tr>
            <td class="tr-title">华夏银行</td>
            <td>50万</td>
            <td>50万</td>
            <td>无限额</td>
          </tr>
          <tr>
            <td class="tr-title">上海银行</td>
            <td>5万</td>
            <td>5万</td>
            <td>10万</td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td class="tr-title"> 各城市商业银行</td>
            <td colspan="3" style="text-align: left">
              以收银台显示为准。若支付时收银页面无限额提示，超限后会进行提示。
            </td>
          </tr>
          </tfoot>
        </table>
      </div>
      <div class="closepop" >
        <img src="../../../assets/holdingImg/popClose.png" v-vtap="{method:closeTable}">
      </div>

    </div>
	</div>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
import rechargeWay from '@/components/assetsSub/rechargeWay.vue'
import limitTable from '@/components/assetsSub/recharge-limit-table.vue'
import { mapState, mapMutations } from 'vuex';

export default {
  components: { btnBlock, rechargeWay,limitTable },
  data() {
    return {
      money: '',
      priceLists: [],
      priceItem_i: 0,
      wayList: ['支付宝', '银行转账'],
      inputDisabled: true,
      paytype: 'remit_alipay',
      payeeinfo: {},
			showbanklogo:true,
			defaultitemmoney:'',
      showTable:false,
      alipayRes:'',
    }
  },
  computed: mapState(['assets']),
  methods: {
    ...mapMutations(['setpaylist']),
    showtables(){
      this.showTable=!this.showTable
    },
    closeTable(){
      this.showTable=false
    },
    go() {
      if (this.money == '') {
        alert('请输入金额')
        return
      }
      console.log(333,this.paytype)
      //跳转银行卡页
      switch (this.paytype) {
        case 'remit_alipay':
          // this.$navigateTo({ url: '/pages/assets_sub/bank_card/bank_card?pay_money=' + this.money + '&paytype=' + this.paytype + '&cardname=' + this.payeeinfo.cardname + '&cardno=' + this.payeeinfo.cardno + '&pw_id=' + this.payeeinfo.pw_id + '', })
          this.$router.push({
            path:'/pages/assets_sub/bank_card/bank_card',
            query:{
              pay_money:this.money,
              paytype:this.paytype,
              cardname:this.payeeinfo.cardname,
              cardno:this.payeeinfo.cardno,
              pw_id:this.payeeinfo.pw_id
            }
          })
          break
        case 'remit_icbc':
          // this.$navigateTo({ url: '/pages/assets_sub/bank_card/bank_card?pay_money=' + this.money + '&paytype=' + this.paytype + '&cardname=' + this.payeeinfo.cardname + '&cardno=' + this.payeeinfo.cardno + '&pw_id=' + this.payeeinfo.pw_id + '&bank_name=' + this.payeeinfo.bank_name + '' })
          this.$router.push({
            path:'/pages/assets_sub/bank_card/bank_card',
            query:{
              pay_money:this.money,
              paytype:this.paytype,
              cardname:this.payeeinfo.cardname,
              cardno:this.payeeinfo.cardno,
              pw_id:this.payeeinfo.pw_id,
              bank_name:this.payeeinfo.bank_name,
            }
          })
          break
        case 'alipay_wap':
          var formdata = new FormData();
          formdata.append("uid",'5270');
          formdata.append("v_amount",this.money);
          formdata.append("pay_code",this.paytype);
          formdata.append("pay_type",this.paytype);
          var options = {
            url: '/Sapi/Payment/pay', //请求接口
            method: 'POST', 
            data:formdata,
          }
          this.$httpReq(options).then((res) => {
            this.alipayRes=res
            var a=document.getElementById('alipayform')
            // dom操作效率问题，能获取到a节点但是getElementsByTagName对dom结构树查找不能马上获取
            setTimeout(()=>{
              var b=a.getElementsByTagName('form')[0]
              b.submit()
            },100)
          }).catch((err) => {
            console.error(err,'捕捉')
          })
              break

      }
    },
    rightTap() {
      this.$router.push({
        path:'/pages/assets_sub/recording/recording',
        query:{
          type:1,
        }
      })
    },
    getpayway() {
      var options = {
        url: '/Sapi/Ufund/payway', //请求接口
        method: 'GET', 
      }
      this.$httpReq(options).then((res) => {
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
    choosePriceItem(i) {
      this.priceItem_i = i
			this.defaultitemmoney=this.priceLists[i]
      this.money = this.priceLists[i]//支付宝状态下点击充值金额选项，改变input的值，当前写假的
    }
  },
  created() {
    this.getpayway()
  }
}
</script>

<style lang="scss" scoped>
div.mengban{
  opacity: 0.6;
  z-index: 999;
}
div.wrap {
  height: 100vh;
  background-color: #f5f5f5;
  position: relative;
  div.panel {
    padding: 0.1px .46rem;
    background-color: #fff;
    div.inputContainer {
      padding-top: .36rem;
      margin-bottom:.29rem;
      div.moneyTitle {
        font-size: 14px;
        color: rgba(24, 28, 40, 1);
        margin-bottom:.37rem;
      }

    }
    div.inputContainer2{
      align-items: center;
      input {
          font-size: 32px;
          color: rgba(24, 28, 40, 1);
          background-color: white;
          border-bottom: 1px solid #ccc;
          padding-left: 5px;
          background-color: #fff;
          width: 100%;
          height: 38px !important;
          line-height: 38px;
          display: inline-block;
        }
        > span {
          font-size: 18px;
          color: rgba(24, 28, 40, 1);
          line-height:.33rem;
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
  div.tip{
    margin: 0.35rem 0 0 0.46rem;
    font-size:13px;
    color: #181c28;
    span._a{
      text-decoration:underline;
      color:rgba(64,157,229,1);
    }
  }
  div.fixView {
    position: fixed;
    bottom:.20rem;
    left: 0;
    right: 0;
  }
  div.self-mask{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
.alipayLimit{
  display: block;
  overflow-y: scroll;
  background-color: white;
  margin:0 30px 10px;
  table{
    font-size: 12px;
    color:#3c3c41;
    text-align: center;
    width: 100%;
    border:solid #808080;
    border-width:1px;
    .tr-title{
      width: 34%;
    }
td{
  text-align: center;
  border:solid #808080;
  border-width:0px 1px 1px 0px;
}
  }
}
.closepop{
//   position: absolute;
//   bottom: 2rem;
// left: 0;right: 0;
  text-align: center;
      img {
    margin: 0.26rem auto 0;
        width: 0.72rem;
        height: 0.72rem;
      }
}
}
</style>
