<template>
  <section class="uni-flex">
    <div :class="item.priceChange>0?'redclass':'greenclass'" v-for='(item,i) in commonstock' :key="i" @click='go(i)'>
      <h5 >{{item.latestPrice}}</h5>
      <div>
        <span >{{item.priceChange}}</span>
        <span >{{item.priceChangeRate}}%</span>
      </div>
      <h4>{{item.stockName}}</h4>
    </div>
    
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
      this.$navigateTo({url:'/stock_detail',query:{index:i}})
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
  margin-top:.10rem;
  h5 {
    font-size: 19px;
    line-height: 19px;
    font-family: ArialMT;
    font-weight: 700;
    // color: rgba(240, 95, 92, 1);
    margin: 0;
  }
  > div {
    padding:.26rem 0;
    font-size: 11px;
    font-family: ArialMT;
    font-weight: 400;
    // color: rgba(240, 95, 92, 1);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 5px 0px rgba(245, 245, 245, 0.6);
    border-radius: 5px;
    flex-grow: 1;
    span:first-child {
      margin-right:.12rem;
    }
  }
  > div:nth-child(2) {
    margin: 0 .10rem;
  }
  h4 {
    font-size: 13px;
    font-weight: 400;
    color: #666;
    margin: 0;
  }
	div.redclass{
		color: rgba(240, 95, 92, 1);
	}
	div.greenclass{
		color:#3ABA8F;
	}
}
</style>
