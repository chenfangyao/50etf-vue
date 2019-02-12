<template>
  <div :class="{'isshow':isshowDetail} " class="root-el">
    <div class="line1 uni-flex">
      <div>
        <span>最高</span>
        <span>{{resdata.highPrice}}</span>
      </div>
      <div>
        <span>最低</span>
        <span>{{resdata.lowPrice}}</span>
      </div>
      <div>
        <span>剩余天数</span>
        <span>{{hyinfos.tag_expiry}}天</span>
      </div>
    </div>
    <div class="line2 uni-flex">
      <div>
        <span>行权日</span>
        <span>{{hyinfos.expire_date}}</span>
      </div>
      <div>
        <span>行权价格</span>
        <span>{{hyinfos.exercise_price}}</span>
      </div>
      <div>
        <span>合约单位</span>
        <span>{{hynumbers}}</span>
        <!-- <span>{{hyinfos.volume_multiple}}</span> -->
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
  props: {
    isshowDetail: {
      default: false,
    },
		resdata:{
			
		},
		hynumbers:{
			
		},
		hyinfos:{
			
		}
  }
}
</script>

<style lang="scss" scoped>
div.root-el {
  margin: 0 0 0 .25rem;
  transition: height 300ms;
  height: 0 ;
  overflow: hidden;
  span:first-child {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(112, 118, 128, 1);
    width: 48px;
  }
  span:last-child {
    font-size: 12px;
    flex-grow: 1;
    margin-left:.15rem;
    font-family: ArialMT;
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
