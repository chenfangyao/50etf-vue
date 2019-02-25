<template>
  <div class="wrap">
    <base-header  :hasBack="true" :title='title'></base-header>
    <div class="border1"></div>
    <div class="wrap ">
      <div class="title textc1">止{{isFull==1?'盈':'损'}}设置</div>
      <div class="subTitle textc2">止{{isFull==1?'盈':'损'}}功能，当日有效！</div>
      <div class="subTitle textc2">最新价：</div>
      <div class="price">{{resObj.last_price}}</div>
      <div class="inputContainer">
        <input-item class="partinput-style" :placeholderTxt="isFull==1?'止盈值':'止损值'" v-model="inputPrice"  ></input-item>
      </div>
      <div class="zyzsspan"><span>单张盈亏：{{singykprice}}</span><span>盈亏比：{{singykroute}}%</span></div>
      <submit-btn btnTxt='确定' @v-tap='handleNext' :verify-ok='verifyYes'></submit-btn>
    </div>
  </div>
</template>

<script>
import submitBtn from '@/components/commonResgLog/submitBtn.vue'
import inputItem from '@/components/commonResgLog/inputItem.vue'
export default {
  data() {
    return {
      isFull: '',
      inputPrice: '0.99',
      verifyYes: true,
      title:'',
      resObj:{},
      singykprice:'0.00',
      singykroute:'0.00',
    };
  },
  watch: {
    inputPrice(val) {
      // 成交价
      this.singykprice=parseFloat(this.inputPrice-this.resObj.avg_buy_price).toFixed(4)

      this.singykroute=parseFloat(this.singykprice*100/this.resObj.avg_buy_price).toFixed(4)
    },

  },
  components: { submitBtn, inputItem },
  methods: {
    handleNext() {
      let sltp_price_tp='',sltp_price_sl='',sltp_name=''
      if(this.isFull==1){
        sltp_price_tp=this.inputPrice
        sltp_price_sl=this.resObj.sltp_price_sl
        sltp_name='止盈'
      }else{
        sltp_price_tp=this.resObj.sltp_price_tp
        sltp_price_sl=this.inputPrice
        sltp_name='止损'
      }
      if(parseFloat(this.inputPrice)<=0.001){
        this.$toast(""+sltp_name+"价格设置不能低于0.001！")
        return
      }
     // this.$router.goBack()
      var options = {
        url: '/Sapi/Hold/sltp_set', //请求接口
        method: 'POST', //请求方法全部大写，默认GET
        data: {
          hid: parseInt(this.resObj.id),
          // 止盈价
          sltp_price_tp: parseFloat(sltp_price_tp),
          // 止损价
          sltp_price_sl: parseFloat(sltp_price_sl)
        },
        // header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }

      this.$dialog.confirm({
        title: '设置'+sltp_name+'',
        message: ''+sltp_name+'价：'+this.inputPrice+''
      }).then(() => {
        // on confirm
        this.$httpReq(options).then((res) => {
          if (res.status) {
            this.$toast(res.info?res.info:'设置成功')
          }
          else {
            this.$toast(res.info ? res.info : '设置失败')
          }
        }).catch((err) => {
          // 请求失败的回调
          console.error(err,'捕捉')
          this.$toast('设置失败')
        })
      }).catch(() => {
        // on cancel
      });

    },
  },
  mounted() {
    this.resObj=this.$route.query.resObj
    this.isFull = this.$route.query.isfull
    this.price=this.$route.query.price
    this.code=this.$route.query.code
    if(this.isFull==1){
      this.title='止盈'
      if(this.resObj.sltp_price_tp){
        this.inputPrice=this.resObj.sltp_price_tp
      }else{
        this.inputPrice=this.resObj.avg_buy_price
      }
    }else{
      this.title='止损'
      if(this.resObj.sltp_price_sl){
        this.inputPrice=this.resObj.sltp_price_sl
      }else{
        this.inputPrice=this.resObj.avg_buy_price
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div.border1 {
  border-bottom: 1px solid #ededed;
}
div.wrap {
  padding: 0.23rem;
  min-height: 100vh;
  div.title {
    font-size: 20px;
    line-height: 20px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin:.49rem 0.35rem;
  }
  div.subTitle {
    font-size: 13px;
    color: rgba(102, 102, 102, 1);
    line-height: 24px;
  }
  div.price {
    font-size: 24px;
    font-weight: bold;
    margin:.33rem 0 1.54rem.12rem;

    color: rgba(240, 95, 92, 1);
  }
  div.inputContainer{
    padding: 0.12rem;
    margin-bottom:-0.1rem;
  }
  div.zyzsspan{
    padding-left: 0.12rem;
    margin-bottom:.8rem;
    span:nth-child(2) {
     /*color: #fcd334;*/
      margin-left: .5rem;
     }
  }
  div.inputContainer .partinput-style{
    margin-bottom:.1rem
  }
}
</style>
