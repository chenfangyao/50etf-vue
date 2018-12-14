<template>
	<view>
		<header-title ></header-title>
    <view class="h1 bg"></view>
    <contain-chart></contain-chart>
    <view class="h12 bg"></view>
    <mini-table :hydetils='QuotationMsg'></mini-table>
    <view class="h12 bg"></view>
    <new-price></new-price>
    <view class="h12 bg"></view>
    <total-cost></total-cost>
    <bottom-btn></bottom-btn>
	</view>
</template>

<script>
import headerTitle from '@/components/openCloseSub/headerTitle.vue'
import containChart from '@/components/openCloseSub/containChart.vue'
import miniTable from '@/components/openCloseSub/miniTable.vue'
import newPrice from '@/components/openCloseSub/newPrice.vue'
import totalCost from '@/components/openCloseSub/totalCost.vue'
import bottomBtn from '@/components/openCloseSub/bottomBtn.vue'
export default {
  data() {
    return {
			QuotationMsg:[]
    };
  },
  components: {
    headerTitle, containChart, miniTable, newPrice, totalCost, bottomBtn
  },
	methods:{
		// 买入卖出合约详细
		getartlelist() {
			var options = {
				url: '/fiftyEtf/QrySingleQuotationMsg', //请求接口
				method: 'POST', //请求方法全部大写，默认GET
				dataType: "json",
				data: {
					symbol:10001544,
				},
				header:{
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
			this.$httpReq(options).then((res) => {
				// 请求成功的回调
				// res为服务端返回数据的根对象
				console.log('买入卖出详细', res)
				if(res.status){
					this.QuotationMsg=res.data[0]
					console.log('this.QuotationMsg',this.QuotationMsg)
				}
			}).catch((err) => {
				// 请求失败的回调
				console.log(err)
			})
		},
	},
	onShow(){
		this.getartlelist()
	},
}
</script>

<style lang="scss" scoped>
view.h1 {
  height: 1px;
}
.bg{
  background-color: #ededed;
}
view.h12{
  height: 12upx;
}
</style>
