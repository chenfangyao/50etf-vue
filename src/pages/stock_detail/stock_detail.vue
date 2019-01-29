<template>
	<div class="wrap3">
    <!-- <base-header title='50ETF' has-back='1'></base-header>		 -->
    <stock-title :index='index'></stock-title>
    <many-info  :index='index'></many-info>
    <k-chart chart-height='360' :symbol-str='index'></k-chart>
	</div>
</template>

<script>
import stockTitle from '@/components/stockDetailSub/stockTitle.vue'
import manyInfo from '@/components/stockDetailSub/manyInfo.vue'
import kChart from '@/components/stockDetailSub/kChart.vue'
export default {
  data() {
    return {
			index:'',
    };
  },
  components: { stockTitle, manyInfo, kChart },
	created(){
    this.index=this.$route.query.index
	}
}
</script>

<style>
.wrap3{
  width: 100%;
}
</style>
