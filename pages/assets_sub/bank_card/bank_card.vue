<template>
	<view class="wrap"> 
		<base-header title="支付银行" has-back='1' right-txt='帮助' @right-tap='go(1)'></base-header>
    <!-- <view class="title">支付账号</view> -->
    <view class="subWrap">
      <!-- <input-item placeholderTxt='银行名称' v-model="bankName" ></input-item> -->
			<view class='payMoney'>支付金额:{{paymoney}}</view>
			<view class=inputcommon>
      <input-item placeholderTxt='转账人' v-model="uName" ></input-item>
      <input-item placeholderTxt='银行卡号' v-model="bankCode" ></input-item>
			</view>
      <err-tip :err-class='showErr' :tip-content='tipContent'></err-tip>

      <submit-btn btnTxt='下一步'  @v-tap='go' :verify-ok='verifyYes'></submit-btn>
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
      bankName: '',
      verifyYes: true,//验证通过，把它至为true,登录按钮才会变色且启用
      paymoney:'',
			paytype:''

    };
  },
  components: { submitBtn, inputItem, errTip },
	onLoad(opt){
		this.paymoney=opt.pay_money
		this.paytype=opt.paytype
	},
  methods: {
    go(i) {
//       if (i == 1) {
//         uni.navigateTo({ url: '../help/help' })
//       }

      switch(this.paytype){
				case 'remit_alipay':
				uni.navigateTo({
					url: '/pages/assets_sub/gatherinfo/gatherinfo?paymoney='+this.paymoney+'&paytype='+this.paytype+'&uName='+this.uName+'&bankCode='+this.bankCode+'' ,
					})
				// this.remit_alipay()
				break
				case 'remit_icbc':
				uni.navigateTo({
					url: '/pages/assets_sub/gatherinfo/gatherinfo?paymoney='+this.paymoney+'&paytype='+this.paytype+'&pw_id=7&bankCode='+this.bankCode+'' ,
					})
				// this.remit_bank()
				break
			}
			
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
		view.payMoney{
			height: 80upx;
			background-color:rgb(242,242,242) ;
			line-height: 80upx;
			color:grey;
			font-size: 17px;
		}
		view.inputcommon{
			margin-top: 50upx;
		}
  }
}
</style>
