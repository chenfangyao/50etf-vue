<template>
	<view>
    <base-header title='50ETF' has-back='1'></base-header>		
    <stock-title></stock-title>
    <many-info></many-info>
    <k-chart chart-height='360'></k-chart>
	</view>
</template>

<script>
import stockTitle from '@/components/stockDetailSub/stockTitle.vue'
import manyInfo from '@/components/stockDetailSub/manyInfo.vue'
import kChart from '@/components/qiQuanXiangQingSub/kChart.vue'
export default {
  data() {
    return {

    };
  },
  components: { stockTitle, manyInfo, kChart }
}
</script>

<style>
</style>
