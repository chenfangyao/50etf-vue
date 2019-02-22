<template>
  <div class="mask uni-flex">
    <div :class="['container black4',{show}]">
      <div class="title textc1">
        <span @click="closePop" class="uni-icon uni-icon-close flr"></span>
        <span v-if="holding">一键平仓确认</span>
        <span v-else>委托{{onClose?'平仓':'开仓'}}确认</span>
      </div>
      <div class="list uni-flex">
        <div class="uni-flex textc2">
          <span>合约名称</span>
          <span>合约代码</span>
          <span>委托价格</span>
          <span v-if="onClose">委托类型</span>
          <span>委托数量</span>
          <span v-if="onClose">剩余可用</span>
          <span v-else-if="holding">预计交易后持仓</span>
          <span v-else>可用资金</span>
          <span>有效期</span>
          <span v-if="onClose">预估金额</span>
          <span v-else>预估支付金额</span>
        </div>
        <div class="uni-flex textc1">
          <span>{{subCodeName}}</span>
          <span>{{resObj.stockCode}}</span>
          <span class="c_red">{{newprice}}</span>
          <span v-if="onClose"><span v-if='entrusttype'>分笔</span><span v-if="!entrusttype">合并</span></span>
          <span>{{stockamunt}}张</span>
          <span v-if="onClose">{{maxbuy.enable_amount}}张</span>
          <span v-else>{{enable_money}}</span>
          <span>
            <span>开仓</span>
            <span class="c_red">{{50}}秒</span>未成单自动撤单</span>
          <span v-if="onClose">{{totalMoney}}</span>
          <span v-else>{{totalMoney}}</span>
        </div>
      </div>
      <div class="btn2 uni-flex">
        <div v-hover-class="'tap-hover'" class="black2" @click='closePop'>取消</div>
        <div v-hover-class="'tap-hover'" @click='yesTap'>确定</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      show: false,
      subCodeName: '',
      enable_money: ''
    }
  },
  computed: mapState(['newprice', 'stockamunt', 'enttype', 'entrusttype', 'maxbuy', 'fbccid','hbfbcell']),
  methods: {
    closePop: function () {
      this.$emit('close-pop')
    },
    yesTap() {
      this.$emit('close-pop')
			//平仓
      if (this.onClose) {
				if(this.newprice<0.0002){
					this.$toast.fail({
            message:'当前价格无法平仓！'
          })
					return
				}
				if(this.hbfbcell.length && !this.entrusttype){
					// 全部平仓
					if(this.hbfbcell[0]==='all'){
						this.stocksell('',this.maxbuy.enable_amount)
					}else{//合并分笔平仓
            // 定时器选执行一次
            var idnumber=this.hbfbcell[0].split('-')
            console.log(444,idnumber)
            this.stocksell(parseInt(idnumber[1]),parseInt(idnumber[0]))
						var ii=1
						var hbfbcellinterval=null
            // 执行定时器
						hbfbcellinterval=setInterval(()=>{
							if(ii<this.hbfbcell.length){
								var hynum=this.hbfbcell[ii].split('-')[0]
								var hyids=this.hbfbcell[ii].split('-')[1]
								this.stocksell(parseInt(hyids),parseInt(hynum))
									ii+=1
							}else{
								clearInterval(hbfbcellinterval)
							}
						},3500)
					}
				}else{//分笔平仓
					this.stocksell(this.fbccid,this.stockamunt)

				}
      } else {//开仓
        this.stockbuy()
      }
    },
    // 获取资金列表
    getassets() {
      var options = {
        url: '/Sapi/User/asset', //请求接口
        method: 'GET', //请求方法全部大写，默认GET
      }
      this.$httpReq(options).then((res) => {
        if (res.status == 1) {
          this.enable_money = res.data.enable_money
        }
      }).catch((err) => {
        // 请求失败的回调
        console.error(err,'捕捉')
      })
    },
    stockbuy() {
      console.log(111,this.priceshock(),this.newprice)
      var options = {
        url: '/Sapi/Stock/buy', //请求接口
        method: 'POST', //请求方法全部大写，默认GET
        data: {
          code: parseInt(this.resObj.stockCode),
          price: this.enttype==2?this.priceshock():parseFloat(this.newprice),
          amount: parseInt(this.stockamunt),
          enttype: parseInt(this.enttype),
          is_pay_bean: 0
        },
        // header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.$redirectTo({
            url:'/entrustSucc',
            query:({
              type:this.onClose,
              code:parseInt(this.resObj.stockCode)
            })
          })
        }
        else {
          this.$toast(res.info ? res.info : '买入失败')
        }
      }).catch((err) => {
        // 请求失败的回调
        console.error(err,'捕捉')
      })
    },
    stocksell(fbccid,number) {
      let hid=parseInt(fbccid)
      if (this.entrusttype || this.hbfbcell.length) {
        hid = parseInt(fbccid)
      }
      console.log(222,this.priceshock(),this.newprice)
      var options = {
        url: '/Sapi/Stock/sell', //请求接口
        method: 'POST', //请求方法全部大写，默认GET
        data: {
          code: parseInt(this.resObj.stockCode),
          price: this.enttype==2?this.priceshock():parseFloat(this.newprice),
          amount: number,
          enttype: parseInt(this.enttype),
          hid: hid
        },
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.$toast.success(res.info ? res.info : '卖出成功')
           this.$redirectTo({
            url: '/entrustSucc' ,
            query:{
              type:this.onClose,
              code:parseInt(this.resObj.stockCode)
            }
          })
        }
        else {
          this.$toast(res.info ? res.info : '卖出失败')
        }
      }).catch((err) => {
        // 请求失败的回调
        console.error(err,'捕捉')
      })
    },
    priceshock(){
      let shockprice=''
      let curruentPrice=parseFloat(this.newprice)
      if(curruentPrice > 0.3){
        if(this.onClose == false){
          shockprice = curruentPrice*1.01;
        }else {
          shockprice = curruentPrice*0.99;
        }
      }else if(0.1<curruentPrice && curruentPrice<=0.3){
        if(this.onClose == false){
          shockprice = curruentPrice*1.025;
        }else {
          shockprice = curruentPrice*0.975;
        }
      }
      else if(0.01<curruentPrice && curruentPrice<=0.1){
        if(this.onClose == false){
          shockprice = curruentPrice*1.05;
        }else {
          shockprice = curruentPrice*0.95;
        }
      }
      else if(0.001<curruentPrice && curruentPrice<=0.01){
        if(this.onClose == false){
          shockprice = curruentPrice*1.1;
        }else {
          shockprice = curruentPrice*0.9;
        }
      }
      return shockprice.toFixed(4)
    }
  },
  props: ['onClose', 'holding', 'resObj', 'totalMoney'],
  created() {
    this.getassets()
    setTimeout(
      () => { this.show = true }, 10
    )
  },
  mounted() {
    this.subCodeName = this.resObj.stockName.substring(5)

  }
}
</script>

<style scoped lang="scss">
.mask {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 300;
  align-items: center;
  .container {
    transform: scale(0, 0);
    transition: transform 300ms;
    overflow: hidden;
    flex-grow: 1;
    margin: 0 .35rem;
    background: #fff;
    border-radius:.10rem;
    z-index: 310;
    padding:.28rem .30rem .20rem;
    .c_red {
      color: #f05f5c;
    }
    div.title {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      color: rgba(24, 28, 40, 1);
      position: relative;
      margin-bottom:.55rem;
      .flr {
        position: absolute;
        left: -0.1rem;
        top: 4px;
      }
    }
    div.list {
      justify-content: space-between;
      > div {
        flex-direction: column;
        color: #181c28;
        font-size: 12px;
        line-height:.52rem;
        flex-grow: 1;
      }
      > div:first-child {
        color: #707680;
      }
    }
    div.btn2 {
      justify-content: space-between;
      margin-top:.53rem;
      > div {
        flex-grow: 1;
        height:.88rem;
        border-radius:.10rem;
        font-size: 16px;
        color: rgba(255, 255, 255, 1);
        line-height:.88rem;
        text-align: center;
      }
      > div:first-child {
        background: rgba(153, 153, 153, 1);
        margin-right:.20rem;
      }
      > div.tap-hover:first-child {
        background: darken(rgba(153, 153, 153, 1), 5%);
      }
      > div:last-child {
        background: #409de5;
      }
      > div.tap-hover:last-child {
        background: darken(#409de5, 5%);
      }
    }
  }
  .container.show {
    transform: scale(1, 1);
  }
}
</style>
