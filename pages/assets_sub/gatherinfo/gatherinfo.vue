<template>
	<view class="wrap"> 
		<base-header title="收款信息" has-back='1'  @right-tap='go(1)'></base-header>
    <!-- <view class="title">支付账号</view> -->
    <view class="subWrap">
		<view class='gatherInfo'>
		<view  class='payMoney'>
			<text>收款账号:</text>
			<text v-show="showBank">{{cardno}}</text>
			<view v-show="!showBank" class="chooseCount">
					<view @tap='showPicker'>
							{{pickerText}}
							<text class="arrowDown"></text>
					</view>
			</view>
		</view>
		
		<view class='payMoney'>
			<text>收款人:</text>
			<text>{{cardname}}</text>
			</view>
		<view class='payMoney'>
			<text>客户代码:</text>
			<text>{{userinfo.mobile}}-{{userinfo.user_id}}</text></view>
		</view>
      <submit-btn class='subBtn' btnTxt='复制完成,去支付宝转账'  @v-tap='go' :verify-ok='verifyYes'></submit-btn>
    </view>
		<mpvue-picker themeColor="#007AFF" ref="typePick" mode="selector" :deepLength="1" :pickerValueDefault="[0]"
										@onConfirm="onConfirm" @onCancel="onCancel" :picker-value-array="pickerValueArray"></mpvue-picker>

	</view>
</template>

<script>
import inputItem from '@/components/commonResgLog/inputItem.vue'
import submitBtn from '@/components/commonResgLog/submitBtn.vue'
import errTip from '@/components/commonResgLog/errtip.vue'
import mpvuePicker from '@/components/mpvuePicker.vue';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      uName: '',
      showErr: false,
      tipContent: '',
      bankCode: '',
      bankName: '',
      verifyYes: true,//验证通过，把它至为true,登录按钮才会变色且启用
      paymoney:'',
	    paytype:'',
	    pw_id:'',
			cardname:'',
			cardno:'',
			showBank:true,
			pickerText:'',
			pickerValueArray: [],
    };
  },
  components: { submitBtn, inputItem, errTip,mpvuePicker },
	computed: mapState(['mobile','userinfo','bankinfo']),
	onLoad(opt){
		this.paytype=this.bankinfo.paytype
		this.cardname=this.bankinfo.cardname
		this.cardno=this.bankinfo.cardno
		this.pw_id=this.bankinfo.pw_id
		this.paymoney=this.bankinfo.paymoney
		this.bankCode=this.bankinfo.bankCode
		if(this.paytype=='remit_alipay'){
			this.showBank=true	
			this.bankName=this.bankinfo.uName
		}else if(this.paytype=='remit_icbc'){
			this.showBank=false
			this.bankName=this.bankinfo.bank_name
			this.pickerText=this.bankinfo.bank_name
			this.pickerValueArray=[{label:this.bankinfo.bank_name}]
		}
	},
  methods: {
    go(i) {
      if (i == 1) {
        uni.navigateTo({ url: '../help/help' })
      }
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
				if(res.status){
					uni.showToast({
						title: res.info?res.info:'信息提交成功',
						duration: 2000,
						image:'/static/holdingImg/cedan-succ.png'
					});
				}else{
					uni.showToast({
						title: res.info?res.info:'信息提交失败',
						duration: 2000,
						image:'/static/holdingImg/cedan-succ.png'
					});
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
					if(res.status){
						uni.showToast({
							title: res.info?res.info:'信息提交成功',
							duration: 2000,
							image:'/static/holdingImg/cedan-succ.png'
						});
					}else{
					uni.showToast({
						title: res.info?res.info:'信息提交失败',
						duration: 2000,
						image:'/static/holdingImg/cedan-succ.png'
					});
				}
				}
			}).catch((err) => {
				// 请求失败的回调
			})
		},
		showPicker() {
		      this.$refs.typePick.show()
		    },
				onCancel(e) {
				},
				onConfirm(val) {
					this.pickerText=val.label
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
			font-size: 15px;
			margin-left: 10upx;
			border-bottom:1px solid rgb(238,237,242);
			margin-top: 20upx
		}
		view.payMoney >text:nth-child(2){
			margin-left: 50upx;
		}
  }
}
view.chooseCount {
	      display: inline-block;
        width: 450upx;
        height: 50upx;
        line-height: 50upx;
        text-align: center;
        font-size: 12px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: rgba(102, 102, 102, 1);
        line-height: 43px;
        background: rgba(239, 239, 239, 1);
        border-radius: 8upx;
				margin-left: 50upx;
    text.arrowDown {
        display: inline-block;
        width: 17upx;
        border: 9upx solid #666;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
    }
    }
</style>
