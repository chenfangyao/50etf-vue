<template>
  <div class="wrap ">
    <base-header :title="bankName" has-back='1' @right-tap='go(1)'></base-header>
    <!-- <div class="title">支付账号</div> -->
    <div class="subWrap black2">
      <div class='gatherInfo'>
        <div class='payMoney textc2 hasCopy'>
          <span>收款账号</span>
          <span class="ellipsis textc1">{{cardno}}</span>
          <span class="copySpan" v-hover-class='"self-hover"' v-vtap="{method:copyText}">复制</span>
          <!-- <div class="chooseCount">
            <div v-vtap="{method:showPicker}">
              {{cardno}}
              <span class="arrowDown"></span>
            </div>
          </div> -->
        </div>

        <div class='payMoney textc2'>
          <span>收款人</span>
          <span class="ellipsis textc1">{{cardname}}</span>
        </div>
        <div class='payMoney textc2 hasCopy'>
          <span>客户代码</span>
          <span class="ellipsis textc1">{{userinfo.mobile}}-{{userinfo.user_id}}</span>
          <span class="copySpan" v-hover-class='"self-hover"' v-vtap="{method:copyText}">复制</span>
        </div>
      </div>
      <submit-btn class='subBtn' btnTxt='复制完成,去转账' @v-tap='go' :verify-ok='verifyYes'></submit-btn>
    </div>
    <mpvue-picker themeColor="#007AFF" ref="typePick" mode="selector" :deepLength="1" :pickerValueDefault="[0]" @onConfirm="onConfirm" @onCancel="onCancel" :picker-value-array="pickerValueArray"></mpvue-picker>

  </div>
</template>

<script>
import inputItem from '@/components/commonResgLog/inputItem.vue'
import submitBtn from '@/components/commonResgLog/submitBtn.vue'
import errTip from '@/components/commonResgLog/errtip.vue'
import mpvuePicker from '@/components/mpvuePicker.vue';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      uName: '',
      showErr: false,
      tipContent: '',
      bankCode: '',
      bankName: '',
      verifyYes: true,//验证通过，把它至为true,登录按钮才会变色且启用
      paymoney: '',
      paytype: '',
      pw_id: '',
      cardname: '',
      cardno: '',
      pickerText: '',
      pickerValueArray: [],
    };
  },
  components: { submitBtn, inputItem, errTip, mpvuePicker },
  computed: mapState(['mobile', 'userinfo', 'bankinfo']),
  created() {
    this.paytype = this.bankinfo.paytype
    this.cardname = this.bankinfo.cardname
    this.cardno = this.bankinfo.cardno
    this.pw_id = this.bankinfo.pw_id
    this.paymoney = this.bankinfo.paymoney
    this.bankCode = this.bankinfo.bankCode
    if (this.paytype == 'remit_alipay') {
      this.bankName = this.bankinfo.uName
    } else if (this.paytype.indexOf('remit') != -1) {
      this.bankName = this.bankinfo.bank_name
      this.pickerText = this.bankinfo.bank_name
      this.pickerValueArray = [{ label: this.bankinfo.bank_name }]
    }
  },
  methods: {
    go(i) {
      if (i == 1) {
        this.$navigateTo({ url: '../help/help' })
      }
      switch (this.paytype) {
        case 'remit_alipay':
          // case 'remit_qrcode_ali':
          this.remit_alipay()
          break
        default:
          this.remit_bank()
          break
      }
    },
    copyText(e) {
      var oInput = document.createElement('textarea');
      oInput.value = e.target.previousElementSibling.innerText;
      document.body.appendChild(oInput);
      oInput.select();
      oInput.setSelectionRange(0, oInput.value.length)
      document.execCommand('copy');
      document.body.removeChild(oInput);
      this.$toast('复制成功')
    },
    // 支付宝支付
    remit_alipay() {
      var options = {
        url: '/Sapi/Ufund/remit_alipay', 
        method: 'POST',
        data: {
          pay_money: this.paymoney,
          // 转账人
          pay_name_alipay: this.bankName,
          // 转账账号
          pay_account_no: this.bankCode
        },
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.$toast.success({
            message: res.info ? res.info : '信息提交成功',
          })
          location.href = this.bankinfo.orcode_url
          this.$redirectTo({ url: '/pages/assets_sub/recording/recording' })
        } else {
          this.$toast.fail({
            message: res.info ? res.info : '信息提交失败'
          })
        }
      }).catch((err) => {
        
      })
    },
    // 银行卡支付
    remit_bank() {
      var options = {
        url: '/Sapi/Ufund/remit_bank', 
        method: 'POST',
        data: {
          pay_money: this.paymoney,
          // 银行id
          pw_id: this.bankinfo.pw_id,
          pay_name_bank: this.bankCode
        },
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.$toast.success({
            message: res.info ? res.info : '信息提交成功',
          })
          this.$redirectTo({ url: '/pages/assets_sub/recording/recording' })
        } else {
          this.$toast.fail({
            message: res.info ? res.info : '信息提交失败',
          })
        }
      }).catch((err) => {
        
      })
    },
    showPicker() {
      this.$refs.typePick.show()
    },
    onCancel(e) {
    },
    onConfirm(val) {
      this.pickerText = val.label
    },
  },

}
</script>


<style lang="scss" scoped>
div.wrap {
  height: 100vh;
  // background-color: #f5f5f5;
  div.title {
    font-size: 16px;
    padding-left: 0.27rem;
    color: rgba(24, 28, 40, 1);
    line-height: 0.84rem;
    height: 0.84rem;
    border-top: solid 1px #f5f5f5;
  }
  div.subWrap {
    padding: 0.28rem.27rem 0;
    margin-top: 0.12rem;
    background-color: #fff;
    .ellipsis {
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 60%;
      display: inline-block;
      vertical-align: middle;
      white-space: nowrap;
    }
    div.gatherInfo {
      // background-color: rgb(238,237,242);
      margin-top: 0.2rem;
    }
    div.subBtn {
      margin-top: 0.7rem;
    }

    div.payMoney {
      height: 0.8rem;
      border-bottom: 1px solid $blackTxt2;

      line-height: 0.8rem;
      color: grey;
      font-size: 15px;
      margin-left: 0.1rem;
      margin-top: 0.2rem;
    }
    div.payMoney.hasCopy {
      .copySpan {
        margin-right: 10px;
        color: $primary1;
        float: right;
        border: solid 1px $primary1;
        width: 1.6rem;
        height: 0.64rem;
        text-align: center;
        line-height: 0.64rem;
      }
    }
    div.payMoney > span:nth-child(2) {
      margin-left: 0.3rem;
    }
    div.payMoney > span:nth-child(1) {
      width: 68px;
      display: inline-block;
    }
  }
}
div.chooseCount {
  display: inline-block;
  width: 4.5rem;
  height: 0.5rem;
  line-height: 0.5rem;
  /*text-align: center;*/
  font-size: 12px;
  font-family: Adobe Heiti Std R;
  font-weight: normal;
  color: rgba(102, 102, 102, 1);
  line-height: 43px;
  /*background: rgba(239, 239, 239, 1);*/
  border-radius: 0.08rem;
  margin-left: 0.5rem;
  span.arrowDown {
    display: inline-block;
    width: 0.17rem;
    border: 0.09rem solid #666;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
  }
}
</style>
