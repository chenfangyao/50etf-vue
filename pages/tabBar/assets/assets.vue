<template>
	<view class="wrap">
		<base-header title="资产"></base-header>
		<header-card :transmoney='res_data'></header-card>
		<view class="info">
			<view>权益金</view>
			<view class="uni-flex">
				<text>权益金</text>
				<text>{{royalty_money}}</text><text v-if='!royalty_money'>0.00</text>
			</view>
			<view class="uni-flex">
				<text>盈亏</text>
				<text :class="greenredclass?'greenColor':'redColor'">{{profit_money}}</text><text v-if='!royalty_money'>0.00</text>
			</view>
		</view>
		<view class="info">
			<view>其他</view>
			<view class="uni-flex">
				<text>待扣延期费</text>
				<text>{{add_fee_money}}</text><text v-if='!royalty_money'>0.00</text>
			</view>
			<view class="uni-flex">
				<text>提现冻结</text>
				<text>{{freeze_money}}</text><text v-if='!royalty_money'>0.00</text>
			</view>
		</view>
    
	</view>
</template>

<script>
import headerCard from '@/components/assetsSub/headerCard.vue'
import { mapState, mapMutations } from 'vuex';
import util from '@/common/util.js'
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
        // 请求成功的回调
        // res为服务端返回数据的根对象
        console.log('资金列表', res)
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
  onShow: function () {
		clearInterval(util.indextimmer.indexCommonSelectStock)
		util.indextimmer.indexCommonSelectStock = null
		clearInterval(util.indextimmer.quotesCommonSelectStock)
		util.indextimmer.quotesCommonSelectStock=null
		clearInterval(util.indextimmer.quotesQryQuotationList)
		util.indextimmer.quotesQryQuotationList=null
		clearInterval(util.indextimmer.quotesQrySingleQuotationMsg)
		util.indextimmer.quotesQrySingleQuotationMsg = null
		
    this.getassets()
    // this.$refs.ff.getassets()
  }
}
</script>

<style lang="scss" scoped>
view.wrap {
  background-color: #f5f5f5;
  height: calc(100vh - 70upx);

  view.info {
    margin-bottom: 12upx;

    > view {
      background-color: #fff;
      height: 64upx;
      line-height: 64upx;
      display: flex;
      justify-content: space-between;
      padding: 0 26upx;
      margin-bottom: 1px;
      font-size: 15px;
      height: 98upx;
      line-height: 98upx;
      color: rgba(24, 28, 40, 1);
    }

    > view:first-child {
      font-size: 13px;
      height: 64upx;
      line-height: 64upx;
      color: rgba(112, 118, 128, 1);
    }

    text.greenColor {
      color: #3aba8f;
    }
		text.redColor {
		  color: #ec605e;
		}
  }
}
</style>
