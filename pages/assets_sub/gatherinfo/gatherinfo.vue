<template>
	<view class="wrap"> 
		<base-header title="收款信息" has-back='1'  @right-tap='go(1)'></base-header>
    <!-- <view class="title">支付账号</view> -->
    <view class="subWrap">
		<view class='gatherInfo'>
		<view class='payMoney'>收款账号:{{}}</view>
		<view class='payMoney'>收款人:{{}}</view>
		<view class='payMoney'>客户代码:{{}}</view>
		</view>
      <submit-btn class='subBtn' btnTxt='复制完成,去支付宝转账'  @v-tap='go' :verify-ok='verifyYes'></submit-btn>
    </view>

	</view>
</template>

<script>
import inputItem from '@/components/commonResgLog/inputItem.vue'
import submitBtn from '@/components/commonResgLog/submitBtn.vue'
import errTip from '@/components/commonResgLog/errtip.vue'
export default {
  data() {
    return {
      uName: '',
      showErr: false,
      tipContent: '您的账号和密码错误，请重新输入',
      bankCode: '',
      bankName: '423423',
      verifyYes: true,//验证通过，把它至为true,登录按钮才会变色且启用
      paymoney:'',
	paytype:'',
	pw_id:''

    };
  },
  components: { submitBtn, inputItem, errTip },
	onLoad(opt){
		this.paytype=opt.paytype
		if(this.paytype=='remit_alipay'){
			this.paymoney=opt.paymoney
			this.bankName=opt.uName
			this.bankCode=opt.bankCode
		}else if(this.paytype=='remit_icbc'){
			this.paymoney=opt.paymoney
			this.bankCode=opt.bankCode
			this.pw_id=opt.pw_id
		}
	},
  methods: {
    go(i) {
//       if (i == 1) {
//         uni.navigateTo({ url: '../help/help' })
//       }
      switch(this.paytype){
				case 'remit_alipay':
				this.remit_alipay()
				break
				case 'remit_icbc':
				this.remit_bank()
				break
			}
			
    },
		// 支付宝支付
		remit_alipay(){
			var options = {
				url: '/Sapi/Ufund/remit_alipay', //请求接口
				method: 'POST', //请求方法全部大写，默认GET
				data: {
							pay_money: this.paymoney,
							// 转账人
							pay_name_alipay: this.bankName,
							// 转账账号
							pay_account_no: this.bankCode
									},
			}
			this.$httpReq(options).then((res) => {
				// 请求成功的回调
				// res为服务端返回数据的根对象
				console.log('支付信息', res)
				if(res.status){
				}
			}).catch((err) => {
				// 请求失败的回调
			})
		},
		// 银行卡支付
		remit_bank(){
			var options = {
				url: '/Sapi/Ufund/remit_bank', //请求接口
				method: 'POST', //请求方法全部大写，默认GET
				data: {
							pay_money: this.paymoney,
							// 银行id
							pw_id: 7,
							pay_name_bank: this.bankCode
									},
			}
			this.$httpReq(options).then((res) => {
				// 请求成功的回调
				// res为服务端返回数据的根对象
				console.log('支付信息', res)
				if(res.status){
				}
			}).catch((err) => {
				// 请求失败的回调
			})
		},
  },

}
</script>


<style lang="scss" scoped>
view.wrap {
  height: 100vh;
  // background-color: #f5f5f5;
  view.title {
    font-size: 16px;
    padding-left: 27upx;
    color: rgba(24, 28, 40, 1);
    line-height: 84upx;
    height: 84upx;
    border-top: solid 1px #f5f5f5;
  }
  view.subWrap {
    padding: 28upx 27upx 0;
    margin-top: 12upx;
    background-color: #fff;
	view.gatherInfo{
		// background-color: rgb(238,237,242);
		margin-top: 20upx;
	}
	view.subBtn{
		margin-top: 70upx;
	}
    
		view.payMoney{
			height: 80upx;
			line-height: 80upx;
			color:grey;
			font-size: 17px;
			margin-left: 10upx;
			border-bottom:1px solid rgb(238,237,242);
			margin-top: 20upx
		}
  }
}
</style>
