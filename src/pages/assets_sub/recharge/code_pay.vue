<template>
  <div class="wrap black1">
    <base-header title="充值信息确认" has-back='1'></base-header>
    <div class="codeContainer black2">
      <img :src="obj.orcode">
    </div>
    <div class="info1 black2">
      <div class="orderCode">
        <span class="textc2">充值单号</span>
        <input type="tel" maxlength="6" v-model="orderCode" class="fgrow1  black2" placeholder="请输入单号后六位">
      </div>
      <div class="secend ">
        <span class="textc2">充值金额</span>
        <div class="uni-flex fgrow1 blackBorder">
          <span class="moneySpan textc1">{{money}}</span>
          <span class="mr10 textc1">元</span>
        </div>
      </div>
    </div>
    <div class="info2  black2">
      <div class="blackBorder"><span class="span1 textc2 ">支付方式</span><span class="textc1">{{obj.pay_name}}</span></div>
      <div><span class="span1 textc2">收款方<span class="empty"></span></span><span class="textc1">{{obj.cardname}}</span></div>
    </div>
    <btn-block txt='完成付款，点击提交订单' @v-tap='go'></btn-block>

  </div>

</template>
<script>
import btnBlock from '@/components/btnBlock.vue'

export default {
  data() {
    return {
      obj: {},
      money: 0,
      orderCode: ''
    }
  },
  components: { btnBlock },
  created() {
    this.obj = this.$route.query.obj
    this.money = this.$route.query.pay_money
  },
  methods: {
    go() {
      if (this.orderCode.length !== 6) {
        this.$toast.fail({
          message: '请输入单号后六位'
        })
        return
      }
      var options = {
        url: '/Sapi/Ufund/remit_other', //请求接口
        method: 'POST',
        data: {
          pay_money: this.money,
          pay_name_other: this.orderCode,
          pay_code: this.obj.pay_code
        },
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.$redirectTo({ url: '/pages/assets_sub/recording/recording' })
        } else {
          this.$toast.fail({
            message: res.info ? res.info : '信息提交失败',
          })
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  min-height: 100vh;
  background-color: #f5f5f5;
  .codeContainer {
    text-align: center;
    background-color: #fff;
    margin: 0.11rem 0;
    padding: 0.89rem 0;
    img {
      width: 3.42rem;
      height: 3.42rem;
    }
  }
  .fgrow1 {
    flex-grow: 1;
  }
  .info1 {
    background-color: #fff;
    padding: 0.22rem 0.26rem;
    div {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
      }
    }
    .secend {
      margin-top: 0.46rem;
      > div {
        margin-left: 0.08rem;
        border-bottom: 1px solid #ccc;
        padding-bottom: 0.1rem;
        .mr10 {
          margin-right: 10px;
          color: #333;
        }
      }
      .moneySpan {
        font-size: 16px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin-left: 5px;
      }
    }
    .orderCode {
      input {
        border-bottom: 1px solid #ccc;
        margin-left: 0.08rem;
        padding-left: 5px;
        padding-bottom: 0.1rem;
      }
      input::-webkit-input-placeholder {
        font-size: 14px;
        color: rgba(204, 204, 204, 1);
      }
    }
  }
  .info2 {
    background-color: #fff;
    padding: 0 0.26rem;
    margin: 0.12rem 0 0.32rem;
    > div:first-child {
      border-bottom: 1px solid #ccc;
    }
    div {
      padding: 0.4rem 0;
      line-height: 14px;
      .span1 {
        color: rgba(102, 102, 102, 1);
        text-align: justify;
        display: inline-block;
        width: 4.1em;
        margin: 0;
        overflow: hidden;
        height: 14px;
        .empty {
          display: inline-block;
          padding-left: 100%;
        }
      }
      span {
        color: #333;
        margin-left: 0.18rem;
        vertical-align: middle;
      }
    }
  }
}
</style>
