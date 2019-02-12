<template>
	<div class="wrap">
		<base-header title="资产"></base-header>
		<header-card :transmoney='res_data'></header-card>
		<div class="info">
			<div>权益金</div>
			<div class="uni-flex">
				<span>权益金</span>
				<span>{{royalty_money}}</span><span v-if='!royalty_money'>0.00</span>
			</div>
			<div class="uni-flex">
				<span>盈亏</span>
				<span :class="greenredclass?'greenColor':'redColor'">{{profit_money}}</span><span v-if='!royalty_money'>0.00</span>
			</div>
		</div>
		<div class="info">
			<div>其他</div>
			<div class="uni-flex">
				<span>待扣延期费</span>
				<span>{{add_fee_money}}</span><span v-if='!royalty_money'>0.00</span>
			</div>
			<div class="uni-flex">
				<span>提现冻结</span>
				<span>{{freeze_money}}</span><span v-if='!royalty_money'>0.00</span>
			</div>
		</div>

	</div>
</template>

<script>
import headerCard from '@/components/assetsSub/headerCard.vue'
import { mapState, mapMutations } from 'vuex';
export default {

  data() {
    return {
      res_data: '',
      dta_money: "动态总资产",
      enable_money: "可用资金",
      freeze_money: "冻结资金",
      stock_enable_money: "实盘可用金额",
      bean_money: "抵用券",
      market_value: "当前股票市值",
      profit_money: "当前持仓盈亏",
      delay_money_sum: "延期总费用",
      delay_money_diplay: "延期总费用显示模式，0=正常，绿色打钩，1=警告，红色打叉",
      delay_money_text: "延期总费用下方的文字，如：此刻保证金充足，请注意盘中变化！",
      royalty_money: "持仓权益",
      add_dpt_money: "保证金",
      add_fee_money: "延期费",
      tip_risk_month: "资金页面底下提示文字，有值才显示。如：需月配请联系客服",
			greenredclass:false,
    };
  },
  // props:{aa:'res_data'},
  components: {
    headerCard
  },
  methods: {
		...mapMutations(['setassets']),
    // 获取资金列表
    getassets() {
      var options = {
        url: '/Sapi/User/asset', //请求接口
        method: 'GET', //请求方法全部大写，默认GET
      }
      this.$httpReq(options).then((res) => {
        if (res.status == 1) {
					this.setassets(res.data)
          this.enable_money = res.data.enable_money
          this.dta_money = res.data.dta_money
          this.royalty_money = res.data.royalty_money
          this.freeze_money = res.data.freeze_money
          this.add_fee_money = res.data.add_fee_money
          this.profit_money = res.data.profit_money
					this.res_data = res.data
					if(res.data.profit_money.indexOf('-')!=-1){
						this.greenredclass=true
					}else{
						this.greenredclass=false
					}
        }
      }).catch((err) => {
        // 请求失败的回调
        console.error(err,'捕捉')
      })
    },
  },
  created: function () {
    this.getassets()
    // this.$refs.ff.getassets()
  }
}
</script>

<style lang="scss" scoped>
div.wrap {
  background-color: #f5f5f5;
  height: calc(100vh - .70rem);
padding-top: 0.1px;
  div.info {
    margin-bottom:.12rem;

    > div {
      background-color: #fff;
      line-height:.98rem;
      display: flex;
      justify-content: space-between;
      padding:0 0.26rem;
      margin-bottom: 1px;
      font-size: 15px;
      height:.98rem;
      color: rgba(24, 28, 40, 1);
    }

    > div:first-child {
      font-size: 13px;
      height:.64rem;
      line-height:.64rem;

      color: rgba(112, 118, 128, 1);
    }

    span.greenColor {
      color: #3aba8f;
    }
		span.redColor {
		  color: #ec605e;
		}
  }
}
</style>
