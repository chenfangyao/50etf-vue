<template>
  <view>
    <header-title></header-title>
    <header-part></header-part>
    <view class="h12"></view>
    <k-chart></k-chart>
    <view class="h12"></view>
    <pan></pan>
    <btn-bottom></btn-bottom>
  </view>
</template>

<script>
import headerPart from '@/components/qiQuanXiangQingSub/headerPart.vue'
import headerTitle from '@/components/qiQuanXiangQingSub/headerTitle.vue'
import kChart from '@/components/qiQuanXiangQingSub/kChart.vue'
import btnBottom from '@/components/qiQuanXiangQingSub/btnBottom.vue'
import pan from '@/components/qiQuanXiangQingSub/pan.vue'

export default {
  components: {
    headerPart, headerTitle, kChart, btnBottom,pan
  }
}
</script>

<style lang="scss" scoped>
.h12 {
  height: 12upx;
  background-color: #f5f5f5;
}
</style>
