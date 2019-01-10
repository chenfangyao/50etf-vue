<template>
  <view class="mask uni-flex">
    <view :class="['container',{show}]">
      <view class="title">
        <text @tap="closePop" class="uni-icon uni-icon-close flr"></text>
        <text v-if="holding">一键平仓确认</text>
        <text v-else>委托{{onClose?'平仓':'开仓'}}确认</text>
      </view>
      <view class="list uni-flex">
        <view class="uni-flex">
          <text>合约名称</text>
          <text>合约代码</text>
          <text>委托价格</text>
          <text v-if="onClose">委托类型</text>
          <text>委托数量</text>
          <text v-if="onClose">剩余可用</text>
          <text v-else-if="holding">预计交易后持仓</text>
          <text v-else>可用资金</text>
          <text>有效期</text>
          <text v-if="onClose">预估金额</text>
          <text v-else>预估支付金额</text>
        </view>
        <view class="uni-flex">
          <text>{{subCodeName}}</text>
          <text>{{resObj.stockCode}}</text>
          <text class="c_red">{{newprice}}</text>
          <text v-if="onClose"><text v-if='entrusttype'>分笔</text><text v-if="!entrusttype">合并</text></text>
          <text>{{stockamunt}}张</text>
          <text v-if="onClose">{{maxbuy.enable_amount}}张</text>
          <text v-else>{{enable_money}}</text>
          <text>
            <text>开仓</text>
            <text class="c_red">{{50}}秒</text>未成单自动撤单</text>
          <text v-if="onClose">{{totalMoney}}</text>
          <text v-else>{{totalMoney}}</text>
        </view>
      </view>
      <view class="btn2 uni-flex">
        <view hover-class='tap-hover' @tap='closePop'>取消</view>
        <view hover-class='tap-hover' @tap='yesTap'>确定</view>
      </view>
    </view>
  </view>
</template>
<script>
import{ mapState } from 'vuex';
export default {
  data() {
    return {
      show: false,
      subCodeName: '',
	  enable_money:''
    }
  },
	computed: mapState(['newprice','stockamunt','enttype','entrusttype','maxbuy','fbccid']),
  methods: {
    closePop: function () {
      this.$emit('close-pop')
    },
    yesTap() {
      this.$emit('close-pop')
	  if(this.onClose){
		 this.stocksell() 
	  }else{
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
		this.enable_money=res.data.enable_money
	    }
	  }).catch((err) => {
	    // 请求失败的回调
	    console.error(err)
	  })
	},
	stockbuy(){
			var options = {
				url: '/Sapi/Stock/buy', //请求接口
				method: 'POST', //请求方法全部大写，默认GET
				data: {
					code: parseInt(this.resObj.stockCode),
                    price: parseFloat(this.newprice),
                    amount: parseInt(this.stockamunt),
                    enttype: parseInt(this.enttype),
                    is_pay_bean:0
				},
                // header: { 'Content-Type': 'application/x-www-form-urlencoded' },
			}
			this.$httpReq(options).then((res) => {
				console.log('买入',res)
				if(res.status){
					// uni.showToast({
					// title: res.info?res.info:'买入成功',
					// duration: 2000
					// });
					uni.navigateTo({
					  url: '/pages/quotes_sub/entrust_succ/entrust_succ?type='+this.onClose+'&code='+parseInt(this.resObj.stockCode)+''
					})
				}
				else{
					uni.showToast({
                    title: res.info?res.info:'买入失败',
                    duration: 2000
                    });
				}
			}).catch((err) => {
				// 请求失败的回调
				console.log(err)
			})
		},
		stocksell(){
			   let hid
			   if(this.entrusttype){
				 hid=parseInt(this.fbccid)  
			   }
				var options = {
					url: '/Sapi/Stock/sell', //请求接口
					method: 'POST', //请求方法全部大写，默认GET
					data: {
						code: parseInt(this.resObj.stockCode),
		                price: this.newprice,
		                amount: this.stockamunt,
		                enttype: parseInt(this.enttype),
		                hid:hid
					},
				}
				this.$httpReq(options).then((res) => {
					console.log('卖出',res)
					if(res.status){
						uni.showToast({
						title: res.info?res.info:'卖出成功',
						duration: 2000
						});
						uni.navigateTo({
						  url: '/pages/quotes_sub/entrust_succ/entrust_succ?type='+this.onClose+'&code='+parseInt(this.resObj.stockCode)+''
						})
					}
					else{
						uni.showToast({
		                title: res.info?res.info:'卖出失败',
		                duration: 2000
		                });
					}
				}).catch((err) => {
					// 请求失败的回调
					console.log(err)
				})
			}
  },
  props: ['onClose', 'holding', 'resObj','totalMoney'],
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
