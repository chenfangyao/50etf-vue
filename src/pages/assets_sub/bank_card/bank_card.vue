<template>
	<div class="wrap">
		<base-header title="支付账号" has-back='1' right-txt='帮助' @right-tap='go(1)'></base-header>
    <!-- <div class="title">支付账号</div> -->
    <div class="subWrap black2">
      <!-- <input-item placeholderTxt='银行名称' v-model="bankName" ></input-item> -->
			<div class='payMoney black2 textc1'>支付金额：{{paymoney}}</div>
			<div class=inputcommon>
      <input-item :placeholderTxt='whoPaytxt' v-model="uName" ></input-item>
      <input-item :placeholderTxt='accountPaytxt' v-model="bankCode" ></input-item>
			</div>
      <err-tip :err-class='showErr' :tip-content='tipContent'></err-tip>

      <submit-btn btnTxt='下一步'  @v-tap='go' :verify-ok='verifyYes'></submit-btn>
    </div>

	</div>
</template>

<script>
import inputItem from '@/components/commonResgLog/inputItem.vue'
import submitBtn from '@/components/commonResgLog/submitBtn.vue'
import errTip from '@/components/commonResgLog/errtip.vue'
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      uName: '',
      showErr: false,
      tipContent: '账号和账户名不能空!',
      whoPaytxt:'',
      accountPaytxt:'',
      bankCode: '',
      bankName: '',
      verifyYes: true,//验证通过，把它至为true,登录按钮才会变色且启用
      paymoney:'',
			paytype:'',
			cardname:'',
			cardno:'',
			pw_id:'',
      bank_name:'',
      orcode_url:''
    };
  },
  components: { submitBtn, inputItem, errTip },
  created(){
    let opt=this.$route.query
    this.paymoney=opt.pay_money
    this.paytype=opt.paytype
    this.cardname=opt.cardname
    this.cardno=opt.cardno
    this.pw_id=opt.pw_id
    this.orcode_url=opt.orcode_url
    this.bank_name=opt.bank_name
    if(opt.aliORbank==1){
      this.whoPaytxt='请输入支付宝账号认证的姓名'
      this.accountPaytxt='请输入支付宝账号'
    }else{
      this.whoPaytxt='请输入持卡人名称'
      this.accountPaytxt='请输入银行账号'

    }
  },
  methods: {
		...mapMutations(['setbankinfo']),
    go(i) {
      if(i==1){
        this.$navigateTo({url:"/pages/assets_sub/help/help"})
        return
        }
        if(this.bankCode.trim()===''||this.uName.trim()===''){
          this.showErr=true
          return
        }
			let bankInfo={
				paymoney:this.paymoney,
				paytype:this.paytype,
				uName:this.uName,
				bankCode:this.bankCode,
				cardname:this.cardname,
				cardno:this.cardno,
				pw_id:this.pw_id,
        bank_name:this.bank_name,
        orcode_url:this.orcode_url
			}
			this.setbankinfo(bankInfo)
      this.$redirectTo({
        url: '/pages/assets_sub/gatherinfo/gatherinfo' ,
      })
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
		div.payMoney{
			height:.80rem;
			background-color:rgb(242,242,242) ;
			line-height:.80rem;
			color:grey;
			font-size: 17px;
		}
		div.inputcommon{
			margin-top:.50rem;
		}
  }
}
</style>
