<template>
  <div class="mask uni-flex">
    <div :class="['container',{show}]">
      <div class="title">
        <span v-vtap="{method:closePop}" class="uni-icon uni-icon-close flr"></span>
        <span >一键平仓确认</span>
      </div>
      <div class="list uni-flex">
        <div class="uni-flex">
          <span>合约名称</span>
          <span>合约代码</span>
          <span>委托价格</span>
          <span>委托数量</span>
          <span>有效期</span>
          <span >预估支付金额</span>
        </div>
        <div class="uni-flex">
          <span>{{resObj.stock_name}}</span>
          <span>{{resObj.stock_code}}</span>
          <span class="c_red">{{resObj.last_price}}</span>
          <span>{{resObj.own_amount}}张</span>
          <span>
            <span>开仓</span>
            <span class="c_red">{{50}}秒</span>未成单自动撤单</span>
          <span >{{resObj.market_value}}</span>
        </div>
      </div>
      <div class="btn2 uni-flex">
        <div v-hover-class="'tap-hover'" v-vtap="{method:closePop}">取消</div>
        <div v-hover-class="'tap-hover'" v-vtap="{method:stocksell}">确定</div>
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
      enable_money: ''
    }
  },
  methods: {
    closePop: function () {
      this.$emit('close-pop')
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
    stocksell() {
			if(this.resObj.last_price<0.0002){
				this.$toast.fail({
          message:'当前价格无法一键平仓'
        })
				return
			}
      var options = {
        url: '/Sapi/Stock/sell', //请求接口
        method: 'POST', //请求方法全部大写，默认GET
        data: {
          price: this.resObj.last_price,
          code: this.resObj.stock_code,
          amount: this.resObj.own_amount,
          enttype: 2,
          hid: this.resObj.id
        },
      }
      this.$httpReq(options).then((res) => {
       this.$emit('close-pop','deep')

        if (res.status) {
           this.$redirectTo({
            url: '/entrustSucc' ,
            query:{
              type:this.onClose,
              code:parseInt(this.resObj.stock_code)
            }
          })
        } else {
          this.$toast(res.info ? res.info : '卖出失败',)
        }

      }).catch((err) => {
        // 请求失败的回调
        console.error(err,'捕捉')
      })
    }
  },
  props: ['onClose', 'resObj',],
  created() {
    this.getassets()
    setTimeout(
      () => { this.show = true }, 10
    )
  },
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
    margin: 0.35rem;
    background: #fff;
    border-radius:.10rem;
    z-index: 310;
    padding:.28rem.30rem.20rem;
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
