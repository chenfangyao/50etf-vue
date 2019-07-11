<template>
  <div class="mask uni-flex">
    <div :class="['container  black2',{show}]">
      <div class="title textc1">一键平仓确认</div>
      <div class="list uni-flex textc1">
        <div class="uni-flex ">
          <span>合约名称</span>
          <span>合约代码</span>
          <span>委托价格</span>
          <span>委托数量</span>
          <span>有效期</span>
          <span>预估金额</span>
        </div>
        <div class="uni-flex">
          <span>{{resObj.stock_name}}</span>
          <span>{{resObj.stock_code}}</span>
          <span class="c_red">{{resObj.last_price}}</span>
          <span>{{resObj.own_amount}}张</span>
          <span>
            <span class="c_red">{{50}}秒</span>未成单自动撤单</span>
          <span>{{resObj.market_value}}</span>
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
        url: '/Sapi/User/asset',
        method: 'GET',
      }
      this.$httpReq(options).then((res) => {
        if (res.status == 1) {
          this.enable_money = res.data.enable_money
        }
      }).catch((err) => {

        console.error(err, '捕捉')
      })
    },
    stocksell() {
      if (this.resObj.last_price < 0.0002) {
        this.$toast.fail({
          message: '当前价格无法一键平仓'
        })
        return
      }
      var options = {
        url: '/Sapi/Stock/sell',
        method: 'POST',
        data: {
          price: this.resObj.last_price,
          code: this.resObj.stock_code,
          amount: this.resObj.own_amount,
          enttype: 2,
          hid: this.resObj.id
        },
      }
      this.$httpReq(options).then((res) => {
        this.$emit('close-pop', 'deep')

        if (res.status) {
          this.$redirectTo({
            url: '/entrustSucc',
            query: {
              type: this.onClose,
              code: parseInt(this.resObj.stock_code)
            }
          })
        } else {
          this.$toast(res.info ? res.info : '卖出失败')
        }

      }).catch((err) => {

        console.error(err, '捕捉')
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
    border-radius: 0.1rem;
    z-index: 310;
    padding: 0.28rem 0.7rem 0.2rem;
    .c_red {
      color: #f05f5c;
    }
    div.title {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      color: #333;
      padding-bottom: 10px;
    }
    div.list {
      border-bottom: solid 1px #ccc;
      border-top: solid 1px #ccc;
      #app.at-night & {
        border: 0;
      }
      justify-content: space-between;
      color: #333;
      padding: 0.33rem 0;
      > div {
        flex-direction: column;
        font-size: 12px;
        flex-grow: 1;
        text-align: right;
        span {
          line-height: 2.6;
        }
      }
      > div:first-child {
        text-align: left;
      }
    }
    div.btn2 {
      justify-content: space-between;
      padding: 0.53rem 0;
      > div {
        flex-grow: 1;
        height: 0.88rem;
        border-radius: 0.1rem;
        width: 2.3rem;
        height: 0.8rem;
        font-size: 16px;
        color: rgba(255, 255, 255, 1);
        line-height: 0.8rem;
        text-align: center;
      }
      > div:first-child {
        margin-right: 0.2rem;
        color: $primary1;
        border: 1px solid $primary1;
        border-radius: 2px;
      }
      > div.tap-hover:first-child {
        border-color: darken($primary1, 25%);
      }
      > div:last-child {
        background: $primary1;
      }
      > div.tap-hover:last-child {
        background: darken($primary1, 15%);
      }
    }
  }
  .container.show {
    transform: scale(1, 1);
  }
}
</style>
