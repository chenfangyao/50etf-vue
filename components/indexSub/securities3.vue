<template>
  <section class="uni-flex">
    <view :class="item.priceChange>0?'redclass':'greenclass'" v-for='(item,i) in commonstock' :key="i" @tap='go(i)'>
      <h5 >{{item.latestPrice}}</h5>
      <view>
        <text >{{item.priceChange}}</text>
        <text >{{item.priceChangeRate}}%</text>
      </view>
      <h4>{{item.stockName}}</h4>
    </view>
    
  </section>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
  data(){
    return{
			type:true
    }
  },
	props:['commonstock'],
  methods:{
		 ...mapMutations(['setcommonstock']),
    go(i){
			this.setcommonstock(this.commonstock)
      uni.navigateTo({url:'/pages/stock_detail/stock_detail?index='+i+''})
    }
  },
	created(){
	}
}
</script>

<style lang="scss">
section {
  text-align: center;
  justify-content: space-between;
  margin-top: 10upx;
  h5 {
    font-size: 19px;
    line-height: 19px;
    font-family: ArialMT;
    font-weight: 700;
    // color: rgba(240, 95, 92, 1);
    margin-bottom: 0;
  }
  > view {
    padding: 26upx 0;
    font-size: 11px;
    font-family: ArialMT;
    font-weight: 400;
    // color: rgba(240, 95, 92, 1);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 5px 0px rgba(245, 245, 245, 0.6);
    border-radius: 5px;
    flex-grow: 1;
    text:first-child {
      margin-right: 12upx;
    }
  }
  > view:nth-child(2) {
    margin: 0 10upx;
  }
  h4 {
    font-size: 13px;
    font-weight: 400;
    color: #666;
    margin-top: 0;
  }
	view.redclass{
		color: rgba(240, 95, 92, 1);
	}
	view.greenclass{
		color:#3ABA8F;
	}
}
</style>
