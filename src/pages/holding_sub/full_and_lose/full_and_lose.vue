<template>
  <div class="wrap">
    <base-header :hasBack="true" :title="title+'设置'" :specialBack="true" @special-back="goBack"></base-header>
    <!--<div class="border1"></div>-->
    <div class="subTitle textc2 uni-flex black2 switchContainer">
      <span>开启止{{isFull==1?'盈':'损'}}功能，当日有效！</span>
      <van-switch size="20px" active-color='#ff3854' v-model="isOpen" />
    </div>
    <div class="wrap2 ">
      <div class="subTitle textc2">最新价：</div>
      <div class="priceTxt">{{resObj.last_price}}</div>
      <div class="subTitle textc2">
        <span>成交价：{{resObj.avg_buy_price}}</span>
        <span>持仓数：{{resObj.own_amount}}</span>
      </div>
      <div class="inputContainer">
        <input-item what-icon='' class="partinput-style" :placeholderTxt="isFull==1?'止盈值':'止损值'"  v-model="inputPrice"></input-item>
        <span class="inputspan">{{title}}值{{moreless}}于最新价生效</span>
      </div>
      <div class="zyzsspan textc2"><span>单张盈亏：{{singykprice}}</span><span>盈亏比：{{singykroute}}%</span></div>
      <div class="subTitle textc2 margin-bottom">当最新价{{isFull==1?'≥':'≤'}}止{{isFull==1?'盈':'损'}}价时，触发市价止{{isFull==1?'盈':'损'}}卖出</div>
      <submit-btn btnTxt='确定' @v-tap='handleNext' :verify-ok='verifyYes'></submit-btn>
    </div>
  </div>
</template>

<script>
import submitBtn from '@/components/commonResgLog/submitBtn.vue'
import inputItem from '@/components/commonResgLog/inputItem.vue'
import { Switch } from 'vant';

export default {
  data() {
    return {
      isFull: '',
      inputPrice: '',
      verifyYes: true,
      title: '',
      isOpen: false,
      resObj: {},
      singykprice: '0.00',
      singykroute: '0.00',
      valChange: false,
      sureChange: false,
      moreless: ''
    };
  },
  watch: {
    inputPrice(val) {
      // 成交价
      this.singykprice = parseFloat(val - this.resObj.avg_buy_price).toFixed(4)
      this.singykroute = parseFloat(this.singykprice * 100 / this.resObj.avg_buy_price).toFixed(4)
      // this.valChange=true
    },

  },

  components: { submitBtn, inputItem, [Switch.name]: Switch },
  methods: {
    handleNext() {
      let sltp_price_tp = '', sltp_price_sl = '', sltp_name = '', toastTxt = ''
      if (parseFloat(this.inputPrice) <= 0.001) {
        toastTxt = "价格设置不能低于0.001！"
      }
      if (this.isFull == 1) {
        if (this.inputPrice <= this.resObj.last_price) toastTxt = '价必须大于最新价'
        sltp_price_tp = this.inputPrice
        sltp_price_sl = this.resObj.sltp_price_sl
        sltp_name = '止盈'
      } else {
        if (this.inputPrice >= this.resObj.last_price) toastTxt = '价必须小于最新价'
        sltp_price_tp = this.resObj.sltp_price_tp
        sltp_price_sl = this.inputPrice
        sltp_name = '止损'
      }
      if (toastTxt) {
        this.$toast(sltp_name + toastTxt)
        return
      }
      // this.$router.goBack()
      var options = {
        url: '/Sapi/Hold/sltp_set',
        method: 'POST',
        data: {
          hid: parseInt(this.resObj.id),
          // 止盈价
          sltp_price_tp: parseFloat(sltp_price_tp),
          // 止损价
          sltp_price_sl: parseFloat(sltp_price_sl),
        },
      }
      if (this.isFull) {
        options.data.sltp_effect_tp = this.isOpen?1:2
      } else {
        options.data.sltp_effect_sl = this.isOpen?1:2
      }
      this.$dialog.confirm({
        title: '设置' + sltp_name,
        message: sltp_name + '：' + (this.isOpen?this.inputPrice:'关' )
      }).then(() => {
        // on confirm
        this.sureChange = true
        this.$httpReq(options).then((res) => {
          if (res.status) {
            this.$toast(res.info ? res.info : '设置成功')
          }
          else {
            this.$toast(res.info ? res.info : '设置失败')
          }
        }).catch((err) => {

          console.error(err, '捕捉')
          this.$toast('设置失败')
        })
      }).catch(() => {
        // on cancel
      });

    },
    goBack() {
     /*  if (this.changePrice != this.inputPrice && !this.sureChange) {
        this.$dialog.confirm({
          title: '' + this.title + '值未确认',
          message: '您设置的止盈值，未确认，是否直接返回上一级页面'
        }).then(() => {
          this.$router.goBack()
        }).catch(() => {
          // on cancel
        });
      } else {
        } */
        this.$router.goBack()

    }
  },
  mounted() {
    this.resObj = this.$route.query.resObj
    this.isFull = this.$route.query.isfull
    this.code = this.$route.query.code
    if (this.isFull == 1) {
      this.title = '止盈'
      this.moreless = '大'
      this.inputPrice = this.resObj.sltp_price_tp
      this.isOpen = this.resObj.sltp_effect_tp == 1
    } else {
      this.title = '止损'
      this.moreless = '小'
      this.inputPrice = this.resObj.sltp_price_sl
      this.isOpen = this.resObj.sltp_effect_sl == 1
    }
  }
}
</script>

<style lang="scss" scoped>
div.border1 {
  border-bottom: 1px solid #ededed;
}
.switchContainer {
  justify-content: space-between;
  height: 49px;
  align-items: center;
  padding: 0 0.23rem;
}
.subTitle {
  font-size: 13px;
  color: rgba(102, 102, 102, 1);
  line-height: 24px;
}
div.wrap2 {
  padding: 0.23rem;
  min-height: 100vh;
  div.title {
    font-size: 20px;
    line-height: 20px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin: 0.49rem 0.35rem;
  }

  div.priceTxt {
    font-size: 24px;
    font-weight: bold;
    margin: 0 0 0 0.12rem;

    color: rgba(240, 95, 92, 1);
  }
  div.inputContainer {
    padding: 0.12rem;
    margin-bottom: -0.1rem;
  }
  div.zyzsspan {
    margin: 10px 0;
    span:nth-child(2) {
      /*color: #fcd334;*/
      margin-left: 0.5rem;
    }
  }
  div .margin-bottom {
    margin-bottom: 0.8rem;
  }
  div.inputContainer {
    position: relative;
    .partinput-style {
      margin-bottom: 0.1rem;
      margin-top: 1rem;
    }
    .inputspan {
      position: absolute;
      right: 6px;
      bottom: 10px;
      color: rgba(240, 95, 92, 1);
    }
  }
}
</style>
