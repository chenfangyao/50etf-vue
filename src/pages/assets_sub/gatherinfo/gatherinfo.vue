<template>
	<div class="wrap"> 
		<base-header title="收款信息" has-back='1'  @right-tap='go(1)'></base-header>
    <!-- <div class="title">支付账号</div> -->
    <div class="subWrap">
		<div class='gatherInfo'>
		<div  class='payMoney'>
			<span>收款账号:</span>
			<span v-show="showBank">{{cardno}}</span>
			<div v-show="!showBank" class="chooseCount">
					<div @touchend='showPicker'>
							{{pickerText}}
							<span class="arrowDown"></span>
					</div>
			</div>
		</div>
		
		<div class='payMoney'>
			<span>收款人:</span>
			<span>{{cardname}}</span>
			</div>
		<div class='payMoney'>
			<span>客户代码:</span>
			<span>{{userinfo.mobile}}-{{userinfo.user_id}}</span></div>
		</div>
      <submit-btn class='subBtn' btnTxt='复制完成,去转账'  @v-tap='go' :verify-ok='verifyYes'></submit-btn>
    </div>
		<mpvue-picker themeColor="#007AFF" ref="typePick" mode="selector" :deepLength="1" :pickerValueDefault="[0]"
										@onConfirm="onConfirm" @onCancel="onCancel" :picker-value-array="pickerValueArray"></mpvue-picker>

	</div>
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
        this.$navigateTo({ url: '../help/help' })
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
div.wrap {
  height: 100vh;
  // background-color: #f5f5f5;
  div.title {
    font-size: 16px;
    padding-left:.27rem;
    color: rgba(24, 28, 40, 1);
    line-height:.84rem;
    height:.84rem;
    border-top: solid 1px #f5f5f5;
  }
  div.subWrap {
    padding:.28rem.27rem 0;
    margin-top:.12rem;
    background-color: #fff;
	div.gatherInfo{
		// background-color: rgb(238,237,242);
		margin-top:.20rem;
	}
	div.subBtn{
		margin-top:.70rem;
	}
    
		div.payMoney{
			height:.80rem;
			line-height:.80rem;
			color:grey;
			font-size: 15px;
			margin-left:.10rem;
			border-bottom:1px solid rgb(238,237,242);
			margin-top:.20rem
		}
		div.payMoney >span:nth-child(2){
			margin-left:.50rem;
		}
  }
}
div.chooseCount {
	      display: inline-block;
        width:4.50rem;
        height:.50rem;
        line-height:.50rem;
        text-align: center;
        font-size: 12px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: rgba(102, 102, 102, 1);
        line-height: 43px;
        background: rgba(239, 239, 239, 1);
        border-radius:.08rem;
				margin-left:.50rem;
    span.arrowDown {
        display: inline-block;
        width:.17rem;
        border:.09rem solid #666;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
    }
    }
</style>
