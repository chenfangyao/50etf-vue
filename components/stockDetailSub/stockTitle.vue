<template>
  <view class="uni-flex">
    <!-- <text>上证50 1B0016.SH</text> -->
    <text>{{commonstock[index].stockName}}  {{commonstock[index].stockCode}}</text>
    <!-- <text>交易中 11-30 10:16:32</text> -->
  </view>
</template>
 <script>
 	import { mapState } from 'vuex';
 	
 	export default {
 	  data() {
 	    return {
 	    };
 	  },
 		computed: mapState(['commonstock']),
 	  props:['index'],
 	}
 </script>
<style lang="scss" scoped>
view {
  justify-content: space-between;
  border-top: solid 1px #f5f5f5;
  border-bottom: 12upx solid #f5f5f5;
  padding: 0 28upx;
  background-color: #fff;
  text:first-child {
    font-size: 16px;
    color: rgba(24, 28, 40, 1);
  }
  text {
    font-size: 12px;
    color: rgba(130, 133, 151, 1);
    line-height: 84upx;
  }
}
</style>
