<template>
  <view :class="{'isshow':isshowDetail} " class="wrap">
    <view class="line1 uni-flex">
      <view>
        <text>最高</text>
        <text>{{resdata.highPrice}}</text>
      </view>
      <view>
        <text>最低</text>
        <text>{{resdata.lowPrice}}</text>
      </view>
      <view>
        <text>剩余天数</text>
        <text>{{hyinfos.tag_expiry}}天</text>
      </view>
    </view>
    <view class="line2 uni-flex">
      <view>
        <text>行权日</text>
        <text>{{hyinfos.expire_date}}</text>
      </view>
      <view>
        <text>行权价格</text>
        <text>{{hyinfos.exercise_price}}</text>
      </view>
      <view>
        <text>合约单位</text>
        <text>{{hynumbers}}</text>
        <!-- <text>{{hyinfos.volume_multiple}}</text> -->
      </view>
    </view>
  </view>
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
view.wrap {
  margin: 0 0 0 25upx;
  transition: height 300ms;
  height: 0 ;
  overflow: hidden;
  text:first-child {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(112, 118, 128, 1);
    width: 48px;
  }
  text:last-child {
    font-size: 12px;
    flex-grow: 1;
    margin-left: 15upx;
    font-family: ArialMT;
    color: rgba(24, 28, 40, 1);
  }
  view.uni-flex {
    justify-content: space-between;
    flex-grow: 1;
    > view {
      display: flex;
      width: 32%;
      justify-content: space-between;
    }
  }
}
.isshow {
  height: 43.2px !important;
  margin: 22upx 0 0 25upx;
}
</style>
