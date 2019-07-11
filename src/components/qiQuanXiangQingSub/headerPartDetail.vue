<template>
  <div :class="{'isshow':isshowDetail} " class="root-el">
    <div class="line1 uni-flex">
      <div>
        <span>最高</span>
        <span class="textc1">{{resdata.highPrice | to4bit}}</span>
      </div>
      <div>
        <span>最低</span>
        <span class="textc1">{{resdata.lowPrice | to4bit}}</span>
      </div>
      <div>
        <span>剩余天数</span>
        <span class="textc1">{{hyinfos.tag_expiry}}天</span>
      </div>
    </div>
    <div class="line2 uni-flex">
      <div>
        <span>行权日</span>
        <span class="textc1">{{hyinfos.expire_date}}</span>
      </div>
      <div>
        <span>行权价格</span>
        <span class="textc1">{{hyinfos.exercise_price}}</span>
      </div>
      <div>
        <span>合约单位</span>
        <span class="textc1">{{parseInt(hyinfos.volume_multiple)}}</span>
      </div>
    </div>
  </div>
</template>
<script>
	import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
    }
  },
	computed: mapState(['taglist']),
	methods:{
  },
  filters:{
    to4bit(val){
      if(val===undefined)return '';
      return val.toFixed(4)
    }
  },
  props: {
    isshowDetail: {
      default: false,
    },
		resdata:{
			
		},
		hyinfos:{
			
		}
  }
}
</script>

<style lang="scss" scoped>
div.root-el {
  margin: 0 0 0 0.53rem;
  transition: height 300ms;
  height: 0 ;
  overflow: hidden;
  span:first-child {
    font-size: 12px;
    
    color: rgba(112, 118, 128, 1);
    width: 48px;
  }
  span:last-child {
    font-size: 12px;
    flex-grow: 1;
    margin-left:.15rem;
    
    color: rgba(24, 28, 40, 1);
  }
  div.uni-flex {
    justify-content: space-between;
    flex-grow: 1;
    > div {
      display: flex;
      width: 32%;
      justify-content: space-between;
    }
  }
}
.isshow {
  height: 43.2px !important;
  margin:.22rem 0 0 .25rem;
}
</style>
