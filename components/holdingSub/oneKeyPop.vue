<template>
  <view class="mask uni-flex">
    <view :class="['container',{show}]">
      <view class="title">
        <text @tap="closePop" class="uni-icon uni-icon-close flr"></text>
        <text >一键平仓确认</text>
      </view>
      <view class="list uni-flex">
        <view class="uni-flex">
          <text>合约名称</text>
          <text>合约代码</text>
          <text>委托价格</text>
          <text>委托数量</text>
          <text>有效期</text>
          <text >预估支付金额</text>
        </view>
        <view class="uni-flex">
          <text>{{resObj.stock_name}}</text>
          <text>{{resObj.stock_code}}</text>
          <text class="c_red">{{resObj.last_price}}</text>
          <text>{{resObj.own_amount}}张</text>
          <text>
            <text>开仓</text>
            <text class="c_red">{{50}}秒</text>未成单自动撤单</text>
          <text >{{resObj.market_value}}</text>
        </view>
      </view>
      <view class="btn2 uni-flex">
        <view hover-class='tap-hover' @tap='closePop'>取消</view>
        <view hover-class='tap-hover' @tap='stocksell'>确定</view>
      </view>
    </view>
  </view>
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
				uni.showToast({
					title: '当前价格无法一键平仓',
					mask: false,
					duration: 1500
				});
				return
			}
      let hid = ''
      var options = {
        url: '/Sapi/Stock/sell', //请求接口
        method: 'POST', //请求方法全部大写，默认GET
        data: {
          price: this.resObj.last_price,
          code: this.resObj.stock_code,
          amount: this.resObj.own_amount,
          enttype: 1,
          hid: hid
        },
      }
      this.$httpReq(options).then((res) => {
       this.$emit('close-pop','deep')

        if (res.status) {
          uni.navigateTo({   url: '/pages/quotes_sub/entrust_succ/entrust_succ?type=' + this.onClose + '&code=' + parseInt(this.resObj.stock_code) + ''})
        } else {
          uni.showToast({
            title: res.info ? res.info : '卖出失败',
            duration: 2000,
            icon:'none'
          });
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
    margin: 0 35upx;
    background: #fff;
    border-radius: 10upx;
    z-index: 310;
    padding: 28upx 30upx 20upx;
    .c_red {
      color: #f05f5c;
    }
    view.title {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      color: rgba(24, 28, 40, 1);
      position: relative;
      margin-bottom: 55upx;
      .flr {
        position: absolute;
        left: -10upx;
        top: 4px;
      }
    }
    view.list {
      justify-content: space-between;
      > view {
        flex-direction: column;
        color: #181c28;
        font-size: 12px;
        line-height: 52upx;
        flex-grow: 1;
      }
      > view:first-child {
        color: #707680;
      }
    }
    view.btn2 {
      justify-content: space-between;
      margin-top: 53upx;
      > view {
        flex-grow: 1;
        height: 88upx;
        border-radius: 10upx;
        font-size: 16px;
        color: rgba(255, 255, 255, 1);
        line-height: 88upx;
        text-align: center;
      }
      > view:first-child {
        background: rgba(153, 153, 153, 1);
        margin-right: 20upx;
      }
      > view.tap-hover:first-child {
        background: darken(rgba(153, 153, 153, 1), 5%);
      }
      > view:last-child {
        background: #409de5;
      }
      > view.tap-hover:last-child {
        background: darken(#409de5, 5%);
      }
    }
  }
  .container.show {
    transform: scale(1, 1);
  }
}
</style>
