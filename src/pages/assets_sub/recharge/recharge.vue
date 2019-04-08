<template>
  <div class="wrap" :class="showTable? 'mengban':''">
    <base-header title="账户充值" right-txt='充值记录' has-back='1' @right-tap='rightTap'></base-header>
    <!-- <recharge-way :way-lists='wayList' @change-wayi='changeWayI' txt1='提示限额' txt2='（0-50,000）'></recharge-way> -->
    <recharge-way :way-lists='wayList' @calc-default='calcDefault' @change-wayi='changeWayI' txt1='' txt2=''></recharge-way>
    <div class="panel black2">
      <div class="inputContainer">
        <div class="moneyTitle textc1">充值金额</div>
        <div class="uni-flex inputContainer2">
          <span class="textc1">￥</span>
          <input type="number" min="1" class="black2 textc1" v-model="money">
          <!--:disabled='inputDisabled'-->
        </div>
      </div>
      <div class="overage textc1">
        <span>账户余额：</span>
        <span>{{assets.enable_money}}</span>
      </div>
      <div class="priceItem uni-flex">
        <div v-for="(item, i) in priceLists" :key="i" :class="{active:priceItem_i==i}" v-vtap="{method: choosePriceItem , params: i}">{{item}} 元</div>
      </div>
    </div>
    <div class="tip textc1" v-show="inputDisabled">
      <!--支付宝限额，银行不限额-->
      <span>温馨提醒：</span>
      <span class="_a" v-vtap="{method:showtables}">充值限额表</span>
    </div>
    <div class="fixView">
      <btn-block txt='下一步' @v-tap='go'></btn-block>
    </div>
    <!-- <limit-table></limit-table> -->
    <div id="alipayform" v-show="false" v-html="alipayRes"></div>
    <div v-if="showTable" class="self-mask ">
      <div class="alipayLimit black2 ">
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
      <div class="closepop">
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
import { openView } from './openNew.js'
export default {
  components: { btnBlock, rechargeWay, limitTable },
  data() {
    return {
      money: '',
      priceLists: [],
      priceItem_i: 0,
      wayList: [],
      inputDisabled: true,
      paytype: 'remit_alipay',
      payeeinfo: {},
      defaultitemmoney: '',
      showTable: false,
      alipayRes: '',
      pay_way: 'alipay',
      alipayChannel: null
    }
  },
  computed: mapState(['assets', 'userinfo']),
  methods: {
    ...mapMutations(['setpaylist']),
    showtables() {
      this.showTable = !this.showTable
    },
    closeTable() {
      this.showTable = false
    },
    go() {
      if (this.money == '') {
        alert('请输入金额')
        return
      }
      //跳转银行卡页
      switch (this.pay_way) {
        case 'alipay':
          // this.$navigateTo({ url: '/pages/assets_sub/bank_card/bank_card?pay_money=' + this.money + '&paytype=' + this.paytype + '&cardname=' + this.payeeinfo.cardname + '&cardno=' + this.payeeinfo.cardno + '&pw_id=' + this.payeeinfo.pw_id + '', })
          this.$router.push({
            path: '/pages/assets_sub/bank_card/bank_card',
            query: {
              pay_money: this.money,
              paytype: this.paytype,
              cardname: this.payeeinfo.cardname,
              cardno: this.payeeinfo.cardno,
              pw_id: this.payeeinfo.pw_id,
              orcode_url: this.payeeinfo.orcode_url,
              aliORbank: 1//1支付宝，0银行
            }
          })
          break
        case "offline":
          if (this.payeeinfo.orcode) {
            this.$navigateTo({ url: '/recharge/codePay', query: { obj: this.payeeinfo, pay_money: this.money, } })
            break
          }
        case "remitance":
          // this.$navigateTo({ url: '/pages/assets_sub/bank_card/bank_card?pay_money=' + this.money + '&paytype=' + this.paytype + '&cardname=' + this.payeeinfo.cardname + '&cardno=' + this.payeeinfo.cardno + '&pw_id=' + this.payeeinfo.pw_id + '&bank_name=' + this.payeeinfo.bank_name + '' })
          this.$router.push({
            path: '/pages/assets_sub/bank_card/bank_card',
            query: {
              pay_money: this.money,
              paytype: this.paytype,
              cardname: this.payeeinfo.cardname,
              cardno: this.payeeinfo.cardno,
              pw_id: this.payeeinfo.pw_id,
              bank_name: this.payeeinfo.bank_name,
              aliORbank: 0//1支付宝，0银行
            }
          })
          break
        case 'online':
          var formdata = new FormData();
          formdata.append("uid", this.userinfo.user_id);
          formdata.append("v_amount", this.money);
          formdata.append("pay_code", this.paytype);
          formdata.append("pay_type", this.paytype);
          var options = {
            url: '/Sapi/Payment/pay',
            method: 'POST',
            data: formdata,
          }
          this.$httpReq(options).then((res) => {
            // this.doAlipay(res.data.data.ali_ordinfo)
            /*  this.alipayRes=res
             var a=document.getElementById('alipayform')
             this.$nextTick(()=>{
               var b=a.getElementsByTagName('form')[0]
              b.submit()
             }) */
            openView(res).show()
          }).catch((err) => {
            console.error(err, '捕捉')
          })
          break
      }
    },
    rightTap() {
      this.$router.push({
        path: '/pages/assets_sub/recording/recording',
        query: {
          type: 1,
        }
      })
    },
    calcDefault(obj) {
      // 设置默认下一步传递参数
      this.payeeinfo = obj
      this.priceLists = obj.conf_set?obj.conf_set.money_selects:obj.money_selects
      this.money = this.priceLists[0]
    },
    getpayway() {
      var options = {
        url: '/Sapi/Ufund/payway', //请求接口
        method: 'GET',
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.setpaylist(res.data)
          if (res.data.alipay.length === 0) return;
          // this.pickerValueArray=res.data.list
        } else {

        }
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    },
    getAppChannels() {
      if (this.alipayChannel) return;
      plus.payment.getChannels(channels => {
        for (var i in channels) {
          if (channels[i].id === 'alipay') {
            this.alipayChannel = channels[i]
            return
          }
        }
        plus.nativeUI.alert('系统未检测到支付宝，可能无法进行支付宝支付', null, '温馨提示');
      }, function (e) {
        console.error('获取支付通道失败：' + e.message);
      });
    },
    doAlipay(order) {
      // var str='alipay_sdk=alipay-sdk-php-20161101&app_id=2015112700878442&biz_content=%7B%22body%22%3A%22DCloud%E8%87%B4%E5%8A%9B%E4%BA%8E%E6%89%93%E9%80%A0HTML5%E6%9C%80%E5%A5%BD%E7%9A%84%E7%A7%BB%E5%8A%A8%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7%EF%BC%8C%E5%8C%85%E6%8B%AC%E7%BB%88%E7%AB%AF%E7%9A%84Runtime%E3%80%81%E4%BA%91%E7%AB%AF%E7%9A%84%E6%9C%8D%E5%8A%A1%E5%92%8CIDE%EF%BC%8C%E5%90%8C%E6%97%B6%E6%8F%90%E4%BE%9B%E5%90%84%E9%A1%B9%E9%85%8D%E5%A5%97%E7%9A%84%E5%BC%80%E5%8F%91%E8%80%85%E6%9C%8D%E5%8A%A1%E3%80%82%22%2C%22subject%22%3A+%22DCloud%E9%A1%B9%E7%9B%AE%E6%8D%90%E8%B5%A0%22%2C%22out_trade_no%22%3A+%2220190315075715%22%2C%22timeout_express%22%3A+%2230m%22%2C%22total_amount%22%3A+%221%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%7D&charset=UTF-8&format=json&method=alipay.trade.app.pay&notify_url=http%253A%252F%252Fdemo.dcloud.net.cn%252Fpayment%252Falipay%252Fnotify.php&sign_type=RSA2&timestamp=2019-03-15+07%3A57%3A15&version=1.0&sign=VOZiu0B3Ifv2whHbd8pJWyExBO1tnvlT6wjTWCJUIOp%2FmASfugC7L6ONLjZhs2x7n8m2btI3tu5rEEe0MgkxXVRWnoFGVAjqWntMfEG5ik60agptEAfDN%2BfR9mkPLSVm8OvoEAgPz1a1ZhQCOPpecTcaPUQxPckrLCoqC9maofdXKJsMQcw3TYIOvYuct6ISCjzdL04s%2FfEWJG8biEeApEdW0oW2MeEdVv70CruQhUxkr7tXNz6B1Z7pQjvPTmCHBw6aNxuNXcTVAUaXenUtXuLRlaC%2FPnlyDMCC00F55TyOLie9WRG2%2FKLwqTE2t2AfCK8FAGz5BsrXudmZeG7o7w%3D%3D'
      plus.payment.request(this.alipayChannel, order, result => {
        plus.nativeUI.alert('支付成功', null, '');
      }, function (e) {
        plus.nativeUI.alert('您可能未开通权限', null, '支付失败：' + e.code);
      });
    },
    changeWayI(i) {
      process.env.API_HOST && this.getAppChannels()
      this.pay_way = i.pay_way
      this.payeeinfo = i
      this.paytype = i.pay_code
      // 支付方式
      // 支付宝支付禁用输入框
      if (this.paytype == "remit_alipay") {//此处判断input禁用是以后端传来的实际字段为主
        this.inputDisabled = true
        this.money = this.defaultitemmoney
      } else {
        this.inputDisabled = false
      }
      this.priceLists = i.conf_set?i.conf_set.money_selects:i.money_selects
    },
    choosePriceItem(i) {
      this.priceItem_i = i
      this.defaultitemmoney = this.priceLists[i]
      this.money = this.priceLists[i]//支付宝状态下点击充值金额选项，改变input的值，当前写假的
    }
  },
  created() {
    this.getpayway()
  }
}
</script>

<style lang="scss" scoped>
div.mengban {
  opacity: 0.6;
  z-index: 999;
}
div.wrap {
  height: 100vh;
  min-height: 568px;
  background-color: #f5f5f5;
  position: relative;
  div.panel {
    padding: 0.1px 0.46rem;
    background-color: #fff;
    div.inputContainer {
      padding-top: 0.36rem;
      margin-bottom: 0.29rem;
      div.moneyTitle {
        font-size: 14px;
        color: rgba(24, 28, 40, 1);
        margin-bottom: 0.37rem;
      }
    }
    div.inputContainer2 {
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
        line-height: 0.33rem;
      }
    }
    div.overage {
      font-size: 14px;
      color: rgba(136, 138, 161, 1);
      line-height: 14px;
      margin-bottom: 0.49rem;
    }
    div.priceItem {
      justify-content: space-between;
      flex-wrap: wrap;
      > div {
        width: 2rem;
        height: 0.74rem;
        background: rgba(245, 245, 245, 0);
        border: 1px solid rgba(64, 157, 229, 1);
        border-radius: 0.02rem;
        text-align: center;
        line-height: 0.74rem;
        font-size: 15px;
        flex-shrink: 0;
        margin-bottom: 0.36rem;
        color: rgba(64, 157, 229, 1);
      }
      div.active {
        background-color: #409de5;
        color: #fff;
      }
    }
  }
  div.tip {
    margin: 0.35rem 0 0 0.46rem;
    font-size: 13px;
    color: #181c28;
    span._a {
      text-decoration: underline;
      color: rgba(64, 157, 229, 1);
    }
  }
  div.fixView {
    position: absolute;
    bottom: 0.2rem;
    left: 0;
    right: 0;
  }
  div.self-mask {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .alipayLimit {
    display: block;
    overflow-y: scroll;
    background-color: white;
    margin: 0 30px 10px;
    table {
      font-size: 12px;
      color: #3c3c41;
      text-align: center;
      width: 100%;
      border: solid #808080;
      border-width: 1px;
      .tr-title {
        width: 34%;
      }
      td {
        text-align: center;
        border: solid #808080;
        border-width: 0px 1px 1px 0px;
      }
    }
  }
  .closepop {
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
