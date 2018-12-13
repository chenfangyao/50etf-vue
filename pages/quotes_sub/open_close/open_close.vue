<template>
	<view>
		<header-title ></header-title>
    <view class="h1 bg"></view>
    <contain-chart></contain-chart>
    <view class="h12 bg"></view>
    <mini-table></mini-table>
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
    };
  },
  components: {
    headerTitle, containChart, miniTable, newPrice, totalCost, bottomBtn
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
